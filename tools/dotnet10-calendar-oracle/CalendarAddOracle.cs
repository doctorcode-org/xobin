using System.Globalization;
using System.Text.Json;

internal static class CalendarAddOracle
{
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

        void Capture(string calendarName, Func<Calendar> make, string operation, string dateKind,
            int value, bool exactArgumentException = false, string? expectedParameter = null)
        {
            Calendar calendar = make();
            DateTime date = dateKind switch
            {
                "min" => calendar.MinSupportedDateTime,
                "max" => calendar.MaxSupportedDateTime,
                "now" => DateTime.Now,
                _ => throw new InvalidOperationException("Unknown date kind."),
            };
            try
            {
                _ = operation switch
                {
                    "AddYears_Invalid_ThrowsArgumentException" => calendar.AddYears(date, value),
                    "AddMonths_Invalid_ThrowsArgumentException" => calendar.AddMonths(date, value),
                    "AddDays_Invalid_ThrowsArgumentException" => calendar.AddDays(date, value),
                    "AddHours_Invalid_ThrowsArgumentException" => calendar.AddHours(date, value),
                    "AddMinutes_Invalid_ThrowsArgumentException" => calendar.AddMinutes(date, value),
                    "AddSeconds_Invalid_ThrowsArgumentException" => calendar.AddSeconds(date, value),
                    "AddMilliseconds_Invalid_ThrowsArgumentException" => calendar.AddMilliseconds(date, value),
                    _ => throw new InvalidOperationException("Unknown operation."),
                };
                throw new InvalidOperationException($"Expected an exception: {calendarName}/{operation}.");
            }
            catch (ArgumentException error)
            {
                if (exactArgumentException && error.GetType() != typeof(ArgumentException))
                    throw new InvalidOperationException($"Unexpected exception type: {calendarName}/{operation}.");
                if (expectedParameter != null &&
                    (error is not ArgumentOutOfRangeException || error.ParamName != expectedParameter))
                    throw new InvalidOperationException($"Unexpected parameter: {calendarName}/{operation}.");
                rows.Add(JsonSerializer.Serialize(new
                {
                    calendarName, operation, dateKind, value,
                    error = error.GetType().Name, paramName = error.ParamName,
                    message = error.Message, actualValue = (error as ArgumentOutOfRangeException)?.ActualValue,
                }));
            }
        }

        foreach (var (name, make) in calendars)
        {
            foreach (string operation in new[] {
                "AddYears_Invalid_ThrowsArgumentException",
                "AddMonths_Invalid_ThrowsArgumentException",
                "AddDays_Invalid_ThrowsArgumentException",
                "AddHours_Invalid_ThrowsArgumentException",
                "AddMinutes_Invalid_ThrowsArgumentException",
                "AddSeconds_Invalid_ThrowsArgumentException",
                "AddMilliseconds_Invalid_ThrowsArgumentException",
            })
            {
                bool exact = operation is not "AddYears_Invalid_ThrowsArgumentException"
                    and not "AddMonths_Invalid_ThrowsArgumentException";
                Capture(name, make, operation, "max", 1, exact);
                Capture(name, make, operation, "min", -1, exact);
                if (operation == "AddMonths_Invalid_ThrowsArgumentException")
                {
                    Capture(name, make, operation, "now", -120001, expectedParameter: "months");
                    Capture(name, make, operation, "now", 120001, expectedParameter: "months");
                }
                if (operation == "AddDays_Invalid_ThrowsArgumentException")
                {
                    Capture(name, make, operation, "now", -120001 * 30, exactArgumentException: true);
                    Capture(name, make, operation, "now", 120001 * 30, exactArgumentException: true);
                }
                if (operation == "AddHours_Invalid_ThrowsArgumentException")
                {
                    Capture(name, make, operation, "now", -120001 * 30 * 24, exactArgumentException: true);
                    Capture(name, make, operation, "now", 120001 * 30 * 24, exactArgumentException: true);
                }
            }
        }

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row)) + "\n  ]\n}\n";
    }
}
