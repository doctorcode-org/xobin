using System.Globalization;
using System.Text.Json;

internal static class DateTimeSubtractOracle
{
    private const string TimeSpanSource = "DateTimeTests.Subtract_TimeSpan_ReturnsExpected";
    private const string TimeSpanOutOfRangeSource = "DateTimeTests.Subtract_OutOfRangeTimeSpan_ThrowsArgumentOutOfRangeException";
    private const string DateTimeSource = "DateTimeTests.Subtract_DateTime_ReturnsExpected";

    internal static string Generate()
    {
        var rows = new List<string>();

        void CaptureTimeSpanSuccess(DateTime date, TimeSpan value, string origin)
        {
            DateTime result = date.Subtract(value);
            rows.Add(JsonSerializer.Serialize(new
            {
                source = TimeSpanSource,
                operation = "subtractTimeSpan",
                origin,
                target = "fixed",
                inputTicks = date.Ticks.ToString(CultureInfo.InvariantCulture),
                inputKind = (int)date.Kind,
                valueTicks = value.Ticks.ToString(CultureInfo.InvariantCulture),
                valueKind = (int?)null,
                resultTicks = result.Ticks.ToString(CultureInfo.InvariantCulture),
                resultKind = (int?)result.Kind,
                error = (string?)null,
                paramName = (string?)null,
                message = (string?)null,
                actualValue = (string?)null,
            }));
        }

        void CaptureTimeSpanFailure(string target, TimeSpan value)
        {
            try
            {
                DateTime date = target switch
                {
                    "min" => DateTime.MinValue,
                    "max" => DateTime.MaxValue,
                    "now" => DateTime.Now,
                    _ => throw new InvalidOperationException($"Unknown DateTime target: {target}."),
                };
                _ = date.Subtract(value);
            }
            catch (ArgumentOutOfRangeException error)
            {
                rows.Add(JsonSerializer.Serialize(new
                {
                    source = TimeSpanOutOfRangeSource,
                    operation = "subtractTimeSpan",
                    origin = "official",
                    target,
                    inputTicks = (string?)null,
                    inputKind = (int?)null,
                    valueTicks = value.Ticks.ToString(CultureInfo.InvariantCulture),
                    valueKind = (int?)null,
                    resultTicks = (string?)null,
                    resultKind = (int?)null,
                    error = error.GetType().Name,
                    paramName = error.ParamName,
                    message = error.Message,
                    actualValue = error.ActualValue?.ToString(),
                }));
                return;
            }
            throw new InvalidOperationException($"Expected an exception: {target}/{value.Ticks}.");
        }

        void CaptureDateTimeSuccess(DateTime left, DateTime right, string origin)
        {
            TimeSpan result = left.Subtract(right);
            rows.Add(JsonSerializer.Serialize(new
            {
                source = DateTimeSource,
                operation = "subtractDateTime",
                origin,
                target = "fixed",
                inputTicks = left.Ticks.ToString(CultureInfo.InvariantCulture),
                inputKind = (int)left.Kind,
                valueTicks = right.Ticks.ToString(CultureInfo.InvariantCulture),
                valueKind = (int?)right.Kind,
                resultTicks = result.Ticks.ToString(CultureInfo.InvariantCulture),
                resultKind = (int?)null,
                error = (string?)null,
                paramName = (string?)null,
                message = (string?)null,
                actualValue = (string?)null,
            }));
        }

        DateTime timeSpanDate = new(2012, 6, 18, 10, 5, 1, 0, DateTimeKind.Utc);
        CaptureTimeSpanSuccess(timeSpanDate, new TimeSpan(10, 5, 1), "official");
        CaptureTimeSpanSuccess(timeSpanDate, new TimeSpan(-10, -5, -1), "official");

        CaptureTimeSpanFailure("now", TimeSpan.MinValue);
        CaptureTimeSpanFailure("now", TimeSpan.MaxValue);
        CaptureTimeSpanFailure("max", new TimeSpan(-1));
        CaptureTimeSpanFailure("min", new TimeSpan(1));

        DateTime dateTime1 = new(1996, 6, 3, 22, 15, 0, DateTimeKind.Utc);
        DateTime dateTime2 = new(1996, 12, 6, 13, 2, 0, DateTimeKind.Utc);
        CaptureDateTimeSuccess(dateTime2, dateTime1, "official");
        CaptureDateTimeSuccess(dateTime1, dateTime2, "official");
        CaptureDateTimeSuccess(dateTime1, dateTime2, "official");

        long preciseTicks = new DateTime(2024, 2, 29, 12, 34, 56, 789).Ticks + 4321;
        foreach (DateTimeKind kind in new[] { DateTimeKind.Unspecified, DateTimeKind.Utc, DateTimeKind.Local })
        {
            CaptureTimeSpanSuccess(new DateTime(preciseTicks, kind), new TimeSpan(1), "kind-and-tick-preservation");
            CaptureTimeSpanSuccess(new DateTime(preciseTicks, kind), new TimeSpan(-1), "kind-and-tick-preservation");
        }
        CaptureTimeSpanSuccess(DateTime.MaxValue, new TimeSpan(DateTime.MaxValue.Ticks), "range-boundary");
        CaptureTimeSpanSuccess(DateTime.MinValue, new TimeSpan(-DateTime.MaxValue.Ticks), "range-boundary");
        CaptureTimeSpanSuccess(new DateTime(preciseTicks), TimeSpan.Zero, "zero");

        CaptureDateTimeSuccess(DateTime.MaxValue, DateTime.MinValue, "range-boundary");
        CaptureDateTimeSuccess(DateTime.MinValue, DateTime.MaxValue, "range-boundary");
        foreach (DateTimeKind kind in new[] { DateTimeKind.Unspecified, DateTimeKind.Utc, DateTimeKind.Local })
            CaptureDateTimeSuccess(new DateTime(preciseTicks, kind), new DateTime(preciseTicks, DateTimeKind.Utc), "kind-ignored");

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row))
            + "\n  ]\n}\n";
    }
}
