using System.Globalization;
using System.Text.Json;
internal static partial class TimeSpanCoreOracle
{
    private static readonly List<object> Rows = new();
    private static string Source = "";
    private static object Snapshot(TimeSpan value) => new {
        ticks = value.Ticks.ToString(CultureInfo.InvariantCulture),
        parts = new[] { value.Days,value.Hours,value.Minutes,value.Seconds,value.Milliseconds,value.Microseconds,value.Nanoseconds },
        totals = new[] { value.TotalDays,value.TotalHours,value.TotalMinutes,value.TotalSeconds,value.TotalMilliseconds,value.TotalMicroseconds,value.TotalNanoseconds }
    };
    private static TimeSpan Record(string operation, object[] arguments, Func<TimeSpan> invoke)
    {
        try { var value=invoke(); Rows.Add(new { source=Source, operation, arguments, result=Snapshot(value), error=(string?)null }); return value; }
        catch(ArgumentException error) { Rows.Add(new { source=Source, operation, arguments, result=(object?)null, error=error.GetType().Name,message=error.Message,paramName=error.ParamName,actualValue=(error as ArgumentOutOfRangeException)?.ActualValue }); throw; }
    }
    private static TimeSpan Create(long ticks) => Record("ticks",[ticks.ToString(CultureInfo.InvariantCulture)],()=>new TimeSpan(ticks));
    private static TimeSpan Create(params int[] a) => Record("ctor",a.Cast<object>().ToArray(),()=> a.Length switch {
        0=>new TimeSpan(),3=>new TimeSpan(a[0],a[1],a[2]),4=>new TimeSpan(a[0],a[1],a[2],a[3]),
        5=>new TimeSpan(a[0],a[1],a[2],a[3],a[4]),6=>new TimeSpan(a[0],a[1],a[2],a[3],a[4],a[5]),_=>throw new InvalidOperationException()
    });
    private static void VerifyTimeSpan(TimeSpan value, params int[] expected)
    {
        var parts=new[] {value.Days,value.Hours,value.Minutes,value.Seconds,value.Milliseconds,value.Microseconds,value.Nanoseconds};
        if(!parts.Take(expected.Length).SequenceEqual(expected))throw new InvalidOperationException("Official TimeSpan parts differ.");
        Record("ticks",[value.Ticks.ToString(CultureInfo.InvariantCulture)],()=>value);
    }
    private static class Assert { internal static void Equal(long expected,double actual) { if(expected!=actual)throw new InvalidOperationException("Official total differs."); } }
    private static class AssertExtensions {
        internal static void Throws<T>(string? paramName,Action invoke) where T:ArgumentException {
            try { invoke(); } catch(T error) { if(error.ParamName!=paramName)throw new InvalidOperationException("Official parameter differs.");return; }
            throw new InvalidOperationException("Official exception was not thrown.");
        }
    }
    internal static string Generate()
    {
        Rows.Clear();
        foreach(var test in new (string name,Action invoke)[] {
            (nameof(MaxValue),MaxValue),(nameof(MinValue),MinValue),(nameof(Zero),Zero),(nameof(Ctor_Empty),Ctor_Empty),(nameof(Ctor_Long),Ctor_Long),
            (nameof(Ctor_Int_Int_Int),Ctor_Int_Int_Int),(nameof(Ctor_Int_Int_Int_Invalid),Ctor_Int_Int_Int_Invalid),
            (nameof(Ctor_Int_Int_Int_Int_Int),Ctor_Int_Int_Int_Int_Int),(nameof(Ctor_Int_Int_Int_Int_Int_Invalid),Ctor_Int_Int_Int_Int_Int_Invalid),
            (nameof(Ctor_Int_Int_Int_Int_Int_Int),Ctor_Int_Int_Int_Int_Int_Int),(nameof(Ctor_Int_Int_Int_Int_Int_Int_Invalid),Ctor_Int_Int_Int_Int_Int_Int_Invalid)
        }) {Source="TimeSpanTests."+test.name;test.invoke();}
        Source="TimeSpanTests.Ctor_Int_Int_Int_Int_Int_Int_WithNanosecond";
        foreach(int nanoseconds in Nanoseconds_TestData)Ctor_Int_Int_Int_Int_Int_Int_WithNanosecond(nanoseconds);
        Source="TimeSpanTests.TotalMilliseconds_Invalid";TotalMilliseconds_Invalid();Create(long.MinValue);Create(long.MaxValue);
        Source="TimeSpanTests.Total_Days_Hours_Minutes_Seconds_Milliseconds";
        foreach(var input in Total_Days_Hours_Minutes_Seconds_Milliseconds_TestData()) {
            var value=(TimeSpan)input[0];
            if(value.TotalDays.ToString("G15")!=Convert.ToDouble(input[1]).ToString("G15"))throw new InvalidOperationException("Official days differ.");
            var totals=new[]{value.TotalHours,value.TotalMinutes,value.TotalSeconds,value.TotalMilliseconds};
            if(!totals.SequenceEqual(input.Skip(2).Select(Convert.ToDouble)))throw new InvalidOperationException("Official totals differ.");
            Record("ticks",[value.Ticks.ToString(CultureInfo.InvariantCulture)],()=>value);
        }
        Source="Supplemental.TimeSpan.Core";
        foreach(long ticks in new[]{long.MinValue,long.MinValue+1,-9007199254740993L,-10001L,-11L,-1L,0L,1L,9L,10L,11L,10001L,9007199254740993L,long.MaxValue-1,long.MaxValue})Create(ticks);
        var random=new Random(101);
        for(int index=0;index<1000;index++)Create(random.NextInt64(long.MinValue,long.MaxValue));
        foreach(int length in new[]{3,4,5,6})for(int index=0;index<150;index++) {
            var args=Enumerable.Range(0,length).Select(_=>random.Next(int.MinValue,int.MaxValue)).ToArray();
            try {Create(args);}catch(ArgumentException){}
        }
        return JsonSerializer.Serialize(new {runtime=Environment.Version.ToString(),sourceTag="v10.0.7",rows=Rows},new JsonSerializerOptions{WriteIndented=true})+"\n";
    }
}
