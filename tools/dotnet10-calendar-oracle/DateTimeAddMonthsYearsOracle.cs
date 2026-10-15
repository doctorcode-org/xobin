using System.Text.Json;

internal static class DateTimeAddMonthsYearsOracle
{
    private const string AddYearsSource = "DateTimeTests.AddYears_Invoke_ReturnsExpected";
    private const string AddYearsOutOfRangeSource = "DateTimeTests.AddYears_NewDateOutOfRange_ThrowsArgumentOutOfRangeException";
    private const string AddMonthsSource = "DateTimeTests.AddMonths_Invoke_ReturnsExpected";
    private const string AddMonthsOutOfRangeSource = "DateTimeTests.AddMonths_NewDateOutOfRange_ThrowsArgumentOutOfRangeException";

    internal static string Generate()
    {
        var rows = new List<string>();

        void CaptureSuccess(string source, string operation, DateTime date, int value, string origin)
        {
            long originalTicks = date.Ticks;
            DateTimeKind originalKind = date.Kind;
            DateTime result = operation == "addYears" ? date.AddYears(value) : date.AddMonths(value);
            rows.Add(JsonSerializer.Serialize(new
            {
                source,
                operation,
                origin,
                target = "fixed",
                inputTicks = originalTicks.ToString(),
                inputKind = (int)originalKind,
                value,
                resultTicks = result.Ticks.ToString(),
                resultKind = (int)result.Kind,
                error = (string?)null,
                paramName = (string?)null,
                message = (string?)null,
                actualValue = (string?)null,
            }));
        }

        void CaptureFailure(string source, string operation, string target, int value)
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
                _ = operation == "addYears" ? date.AddYears(value) : date.AddMonths(value);
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
                    value,
                    resultTicks = (string?)null,
                    resultKind = (int?)null,
                    error = error.GetType().Name,
                    paramName = error.ParamName,
                    message = error.Message,
                    actualValue = error.ActualValue?.ToString(),
                }));
                return;
            }
            throw new InvalidOperationException($"Expected an exception: {source}/{target}/{value}.");
        }

        DateTime official = new(1986, 8, 15, 10, 20, 5, 70);
        foreach (int value in new[] { 10, 0, -10 })
            CaptureSuccess(AddYearsSource, "addYears", official, value, "official");

        foreach ((DateTime date, int value) in new[]
        {
            (new DateTime(1986, 8, 15, 10, 20, 5, 70), 2),
            (new DateTime(1986, 8, 31, 10, 20, 5, 70), 1),
            (new DateTime(1986, 9, 30, 10, 20, 5, 70), 1),
            (new DateTime(1986, 8, 15, 10, 20, 5, 70), 0),
            (new DateTime(1986, 8, 15, 10, 20, 5, 70), -2),
            (new DateTime(1900, 2, 28, 10, 20, 5, 70), 1),
            (new DateTime(1900, 1, 31, 10, 20, 5, 70), 1),
            (new DateTime(2000, 1, 31, 10, 20, 5, 70), 1),
            (new DateTime(2000, 2, 29, 10, 20, 5, 70), 1),
            (new DateTime(2004, 1, 31, 10, 20, 5, 70), 1),
            (new DateTime(2004, 2, 29, 10, 20, 5, 70), 1),
            (new DateTime(2000, 12, 31), 1),
        }) CaptureSuccess(AddMonthsSource, "addMonths", date, value, "official");

        CaptureFailure(AddYearsOutOfRangeSource, "addYears", "now", 10001);
        CaptureFailure(AddYearsOutOfRangeSource, "addYears", "now", -10001);
        CaptureFailure(AddYearsOutOfRangeSource, "addYears", "max", 1);
        CaptureFailure(AddYearsOutOfRangeSource, "addYears", "min", -1);
        CaptureFailure(AddMonthsOutOfRangeSource, "addMonths", "now", 120001);
        CaptureFailure(AddMonthsOutOfRangeSource, "addMonths", "now", -120001);
        CaptureFailure(AddMonthsOutOfRangeSource, "addMonths", "max", 1);
        CaptureFailure(AddMonthsOutOfRangeSource, "addMonths", "min", -1);

        long preciseTicks = new DateTime(2000, 2, 29, 23, 59, 59, 999).Ticks + 9999;
        foreach (DateTimeKind kind in new[] { DateTimeKind.Unspecified, DateTimeKind.Utc, DateTimeKind.Local })
        {
            DateTime precise = new(preciseTicks, kind);
            CaptureSuccess(AddYearsSource, "addYears", precise, 1, "kind-and-time-preservation");
            CaptureSuccess(AddMonthsSource, "addMonths", precise, -12, "kind-and-time-preservation");
        }

        CaptureSuccess(AddYearsSource, "addYears", new DateTime(1, 12, 31), 9998, "range-boundary");
        CaptureSuccess(AddYearsSource, "addYears", new DateTime(9999, 1, 1), -9998, "range-boundary");
        CaptureSuccess(AddMonthsSource, "addMonths", new DateTime(1, 1, 31), 119987, "range-boundary");
        CaptureSuccess(AddMonthsSource, "addMonths", new DateTime(9999, 12, 31), -119987, "range-boundary");

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row))
            + "\n  ]\n}\n";
    }
}
