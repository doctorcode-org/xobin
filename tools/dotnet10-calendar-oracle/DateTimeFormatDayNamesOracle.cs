using System.Globalization;
using System.Reflection;
using System.Text.Json;

// Inputs from the three official day-name array suites in v10.0.7.
internal static class DateTimeFormatDayNamesOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        var counts = new Dictionary<string, int>();
        foreach (string property in new[] { "DayNames", "AbbreviatedDayNames", "ShortestDayNames" })
        {
            Add(property, "invariant", null, false);
            foreach (string culture in new[] { "en-US", "fr-FR" }) Add(property, culture, null, false);
            Add(property, "new", new[] { "1", "2", "3", "4", "5", "6", "7" }, true);
            Add(property, "new", new[] { "", "", "", "", "", "", "" }, true);
            Add(property, "new", null, true);
            Add(property, "new", new string?[] { "1", "2", "3", null, "5", "6", "7" }, true);
            Add(property, "new", new[] { "Sun" }, true);
            Add(property, "new", new[] { "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Additional" }, true);
            Add(property, "invariant", new[] { "1", "2", "3", "4", "5", "6", "7" }, true);
            Add(property, "invariant", null, true);
            Add(property, "new", new string?[] { null }, true);
            for (int i = 0; i < 7; i++)
            {
                var names = new string?[7];
                Array.Fill(names, "day"); names[i] = null;
                Add(property, "new", names, true);
            }
        }
        foreach (string property in new[] { "DayNames", "AbbreviatedDayNames", "ShortestDayNames" }) Add(property, "invariant", null, false);
        var format = new DateTimeFormatInfo();
        var values = new[] { "1", "2", "3", "4", "5", "6", "7" };
        format.DayNames = values; values[0] = null!;
        Exception? formatError = null;
        try { new DateTime(2014, 5, 28).ToString("dddd MMM yy", format); }
        catch (Exception error) { formatError = error; }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", rows,
            formatError = formatError?.GetType().Name, formatMessage = formatError?.Message }, new JsonSerializerOptions { WriteIndented = true }) + "\n";

        void Add(string property, string culture, string?[]? value, bool set)
        {
            var info = culture == "new" ? new DateTimeFormatInfo() : culture == "invariant" ? DateTimeFormatInfo.InvariantInfo : new CultureInfo(culture, false).DateTimeFormat;
            var member = typeof(DateTimeFormatInfo).GetProperty(property)!;
            Exception? error = null;
            try { if (set) member.SetValue(info, value); }
            catch (Exception caught) { error = caught is TargetInvocationException ? caught.InnerException! : caught; }
            var result = (string[])member.GetValue(info)!;
            bool getterCopies = !ReferenceEquals(result, member.GetValue(info));
            string?[]? afterMutation = null;
            if (set && error == null) { value![0] = null; afterMutation = (string[])member.GetValue(info)!; }
            int index = counts.GetValueOrDefault(property);
            counts[property] = index + 1;
            string suffix = index switch {
                0 => property == "ShortestDayNames" ? "_InvariantInfo" : "_GetInvariantInfo_ReturnsExpected",
                1 or 2 when property != "ShortestDayNames" => "_Get_ReturnsExpected_ICU",
                3 or 4 => "_Set_GetReturnsExpected",
                5 => "_SetNulValue_ThrowsArgumentNullException",
                6 => "_SetNulValueInValue_ThrowsArgumentNullException",
                7 or 8 => "_SetInvalidLength_ThrowsArgumentException",
                9 => "_SetReadOnly_ThrowsInvalidOperationException",
                19 => "_Get_ReturnsClone",
                _ => ""
            };
            string source = suffix == "" ? "Supplementary." + property : "DateTimeFormatInfo" + property + "." + property + suffix;
            rows.Add(new { source, property, culture, set, value = set && error == null ? result : value, result, getterCopies, afterMutation,
                error = error?.GetType().Name, paramName = (error as ArgumentException)?.ParamName, message = error?.Message });
        }
    }
}
