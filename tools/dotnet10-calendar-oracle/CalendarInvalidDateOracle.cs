using System.Globalization;
using System.Text.Json;

internal static class CalendarInvalidDateOracle
{
    private static IEnumerable<(int year, int month, int day, int era, string parameter)> TestData(
        Calendar calendar, bool includeMonth, bool includeDay)
    {
        // These fixture inputs select single-era calendars.
        if (calendar.Eras.Length != 1)
            throw new InvalidOperationException("This oracle requires a single-era calendar.");

        int era = calendar.Eras[0];
        int year = calendar.GetYear(calendar.MaxSupportedDateTime) - 2;
        yield return (-1, 1, 1, era, "year");
        yield return (0, 1, 1, era, "year");
        yield return (calendar.GetYear(calendar.MaxSupportedDateTime) + 1, 1, 1, era, "year");

        if (includeMonth)
        {
            yield return (year, -1, 1, era, "month");
            yield return (year, 0, 1, era, "month");
            yield return (year, calendar.GetMonthsInYear(year, era) + 1, 1, era, "month");
        }
        if (includeDay)
        {
            yield return (year, 1, -1, era, "day");
            yield return (year, 1, 0, era, "day");
            yield return (year, 1, calendar.GetDaysInMonth(year, 1, era) + 1, era, "day");
        }

        yield return (calendar.GetYear(calendar.MinSupportedDateTime) - 1, 1, 1, era, "year");
        yield return (calendar.GetYear(calendar.MaxSupportedDateTime), 1, 1, era - 2, "era");
        yield return (calendar.GetYear(calendar.MaxSupportedDateTime), 1, 1, era + 1, "era");
    }

    internal static string Generate()
    {
        var rows = new List<string>();
        var calendars = new (string name, Func<Calendar> make)[]
        {
            ("GregorianCalendarDefaultTests", () => new GregorianCalendar()),
            ("GregorianCalendarArabicTests", () => new GregorianCalendar(GregorianCalendarTypes.Arabic)),
            ("GregorianCalendarLocalizedTests", () => new GregorianCalendar(GregorianCalendarTypes.Localized)),
            ("GregorianCalendarMiddleEastFrenchTests", () => new GregorianCalendar(GregorianCalendarTypes.MiddleEastFrench)),
            ("GregorianCalendarTransliteratedEnglishTests", () => new GregorianCalendar(GregorianCalendarTypes.TransliteratedEnglish)),
            ("GregorianCalendarTransliteratedFrenchTests", () => new GregorianCalendar(GregorianCalendarTypes.TransliteratedFrench)),
            ("GregorianCalendarUSEnglishTests", () => new GregorianCalendar(GregorianCalendarTypes.USEnglish)),
            ("PersianCalendarTests", () => new PersianCalendar()),
            ("ThaiBuddhistCalendarTests", () => new ThaiBuddhistCalendar()),
            ("KoreanCalendarTests", () => new KoreanCalendar()),
            ("UmAlQuraCalendarTests", () => new UmAlQuraCalendar()),
        };
        var operations = new (string name, bool month, bool day)[]
        {
            ("GetDaysInYear_Invalid_ThrowsArgumentOutOfRangeException", false, false),
            ("GetMonthsInYear_Invalid_ThrowsArgumentOutOfRangeException", false, false),
            ("GetDaysInMonth_Invalid_ThrowsArgumentOutOfRangeException", true, false),
            ("IsLeapDay_Invalid_ThrowsArgumentOutOfRangeException", true, true),
            ("IsLeapMonth_Invalid_ThrowsArgumentOutOfRangeException", true, false),
            ("IsLeapYear_Invalid_ThrowsArgumentOutOfRangeException", false, false),
            ("GetLeapMonth_Invalid_ThrowsArgumentOutOfRangeException", false, false),
        };

        foreach (var (calendarName, make) in calendars)
            foreach (var (operation, month, day) in operations)
                foreach (var test in TestData(make(), month, day))
                {
                    var calendar = make();
                    try
                    {
                        _ = operation switch
                        {
                            "GetDaysInYear_Invalid_ThrowsArgumentOutOfRangeException" => (object)calendar.GetDaysInYear(test.year, test.era),
                            "GetMonthsInYear_Invalid_ThrowsArgumentOutOfRangeException" => calendar.GetMonthsInYear(test.year, test.era),
                            "GetDaysInMonth_Invalid_ThrowsArgumentOutOfRangeException" => calendar.GetDaysInMonth(test.year, test.month, test.era),
                            "IsLeapDay_Invalid_ThrowsArgumentOutOfRangeException" => calendar.IsLeapDay(test.year, test.month, test.day, test.era),
                            "IsLeapMonth_Invalid_ThrowsArgumentOutOfRangeException" => calendar.IsLeapMonth(test.year, test.month, test.era),
                            "IsLeapYear_Invalid_ThrowsArgumentOutOfRangeException" => calendar.IsLeapYear(test.year, test.era),
                            "GetLeapMonth_Invalid_ThrowsArgumentOutOfRangeException" => calendar.GetLeapMonth(test.year, test.era),
                            _ => throw new InvalidOperationException("Unknown operation."),
                        };
                        throw new InvalidOperationException($"Expected an exception: {calendarName}/{operation}.");
                    }
                    catch (ArgumentOutOfRangeException error)
                    {
                        if (error.ParamName != test.parameter)
                            throw new InvalidOperationException($"Unexpected parameter: {calendarName}/{operation}.");
                        rows.Add(JsonSerializer.Serialize(new {
                            calendarName, operation, arguments = new[] { test.year, test.month, test.day, test.era },
                            error = error.GetType().Name, paramName = error.ParamName,
                            message = error.Message, actualValue = error.ActualValue,
                        }));
                    }
                }

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row)) + "\n  ]\n}\n";
    }
}
