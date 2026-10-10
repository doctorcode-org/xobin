using System.Globalization;
using System.Reflection;
using System.Text.Json;

// Official inputs from the four month-name suites in v10.0.7.
internal static class DateTimeFormatMonthNamesOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        var formats = new List<object>();
        foreach (string property in new[] { "MonthNames", "AbbreviatedMonthNames", "MonthGenitiveNames", "AbbreviatedMonthGenitiveNames" })
        {
            string group = "DateTimeFormatInfo" + property + "." + property;
            if (property != "MonthGenitiveNames") Add(group + "_GetInvariantInfo_ReturnsExpected", "invariant", null, false);
            Add(group + "_Get_ReturnsClone", "new", null, false);
            foreach (string culture in property == "MonthGenitiveNames" ? new[] { "invariant", "ru-RU", "en-US", "fr-FR" } : new[] { "en-US", "fr-FR" })
                Add(group + (property == "MonthGenitiveNames" ? "_Get_ReturnsExpected" : "_Get_ReturnsExpected_ICU"), culture, null, false);
            Add(group + "_Set_GetReturnsExpected", "new", Enumerable.Range(1,12).Select(i => i.ToString()).Append("").ToArray(), true);
            Add(group + "_Set_GetReturnsExpected", "new", Enumerable.Repeat("",13).ToArray(), true);
            Add(group + "_SetNullValue_ThrowsArgumentNullException", "new", null, true);
            var nullNames = Enumerable.Range(1,12).Select(i => (string?)i.ToString()).Append("").ToArray(); nullNames[3] = null;
            Add(group + "_SetNullValueInValues_ThrowsArgumentNullException", "new", nullNames, true);
            Add(group + "_SetNullValueInValues_ThrowsArgumentException", "new", new[] { "Jan" }, true);
            Add(group + "_SetNullValueInValues_ThrowsArgumentException", "new", new[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "", "Additional" }, true);
            Add(group + "_SetReadOnly_ThrowsInvalidOperationException", "invariant", Enumerable.Range(1,12).Select(i => i.ToString()).Append("").ToArray(), true);
            Add("Supplementary." + property + ".ReadOnlyNull", "invariant", null, true);
            Add("Supplementary." + property + ".LengthBeforeNull", "new", new string?[] { null }, true);
            for (int i = 0; i < 13; i++)
            {
                var names = Enumerable.Repeat<string?>("month",13).ToArray(); names[i] = null;
                Add("Supplementary." + property + ".NullIndex" + i, "new", names, true);
            }
            foreach (string final in new[] { "", "thirteenth" })
            {
                var names = Enumerable.Repeat<string?>("month",13).ToArray(); names[12] = final;
                Add("Supplementary." + property + ".Thirteenth", "new", names, true);
            }
            bool abbreviated = property.StartsWith("Abbreviated");
            bool genitive = property.Contains("Genitive");
            string pattern = property == "AbbreviatedMonthGenitiveNames" ? "d MMM yy" : (genitive ? "dd " : "") + (abbreviated ? "MMM" : "MMMM") + " yy";
            string[] labels = property == "AbbreviatedMonthGenitiveNames"
                ? new[] { "GenJan", "GenFeb", "GenMar", "GenApr", "GenMay", "GenJun", "GenJul", "GenAug", "GenSep", "GenOct", "GenNov", "GenDec", "Gen" }
                : new[] { "Jan.", "Feb.", "Mar.", "Apr.", "May.", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec.", "." };
            Format(group + "_Format_ReturnsExpected", labels, false, new DateTime(1976,6,19), pattern);
            var values = Enumerable.Range(1,13).Select(i => i.ToString()).ToArray();
            Format(group + "_FormatWithNull_ThrowsNullReferenceException", values, true, new DateTime(2014,1,28), (genitive ? "dd " : "") + (abbreviated ? "MMM" : "MMMM") + (property == "AbbreviatedMonthGenitiveNames" ? " yy" : ""));
            foreach (int index in new[] { 0, 12 })
            foreach (string customPattern in new[] { "MMMM", "MMM", "dd MMMM", "dd MMM" })
            {
                var values2 = Enumerable.Range(1,13).Select(i => i.ToString()).ToArray();
                Format("Supplementary." + property + ".MutatedNull" + index, values2, true, new DateTime(2014,6,19), customPattern, index);
            }

            void Add(string source, string culture, string?[]? value, bool set)
            {
                var info = culture == "new" ? new DateTimeFormatInfo() : culture == "invariant" ? DateTimeFormatInfo.InvariantInfo : new CultureInfo(culture,false).DateTimeFormat;
                var member = typeof(DateTimeFormatInfo).GetProperty(property)!;
                Exception? error = null;
                try { if (set) member.SetValue(info,value); }
                catch (Exception caught) { error = caught is TargetInvocationException ? caught.InnerException! : caught; }
                var result = (string[])member.GetValue(info)!;
                string?[]? afterMutation = null;
                if (set && error == null) { value![0] = null; afterMutation = (string[])member.GetValue(info)!; }
                rows.Add(new { source, property, culture, set, value = set && error == null ? result : value, result, afterMutation,
                    error = error?.GetType().Name, paramName = (error as ArgumentException)?.ParamName, message = error?.Message });
            }
            void Format(string source, string[] value, bool mutate, DateTime date, string customPattern, int index = 0)
            {
                var info = new DateTimeFormatInfo();
                typeof(DateTimeFormatInfo).GetProperty(property)!.SetValue(info,value);
                if (mutate) value[index] = null!;
                string? result = null; Exception? error = null;
                try { result = date.ToString(customPattern,info); } catch (Exception caught) { error = caught; }
                formats.Add(new { source, property, value, date = new[] { date.Year,date.Month,date.Day }, pattern = customPattern, result,
                    error = error?.GetType().Name, message = error?.Message });
            }
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", rows, formats }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
