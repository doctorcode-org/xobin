using System.Globalization;
using System.Text.Json;
internal static class TaiwanOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        static object? Normalize(object? value) => value is DateTime date ? date.Ticks.ToString(CultureInfo.InvariantCulture)
            : value is Enum ? Convert.ToInt32(value) : value;
        void Capture(string source, object[] input, Func<TaiwanCalendar,object[]> invoke) {
            try { rows.Add(new { source, arguments=input.Select(Normalize), result=invoke(new TaiwanCalendar()).Select(Normalize), error=(string?)null }); }
            catch(ArgumentException error) { rows.Add(new {source,arguments=input.Select(Normalize),result=(object?)null,error=error.GetType().Name,message=error.Message,paramName=error.ParamName,actualValue=(error as ArgumentOutOfRangeException)?.ActualValue}); }
        }
        foreach(var (source,input) in TaiwanReferenceData.Inputs.Get()) {
            string method=source.Split('.')[1];
            Capture(source,input,c=> {
                int Arg(int index)=>(int)input[index];
                object[] AcrossEras(Func<int?,object> call) => new int?[]{null,0,1}.Select(call).ToArray();
                return method switch {
                    "AddMonths" => [c.AddMonths((DateTime)input[0],Arg(1))],
                    "AddYears" => [c.AddYears((DateTime)input[0],Arg(1))],
                    "GetDayOfMonth" => [c.GetDayOfMonth((DateTime)input[0])],
                    "GetDayOfWeek" => [c.GetDayOfWeek((DateTime)input[0])],
                    "GetDayOfYear" => [c.GetDayOfYear((DateTime)input[0])],
                    "GetEra" => [c.GetEra((DateTime)input[0])],
                    "GetMonth" => [c.GetMonth((DateTime)input[0])],
                    "GetYear" => [c.GetYear((DateTime)input[0])],
                    "GetWeekOfYear" => [c.GetWeekOfYear((DateTime)input[0],(CalendarWeekRule)input[1],(DayOfWeek)input[2])],
                    "GetDaysInMonth" => AcrossEras(era=> era.HasValue ? c.GetDaysInMonth(Arg(0),Arg(1),era.Value) : c.GetDaysInMonth(Arg(0),Arg(1))),
                    "GetDaysInYear" => AcrossEras(era=> era.HasValue ? c.GetDaysInYear(Arg(0),era.Value) : c.GetDaysInYear(Arg(0))),
                    "GetMonthsInYear" => AcrossEras(era=> era.HasValue ? c.GetMonthsInYear(Arg(0),era.Value) : c.GetMonthsInYear(Arg(0))),
                    "IsLeapDay" => AcrossEras(era=> era.HasValue ? c.IsLeapDay(Arg(0),Arg(1),Arg(2),era.Value) : c.IsLeapDay(Arg(0),Arg(1),Arg(2))),
                    "IsLeapMonth" => AcrossEras(era=> era.HasValue ? c.IsLeapMonth(Arg(0),Arg(1),era.Value) : c.IsLeapMonth(Arg(0),Arg(1))),
                    "IsLeapYear" => AcrossEras(era=> era.HasValue ? c.IsLeapYear(Arg(0),era.Value) : c.IsLeapYear(Arg(0))),
                    "ToDateTime" => AcrossEras(era=> era.HasValue ? c.ToDateTime(Arg(0),Arg(1),Arg(2),Arg(3),Arg(4),Arg(5),Arg(6),era.Value) : c.ToDateTime(Arg(0),Arg(1),Arg(2),Arg(3),Arg(4),Arg(5),Arg(6))),
                    "ToFourDigitYear" => [c.ToFourDigitYear(Arg(0))],
                    "TwoDigitYearMax_Set" => SetYear(c,Arg(0)),
                    _ => throw new InvalidOperationException(source)
                };
            });
        }
        Capture("TaiwanCalendarTwoDigitYearMax.TwoDigitYearMax_Get", [], c=>[c.TwoDigitYearMax]);
        Capture("TaiwanCalendarTwoDigitYearMax.TwoDigitYearMax_Set", [new Random(-55).Next(99,new TaiwanCalendar().MaxSupportedDateTime.Year)], c=>SetYear(c,new Random(-55).Next(99,c.MaxSupportedDateTime.Year)));
        var lastDay=new DateTime(TaiwanReferenceData.TaiwanCalendarUtilities.RandomYear(),12,31);
        Capture("TaiwanCalendarGetWeekOfYear.GetWeekOfYear_LastDayOfYear", [lastDay], c=>[c.GetWeekOfYear(lastDay,CalendarWeekRule.FirstDay,DayOfWeek.Sunday)]);
        var leapInputs=Enumerable.Range(0,3).SelectMany(_=>new[]{TaiwanReferenceData.TaiwanCalendarUtilities.RandomYear(),TaiwanReferenceData.TaiwanCalendarUtilities.RandomMonth()}).Cast<object>().ToArray();
        Capture("TaiwanCalendarIsLeapMonth.IsLeapMonth_ReturnsFalse", leapInputs, c=>[c.IsLeapMonth((int)leapInputs[0],(int)leapInputs[1]),c.IsLeapMonth((int)leapInputs[2],(int)leapInputs[3],0),c.IsLeapMonth((int)leapInputs[4],(int)leapInputs[5],1)]);
        Capture("TaiwanCalendarDaysAndMonths.DayNames_MonthNames", [], c=> {var format=new CultureInfo("zh-TW").DateTimeFormat;format.Calendar=c;return [format.DayNames,format.MonthNames];});
        return JsonSerializer.Serialize(new {runtime=Environment.Version.ToString(),sourceTag="v10.0.7", rows}, new JsonSerializerOptions{WriteIndented=true})+"\n";
    }
    private static object[] SetYear(TaiwanCalendar calendar,int value) { calendar.TwoDigitYearMax=value;return [calendar.TwoDigitYearMax]; }
}
