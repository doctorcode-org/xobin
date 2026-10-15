using System.Globalization;
internal sealed class FormatObservedDateOnly(DateOnly value) : IFormattable, ISpanFormattable, IUtf8SpanFormattable {
 internal DateOnly Value => value;
 public static FormatObservedDateOnly FromDateTime(DateTime date) => new(DateOnly.FromDateTime(date));
public string ToString(IFormatProvider? provider) => TemporalFormatOracle.String("DateOnly", Value.DayNumber.ToString(CultureInfo.InvariantCulture), "provider", null, provider, () => Value.ToString(provider));
public string ToLongDateString() => TemporalFormatOracle.String("DateOnly", Value.DayNumber.ToString(CultureInfo.InvariantCulture), "long", null, null, () => Value.ToLongDateString());
public string ToShortDateString() => TemporalFormatOracle.String("DateOnly", Value.DayNumber.ToString(CultureInfo.InvariantCulture), "short", null, null, () => Value.ToShortDateString());
 public override string ToString() => TemporalFormatOracle.String("DateOnly", Value.DayNumber.ToString(CultureInfo.InvariantCulture), "default", null, null, () => Value.ToString());
 public string ToString(string? format) => TemporalFormatOracle.String("DateOnly", Value.DayNumber.ToString(CultureInfo.InvariantCulture), "format", format, null, () => Value.ToString(format));
 public string ToString(string? format, IFormatProvider? provider) => TemporalFormatOracle.String("DateOnly", Value.DayNumber.ToString(CultureInfo.InvariantCulture), "formatProvider", format, provider, () => Value.ToString(format, provider));
 public bool TryFormat(Span<char> destination, out int written, ReadOnlySpan<char> format = default, IFormatProvider? provider = null) => TemporalFormatOracle.Buffer("DateOnly", Value.DayNumber.ToString(CultureInfo.InvariantCulture), destination, out written, format, provider, Value.TryFormat);
 public bool TryFormat(Span<byte> destination, out int written, ReadOnlySpan<char> format = default, IFormatProvider? provider = null) => TemporalFormatOracle.Buffer("DateOnly", Value.DayNumber.ToString(CultureInfo.InvariantCulture), destination, out written, format, provider, Value.TryFormat);
}
internal sealed class FormatObservedTimeOnly(TimeOnly value) : IFormattable, ISpanFormattable, IUtf8SpanFormattable {
 internal TimeOnly Value => value;
 public FormatObservedTimeOnly(int hour, int minute, int second) : this(new TimeOnly(hour, minute, second)) {}
 public int Hour => Value.Hour; public int Minute => Value.Minute; public int Second => Value.Second;
 public static FormatObservedTimeOnly FromDateTime(DateTime date) => new(TimeOnly.FromDateTime(date));
public string ToString(IFormatProvider? provider) => TemporalFormatOracle.String("TimeOnly", Value.Ticks.ToString(CultureInfo.InvariantCulture), "provider", null, provider, () => Value.ToString(provider));
public string ToLongTimeString() => TemporalFormatOracle.String("TimeOnly", Value.Ticks.ToString(CultureInfo.InvariantCulture), "long", null, null, () => Value.ToLongTimeString());
public string ToShortTimeString() => TemporalFormatOracle.String("TimeOnly", Value.Ticks.ToString(CultureInfo.InvariantCulture), "short", null, null, () => Value.ToShortTimeString());
 public override string ToString() => TemporalFormatOracle.String("TimeOnly", Value.Ticks.ToString(CultureInfo.InvariantCulture), "default", null, null, () => Value.ToString());
 public string ToString(string? format) => TemporalFormatOracle.String("TimeOnly", Value.Ticks.ToString(CultureInfo.InvariantCulture), "format", format, null, () => Value.ToString(format));
 public string ToString(string? format, IFormatProvider? provider) => TemporalFormatOracle.String("TimeOnly", Value.Ticks.ToString(CultureInfo.InvariantCulture), "formatProvider", format, provider, () => Value.ToString(format, provider));
 public bool TryFormat(Span<char> destination, out int written, ReadOnlySpan<char> format = default, IFormatProvider? provider = null) => TemporalFormatOracle.Buffer("TimeOnly", Value.Ticks.ToString(CultureInfo.InvariantCulture), destination, out written, format, provider, Value.TryFormat);
 public bool TryFormat(Span<byte> destination, out int written, ReadOnlySpan<char> format = default, IFormatProvider? provider = null) => TemporalFormatOracle.Buffer("TimeOnly", Value.Ticks.ToString(CultureInfo.InvariantCulture), destination, out written, format, provider, Value.TryFormat);
}
internal sealed class FormatObservedTimeSpan(TimeSpan value) : IFormattable, ISpanFormattable, IUtf8SpanFormattable {
 internal TimeSpan Value => value;
 public FormatObservedTimeSpan() : this(TimeSpan.Zero) {}
public FormatObservedTimeSpan(long ticks) : this(new TimeSpan(ticks)) {}
public FormatObservedTimeSpan(int h, int m, int s) : this(new TimeSpan(h, m, s)) {}
public FormatObservedTimeSpan(int d, int h, int m, int s) : this(new TimeSpan(d, h, m, s)) {}
public FormatObservedTimeSpan(int d, int h, int m, int s, int ms) : this(new TimeSpan(d, h, m, s, ms)) {}
public static FormatObservedTimeSpan Zero => new(TimeSpan.Zero);
public static FormatObservedTimeSpan MinValue => new(TimeSpan.MinValue);
public static FormatObservedTimeSpan MaxValue => new(TimeSpan.MaxValue);
public static FormatObservedTimeSpan operator -(FormatObservedTimeSpan span) => new(-span.Value);
 public override string ToString() => TemporalFormatOracle.String("TimeSpan", Value.Ticks.ToString(CultureInfo.InvariantCulture), "default", null, null, () => Value.ToString());
 public string ToString(string? format) => TemporalFormatOracle.String("TimeSpan", Value.Ticks.ToString(CultureInfo.InvariantCulture), "format", format, null, () => Value.ToString(format));
 public string ToString(string? format, IFormatProvider? provider) => TemporalFormatOracle.String("TimeSpan", Value.Ticks.ToString(CultureInfo.InvariantCulture), "formatProvider", format, provider, () => Value.ToString(format, provider));
 public bool TryFormat(Span<char> destination, out int written, ReadOnlySpan<char> format = default, IFormatProvider? provider = null) => TemporalFormatOracle.Buffer("TimeSpan", Value.Ticks.ToString(CultureInfo.InvariantCulture), destination, out written, format, provider, Value.TryFormat);
 public bool TryFormat(Span<byte> destination, out int written, ReadOnlySpan<char> format = default, IFormatProvider? provider = null) => TemporalFormatOracle.Buffer("TimeSpan", Value.Ticks.ToString(CultureInfo.InvariantCulture), destination, out written, format, provider, Value.TryFormat);
}
