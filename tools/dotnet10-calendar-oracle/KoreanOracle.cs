using System.Globalization;
using System.Text.Json;
internal static class KoreanOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        static object? Normalize(object? value) => value is DateTime date ? date.Ticks.ToString(CultureInfo.InvariantCulture)
            : value is Enum ? Convert.ToInt32(value) : value;
        void Capture(string source, object[] input, Func<KoreanCalendar,object[]> invoke) {
            try { rows.Add(new { source, arguments=input.Select(Normalize), result=invoke(new KoreanCalendar()).Select(Normalize), error=(string?)null }); }
            catch(ArgumentException error) { rows.Add(new {source,arguments=input.Select(Normalize),result=(object?)null,error=error.GetType().Name,message=error.Message,paramName=error.ParamName,actualValue=(error as ArgumentOutOfRangeException)?.ActualValue}); }
        }
        foreach(var (source,input) in KoreanReferenceData.Inputs.Get()) {
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
                    "GetDaysInMonth" => AcrossEras(era=> era.HasValue ? c.GetDaysInMonth(Arg(0)+2333,Arg(1),era.Value) : c.GetDaysInMonth(Arg(0)+2333,Arg(1))),
                    "GetDaysInYear" => AcrossEras(era=> era.HasValue ? c.GetDaysInYear(Arg(0)+2333,era.Value) : c.GetDaysInYear(Arg(0)+2333)),
                    "GetMonthsInYear" => AcrossEras(era=> era.HasValue ? c.GetMonthsInYear(Arg(0)+2333,era.Value) : c.GetMonthsInYear(Arg(0)+2333)),
                    "IsLeapDay" => AcrossEras(era=> era.HasValue ? c.IsLeapDay(Arg(0)+2333,Arg(1),Arg(2),era.Value) : c.IsLeapDay(Arg(0)+2333,Arg(1),Arg(2))),
                    "IsLeapMonth" => AcrossEras(era=> era.HasValue ? c.IsLeapMonth(Arg(0)+2333,Arg(1),era.Value) : c.IsLeapMonth(Arg(0)+2333,Arg(1))),
                    "IsLeapYear" => AcrossEras(era=> era.HasValue ? c.IsLeapYear(Arg(0)+2333,era.Value) : c.IsLeapYear(Arg(0)+2333)),
                    "ToDateTime" => AcrossEras(era=> era.HasValue ? c.ToDateTime(Arg(0)+2333,Arg(1),Arg(2),Arg(3),Arg(4),Arg(5),Arg(6),era.Value) : c.ToDateTime(Arg(0)+2333,Arg(1),Arg(2),Arg(3),Arg(4),Arg(5),Arg(6))),
                    "ToFourDigitYear" => [c.ToFourDigitYear(Arg(0))],
                    "TwoDigitYearMax_Set" => SetYear(c,Arg(0)),
                    _ => throw new InvalidOperationException(source)
                };
            });
        }
        Capture("KoreanCalendarTwoDigitYearMax.TwoDigitYearMax_Get", [], c=>[c.TwoDigitYearMax]);
        Capture("KoreanCalendarToFourDigitYear.ToFourDigitYear_InvalidYear_ThrowsArgumentOutOfRangeException", [100], c=>[c.ToFourDigitYear(100)]);
        return JsonSerializer.Serialize(new {runtime=Environment.Version.ToString(),sourceTag="v10.0.7", rows}, new JsonSerializerOptions{WriteIndented=true})+"\n";
    }
    private static object[] SetYear(KoreanCalendar calendar,int value) { calendar.TwoDigitYearMax=value;return [calendar.TwoDigitYearMax]; }
}
