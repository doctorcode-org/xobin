using System.Globalization;
using System.Text.Json;

// Inputs from the Clone, ReadOnly, GetInstance and GetFormat tests in runtime v10.0.7.
internal static class DateTimeFormatInfoOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        foreach (string input in new[] { "new", "en-US", "fr-FR", "invariant" })
        {
            var original = Create(input);
            var clone = (DateTimeFormatInfo)original.Clone();
            rows.Add(new { source = "DateTimeFormatInfoClone.Clone_Invoke_ReturnsExpected", input,
                original = Snapshot(original), result = Snapshot(clone), same = ReferenceEquals(original, clone),
                sameCalendar = ReferenceEquals(original.Calendar, clone.Calendar) });
        }
        foreach (string input in new[] { "invariant", "readOnly", "new", "en-US" })
        {
            var original = Create(input);
            var result = DateTimeFormatInfo.ReadOnly(original);
            rows.Add(new { source = "DateTimeFormatInfoReadOnly.ReadOnly_Invoke_ReturnsExpected", input,
                original = Snapshot(original), result = Snapshot(result), same = ReferenceEquals(original, result),
                sameCalendar = ReferenceEquals(original.Calendar, result.Calendar) });
        }
        foreach (string input in new[] { "new", "en-US", "provider" })
        {
            IFormatProvider provider = input == "en-US" ? new CultureInfo(input)
                : input == "provider" ? new InfoProvider() : new DateTimeFormatInfo();
            rows.Add(new { source = "DateTimeFormatInfoGetInstance.GetInstance_ValidNonNullProvider_ReturnsExpected", input,
                result = Snapshot(DateTimeFormatInfo.GetInstance(provider)) });
        }
        var info = new DateTimeFormatInfo();
        var defaultInfo = Snapshot(info);
        var errors = new List<object>();
        Capture("null", () => DateTimeFormatInfo.ReadOnly(null!));
        foreach (string property in new[] { "AMDesignator", "PMDesignator", "Calendar", "CalendarWeekRule", "FirstDayOfWeek",
            "DayNames", "AbbreviatedDayNames", "ShortestDayNames", "MonthNames", "MonthGenitiveNames",
            "AbbreviatedMonthNames", "AbbreviatedMonthGenitiveNames", "DateSeparator", "TimeSeparator", "FullDateTimePattern",
            "LongDatePattern", "LongTimePattern", "ShortDatePattern", "ShortTimePattern", "MonthDayPattern", "YearMonthPattern" })
        {
            var readOnly = DateTimeFormatInfo.ReadOnly(new DateTimeFormatInfo());
            var member = typeof(DateTimeFormatInfo).GetProperty(property)!;
            Capture(property, () => { member.SetValue(readOnly, member.GetValue(readOnly)); return readOnly; });
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", defaultInfo, rows, errors },
            new JsonSerializerOptions { WriteIndented = true }) + "\n";

        void Capture(string property, Func<object> action)
        {
            try { action(); throw new InvalidOperationException("Expected an exception."); }
            catch (Exception exception)
            {
                Exception error = exception is System.Reflection.TargetInvocationException ? exception.InnerException! : exception;
                errors.Add(new { property, error = error.GetType().Name, message = error.Message, paramName = (error as ArgumentException)?.ParamName });
            }
        }
    }

    private static DateTimeFormatInfo Create(string input) => input switch {
        "new" => new DateTimeFormatInfo(),
        "readOnly" => DateTimeFormatInfo.ReadOnly(new DateTimeFormatInfo()),
        "invariant" => DateTimeFormatInfo.InvariantInfo,
        _ => new CultureInfo(input).DateTimeFormat,
    };

    private sealed class InfoProvider : IFormatProvider
    {
        public object GetFormat(Type? formatType) => new DateTimeFormatInfo();
    }

    private static object Snapshot(DateTimeFormatInfo info) => new {
        abbreviatedDayNames = info.AbbreviatedDayNames, abbreviatedMonthGenitiveNames = info.AbbreviatedMonthGenitiveNames,
        abbreviatedMonthNames = info.AbbreviatedMonthNames, amDesignator = info.AMDesignator, calendarWeekRule = (int)info.CalendarWeekRule,
        dateSeparator = info.DateSeparator, dayNames = info.DayNames, firstDayOfWeek = (int)info.FirstDayOfWeek,
        fullDateTimePattern = info.FullDateTimePattern, longDatePattern = info.LongDatePattern, longTimePattern = info.LongTimePattern,
        monthDayPattern = info.MonthDayPattern, monthGenitiveNames = info.MonthGenitiveNames, monthNames = info.MonthNames,
        nativeCalendarName = info.NativeCalendarName, pmDesignator = info.PMDesignator, rfc1123Pattern = info.RFC1123Pattern,
        shortDatePattern = info.ShortDatePattern, shortestDayNames = info.ShortestDayNames, shortTimePattern = info.ShortTimePattern,
        sortableDateTimePattern = info.SortableDateTimePattern, timeSeparator = info.TimeSeparator,
        universalSortableDateTimePattern = info.UniversalSortableDateTimePattern, yearMonthPattern = info.YearMonthPattern,
        isReadOnly = info.IsReadOnly, calendar = info.Calendar.GetType().Name, calendarIsReadOnly = info.Calendar.IsReadOnly,
    };
}
