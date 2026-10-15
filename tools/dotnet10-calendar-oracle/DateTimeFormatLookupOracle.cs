using System.Globalization;
using System.Reflection;
using System.Text.Json;
internal static class DateTimeFormatLookupOracle
{
    internal static string Generate()
    {
        var rows=new List<object>();
        foreach(string method in new[]{"GetDayName","GetAbbreviatedDayName","GetMonthName","GetAbbreviatedMonthName"}) {
            bool month=method.Contains("Month");
            string group="DateTimeFormatInfo"+method+"."+method;
            foreach(string culture in new[]{"invariant","new","en-US","fr-FR"}) {
                var f=culture=="invariant"?DateTimeFormatInfo.InvariantInfo:culture=="new"?new DateTimeFormatInfo():new CultureInfo(culture,false).DateTimeFormat;
                var values=Enumerable.Range(month?1:0,month?13:7).Select(i=>Invoke(f,method,i)).ToArray();
                rows.Add(new{source=group+"_Invoke_ReturnsExpected",culture,method,values});
            }
            string suffix=method=="GetDayName"?"_InvalidDayOfWeek_ThrowsArgumentOutOfRangeException":method=="GetAbbreviatedDayName"?"_Invalid_ThrowsArgumentOutOfRangeException":"_InvalidMonth_ThrowsArgumentOutOfRangeException";
            foreach(int value in month?new[]{0,14}:new[]{-1,7}) rows.Add(new{source=group+suffix,culture="new",method,values=new[]{Invoke(new DateTimeFormatInfo(),method,value)}});
        }
        foreach(string culture in new[]{"","en-US","ja-JP","zh-CN","ar-SA","ko-KR","he-IL"}) {
            var f=new CultureInfo(culture,false).DateTimeFormat;
            rows.Add(new{source="DateTimeFormatInfoMiscTests.GetShortestDayName_Invoke_ReturnsExpected",culture,method="GetShortestDayName",values=Enumerable.Range(0,7).Select(i=>Invoke(f,"GetShortestDayName",i)).ToArray()});
        }
        foreach(int day in new[]{-1,7}) rows.Add(new{source="Supplementary.ShortestDayRange",culture="new",method="GetShortestDayName",values=new[]{Invoke(new DateTimeFormatInfo(),"GetShortestDayName",day)}});
        return JsonSerializer.Serialize(new{runtime=Environment.Version.ToString(),sourceTag="v10.0.7",rows},new JsonSerializerOptions{WriteIndented=true})+"\n";
    }
    private static object Invoke(DateTimeFormatInfo f,string method,int value) {
        string? result=null;Exception? error=null;
        try { result=(string)typeof(DateTimeFormatInfo).GetMethod(method)!.Invoke(f,new object[]{method.Contains("Day")?(object)(DayOfWeek)value:value})!; }
        catch(Exception caught){error=caught is TargetInvocationException?caught.InnerException!:caught;}
        return new{value,result,error=error?.GetType().Name,message=error?.Message,paramName=(error as ArgumentException)?.ParamName,actualValue=error is ArgumentOutOfRangeException range?Convert.ToInt32(range.ActualValue): (int?)null};
    }
}
