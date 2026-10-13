using System.Globalization;
using System.Text.Json;

internal static class ExceptionConsumersOracle
{
    private sealed class ObservedCalendar : GregorianCalendar
    {
        internal int? Millisecond;
        public override DateTime ToDateTime(int year, int month, int day, int hour, int minute, int second, int millisecond) {
            Millisecond = millisecond;
            return DateTime.MaxValue;
        }
    }

    internal static string Generate()
    {
        var rows = new List<object>();
        foreach (string? name in new string?[] { null, "#invalid!" }) {
            Exception? error = null;
            try { _ = new CultureInfo(name!); } catch (Exception value) { error = value; }
            rows.Add(new { source = "Supplemental.CultureInfoConstructor", operation = "culture", name,
                type = error?.GetType().Name, message = error?.Message, paramName = (error as ArgumentException)?.ParamName,
                invalidCultureName = (error as CultureNotFoundException)?.InvalidCultureName });
        }
        string[] overloads = { "millisecond", "calendar", "kind", "microsecond", "microsecond-kind", "calendar-kind", "microsecond-calendar", "microsecond-calendar-kind" };
        int[][] parts = {
            new[] { 2024, 2, 29, 12, 34, 56, 999, 0, 0 },
            new[] { 0, 0, 0, 99, 99, 99, -1, -1, -1 },
            new[] { 0, 1, 1, 0, 0, 0, 0, -1, 0 },
            new[] { 2024, 2, 29, 99, 0, 0, 0, -1, 0 },
            new[] { 2024, 2, 29, 0, 0, 0, 0, -1, -1 },
            new[] { 2024, 2, 29, 0, 0, 0, 0, -1, 0 },
        };
        foreach (string overload in overloads) foreach (int[] values in parts) foreach (string calendarMode in new[] { "gregorian", "null", "observed" }) {
            var observed = new ObservedCalendar();
            Calendar? calendar = calendarMode == "null" ? null : calendarMode == "observed" ? observed : new GregorianCalendar();
            DateTime? result = null;
            Exception? error = null;
            var kind = (DateTimeKind)values[8];
            try {
                result = overload switch {
                    "millisecond" => new DateTime(values[0], values[1], values[2], values[3], values[4], values[5], values[6]),
                    "calendar" => new DateTime(values[0], values[1], values[2], values[3], values[4], values[5], values[6], calendar!),
                    "kind" => new DateTime(values[0], values[1], values[2], values[3], values[4], values[5], values[6], kind),
                    "microsecond" => new DateTime(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7]),
                    "microsecond-kind" => new DateTime(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], kind),
                    "calendar-kind" => new DateTime(values[0], values[1], values[2], values[3], values[4], values[5], values[6], calendar!, kind),
                    "microsecond-calendar" => new DateTime(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], calendar!),
                    _ => new DateTime(values[0], values[1], values[2], values[3], values[4], values[5], values[6], values[7], calendar!, kind)
                };
            } catch (Exception value) { error = value; }
            rows.Add(new { source = "Supplemental.DateTimeConstructorValidation", operation = overload, values, calendarMode,
                type = error?.GetType().Name, message = error?.Message, paramName = (error as ArgumentException)?.ParamName,
                actualValue = (error as ArgumentOutOfRangeException)?.ActualValue, ticks = result?.Ticks.ToString(CultureInfo.InvariantCulture),
                kind = result == null ? (int?)null : (int)result.Value.Kind, delegatedMillisecond = observed.Millisecond });
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), rows }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
