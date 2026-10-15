// Observes actual System.TimeOnly calls; no time calculations are reproduced here.
internal readonly struct ObservedTimeOnly
{
    internal System.TimeOnly Value { get; }
    private ObservedTimeOnly(System.TimeOnly value) => Value = value;
    private static T Observe<T>(string operation, object?[] arguments, Func<T> invoke) => (T)TimeOnlyCoreOracle.Observe(operation, arguments, () => invoke())!;
    public ObservedTimeOnly() => Value = Observe("default", [], () => new System.TimeOnly());
    public ObservedTimeOnly(long ticks) => Value = Observe("ticks", [ticks], () => new System.TimeOnly(ticks));
    public ObservedTimeOnly(int hour, int minute) => Value = Observe("ctor", [hour, minute], () => new System.TimeOnly(hour, minute));
    public ObservedTimeOnly(int hour, int minute, int second) => Value = Observe("ctor", [hour, minute, second], () => new System.TimeOnly(hour, minute, second));
    public ObservedTimeOnly(int hour, int minute, int second, int millisecond) => Value = Observe("ctor", [hour, minute, second, millisecond], () => new System.TimeOnly(hour, minute, second, millisecond));
    public ObservedTimeOnly(int hour, int minute, int second, int millisecond, int microsecond) => Value = Observe("ctor", [hour, minute, second, millisecond, microsecond], () => new System.TimeOnly(hour, minute, second, millisecond, microsecond));
    public static ObservedTimeOnly MinValue => new(Observe("min", [], () => System.TimeOnly.MinValue));
    public static ObservedTimeOnly MaxValue => new(Observe("max", [], () => System.TimeOnly.MaxValue));
    public static ObservedTimeOnly FromDateTime(DateTime dateTime) => new(Observe("fromDateTime", [dateTime], () => System.TimeOnly.FromDateTime(dateTime)));
    public static ObservedTimeOnly FromTimeSpan(TimeSpan value) => new(Observe("fromTimeSpan", [value], () => System.TimeOnly.FromTimeSpan(value)));
    private T Read<T>(string operation, Func<System.TimeOnly, T> invoke) { var time = Value; return Observe(operation, [time], () => invoke(time)); }
    public long Ticks => Read("getTicks", time => time.Ticks);
    public int Hour => Read("hour", time => time.Hour);
    public int Minute => Read("minute", time => time.Minute);
    public int Second => Read("second", time => time.Second);
    public int Millisecond => Read("millisecond", time => time.Millisecond);
    public int Microsecond => Read("microsecond", time => time.Microsecond);
    public int Nanosecond => Read("nanosecond", time => time.Nanosecond);
    public ObservedTimeOnly Add(TimeSpan value) { var time = Value; return new(Observe("add", [time, value], () => time.Add(value))); }
    public ObservedTimeOnly AddHours(double value) { var time = Value; return new(Observe("addHours", [time, value], () => time.AddHours(value))); }
    public ObservedTimeOnly AddMinutes(double value) { var time = Value; return new(Observe("addMinutes", [time, value], () => time.AddMinutes(value))); }
    public ObservedTimeOnly Add(TimeSpan value, out int wrappedDays)
    {
        var time = Value;
        var result = Observe("addWrapped", [time, value], () => { var sum = time.Add(value, out int days); return new TimeOnlyWrapped(sum, days); });
        wrappedDays = result.WrappedDays; return new(result.Time);
    }
    public ObservedTimeOnly AddHours(double value, out int wrappedDays)
    {
        var time = Value;
        var result = Observe("addHoursWrapped", [time, value], () => { var sum = time.AddHours(value, out int days); return new TimeOnlyWrapped(sum, days); });
        wrappedDays = result.WrappedDays; return new(result.Time);
    }
    public ObservedTimeOnly AddMinutes(double value, out int wrappedDays)
    {
        var time = Value;
        var result = Observe("addMinutesWrapped", [time, value], () => { var sum = time.AddMinutes(value, out int days); return new TimeOnlyWrapped(sum, days); });
        wrappedDays = result.WrappedDays; return new(result.Time);
    }
    public bool IsBetween(ObservedTimeOnly start, ObservedTimeOnly end) { var time = Value; return Observe("isBetween", [time, start, end], () => time.IsBetween(start.Value, end.Value)); }
    public TimeSpan ToTimeSpan() => Read("toTimeSpan", time => time.ToTimeSpan());
    public int CompareTo(ObservedTimeOnly value) { var time = Value; return Observe("compareTo", [time, value], () => time.CompareTo(value.Value)); }
    public int CompareTo(object? value) { var time = Value; object? other = value is ObservedTimeOnly observed ? observed.Value : value; return Observe("compareToObject", [time, other], () => time.CompareTo(other)); }
    public bool Equals(ObservedTimeOnly value) { var time = Value; return Observe("equals", [time, value], () => time.Equals(value.Value)); }
    public override bool Equals(object? value) { var time = Value; object? other = value is ObservedTimeOnly observed ? observed.Value : value; return Observe("equalsObject", [time, other], () => time.Equals(other)); }
    public override int GetHashCode() => Read("getHashCode", time => time.GetHashCode());
    private int[] Parts(int length) => Read<int[]>("deconstruct" + length, time => {
        switch (length) {
            case 2: time.Deconstruct(out int h2, out int m2); return [h2, m2];
            case 3: time.Deconstruct(out int h3, out int m3, out int s3); return [h3, m3, s3];
            case 4: time.Deconstruct(out int h4, out int m4, out int s4, out int ms4); return [h4, m4, s4, ms4];
            default: time.Deconstruct(out int h5, out int m5, out int s5, out int ms5, out int us5); return [h5, m5, s5, ms5, us5];
        }
    });
    public void Deconstruct(out int hour, out int minute) { var parts = Parts(2); hour = parts[0]; minute = parts[1]; }
    public void Deconstruct(out int hour, out int minute, out int second) { var parts = Parts(3); hour = parts[0]; minute = parts[1]; second = parts[2]; }
    public void Deconstruct(out int hour, out int minute, out int second, out int millisecond) { var parts = Parts(4); hour = parts[0]; minute = parts[1]; second = parts[2]; millisecond = parts[3]; }
    public void Deconstruct(out int hour, out int minute, out int second, out int millisecond, out int microsecond) { var parts = Parts(5); hour = parts[0]; minute = parts[1]; second = parts[2]; millisecond = parts[3]; microsecond = parts[4]; }
    public static bool operator ==(ObservedTimeOnly left, ObservedTimeOnly right) => Observe("op_Equality", [left, right], () => left.Value == right.Value);
    public static bool operator !=(ObservedTimeOnly left, ObservedTimeOnly right) => Observe("op_Inequality", [left, right], () => left.Value != right.Value);
    public static bool operator <(ObservedTimeOnly left, ObservedTimeOnly right) => Observe("op_LessThan", [left, right], () => left.Value < right.Value);
    public static bool operator <=(ObservedTimeOnly left, ObservedTimeOnly right) => Observe("op_LessThanOrEqual", [left, right], () => left.Value <= right.Value);
    public static bool operator >(ObservedTimeOnly left, ObservedTimeOnly right) => Observe("op_GreaterThan", [left, right], () => left.Value > right.Value);
    public static bool operator >=(ObservedTimeOnly left, ObservedTimeOnly right) => Observe("op_GreaterThanOrEqual", [left, right], () => left.Value >= right.Value);
    public static TimeSpan operator -(ObservedTimeOnly left, ObservedTimeOnly right) => Observe("subtract", [left, right], () => left.Value - right.Value);
}
internal sealed record TimeOnlyWrapped(System.TimeOnly Time, int WrappedDays);
