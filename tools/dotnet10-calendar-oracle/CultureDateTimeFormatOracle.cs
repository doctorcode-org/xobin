using System.Globalization;
using System.Text.Json;
internal static class CultureDateTimeFormatOracle
{
    internal static string Generate()
    {
        var rows=new List<object>();
        foreach(string name in new[]{"en-US","fi-FI"}) {
            var culture=new CultureInfo(name,false);var info=new DateTimeFormatInfo();
            if(name=="en-US") {info.AMDesignator="a.m.";info.MonthDayPattern="MMMM-dd";info.ShortTimePattern="HH|mm";}
            else info.LongTimePattern="H:mm:ss";
            culture.DateTimeFormat=info;
            rows.Add(new{source="CultureInfoDateTimeFormat.DateTimeFormatInfo_Set",name,same=ReferenceEquals(info,culture.DateTimeFormat),am=info.AMDesignator,monthDay=info.MonthDayPattern,shortTime=info.ShortTimePattern,longTime=info.LongTimePattern});
        }
        var previous=CultureInfo.CurrentCulture;
        string current;
        try {CultureInfo.CurrentCulture=new CultureInfo("ja-JP",false);current=new DateTime(2014,3,14,3,14,0).ToString();}
        finally {CultureInfo.CurrentCulture=previous;}
        var french=new CultureInfo("fr",false);french.DateTimeFormat.AMDesignator="a.m.";french.DateTimeFormat.MonthDayPattern="MMMM-dd";french.DateTimeFormat.ShortTimePattern="HH|mm";
        var errors=new List<object>();
        foreach(bool readOnly in new[]{false,true}) {
            Exception? error=null;try { if(readOnly) CultureInfo.InvariantCulture.DateTimeFormat=new DateTimeFormatInfo();else new CultureInfo("en-US").DateTimeFormat=null!;}catch(Exception caught){error=caught;}
            errors.Add(new{readOnly,error=error?.GetType().Name,message=error?.Message,paramName=(error as ArgumentException)?.ParamName});
        }
        return JsonSerializer.Serialize(new{runtime=Environment.Version.ToString(),sourceTag="v10.0.7",rows,current,
            french=new{am=french.DateTimeFormat.AMDesignator,monthDay=french.DateTimeFormat.MonthDayPattern,shortTime=french.DateTimeFormat.ShortTimePattern},errors,
            invariantCalendar=CultureInfo.InvariantCulture.Calendar.GetType().Name,
            allCultureNames=CultureInfo.GetCultures(CultureTypes.AllCultures).Select(c=>c.Name).OrderBy(name=>name,StringComparer.Ordinal).ToArray()},new JsonSerializerOptions{WriteIndented=true})+"\n";
    }
}
