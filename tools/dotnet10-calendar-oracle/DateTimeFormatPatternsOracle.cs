using System.Globalization;
using System.Reflection;
using System.Text.Json;
internal static class DateTimeFormatPatternsOracle
{
    internal static string Generate()
    {
        var rows=new List<object>();
        using var inputs=JsonDocument.Parse(File.ReadAllText("tests/dotnet10/date-time-format-pattern-inputs.json"));
        foreach(var input in inputs.RootElement.EnumerateArray()) {
            string culture=input.GetProperty("culture").GetString()!;
            var info=culture=="invariant"?DateTimeFormatInfo.InvariantInfo:culture=="new"?new DateTimeFormatInfo():new CultureInfo(culture,false).DateTimeFormat;
            string property=input.GetProperty("property").GetString()!;
            var member=typeof(DateTimeFormatInfo).GetProperty(property)!;
            string? value=input.GetProperty("value").GetString(); Exception? error=null;
            try { if(input.GetProperty("action").GetString()=="set") member.SetValue(info,value); }
            catch(Exception caught) {error=caught is TargetInvocationException?caught.InnerException!:caught;}
            rows.Add(new {source=input.GetProperty("source").GetString(),culture,property,action=input.GetProperty("action").GetString(),value,result=member.GetValue(info),full=info.FullDateTimePattern,
                patterns=info.GetAllDateTimePatterns(),error=error?.GetType().Name,message=error?.Message,paramName=(error as ArgumentException)?.ParamName});
        }
        var operations=new List<object>();
        foreach(string culture in new[]{"","en-US","ja-JP","zh-CN","ar-SA","ko-KR","he-IL"}) {
            var info=(DateTimeFormatInfo)new CultureInfo(culture,false).DateTimeFormat.Clone();
            operations.Add(new {source="DateTimeFormatInfoMiscTests.GetAllDateTimePatterns_Invoke_ReturnsExpected",culture,
                all=info.GetAllDateTimePatterns(),byFormat="dDfFgGmMoOrRstTuUyY".ToDictionary(c=>c.ToString(),c=>info.GetAllDateTimePatterns(c)),
                shortest=Enumerable.Range(0,7).Select(day=>info.GetShortestDayName((DayOfWeek)day)).ToArray()});
        }
        rows.AddRange(operations);
        var setters=new List<object>();
        foreach(string format in new[]{"d","D","t","T","y","Y","F","x"})
        foreach(string?[]? values in new string?[]?[]{null,Array.Empty<string>(),new string?[]{null},new string?[]{"one",null},new[]{"first","second","first"}}) {
            var info=new DateTimeFormatInfo();Exception? error=null;
            try {info.SetAllDateTimePatterns(values!,format[0]);}catch(Exception caught){error=caught;}
            setters.Add(new{format,values,result=info.GetAllDateTimePatterns(),error=error?.GetType().Name,message=error?.Message,paramName=(error as ArgumentException)?.ParamName});
        }
        var mutations=new List<object>();
        foreach(char format in "dDtTyY") {
            var info=new DateTimeFormatInfo();var values=new[]{"first","second","third","second"};
            info.SetAllDateTimePatterns(values,format);values[1]="changed";
            var shared=info.GetAllDateTimePatterns(format);
            string property=format switch{'d'=>"ShortDatePattern",'D'=>"LongDatePattern",'t'=>"ShortTimePattern",'T'=>"LongTimePattern",_=>"YearMonthPattern"};
            typeof(DateTimeFormatInfo).GetProperty(property)!.SetValue(info,"third");
            var reordered=info.GetAllDateTimePatterns(format);
            typeof(DateTimeFormatInfo).GetProperty(property)!.SetValue(info,"new");
            mutations.Add(new{format=format.ToString(),property,shared,reordered,inserted=info.GetAllDateTimePatterns(format)});
        }
        var invalidations = new List<object>();
        foreach (string property in new[] { "LongDatePattern", "LongTimePattern", "ShortDatePattern", "ShortTimePattern" })
        {
            var info = new DateTimeFormatInfo();
            var date = new DateTimeOffset(2024,3,20,13,14,15,TimeSpan.Zero);
            string[] formats = property == "LongDatePattern" ? new[] { "F" }
                : property == "LongTimePattern" ? new[] { "F", "G", "" }
                : property == "ShortDatePattern" ? new[] { "G", "g", "" } : new[] { "g" };
            foreach (string format in formats) date.ToString(format,info);
            typeof(DateTimeFormatInfo).GetProperty(property)!.SetValue(info,"#$");
            string suffix = property == "LongDatePattern" || property == "ShortTimePattern" ? "_Set_InvalidatesDerivedPattern" : "_Set_InvalidatesDerivedPatterns";
            invalidations.Add(new { source="DateTimeFormatInfo"+property+"."+property+suffix, property, formats,
                results=formats.Select(format=>date.ToString(format,info)).ToArray() });
        }
        var cacheCases = new List<object>();
        foreach (string property in new[] { "MonthNames", "AbbreviatedMonthNames", "MonthGenitiveNames", "AbbreviatedMonthGenitiveNames" })
        foreach (bool nullMutation in new[] { false, true })
        {
            var info = new DateTimeFormatInfo();
            var member = typeof(DateTimeFormatInfo).GetProperty(property)!;
            var values = (string[])member.GetValue(info)!;
            var initial = (string[])values.Clone();
            member.SetValue(info, values);
            var date = new DateTime(2024,6,19);
            string pattern = property.StartsWith("Abbreviated") ? "dd MMM" : "dd MMMM";
            date.ToString(pattern, info);
            values[nullMutation ? 0 : 5] = nullMutation ? null! : "changed";
            var clone = (DateTimeFormatInfo)info.Clone();
            var readOnly = DateTimeFormatInfo.ReadOnly(info);
            object Render(DateTime selected, DateTimeFormatInfo format)
            {
                string? result = null; Exception? error = null;
                try { result = selected.ToString(pattern, format); } catch (Exception caught) { error = caught; }
                return new { result, error=error?.GetType().Name, message=error?.Message };
            }
            var before = Render(date, info);
            var january = Render(new DateTime(2024,1,19), info);
            info.FirstDayOfWeek = DayOfWeek.Monday;
            var afterWeekday = Render(date, info);
            info.AMDesignator = "changed";
            cacheCases.Add(new { property, initial, nullMutation, pattern, before, january, afterWeekday,
                afterReset=Render(date, info), cloned=Render(date, clone), readOnly=Render(date, readOnly) });
        }
        return JsonSerializer.Serialize(new{runtime=Environment.Version.ToString(),sourceTag="v10.0.7",rows,operations,setters,mutations,invalidations,cacheCases},new JsonSerializerOptions{WriteIndented=true})+"\n";
    }
}
