using System.Text.Json;

internal static class DateTimeCalendarMathOracle
{
    internal static string Generate()
    {
        var rows = new List<string>();

        void Add(string source, int[] arguments, object result)
        {
            rows.Add(JsonSerializer.Serialize(new
            {
                source,
                arguments,
                result,
                error = (string?)null,
                paramName = (string?)null,
                message = (string?)null,
                actualValue = (object?)null,
            }));
        }

        void Capture(string source, int[] arguments, Func<object> invoke)
        {
            try
            {
                _ = invoke();
            }
            catch (ArgumentOutOfRangeException error)
            {
                rows.Add(JsonSerializer.Serialize(new
                {
                    source,
                    arguments,
                    result = (object?)null,
                    error = error.GetType().Name,
                    paramName = error.ParamName,
                    message = error.Message,
                    actualValue = error.ActualValue,
                }));
                return;
            }
            throw new InvalidOperationException($"Expected an exception: {source}/{string.Join(',', arguments)}.");
        }

        foreach (int year in new[] { 2004, 2005 })
            for (int month = 1; month <= 12; month++)
                Add("DateTimeTests.DaysInMonth_Invoke_ReturnsExpected", [year, month], DateTime.DaysInMonth(year, month));

        foreach (int month in new[] { 0, 13 })
            Capture("DateTimeTests.DaysInMonth_InvalidMonth_ThrowsArgumentOutOfRangeException",
                [1, month], () => DateTime.DaysInMonth(1, month));

        foreach (int year in new[] { 0, 10000 })
            Capture("DateTimeTests.DaysInMonth_InvalidYear_ThrowsArgumentOutOfRangeException",
                [year, 1], () => DateTime.DaysInMonth(year, 1));

        foreach (int year in new[] { 2004, 2000, 1900, 2005 })
            Add("DateTimeTests.IsLeapYear_Invoke_ReturnsExpected", [year], DateTime.IsLeapYear(year));

        foreach (int year in new[] { 0, 10000 })
            Capture("DateTimeTests.IsLeapYear_InvalidYear_ThrowsArgumentOutOfRangeException",
                [year], () => DateTime.IsLeapYear(year));

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row)) + "\n  ]\n}\n";
    }
}
