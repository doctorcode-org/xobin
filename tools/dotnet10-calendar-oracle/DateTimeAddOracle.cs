using System.Text.Json;

internal static class DateTimeAddOracle
{
    private const string AddSource = "DateTimeTests.Add_TimeSpan_ReturnsExpected";
    private const string AddOutOfRangeSource = "DateTimeTests.Add_TimeSpan_NewDateOutOfRange_ThrowsArgumentOutOfRangeException";
    private const string AddTicksSource = "DateTimeTests.AddTicks_Invoke_ReturnsExpected";
    private const string AddTicksOutOfRangeSource = "DateTimeTests.AddTicks_NewDateOutOfRange_ThrowsArgumentOutOfRangeException";

    internal static string Generate()
    {
        var rows = new List<string>();

        void CaptureSuccess(string source, string operation, DateTime date, long valueTicks, string origin)
        {
            long originalTicks = date.Ticks;
            DateTimeKind originalKind = date.Kind;
            DateTime result = operation == "add"
                ? date.Add(new TimeSpan(valueTicks))
                : date.AddTicks(valueTicks);
            rows.Add(JsonSerializer.Serialize(new
            {
                source,
                operation,
                origin,
                target = "fixed",
                inputTicks = originalTicks.ToString(),
                inputKind = (int)originalKind,
                valueTicks = valueTicks.ToString(),
                resultTicks = result.Ticks.ToString(),
                resultKind = (int)result.Kind,
                error = (string?)null,
                paramName = (string?)null,
                message = (string?)null,
                actualValue = (string?)null,
            }));
        }

        void CaptureFailure(string source, string operation, string target, long valueTicks)
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
                _ = operation == "add"
                    ? date.Add(new TimeSpan(valueTicks))
                    : date.AddTicks(valueTicks);
            }
            catch (ArgumentOutOfRangeException error)
            {
                rows.Add(JsonSerializer.Serialize(new
                {
                    source,
                    operation,
                    origin = "official",
                    target,
                    inputTicks = (string?)null,
                    inputKind = (int?)null,
                    valueTicks = valueTicks.ToString(),
                    resultTicks = (string?)null,
                    resultKind = (int?)null,
                    error = error.GetType().Name,
                    paramName = error.ParamName,
                    message = error.Message,
                    actualValue = error.ActualValue?.ToString(),
                }));
                return;
            }
            throw new InvalidOperationException($"Expected an exception: {source}/{target}/{valueTicks}.");
        }

        foreach ((long dateTicks, long valueTicks) in new[] { (1000L, 10L), (1000L, 0L), (1000L, -10L) })
        {
            CaptureSuccess(AddSource, "add", new DateTime(dateTicks), valueTicks, "official");
            CaptureSuccess(AddTicksSource, "addTicks", new DateTime(dateTicks), valueTicks, "official");
        }

        foreach (DateTimeKind kind in new[] { DateTimeKind.Unspecified, DateTimeKind.Utc, DateTimeKind.Local })
        {
            CaptureSuccess(AddSource, "add", new DateTime(1000, kind), 10, "kind-preservation");
            CaptureSuccess(AddTicksSource, "addTicks", new DateTime(1000, kind), 10, "kind-preservation");
        }

        CaptureSuccess(AddSource, "add", DateTime.MinValue, DateTime.MaxValue.Ticks, "range-boundary");
        CaptureSuccess(AddSource, "add", DateTime.MaxValue, -DateTime.MaxValue.Ticks, "range-boundary");
        CaptureSuccess(AddTicksSource, "addTicks", DateTime.MinValue, DateTime.MaxValue.Ticks, "range-boundary");
        CaptureSuccess(AddTicksSource, "addTicks", DateTime.MaxValue, -DateTime.MaxValue.Ticks, "range-boundary");

        CaptureFailure(AddOutOfRangeSource, "add", "now", long.MaxValue);
        CaptureFailure(AddOutOfRangeSource, "add", "now", long.MinValue);
        CaptureFailure(AddOutOfRangeSource, "add", "max", 1);
        CaptureFailure(AddOutOfRangeSource, "add", "min", -1);

        CaptureFailure(AddTicksOutOfRangeSource, "addTicks", "max", 1);
        CaptureFailure(AddTicksOutOfRangeSource, "addTicks", "min", -1);
        CaptureFailure(AddTicksOutOfRangeSource, "addTicks", "now", long.MaxValue);
        CaptureFailure(AddTicksOutOfRangeSource, "addTicks", "now", long.MinValue);

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row))
            + "\n  ]\n}\n";
    }
}
