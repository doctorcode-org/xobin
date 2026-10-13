using System.Globalization;
using System.Reflection;
using System.Text.Json;

internal static class TemporalFormatOracle
{
    internal static readonly DateTime Now = new DateTime(2024, 2, 29, 14, 35, 42, 987, 654).AddTicks(3);
    internal static List<object>? Checks;
    internal static object Error(Exception error) => new {
        type = error.GetType().Name, message = error.Message,
        paramName = (error as ArgumentException)?.ParamName,
        actualValue = (error as ArgumentOutOfRangeException)?.ActualValue
    };
    internal static string String(string type, string value, string operation, string? format, IFormatProvider? provider, Func<string> invoke) {
        try {
            string result = invoke();
            Checks?.Add(new { type, value, operation, format, provider = Provider(provider), result });
            return result;
        } catch (Exception error) {
            Checks?.Add(new { type, value, operation, format, provider = Provider(provider), error = Error(error) });
            throw;
        }
    }
    internal static string Provider(IFormatProvider? provider) => provider switch {
        CultureInfo culture => culture.Name,
        DateTimeFormatInfo info => info == CultureInfo.InvariantCulture.DateTimeFormat ? "" : "fr-FR:dtfi",
        null => "current",
        _ => "fallback"
    };
    // Lossless compact snapshots retain every code unit, including isolated UTF-16 surrogates.
    private static string Snapshot(Span<char> buffer) {
        int end = buffer.Length;
        int tail = end == 0 ? 0 : buffer[end - 1];
        while (end > 0 && buffer[end - 1] == tail) end--;
        return buffer.Length + ":" + tail + ":" + Convert.ToBase64String(System.Runtime.InteropServices.MemoryMarshal.AsBytes(buffer.Slice(0, end)));
    }
    private static string Snapshot(Span<byte> buffer) {
        int end = buffer.Length;
        int tail = end == 0 ? 0 : buffer[end - 1];
        while (end > 0 && buffer[end - 1] == tail) end--;
        return buffer.Length + ":" + tail + ":" + Convert.ToBase64String(buffer.Slice(0, end));
    }
    internal delegate bool CharFormat(Span<char> destination, out int written, ReadOnlySpan<char> format, IFormatProvider? provider);
    internal delegate bool ByteFormat(Span<byte> destination, out int written, ReadOnlySpan<char> format, IFormatProvider? provider);
    internal static bool Buffer(string type, string value, Span<char> destination, out int written, ReadOnlySpan<char> format, IFormatProvider? provider, CharFormat invoke) {
        string initial = Snapshot(destination);
        try {
            bool result = invoke(destination, out written, format, provider);
            Checks?.Add(new { type, value, operation = "tryFormat", format = format.ToString(), provider = Provider(provider), encoding = "utf16", initial, result, written, buffer = Snapshot(destination) });
            return result;
        } catch (Exception error) {
            Checks?.Add(new { type, value, operation = "tryFormat", format = format.ToString(), provider = Provider(provider), encoding = "utf16", initial, error = Error(error) });
            throw;
        }
    }
    internal static bool Buffer(string type, string value, Span<byte> destination, out int written, ReadOnlySpan<char> format, IFormatProvider? provider, ByteFormat invoke) {
        string initial = Snapshot(destination);
        try {
            bool result = invoke(destination, out written, format, provider);
            Checks?.Add(new { type, value, operation = "tryFormat", format = format.ToString(), provider = Provider(provider), encoding = "utf8", initial, result, written, buffer = Snapshot(destination) });
            return result;
        } catch (Exception error) {
            Checks?.Add(new { type, value, operation = "tryFormat", format = format.ToString(), provider = Provider(provider), encoding = "utf8", initial, error = Error(error) });
            throw;
        }
    }
    private static void Ignore(Action action) { try { action(); } catch (FormatException) {} catch (ArgumentOutOfRangeException) {} }
    internal static string Generate() {
        var rows = new List<object>();
        foreach ((string type, Type tests) in new[] { ("DateOnly", typeof(DateOnlyFormatReferenceTests)), ("TimeOnly", typeof(TimeOnlyFormatReferenceTests)), ("TimeSpan", typeof(TimeSpanFormatReferenceTests)) }) {
            foreach (var method in tests.GetMethods(BindingFlags.Public | BindingFlags.Static).Where(m => m.GetCustomAttribute<FactAttribute>() != null || m.GetCustomAttribute<TheoryAttribute>() != null || m.Name.EndsWith("_FormattingPortion", StringComparison.Ordinal))) {
                IEnumerable<object[]> inputs = new[] { Array.Empty<object>() };
                var data = method.GetCustomAttribute<MemberDataAttribute>();
                if (data != null) inputs = (IEnumerable<object[]>)tests.GetMethod(data.Name)!.Invoke(null, null)!;
                foreach (var input in inputs) {
                    Checks = new();
                    try { method.Invoke(null, input); }
                    catch (TargetInvocationException error) { throw new InvalidOperationException("Official format test failed: " + type + "." + method.Name, error.InnerException); }
                    rows.Add(new { source = (method.Name.EndsWith("_FormattingPortion", StringComparison.Ordinal) ? "FormattingPortion." : "") + type + "Tests." + method.Name, checks = Checks });
                    Checks = null;
                }
            }
        }
        string[] dateFormats = { "", "d", "D", "m", "M", "y", "Y", "o", "O", "r", "R", "yyyy-MM-dd", "ddd, dd MMM yyyy", "%d", "%M", "%y", "yyyy'💠日ت'", "y'\\'d'", "hh-ss", "u", "K", "%K", "\\", "'", "\"", "yyyy'abc", "yyyy:MM", "%%", "%", "%\\", "yyyy \\h", "yyyy 'h:m:s'", "yyyy'\\'H'", "yyyy\\", "yyyy'foo\\" };
        string[] timeFormats = { "", "t", "T", "o", "O", "r", "R", "HH:mm:ss.fffffff", "HH:mm:ss.FFFFFFF", "h:m:s tt", "%H", "%s", "HH'💠日ت'", "HH:mm:ss K", "HH:mm:ss k", "HH:mm:ss z", "dd-yyyy", "u", "HH/mm", "\\", "'", "HH'abc", "HH'\\'d'", "%%", "%", "%\\", "HH \\d", "HH 'dd/yyyy'", "HH\\", "HH'foo\\" };
        foreach (DateOnly date in new[] { DateOnly.MinValue, new DateOnly(2024, 2, 29), DateOnly.MaxValue }) {
            Checks = new();
            var observed = new FormatObservedDateOnly(date);
            foreach (string format in dateFormats.Concat(Enumerable.Range(32, 95).Select(code => ((char)code).ToString())).Concat(new[] { "yyyy'日ت'", "yyyy\\日", "yyyy'\\ت'" })) Test(observed, format, null);
            _ = observed.ToLongDateString(); _ = observed.ToShortDateString(); _ = observed.ToString(CultureInfo.InvariantCulture);
            rows.Add(new { source = "Supplemental.DateOnly.Formats", checks = Checks }); Checks = null;
        }
        foreach (long ticks in new[] { 0L, 1L, 1000000L, 1000001L, 123456789101L, TimeOnly.MaxValue.Ticks }) {
            Checks = new();
            var observed = new FormatObservedTimeOnly(new TimeOnly(ticks));
            foreach (string format in timeFormats.Concat(Enumerable.Range(32, 95).Select(code => ((char)code).ToString())).Concat(new[] { "HH'日ت'", "HH\\日", "HH'\\ت'", "gg", "HH:mm:ss.F", "HH:mm:ss.ffffffff" })) Test(observed, format, null);
            _ = observed.ToLongTimeString(); _ = observed.ToShortTimeString(); _ = observed.ToString(CultureInfo.InvariantCulture);
            rows.Add(new { source = "Supplemental.TimeOnly.Formats", checks = Checks }); Checks = null;
        }
        string[] spanFormats = { "", "c", "t", "T", "g", "G", "C", "%d", "dddddddd", "ddddddddd", "%h", "hhh", "mm", "mmm", "ss", "sss", "f", "ff", "fffffff", "ffffffff", "F", "FF", "FFFFFFF", "FFFFFFFF", "hh\\:mm\\:ss\\.FFFFFFF", "hh':'mm':'ss'.'FFFFFFF", "d'💠日ت'", "'-'d", "hh:mm:ss", "hh.mm", "y", "%%", "%", "%\\", "\\", "'", "hh'abc", "hh'foo\\", "hh'\\'mm'", "hh'\\'d'", "%f", "%F" };
        foreach (long ticks in new[] { long.MinValue, long.MaxValue, -1L, 0L, 1L, 1000000L, 1000001L, 123456789101112L }) {
            Checks = new();
            var observed = new FormatObservedTimeSpan(new TimeSpan(ticks));
            foreach (string format in spanFormats.Concat(Enumerable.Range(32, 95).Select(code => ((char)code).ToString())).Concat(new[] { "hh'日ت'", "hh\\日", "hh'\\ت'" })) Test(observed, format, null);
            rows.Add(new { source = "Supplemental.TimeSpan.Formats", checks = Checks }); Checks = null;
        }
        foreach (CultureInfo original in CultureInfo.GetCultures(CultureTypes.AllCultures).OrderBy(c => c.Name, StringComparer.Ordinal)) {
            CultureInfo culture = (CultureInfo)original.Clone();
            Checks = new();
            foreach (string format in new[] { "d", "D", "m", "y", "o", "r", "dd MMMM yyyy" }) Test(new FormatObservedDateOnly(new DateOnly(2024, 2, 29)), format, culture);
            foreach (string format in new[] { "t", "T", "o", "r", "HH:mm:ss.fffffff tt" }) Test(new FormatObservedTimeOnly(TimeOnly.FromDateTime(Now)), format, culture);
            culture.NumberFormat.NumberDecimalSeparator = "invented";
            culture.NumberFormat.NegativeSign = "invented";
            foreach (string format in new[] { "c", "g", "G", "hh\\:mm\\:ss\\.fffffff" }) Test(new FormatObservedTimeSpan(new TimeSpan(-123456789101112L)), format, culture);
            rows.Add(new { source = "Supplemental.Cultures." + culture.Name, checks = Checks }); Checks = null;
        }
        foreach (string name in new[] { "en-US", "fr-FR", "fa-IR", "ar-SA", "th-TH", "ja-JP" }) {
            CultureInfo.CurrentCulture = new CultureInfo(name, useUserOverride: false);
            Checks = new();
            var date = new FormatObservedDateOnly(DateOnly.FromDateTime(Now));
            var time = new FormatObservedTimeOnly(TimeOnly.FromDateTime(Now));
            _ = date.ToString(); _ = date.ToString((IFormatProvider?)null); _ = date.ToLongDateString(); _ = date.ToShortDateString();
            _ = time.ToString(); _ = time.ToString((IFormatProvider?)null); _ = time.ToLongTimeString(); _ = time.ToShortTimeString();
            Test(date, "d", null); Test(time, "t", null);
            Test(new FormatObservedTimeSpan(new TimeSpan(-123456789101112L)), "g", null);
            rows.Add(new { source = "Supplemental.CurrentCulture." + name, currentCulture = name, checks = Checks }); Checks = null;
        }
        CultureInfo.CurrentCulture = CultureInfo.InvariantCulture;
        Checks = new();
        var dtfi = (DateTimeFormatInfo)new CultureInfo("fr-FR").DateTimeFormat.Clone();
        dtfi.TimeSeparator = "changed";
        foreach (var provider in new IFormatProvider[] { dtfi, DateTimeFormatInfo.ReadOnly(dtfi), new FormatFallbackProvider() }) {
            Test(new FormatObservedTimeSpan(new TimeSpan(123456789101112L)), "g", provider);
            Test(new FormatObservedTimeSpan(new TimeSpan(123456789101112L)), "G", provider);
        }
        rows.Add(new { source = "Supplemental.Providers", checks = Checks }); Checks = null;
        return "{\n  \"runtime\": \"" + Environment.Version + "\",\n  \"sourceTag\": \"v10.0.7\",\n  \"rows\": [\n" + string.Join(",\n", rows.Select(row => "    " + JsonSerializer.Serialize(row))) + "\n  ]\n}\n";
    }
    private static void Test<T>(T value, string format, IFormatProvider? provider) where T : IFormattable, IUtf8SpanFormattable, ISpanFormattable {
        Ignore(() => value.ToString(format, provider));
        // Unicode literals, exact/short capacities, and nonzero sentinels are verified for both encodings.
        foreach (int capacity in provider is CultureInfo ? new[] { 3, 80 } : new[] { 0, 3, 80 }) {
            Ignore(() => { char[] buffer = Enumerable.Repeat('~', capacity).ToArray(); value.TryFormat(buffer, out _, format, provider); });
            Ignore(() => { byte[] buffer = Enumerable.Repeat((byte)126, capacity).ToArray(); value.TryFormat(buffer, out _, format, provider); });
        }
    }
}
internal sealed class FormatFallbackProvider : IFormatProvider { public object? GetFormat(Type? type) => null; }
