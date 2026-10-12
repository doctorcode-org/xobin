using System.Reflection;
using System.Text.Json;

internal static class TimeOnlyCoreOracle
{
    internal static readonly DateTime Now = new DateTime(2024, 2, 29, 14, 35, 42, 987, 654).AddTicks(3);
    internal static readonly DateTime Today = Now.Date;
    private static List<object>? Checks;
    private static object Normalize(object? value) => value switch {
        ObservedTimeOnly time => new { kind = "time", value = (object?)time.Value.Ticks.ToString() },
        TimeOnly time => new { kind = "time", value = (object?)time.Ticks.ToString() },
        TimeSpan span => new { kind = "span", value = (object?)span.Ticks.ToString() },
        TimeOnlyWrapped wrapped => new { kind = "wrapped", value = (object?)new { ticks = wrapped.Time.Ticks.ToString(), wrappedDays = wrapped.WrappedDays } },
        DateTime date => new { kind = "dateTime", value = (object?)new { ticks = date.Ticks.ToString(), kind = (int)date.Kind } },
        long number => new { kind = "int64", value = (object?)number.ToString() },
        int number => new { kind = "number", value = (object?)number },
        double number => new { kind = "double", value = double.IsFinite(number) ? (object?)number : number.ToString(System.Globalization.CultureInfo.InvariantCulture) },
        bool flag => new { kind = "bool", value = (object?)flag },
        int[] parts => new { kind = "parts", value = (object?)parts },
        null => new { kind = "null", value = (object?)null },
        _ when value.GetType() == typeof(object) => new { kind = "object", value = (object?)null },
        _ => throw new InvalidOperationException("Unexpected TimeOnly input: " + value.GetType())
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
        foreach (MethodInfo method in typeof(TimeOnlyCoreTests).GetMethods(BindingFlags.Public | BindingFlags.Static)) {
            var inputs = new List<object[]>();
            if (method.IsDefined(typeof(FactAttribute))) inputs.Add([]);
            foreach (InlineDataAttribute attribute in method.GetCustomAttributes<InlineDataAttribute>()) inputs.Add(attribute.Data);
            foreach (object[] input in inputs) {
                Checks = new();
                try { method.Invoke(null, input); } catch (TargetInvocationException error) { throw new InvalidOperationException("Official TimeOnly test failed: " + method.Name, error.InnerException); }
                rows.Add(new { source = "TimeOnlyTests." + method.Name, input = input.Select(Normalize), checks = Checks });
                Checks = null;
            }
        }
        Checks = new();
        _ = new ObservedTimeOnly();
        foreach (long ticks in new[] { long.MinValue, -1L, 0L, 1L, 9L, 10L, 9999L, 10000L, 4294967296L, TimeOnly.MaxValue.Ticks, TimeSpan.TicksPerDay, long.MaxValue }) IgnoreRange(() => new ObservedTimeOnly(ticks));
        foreach (int length in new[] { 2, 3, 4, 5 }) foreach (int index in Enumerable.Range(0, length)) foreach (int value in new[] { int.MinValue, -1, 24, 60, 1000, int.MaxValue }) {
            int[] parts = new int[length]; parts[index] = value;
            IgnoreRange(() => { _ = length switch { 2 => new ObservedTimeOnly(parts[0], parts[1]), 3 => new ObservedTimeOnly(parts[0], parts[1], parts[2]), 4 => new ObservedTimeOnly(parts[0], parts[1], parts[2], parts[3]), _ => new ObservedTimeOnly(parts[0], parts[1], parts[2], parts[3], parts[4]) }; });
        }
        IgnoreRange(() => new ObservedTimeOnly(24, 60, 60, 1000, 1000));
        IgnoreRange(() => new ObservedTimeOnly(24, 60, 60, 0, 1000));
        rows.Add(new { source = "Supplemental.TimeOnly.Constructors", input = Array.Empty<object>(), checks = Checks }); Checks = null;
        foreach (long ticks in new[] { 0L, 1L, 9L, 10L, 4294967296L, 123456789101L, TimeOnly.MaxValue.Ticks }) {
            var time = new ObservedTimeOnly(ticks);
            Checks = new();
            _ = time.Ticks; _ = time.Hour; _ = time.Minute; _ = time.Second; _ = time.Millisecond; _ = time.Microsecond; _ = time.Nanosecond; _ = time.GetHashCode();
            time.Deconstruct(out _, out _); time.Deconstruct(out _, out _, out _); time.Deconstruct(out _, out _, out _, out _); time.Deconstruct(out _, out _, out _, out _, out _);
            _ = time.CompareTo(null); IgnoreRange(() => time.CompareTo(new object())); _ = time.Equals(null); _ = time.Equals(new object());
            foreach (long delta in new[] { long.MinValue, -9007199254740993L, -TimeSpan.TicksPerDay - 1L, -TimeSpan.TicksPerDay, -1L, 0L, 1L, TimeSpan.TicksPerDay - 1L, TimeSpan.TicksPerDay, 9007199254740993L, long.MaxValue }) {
                _ = time.Add(new TimeSpan(delta)); _ = time.Add(new TimeSpan(delta), out _);
            }
            foreach (double value in new[] { double.NegativeInfinity, -double.MaxValue, -9223372036854775808.0 / TimeSpan.TicksPerHour, -28.0, -0.0000000001, -0.0, 0.0000000001, 1.5, 9223372036854775808.0 / TimeSpan.TicksPerHour, double.MaxValue, double.PositiveInfinity, double.NaN }) {
                _ = time.AddHours(value); _ = time.AddHours(value, out _); _ = time.AddMinutes(value); _ = time.AddMinutes(value, out _);
            }
            _ = ObservedTimeOnly.FromTimeSpan(time.ToTimeSpan());
            foreach (long other in new[] { 0L, 1L, 9L, 123456789101L, TimeOnly.MaxValue.Ticks }) {
                var right = new ObservedTimeOnly(other); _ = time - right; _ = time.CompareTo(right); _ = time.Equals(right);
            }
            foreach (long start in new[] { 0L, 1L, ticks, TimeOnly.MaxValue.Ticks }) foreach (long end in new[] { 0L, 1L, ticks, TimeOnly.MaxValue.Ticks }) _ = time.IsBetween(new ObservedTimeOnly(start), new ObservedTimeOnly(end));
            rows.Add(new { source = "Supplemental.TimeOnly.Boundaries", input = new[] { Normalize(ticks) }, checks = Checks }); Checks = null;
        }
        Checks = new();
        foreach (long ticks in new[] { long.MinValue, -1L, TimeSpan.TicksPerDay, long.MaxValue }) IgnoreRange(() => ObservedTimeOnly.FromTimeSpan(new TimeSpan(ticks)));
        foreach (long ticks in new[] { 0L, 1L, 9L, 863999999999L, DateTime.MaxValue.Ticks }) foreach (DateTimeKind kind in new[] { DateTimeKind.Unspecified, DateTimeKind.Utc, DateTimeKind.Local }) _ = ObservedTimeOnly.FromDateTime(new DateTime(ticks, kind));
        rows.Add(new { source = "Supplemental.TimeOnly.Conversions", input = Array.Empty<object>(), checks = Checks }); Checks = null;
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", nowTicks = Now.Ticks.ToString(), rows }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
