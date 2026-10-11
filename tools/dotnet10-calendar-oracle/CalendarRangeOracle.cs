using System.Globalization;
using System.Text.Json;

internal static class CalendarRangeOracle
{
    internal static string Generate()
    {
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
        string[] operations = ["GetEra", "GetYear", "GetMonth", "GetDayOfYear", "GetDayOfMonth", "GetDayOfWeek"];
        var cases = new List<string>();

        foreach (var (calendarName, make) in calendars)
        {
            Calendar calendar = make();
            var dates = new List<(string kind, DateTime date)>();
            if (calendar.MinSupportedDateTime != DateTime.MinValue)
                dates.Add(("beforeMin", calendar.MinSupportedDateTime.AddDays(-1)));
            if (calendar.MaxSupportedDateTime != DateTime.MaxValue)
                dates.Add(("afterMax", calendar.MaxSupportedDateTime.AddDays(1)));

            foreach (string operation in operations)
            {
                var rows = new List<object>();
                foreach (var (kind, date) in dates)
                {
                    try
                    {
                        int result = operation switch
                        {
                            "GetEra" => calendar.GetEra(date),
                            "GetYear" => calendar.GetYear(date),
                            "GetMonth" => calendar.GetMonth(date),
                            "GetDayOfYear" => calendar.GetDayOfYear(date),
                            "GetDayOfMonth" => calendar.GetDayOfMonth(date),
                            "GetDayOfWeek" => (int)calendar.GetDayOfWeek(date),
                            _ => throw new InvalidOperationException("Unknown operation."),
                        };
                        if (operation != "GetDayOfWeek" ||
                            calendar is not (PersianCalendar or UmAlQuraCalendar))
                            throw new InvalidOperationException($"Expected an exception: {calendarName}/{operation}/{kind}.");
                        rows.Add(new { kind, ticks = date.Ticks.ToString(), result,
                            error = (string?)null, paramName = (string?)null,
                            message = (string?)null, actualValue = (string?)null });
                    }
                    catch (ArgumentOutOfRangeException error)
                    {
                        if (operation == "GetDayOfWeek" &&
                            calendar is PersianCalendar or UmAlQuraCalendar)
                            throw new InvalidOperationException($"Expected a result: {calendarName}/{operation}/{kind}.");
                        if (operation != "GetEra" && error.ParamName != "time")
                            throw new InvalidOperationException($"Unexpected parameter: {calendarName}/{operation}/{kind}.");
                        rows.Add(new { kind, ticks = date.Ticks.ToString(), result = (int?)null,
                            error = (string?)error.GetType().Name, paramName = error.ParamName,
                            message = error.Message, actualValue = error.ActualValue?.ToString() });
                    }
                }
                cases.Add(JsonSerializer.Serialize(new { calendarName, operation, rows }));
            }
        }

        return "{\n  \"runtime\": \"10.0.7\",\n  \"cases\": [\n"
            + string.Join(",\n", cases.Select(testCase => "    " + testCase)) + "\n  ]\n}\n";
    }
}
