using System.Globalization;
using System.Reflection;
using System.Text.Json;

// Official inputs from the AM/PMDesignator, FirstDayOfWeek, CalendarWeekRule and Calendar suites in v10.0.7.
internal static class DateTimeFormatPropertiesOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        foreach (string property in new[] { "AMDesignator", "PMDesignator" })
        {
            string group = "DateTimeFormatInfo" + property;
            Run(group + "." + property + "_GetInvariantInfo_ReturnsExpected", "invariant", property, "get", null);
            foreach (string value in property == "AMDesignator" ? new[] { "", "AA", "A.M" } : new[] { "", "PP", "P.M" })
                Run(group + "." + property + "_Set_GetReturnsExpected", "new", property, "set", value);
            Run(group + "." + property + "_SetNullValue_ThrowsArgumentNullException", "new", property, "set", null);
            Run(group + "." + property + "_SetReadOnly_ThrowsInvalidOperationException", "invariant", property, "set", "custom");
        }
        foreach (string culture in new[] { "invariant", "en-US", "fr-FR" })
            Run("DateTimeFormatInfoFirstDayOfWeek.FirstDayOfWeek", culture, "FirstDayOfWeek", "get", null);
        foreach (int value in Enumerable.Range(0, 7))
            Run("DateTimeFormatInfoFirstDayOfWeek.FirstDayOfWeek_Set_GetReturnsExpected", "new", "FirstDayOfWeek", "set", value);
        foreach (int value in new[] { -1, 7 })
            Run("DateTimeFormatInfoFirstDayOfWeek.FirstDayOfWeek_SetInvalid_ThrowsArgumentOutOfRangeException", "new", "FirstDayOfWeek", "set", value);
        Run("DateTimeFormatInfoFirstDayOfWeek.FirstDayOfWeek_SetReadOnly_ThrowsInvalidOperationException", "invariant", "FirstDayOfWeek", "set", 3);
        // Include both desktop (br-FR) and browser (ru-RU) MemberData branches.
        foreach (string culture in new[] { "invariant", "en-US", "br-FR", "ru-RU" })
            Run("DateTimeFormatInfoCalendarWeekRule.CalendarWeekRuleTest", culture, "CalendarWeekRule", "get", null);
        foreach (int value in new[] { 0, 2, 1 })
            Run("DateTimeFormatInfoCalendarWeekRule.CalendarWeekRule_Set_GetReturnsExpected", "new", "CalendarWeekRule", "set", value);
        foreach (int value in new[] { -1, 3 })
            Run("DateTimeFormatInfoCalendarWeekRule.CalendarWeekRule_SetInvalidValue_ThrowsArgumentOutOfRangeException", "new", "CalendarWeekRule", "set", value);
        Run("DateTimeFormatInfoCalendarWeekRule.CalendarWeekRule_SetReadOnly_ThrowsInvalidOperationException", "invariant", "CalendarWeekRule", "set", 0);
        Run("DateTimeFormatInfoCalendar.Calendar_GetInvariantInfo_ReturnsExpected", "invariant", "Calendar", "get", null);
        Run("DateTimeFormatInfoCalendar.Calendar_Set_GetReturnsExpected", "new", "Calendar", "setTwice", 1);
        Run("DateTimeFormatInfoCalendar.Calendar_SetNullValue_ThrowsArgumentNullException", "new", "Calendar", "set", null);
        Run("DateTimeFormatInfoCalendar.Calendar_SetInvalidValue_ThrowsArgumentOutOfRangeException", "new", "Calendar", "set", 7);
        Run("DateTimeFormatInfoCalendar.Calendar_SetReadOnly_ThrowsInvalidOperationException", "invariant", "Calendar", "set", 1);
        foreach (string property in new[] { "AMDesignator", "PMDesignator", "FirstDayOfWeek", "CalendarWeekRule", "Calendar" })
            Run("Supplementary.ReadOnlyValidationOrder", "invariant", property, "set", property is "FirstDayOfWeek" or "CalendarWeekRule" ? -1 : null);

        var transitions = new List<object>();
        foreach (string culture in new[] { "", "en-US", "fr-FR", "ru-RU", "fa-IR", "ar-SA", "th-TH" })
        foreach (int calendarId in new[] { 1, 2, 9, 10, 11, 12, 7, 22, 23 })
        {
            var info = (DateTimeFormatInfo)new CultureInfo(culture, false).DateTimeFormat.Clone();
            Customize(info);
            var assigned = Calendar(calendarId);
            Exception? error = null;
            try { info.Calendar = assigned; } catch (Exception exception) { error = exception; }
            transitions.Add(new { culture, calendarId, result = Snapshot(info), sameCalendar = ReferenceEquals(info.Calendar, assigned),
                error = error?.GetType().Name, paramName = (error as ArgumentException)?.ParamName,
                actualValue = (error as ArgumentOutOfRangeException)?.ActualValue?.ToString(), message = error?.Message });
        }
        var sameObject = new DateTimeFormatInfo();
        Customize(sameObject);
        sameObject.Calendar = sameObject.Calendar;
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", rows, transitions,
            sameObject = Snapshot(sameObject) }, new JsonSerializerOptions { WriteIndented = true }) + "\n";

        void Run(string source, string culture, string property, string action, object? value)
        {
            var info = culture == "invariant" ? DateTimeFormatInfo.InvariantInfo : culture == "new" ? new DateTimeFormatInfo()
                : new CultureInfo(culture, false).DateTimeFormat;
            var member = typeof(DateTimeFormatInfo).GetProperty(property)!;
            object? result = null;
            Exception? error = null;
            Calendar? assigned = null;
            try
            {
                if (action != "get")
                {
                    object? input = value;
                    if (property == "Calendar") input = assigned = value == null ? null : Calendar((int)value);
                    if (property == "FirstDayOfWeek") input = (DayOfWeek)(int)value!;
                    if (property == "CalendarWeekRule") input = (CalendarWeekRule)(int)value!;
                    member.SetValue(info, input);
                    if (action == "setTwice") member.SetValue(info, input);
                }
                result = member.GetValue(info);
                if (result is Calendar calendar) result = new { type = calendar.GetType().Name, isReadOnly = calendar.IsReadOnly, same = ReferenceEquals(calendar, assigned) };
            }
            catch (Exception exception) { error = exception is TargetInvocationException ? exception.InnerException! : exception; }
            object? actual = (error as ArgumentOutOfRangeException)?.ActualValue;
            if (actual is Calendar calendarValue) actual = calendarValue.ToString();
            rows.Add(new { source, culture, property, action, value, result, error = error?.GetType().Name,
                paramName = (error as ArgumentException)?.ParamName, actualValue = actual, message = error?.Message });
        }
    }

    private static Calendar Calendar(int id) => id switch {
        7 => new ThaiBuddhistCalendar(), 22 => new PersianCalendar(), 23 => new UmAlQuraCalendar(),
        _ => new GregorianCalendar((GregorianCalendarTypes)id),
    };

    private static void Customize(DateTimeFormatInfo info)
    {
        info.AMDesignator = "custom AM"; info.PMDesignator = "custom PM";
        info.FirstDayOfWeek = DayOfWeek.Wednesday; info.CalendarWeekRule = CalendarWeekRule.FirstFullWeek;
        info.DateSeparator = "custom date"; info.TimeSeparator = "custom time";
        info.LongDatePattern = "'custom long date' yyyy"; info.ShortDatePattern = "'custom short date' yyyy";
        info.MonthDayPattern = "'custom month day' MM dd"; info.YearMonthPattern = "'custom year month' yyyy MM";
        info.LongTimePattern = "'custom long time' HH:mm:ss"; info.ShortTimePattern = "'custom short time' HH:mm";
        info.FullDateTimePattern = "'custom full' yyyy";
        foreach (string property in new[] { "DayNames", "AbbreviatedDayNames", "ShortestDayNames", "MonthNames",
            "MonthGenitiveNames", "AbbreviatedMonthNames", "AbbreviatedMonthGenitiveNames" })
        {
            var member = typeof(DateTimeFormatInfo).GetProperty(property)!;
            var names = (string[])member.GetValue(info)!;
            names[0] = "custom " + property;
            member.SetValue(info, names);
        }
    }

    private static object Snapshot(DateTimeFormatInfo info)
    {
        var date = new DateTime(2024, 3, 20, 13, 14, 15, DateTimeKind.Utc);
        return new {
            calendar = info.Calendar.GetType().Name, nativeCalendarName = info.NativeCalendarName,
            amDesignator = info.AMDesignator, pmDesignator = info.PMDesignator,
            firstDayOfWeek = (int)info.FirstDayOfWeek, calendarWeekRule = (int)info.CalendarWeekRule,
            dateSeparator = info.DateSeparator, timeSeparator = info.TimeSeparator,
            longDatePattern = info.LongDatePattern, shortDatePattern = info.ShortDatePattern,
            monthDayPattern = info.MonthDayPattern, yearMonthPattern = info.YearMonthPattern,
            fullDateTimePattern = info.FullDateTimePattern, longTimePattern = info.LongTimePattern, shortTimePattern = info.ShortTimePattern,
            dayNames = info.DayNames, abbreviatedDayNames = info.AbbreviatedDayNames, shortestDayNames = info.ShortestDayNames,
            monthNames = info.MonthNames, monthGenitiveNames = info.MonthGenitiveNames,
            abbreviatedMonthNames = info.AbbreviatedMonthNames, abbreviatedMonthGenitiveNames = info.AbbreviatedMonthGenitiveNames,
            formats = new[] { "d", "D", "M", "Y", "F", "U", "gg yyyy MMMM dd dddd tt" }.ToDictionary(format => format, format => date.ToString(format, info)),
        };
    }
}
