using System.Reflection;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

internal static class DateOnlyCoreOracle
{
    // The official tests read Today. Supply a fixed leap day for reproducible fixtures.
    internal static readonly DateTime Today = new(2024, 2, 29);
    private static List<object>? Checks;
    private static object Normalize(object? value) => value switch {
        ObservedDateOnly date => new { kind = "date", value = (object?)date.Value.DayNumber },
        DateOnly date => new { kind = "date", value = (object?)date.DayNumber },
        DateTime date => new { kind = "dateTime", value = (object?)new { ticks = date.Ticks.ToString(), kind = (int)date.Kind } },
        TimeOnly time => new { kind = "time", value = (object?)time.Ticks.ToString() },
        int number => new { kind = "number", value = (object?)number },
        DayOfWeek day => new { kind = "number", value = (object?)(int)day },
        DateTimeKind kind => new { kind = "kind", value = (object?)(int)kind },
        bool flag => new { kind = "bool", value = (object?)flag },
        int[] parts => new { kind = "parts", value = (object?)parts },
        null => new { kind = "null", value = (object?)null },
        _ when value.GetType() == typeof(object) => new { kind = "object", value = (object?)null },
        _ => throw new InvalidOperationException("Unexpected DateOnly input: " + value.GetType())
    };
    internal static object? Observe(string operation, object?[] arguments, Func<object?> invoke)
    {
        if (Checks is null) return invoke();
        try {
            object? result = invoke();
            Checks.Add(new { operation, arguments = arguments.Select(Normalize), result = Normalize(result), error = (string?)null });
            return result;
        } catch (ArgumentException error) {
            Checks.Add(new { operation, arguments = arguments.Select(Normalize), result = (object?)null, error = error.GetType().Name, message = error.Message, paramName = error.ParamName, actualValue = (error as ArgumentOutOfRangeException)?.ActualValue });
            throw;
        }
    }
    private static void IgnoreRange(Action invoke) { try { invoke(); } catch (ArgumentException) { } }
    internal static string Generate()
    {
        var rows = new List<object>();
        foreach (MethodInfo method in typeof(DateOnlyCoreTests).GetMethods(BindingFlags.Public | BindingFlags.Static)) {
            var inputs = new List<object[]>();
            if (method.IsDefined(typeof(FactAttribute))) inputs.Add([]);
            foreach (InlineDataAttribute attribute in method.GetCustomAttributes<InlineDataAttribute>()) inputs.Add(attribute.Data);
            foreach (object[] input in inputs) {
                Checks = new();
                try { method.Invoke(null, input); } catch (TargetInvocationException error) { throw new InvalidOperationException("Official DateOnly test failed: " + method.Name, error.InnerException); }
                rows.Add(new { source = "DateOnlyTests." + method.Name, input = input.Select(Normalize), checks = Checks });
                Checks = null;
            }
        }
        foreach (int day in new[] { 0, 1, 58, 59, 365, 730178, 146096, 146097, 3652057, 3652058 }) {
            var date = ObservedDateOnly.FromDayNumber(day);
            Checks = new();
            _ = date.Year; _ = date.Month; _ = date.Day; _ = date.DayOfWeek; _ = date.DayOfYear; _ = date.GetHashCode();
            date.Deconstruct(out _, out _, out _);
            foreach (int value in new[] { int.MinValue, -120001, -10001, -366, -1, 0, 1, 366, 10001, 120001, int.MaxValue }) {
                IgnoreRange(() => date.AddDays(value));
                IgnoreRange(() => date.AddMonths(value));
                IgnoreRange(() => date.AddYears(value));
            }
            foreach (long ticks in new[] { 0L, 1L, 9L, 123456789L, TimeOnly.MaxValue.Ticks }) {
                var time = new TimeOnly(ticks);
                _ = date.ToDateTime(time);
                foreach (int kind in new[] { -1, 0, 1, 2, 3, int.MinValue, int.MaxValue }) IgnoreRange(() => date.ToDateTime(time, (DateTimeKind)kind));
            }
            rows.Add(new { source = "Supplemental.DateOnly.Boundaries", input = new[] { Normalize(day) }, checks = Checks });
            Checks = null;
        }
        Checks = new();
        foreach (int day in new[] { int.MinValue, -1, 3652059, int.MaxValue }) IgnoreRange(() => ObservedDateOnly.FromDayNumber(day));
        foreach (long ticks in new[] { 0L, 1L, 863999999999L, DateTime.MaxValue.Ticks }) foreach (DateTimeKind kind in new[] { DateTimeKind.Unspecified, DateTimeKind.Utc, DateTimeKind.Local })
            _ = ObservedDateOnly.FromDateTime(new DateTime(ticks, kind));
        rows.Add(new { source = "Supplemental.DateOnly.Conversions", input = Array.Empty<object>(), checks = Checks });
        Checks = null;
        var cycle = new StringBuilder();
        for (int day = 0; day < 146097; day++) {
            var date = DateOnly.FromDayNumber(day);
            cycle.Append($"{date.Year},{date.Month},{date.Day},{(int)date.DayOfWeek},{date.DayOfYear}\n");
        }
        string cycleHash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(cycle.ToString()))).ToLowerInvariant();
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", today = Today.ToString("yyyy-MM-dd"), cycleDays = 146097, cycleHash, rows }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
