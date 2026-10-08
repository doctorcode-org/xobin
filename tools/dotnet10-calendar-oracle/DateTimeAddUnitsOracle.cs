using System.Globalization;
using System.Text.Json;

internal static class DateTimeAddUnitsOracle
{
    private sealed record Operation(
        string Name,
        string SuccessSource,
        string FailureSource,
        long TicksPerUnit,
        Func<DateTime, double, DateTime> Apply);

    private static readonly Operation[] Operations =
    [
        new("addDays", "DateTimeTests.AddDays_Invoke_ReturnsExpected", "DateTimeTests.AddDays_NewDateOutOfRange_ThrowsArgumentOutOfRangeException", TimeSpan.TicksPerDay, (date, value) => date.AddDays(value)),
        new("addHours", "DateTimeTests.AddHours_Invoke_RetunsExpected", "DateTimeTests.AddHours_NewDateOutOfRange_ThrowsArgumentOutOfRangeException", TimeSpan.TicksPerHour, (date, value) => date.AddHours(value)),
        new("addMinutes", "DateTimeTests.AddMinutes_Invoke_ReturnsExpected", "DateTimeTests.AddMinutes_NewDateOutOfRange_ThrowsArgumentOutOfRangeException", TimeSpan.TicksPerMinute, (date, value) => date.AddMinutes(value)),
        new("addSeconds", "DateTimeTests.AddSeconds_Invoke_ReturnsExpected", "DateTimeTests.AddSeconds_NewDateOutOfRange_ThrowsArgumentOutOfRangeException", TimeSpan.TicksPerSecond, (date, value) => date.AddSeconds(value)),
        new("addMilliseconds", "DateTimeTests.AddMilliseconds_Invoke_ReturnsExpected", "DateTimeTests.AddMilliseconds_NewDateOutOfRange_ThrowsArgumentOutOfRangeException", TimeSpan.TicksPerMillisecond, (date, value) => date.AddMilliseconds(value)),
        new("addMicroseconds", "DateTimeTests.AddMicroseconds_Invoke_ReturnsExpected", "DateTimeTests.AddMicroseconds_NewDateOutOfRange_ThrowsArgumentOutOfRangeException", TimeSpan.TicksPerMicrosecond, (date, value) => date.AddMicroseconds(value)),
    ];

    internal static string Generate()
    {
        var rows = new List<string>();

        static string FormatDouble(double value) => value.ToString("R", CultureInfo.InvariantCulture);

        void CaptureSuccess(Operation operation, DateTime date, double value, string origin)
        {
            long originalTicks = date.Ticks;
            DateTimeKind originalKind = date.Kind;
            DateTime result = operation.Apply(date, value);
            rows.Add(JsonSerializer.Serialize(new
            {
                source = operation.SuccessSource,
                operation = operation.Name,
                origin,
                target = "fixed",
                inputTicks = originalTicks.ToString(CultureInfo.InvariantCulture),
                inputKind = (int)originalKind,
                value = FormatDouble(value),
                resultTicks = result.Ticks.ToString(CultureInfo.InvariantCulture),
                resultKind = (int)result.Kind,
                error = (string?)null,
                paramName = (string?)null,
                message = (string?)null,
                actualValue = (string?)null,
            }));
        }

        void CaptureFailure(Operation operation, string target, double value, string origin)
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
                _ = operation.Apply(date, value);
            }
            catch (ArgumentOutOfRangeException error)
            {
                rows.Add(JsonSerializer.Serialize(new
                {
                    source = operation.FailureSource,
                    operation = operation.Name,
                    origin,
                    target,
                    inputTicks = (string?)null,
                    inputKind = (int?)null,
                    value = FormatDouble(value),
                    resultTicks = (string?)null,
                    resultKind = (int?)null,
                    error = error.GetType().Name,
                    paramName = error.ParamName,
                    message = error.Message,
                    actualValue = error.ActualValue?.ToString(),
                }));
                return;
            }
            throw new InvalidOperationException($"Expected an exception: {operation.Name}/{target}/{value}.");
        }

        DateTime official = new(1986, 8, 15, 10, 20, 5, 70);
        foreach (double value in new[] { 2d, 2d, 0d, -2d })
            CaptureSuccess(Operations[0], official, value, "official");
        foreach (double value in new[] { 3d, 0d, -3d })
            CaptureSuccess(Operations[1], official, value, "official");
        foreach (double value in new[] { 5d, 0d, -5d })
            CaptureSuccess(Operations[2], official, value, "official");
        foreach (double value in new[] { 30d, 0d, -3d })
            CaptureSuccess(Operations[3], official, value, "official");
        foreach (double value in new[] { 10d, 0d, -10d })
            CaptureSuccess(Operations[4], official, value, "official");
        DateTime microsecondOfficial = new(1986, 8, 15, 10, 20, 5, 70, 70);
        foreach (double value in new[] { 10d, 0d, -10d })
            CaptureSuccess(Operations[5], microsecondOfficial, value, "official");

        foreach (Operation operation in Operations)
        {
            CaptureFailure(operation, "max", 1, "official");
            CaptureFailure(operation, "min", -1, "official");
            CaptureFailure(operation, "now", double.MaxValue, "official");
            CaptureFailure(operation, "now", double.MinValue, "official");

            DateTime precise = new(new DateTime(2024, 2, 29, 12, 34, 56, 789).Ticks + 4321, DateTimeKind.Unspecified);
            foreach (double value in new[] { -1.5, -0.5, -0.1, 0.1, 0.5, 1.5 })
                CaptureSuccess(operation, precise, value, "fractional-truncation");

            double halfTick = 0.5 / operation.TicksPerUnit;
            double oneAndHalfTicks = 1.5 / operation.TicksPerUnit;
            foreach (double value in new[] { -oneAndHalfTicks, -halfTick, halfTick, oneAndHalfTicks })
                CaptureSuccess(operation, precise, value, "sub-unit-tick-boundary");

            foreach (DateTimeKind kind in new[] { DateTimeKind.Unspecified, DateTimeKind.Utc, DateTimeKind.Local })
                CaptureSuccess(operation, new DateTime(precise.Ticks, kind), 1.25, "kind-preservation");

            CaptureFailure(operation, "now", double.PositiveInfinity, "non-finite");
            CaptureFailure(operation, "now", double.NegativeInfinity, "non-finite");
            CaptureSuccess(operation, precise, double.NaN, "non-finite");
        }

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row))
            + "\n  ]\n}\n";
    }
}
