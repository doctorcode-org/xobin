using System.Globalization;
using System.Text.Json;
internal static class DateTimeFormatEraOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        foreach (string culture in new[] { "invariant", "en-US", "fr-FR" })
        {
            var f = culture == "invariant" ? DateTimeFormatInfo.InvariantInfo : new CultureInfo(culture,false).DateTimeFormat;
            var inputs = culture == "invariant" ? new[] { "A.D.", "AD", "a.d.", "ad", "C.E", "CE", "B.C", "BC", "" }
                : culture == "en-US" ? new[] { f.GetEraName(1), f.GetEraName(1).ToLowerInvariant(), f.GetAbbreviatedEraName(1), f.GetAbbreviatedEraName(1).ToLowerInvariant(), "C.E", "CE", "B.C", "BC", "" }
                : new[] { "A.D.", "AD", "a.d.", "ad", "C.E", "CE", "B.C", "BC", "ap. J.-C.", "AP. J.-C.", "ap. j.-c.", "ap J-C" };
            foreach (string input in inputs) Add("DateTimeFormatInfoGetEra.GetEra_Invoke_ReturnsExpected",culture,"GetEra",input);
            foreach (int era in new[] { 1,0 }) Add("DateTimeFormatInfoGetEraName.GetEraName_Invoke_ReturnsExpected",culture,"GetEraName",era);
        }
        Add("DateTimeFormatInfoGetEra.GetEra_NullEraName_ThrowsArgumentNullException","invariant","GetEra",null);
        foreach (string culture in new[] { "en-US", "invariant" }) foreach (int era in new[] { 0,1 })
            Add("DateTimeFormatInfoGetAbbreviatedEraName.GetAbbreviatedEraName_Invoke_ReturnsExpected",culture,"GetAbbreviatedEraName",era);
        Add("DateTimeFormatInfoGetAbbreviatedEraName.GetAbbreviatedEraName_Invoke_ReturnsExpected","ja-JP","GetAbbreviatedEraName",1);
        foreach (int era in new[] { -1,2 }) {
            Add("DateTimeFormatInfoGetEraName.GetEraName_InvalidEra_ThrowsArgumentOutOfRangeException","invariant","GetEraName",era);
            Add("DateTimeFormatInfoGetAbbreviatedEraName.GetAbbreviatedEraName_Invalid","en-US","GetAbbreviatedEraName",era);
        }
        foreach (string culture in new[] { "fa-IR","ar-SA","th-TH","ru-RU","ja-JP" }) {
            var f = new CultureInfo(culture,false).DateTimeFormat;
            foreach (int era in new[] { 0,1,-1,2 }) foreach (string method in new[] { "GetEraName","GetAbbreviatedEraName" }) Add("Supplementary.EraNames",culture,method,era);
            foreach (string name in new[] { f.GetEraName(1),f.GetAbbreviatedEraName(1), "AD", "", "unknown" }) Add("Supplementary.EraLookup",culture,"GetEra",name);
        }
        return JsonSerializer.Serialize(new { runtime=Environment.Version.ToString(),sourceTag="v10.0.7",rows },new JsonSerializerOptions { WriteIndented=true })+"\n";
        void Add(string source,string culture,string method,object? value) {
            var f = culture=="invariant" ? DateTimeFormatInfo.InvariantInfo : new CultureInfo(culture,false).DateTimeFormat;
            object? result=null; Exception? error=null;
            try { result=method=="GetEra" ? f.GetEra((string)value!) : method=="GetEraName" ? f.GetEraName((int)value!) : f.GetAbbreviatedEraName((int)value!); } catch(Exception caught) {error=caught;}
            rows.Add(new {source,culture,method,value,result,error=error?.GetType().Name,message=error?.Message,paramName=(error as ArgumentException)?.ParamName,actualValue=(error as ArgumentOutOfRangeException)?.ActualValue});
        }
    }
}
