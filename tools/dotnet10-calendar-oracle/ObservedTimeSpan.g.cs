// Derived from the official .NET 10.0.7 TimeSpan API.
// Licensed to the .NET Foundation under the MIT license.
#nullable enable
using RealTimeSpan = System.TimeSpan;
internal readonly struct ObservedTimeSpan : IComparable {
    internal readonly RealTimeSpan Value;
    private ObservedTimeSpan(RealTimeSpan value) { Value=value; }
    private static ObservedTimeSpan Wrap(string operation, object?[] args, Func<RealTimeSpan> invoke) => new((RealTimeSpan)TimeSpanArithmeticOracle.Observe(operation,args,()=>invoke())!);
public ObservedTimeSpan() { Value=(RealTimeSpan)TimeSpanArithmeticOracle.Observe("ctor",[],()=>new RealTimeSpan())!; }
public ObservedTimeSpan(long ticks) { Value=(RealTimeSpan)TimeSpanArithmeticOracle.Observe("ctor",[ticks],()=>new RealTimeSpan(ticks))!; }
public ObservedTimeSpan(int hours, int minutes, int seconds) { Value=(RealTimeSpan)TimeSpanArithmeticOracle.Observe("ctor",[hours,minutes,seconds],()=>new RealTimeSpan(hours,minutes,seconds))!; }
public ObservedTimeSpan(int days, int hours, int minutes, int seconds) { Value=(RealTimeSpan)TimeSpanArithmeticOracle.Observe("ctor",[days,hours,minutes,seconds],()=>new RealTimeSpan(days,hours,minutes,seconds))!; }
public ObservedTimeSpan(int days, int hours, int minutes, int seconds, int milliseconds) { Value=(RealTimeSpan)TimeSpanArithmeticOracle.Observe("ctor",[days,hours,minutes,seconds,milliseconds],()=>new RealTimeSpan(days,hours,minutes,seconds,milliseconds))!; }
public ObservedTimeSpan(int days, int hours, int minutes, int seconds, int milliseconds, int microseconds) { Value=(RealTimeSpan)TimeSpanArithmeticOracle.Observe("ctor",[days,hours,minutes,seconds,milliseconds,microseconds],()=>new RealTimeSpan(days,hours,minutes,seconds,milliseconds,microseconds))!; }
public static ObservedTimeSpan MaxValue => Wrap("MaxValue",[],()=>RealTimeSpan.MaxValue);
public static ObservedTimeSpan MinValue => Wrap("MinValue",[],()=>RealTimeSpan.MinValue);
public static ObservedTimeSpan Zero => Wrap("Zero",[],()=>RealTimeSpan.Zero);
public const long NanosecondsPerTick = RealTimeSpan.NanosecondsPerTick;
public const long TicksPerMicrosecond = RealTimeSpan.TicksPerMicrosecond;
public const long TicksPerMillisecond = RealTimeSpan.TicksPerMillisecond;
public const long TicksPerSecond = RealTimeSpan.TicksPerSecond;
public const long TicksPerMinute = RealTimeSpan.TicksPerMinute;
public const long TicksPerHour = RealTimeSpan.TicksPerHour;
public const long TicksPerDay = RealTimeSpan.TicksPerDay;
public const long MicrosecondsPerMillisecond = RealTimeSpan.MicrosecondsPerMillisecond;
public const long MicrosecondsPerSecond = RealTimeSpan.MicrosecondsPerSecond;
public const long MicrosecondsPerMinute = RealTimeSpan.MicrosecondsPerMinute;
public const long MicrosecondsPerHour = RealTimeSpan.MicrosecondsPerHour;
public const long MicrosecondsPerDay = RealTimeSpan.MicrosecondsPerDay;
public const long MillisecondsPerSecond = RealTimeSpan.MillisecondsPerSecond;
public const long MillisecondsPerMinute = RealTimeSpan.MillisecondsPerMinute;
public const long MillisecondsPerHour = RealTimeSpan.MillisecondsPerHour;
public const long MillisecondsPerDay = RealTimeSpan.MillisecondsPerDay;
public const long SecondsPerMinute = RealTimeSpan.SecondsPerMinute;
public const long SecondsPerHour = RealTimeSpan.SecondsPerHour;
public const long SecondsPerDay = RealTimeSpan.SecondsPerDay;
public const long MinutesPerHour = RealTimeSpan.MinutesPerHour;
public const long MinutesPerDay = RealTimeSpan.MinutesPerDay;
public const int HoursPerDay = RealTimeSpan.HoursPerDay;
public long Ticks { get { var self=this;return (long)TimeSpanArithmeticOracle.Observe("Ticks",[self],()=>self.Value.Ticks)!; } }
public int Days { get { var self=this;return (int)TimeSpanArithmeticOracle.Observe("Days",[self],()=>self.Value.Days)!; } }
public int Hours { get { var self=this;return (int)TimeSpanArithmeticOracle.Observe("Hours",[self],()=>self.Value.Hours)!; } }
public int Minutes { get { var self=this;return (int)TimeSpanArithmeticOracle.Observe("Minutes",[self],()=>self.Value.Minutes)!; } }
public int Seconds { get { var self=this;return (int)TimeSpanArithmeticOracle.Observe("Seconds",[self],()=>self.Value.Seconds)!; } }
public int Milliseconds { get { var self=this;return (int)TimeSpanArithmeticOracle.Observe("Milliseconds",[self],()=>self.Value.Milliseconds)!; } }
public int Microseconds { get { var self=this;return (int)TimeSpanArithmeticOracle.Observe("Microseconds",[self],()=>self.Value.Microseconds)!; } }
public int Nanoseconds { get { var self=this;return (int)TimeSpanArithmeticOracle.Observe("Nanoseconds",[self],()=>self.Value.Nanoseconds)!; } }
public double TotalDays { get { var self=this;return (double)TimeSpanArithmeticOracle.Observe("TotalDays",[self],()=>self.Value.TotalDays)!; } }
public double TotalHours { get { var self=this;return (double)TimeSpanArithmeticOracle.Observe("TotalHours",[self],()=>self.Value.TotalHours)!; } }
public double TotalMinutes { get { var self=this;return (double)TimeSpanArithmeticOracle.Observe("TotalMinutes",[self],()=>self.Value.TotalMinutes)!; } }
public double TotalSeconds { get { var self=this;return (double)TimeSpanArithmeticOracle.Observe("TotalSeconds",[self],()=>self.Value.TotalSeconds)!; } }
public double TotalMilliseconds { get { var self=this;return (double)TimeSpanArithmeticOracle.Observe("TotalMilliseconds",[self],()=>self.Value.TotalMilliseconds)!; } }
public double TotalMicroseconds { get { var self=this;return (double)TimeSpanArithmeticOracle.Observe("TotalMicroseconds",[self],()=>self.Value.TotalMicroseconds)!; } }
public double TotalNanoseconds { get { var self=this;return (double)TimeSpanArithmeticOracle.Observe("TotalNanoseconds",[self],()=>self.Value.TotalNanoseconds)!; } }
public static ObservedTimeSpan FromDays(double value) => Wrap("FromDays:D",[value],()=>RealTimeSpan.FromDays(value));
public static ObservedTimeSpan FromDays(int days) => Wrap("FromDays:I",[days],()=>RealTimeSpan.FromDays(days));
public static ObservedTimeSpan FromDays(int days, int hours = 0, long minutes = 0, long seconds = 0, long milliseconds = 0, long microseconds = 0) => Wrap("FromDays:I",[days,hours,minutes,seconds,milliseconds,microseconds],()=>RealTimeSpan.FromDays(days,hours,minutes,seconds,milliseconds,microseconds));
public static ObservedTimeSpan FromHours(int hours) => Wrap("FromHours:I",[hours],()=>RealTimeSpan.FromHours(hours));
public static ObservedTimeSpan FromHours(int hours, long minutes = 0, long seconds = 0, long milliseconds = 0, long microseconds = 0) => Wrap("FromHours:I",[hours,minutes,seconds,milliseconds,microseconds],()=>RealTimeSpan.FromHours(hours,minutes,seconds,milliseconds,microseconds));
public static ObservedTimeSpan FromMinutes(long minutes) => Wrap("FromMinutes:I",[minutes],()=>RealTimeSpan.FromMinutes(minutes));
public static ObservedTimeSpan FromMinutes(long minutes, long seconds = 0, long milliseconds = 0, long microseconds = 0) => Wrap("FromMinutes:I",[minutes,seconds,milliseconds,microseconds],()=>RealTimeSpan.FromMinutes(minutes,seconds,milliseconds,microseconds));
public static ObservedTimeSpan FromSeconds(long seconds) => Wrap("FromSeconds:I",[seconds],()=>RealTimeSpan.FromSeconds(seconds));
public static ObservedTimeSpan FromSeconds(long seconds, long milliseconds = 0, long microseconds = 0) => Wrap("FromSeconds:I",[seconds,milliseconds,microseconds],()=>RealTimeSpan.FromSeconds(seconds,milliseconds,microseconds));
public static ObservedTimeSpan FromMilliseconds(long milliseconds) => Wrap("FromMilliseconds:I",[milliseconds],()=>RealTimeSpan.FromMilliseconds(milliseconds));
public static ObservedTimeSpan FromMilliseconds(long milliseconds, long microseconds) => Wrap("FromMilliseconds:I",[milliseconds,microseconds],()=>RealTimeSpan.FromMilliseconds(milliseconds,microseconds));
public static ObservedTimeSpan FromMicroseconds(long microseconds) => Wrap("FromMicroseconds:I",[microseconds],()=>RealTimeSpan.FromMicroseconds(microseconds));
public static ObservedTimeSpan FromHours(double value) => Wrap("FromHours:D",[value],()=>RealTimeSpan.FromHours(value));
public static ObservedTimeSpan FromMilliseconds(double value) => Wrap("FromMilliseconds:D",[value],()=>RealTimeSpan.FromMilliseconds(value));
public static ObservedTimeSpan FromMicroseconds(double value) => Wrap("FromMicroseconds:D",[value],()=>RealTimeSpan.FromMicroseconds(value));
public static ObservedTimeSpan FromMinutes(double value) => Wrap("FromMinutes:D",[value],()=>RealTimeSpan.FromMinutes(value));
public static ObservedTimeSpan FromSeconds(double value) => Wrap("FromSeconds:D",[value],()=>RealTimeSpan.FromSeconds(value));
public static ObservedTimeSpan FromTicks(long value) => Wrap("FromTicks:I",[value],()=>RealTimeSpan.FromTicks(value));
public ObservedTimeSpan Add(ObservedTimeSpan other) { var self=this;return Wrap("Add",[self,other],()=>self.Value.Add(other.Value)); }
public ObservedTimeSpan Subtract(ObservedTimeSpan other) { var self=this;return Wrap("Subtract",[self,other],()=>self.Value.Subtract(other.Value)); }
public ObservedTimeSpan Duration() { var self=this;return Wrap("Duration",[self],()=>self.Value.Duration()); }
public ObservedTimeSpan Negate() { var self=this;return Wrap("Negate",[self],()=>self.Value.Negate()); }
public ObservedTimeSpan Multiply(double factor) {var self=this;return Wrap("Multiply",[self,factor],()=>self.Value.Multiply(factor));}
public ObservedTimeSpan Divide(double divisor) {var self=this;return Wrap("Divide",[self,divisor],()=>self.Value.Divide(divisor));}
public double Divide(ObservedTimeSpan divisor) {var self=this;return (double)TimeSpanArithmeticOracle.Observe("Divide",[self,divisor],()=>self.Value.Divide(divisor.Value))!;}
public int CompareTo(object? other) {var self=this;return (int)TimeSpanArithmeticOracle.Observe("CompareTo",[self,other],()=>self.Value.CompareTo(other is ObservedTimeSpan span?span.Value:other))!;}
public static int Compare(ObservedTimeSpan a,ObservedTimeSpan b)=>(int)TimeSpanArithmeticOracle.Observe("Compare",[a,b],()=>RealTimeSpan.Compare(a.Value,b.Value))!;
public override bool Equals(object? other) {var self=this;return (bool)TimeSpanArithmeticOracle.Observe("Equals",[self,other],()=>self.Value.Equals(other is ObservedTimeSpan span?span.Value:other))!;}
public static bool Equals(ObservedTimeSpan a,ObservedTimeSpan b)=>(bool)TimeSpanArithmeticOracle.Observe("StaticEquals",[a,b],()=>RealTimeSpan.Equals(a.Value,b.Value))!;
public override int GetHashCode() {var self=this;return (int)TimeSpanArithmeticOracle.Observe("GetHashCode",[self],()=>self.Value.GetHashCode())!;}
public static ObservedTimeSpan operator +(ObservedTimeSpan a,ObservedTimeSpan b)=>a.Add(b);
public static ObservedTimeSpan operator -(ObservedTimeSpan a,ObservedTimeSpan b)=>a.Subtract(b);
public static ObservedTimeSpan operator +(ObservedTimeSpan a)=>Wrap("UnaryPlus",[a],()=>+a.Value);
public static ObservedTimeSpan operator -(ObservedTimeSpan a)=>a.Negate();
public static bool operator ==(ObservedTimeSpan a,ObservedTimeSpan b)=>(bool)TimeSpanArithmeticOracle.Observe("Operator==",[a,b],()=>a.Value == b.Value)!;
public static bool operator !=(ObservedTimeSpan a,ObservedTimeSpan b)=>(bool)TimeSpanArithmeticOracle.Observe("Operator!=",[a,b],()=>a.Value != b.Value)!;
public static bool operator <(ObservedTimeSpan a,ObservedTimeSpan b)=>(bool)TimeSpanArithmeticOracle.Observe("Operator<",[a,b],()=>a.Value < b.Value)!;
public static bool operator >(ObservedTimeSpan a,ObservedTimeSpan b)=>(bool)TimeSpanArithmeticOracle.Observe("Operator>",[a,b],()=>a.Value > b.Value)!;
public static bool operator <=(ObservedTimeSpan a,ObservedTimeSpan b)=>(bool)TimeSpanArithmeticOracle.Observe("Operator<=",[a,b],()=>a.Value <= b.Value)!;
public static bool operator >=(ObservedTimeSpan a,ObservedTimeSpan b)=>(bool)TimeSpanArithmeticOracle.Observe("Operator>=",[a,b],()=>a.Value >= b.Value)!;
public static ObservedTimeSpan operator *(ObservedTimeSpan a,double b)=>a.Multiply(b);
public static ObservedTimeSpan operator *(double a,ObservedTimeSpan b)=>b.Multiply(a);
public static ObservedTimeSpan operator /(ObservedTimeSpan a,double b)=>a.Divide(b);
public static double operator /(ObservedTimeSpan a,ObservedTimeSpan b)=>a.Divide(b);
}
