using System.Globalization;
using System.Text.Json;
internal static class FormatCalendarDependenciesOracle
{
    internal static string Generate()
    {
        var rows=new List<object>();
        foreach(var (name,calendar) in new (string,Calendar)[] { ("en-US",new GregorianCalendar()),("ar-SA",new HijriCalendar()),("ar-SA",new UmAlQuraCalendar()),("ja-JP",new JapaneseCalendar()),("th-TH",new ThaiBuddhistCalendar()),("he-IL",new HebrewCalendar()),("ko-KR",new KoreanCalendar()),("fa-IR",new PersianCalendar()) }) {
            var f=(DateTimeFormatInfo)new CultureInfo(name,false).DateTimeFormat.Clone();
            try { f.Calendar=calendar; rows.Add(new{source="DateTimeFormatInfoMiscTests.NativeCalendarName_Get_ReturnsExpected",name,calendar=calendar.GetType().Name,result=f.NativeCalendarName}); }
            catch(ArgumentException e){rows.Add(new{source="DateTimeFormatInfoMiscTests.NativeCalendarName_Get_ReturnsExpected",name,calendar=calendar.GetType().Name,error=e.GetType().Name,message=e.Message,paramName=e.ParamName});}
        }
        var japanese=new CultureInfo("ja-JP",false);japanese.DateTimeFormat.Calendar=new JapaneseCalendar();
        var formats=new List<object>();
        foreach(int year in new[]{5778,5779}) {
            var hebrew=new CultureInfo("he-IL",false);hebrew.DateTimeFormat.Calendar=new HebrewCalendar();
            for(int month=1;month<=hebrew.DateTimeFormat.Calendar.GetMonthsInYear(year);month++) {
                DateTime date=hebrew.DateTimeFormat.Calendar.ToDateTime(year,month,1,0,0,0,0);
                foreach(string format in new[]{hebrew.DateTimeFormat.LongDatePattern,"d dd M MM MMM MMMM y yy yyyy"})
                    formats.Add(new{name="he-IL",calendar="HebrewCalendar",ticks=date.Ticks.ToString(),format,result=date.ToString(format,hebrew)});
            }
        }
        return JsonSerializer.Serialize(new{runtime=Environment.Version.ToString(),rows,formats,
            japaneseEraNumbers=new[]{"M","T","S","H","R","Q"}.Select(name=>new{name,result=japanese.DateTimeFormat.GetEra(name)}),
            optional=CultureInfo.GetCultures(CultureTypes.AllCultures).OrderBy(c=>c.Name,StringComparer.Ordinal).Select(c=>new{name=c.Name,calendars=c.OptionalCalendars.Select(cal=>cal.GetType().Name)})},new JsonSerializerOptions{WriteIndented=true})+"\n";
    }
}
