// Observes actual System.DateOnly calls; no date calculations are reproduced here.
internal readonly struct ObservedDateOnly
{
    internal System.DateOnly Value { get; }
    private ObservedDateOnly(System.DateOnly value) => Value = value;
    private static T Observe<T>(string operation, object?[] arguments, Func<T> invoke) => (T)DateOnlyCoreOracle.Observe(operation, arguments, () => invoke())!;
    public ObservedDateOnly(int year, int month, int day) => Value = Observe("ctor", [year, month, day], () => new System.DateOnly(year, month, day));
    public static ObservedDateOnly MinValue => new(Observe("min", [], () => System.DateOnly.MinValue));
    public static ObservedDateOnly MaxValue => new(Observe("max", [], () => System.DateOnly.MaxValue));
    public static ObservedDateOnly FromDayNumber(int dayNumber) => new(Observe("fromDayNumber", [dayNumber], () => System.DateOnly.FromDayNumber(dayNumber)));
    public static ObservedDateOnly FromDateTime(DateTime dateTime) => new(Observe("fromDateTime", [dateTime], () => System.DateOnly.FromDateTime(dateTime)));
    private T Read<T>(string operation, Func<System.DateOnly, T> invoke) { var date = Value; return Observe(operation, [date], () => invoke(date)); }
    public int DayNumber => Read("dayNumber", date => date.DayNumber);
    public int Year => Read("year", date => date.Year);
    public int Month => Read("month", date => date.Month);
    public int Day => Read("day", date => date.Day);
    public int DayOfYear => Read("dayOfYear", date => date.DayOfYear);
    public DayOfWeek DayOfWeek => Read("dayOfWeek", date => date.DayOfWeek);
    public ObservedDateOnly AddDays(int value) { var date = Value; return new(Observe("addDays", [date, value], () => date.AddDays(value))); }
    public ObservedDateOnly AddMonths(int value) { var date = Value; return new(Observe("addMonths", [date, value], () => date.AddMonths(value))); }
    public ObservedDateOnly AddYears(int value) { var date = Value; return new(Observe("addYears", [date, value], () => date.AddYears(value))); }
    public DateTime ToDateTime(TimeOnly time) { var date = Value; return Observe("toDateTime", [date, time], () => date.ToDateTime(time)); }
    public DateTime ToDateTime(TimeOnly time, DateTimeKind kind) { var date = Value; return Observe("toDateTimeKind", [date, time, kind], () => date.ToDateTime(time, kind)); }
    public int CompareTo(ObservedDateOnly value) { var date = Value; return Observe("compareTo", [date, value], () => date.CompareTo(value.Value)); }
    public int CompareTo(object? value) { var date = Value; object? other = value is ObservedDateOnly observed ? observed.Value : value; return Observe("compareToObject", [date, other], () => date.CompareTo(other)); }
    public bool Equals(ObservedDateOnly value) { var date = Value; return Observe("equals", [date, value], () => date.Equals(value.Value)); }
    public override bool Equals(object? value) { var date = Value; object? other = value is ObservedDateOnly observed ? observed.Value : value; return Observe("equalsObject", [date, other], () => date.Equals(other)); }
    public override int GetHashCode() { var date = Value; return Observe("getHashCode", [date], () => date.GetHashCode()); }
    public void Deconstruct(out int year, out int month, out int day)
    {
        var date = Value;
        int[] parts = Observe("deconstruct", [date], () => { date.Deconstruct(out int y, out int m, out int d); return new[] { y, m, d }; });
        year = parts[0]; month = parts[1]; day = parts[2];
    }
    public static bool operator ==(ObservedDateOnly left, ObservedDateOnly right) => Observe("op_Equality", [left, right], () => left.Value == right.Value);
    public static bool operator !=(ObservedDateOnly left, ObservedDateOnly right) => Observe("op_Inequality", [left, right], () => left.Value != right.Value);
    public static bool operator <(ObservedDateOnly left, ObservedDateOnly right) => Observe("op_LessThan", [left, right], () => left.Value < right.Value);
    public static bool operator <=(ObservedDateOnly left, ObservedDateOnly right) => Observe("op_LessThanOrEqual", [left, right], () => left.Value <= right.Value);
    public static bool operator >(ObservedDateOnly left, ObservedDateOnly right) => Observe("op_GreaterThan", [left, right], () => left.Value > right.Value);
    public static bool operator >=(ObservedDateOnly left, ObservedDateOnly right) => Observe("op_GreaterThanOrEqual", [left, right], () => left.Value >= right.Value);
}
