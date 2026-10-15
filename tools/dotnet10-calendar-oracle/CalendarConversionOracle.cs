using System.Globalization;
using System.Text.Json;

internal static class CalendarConversionOracle
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
            ("TaiwanCalendarTests", () => new TaiwanCalendar()),
            ("JapaneseCalendarTests", () => new JapaneseCalendar()),
            ("JulianCalendarTests", () => new JulianCalendar()),
            ("HijriCalendarTests", () => new HijriCalendar()),
            ("HebrewCalendarTests", () => new HebrewCalendar()),
            ("ChineseLunisolarCalendarTests", () => new ChineseLunisolarCalendar()),
            ("JapaneseLunisolarTests", () => new JapaneseLunisolarCalendar()),
            ("KoreanLunisolarCalendarTests", () => new KoreanLunisolarCalendar()),
            ("TaiwanLunisolarTests", () => new TaiwanLunisolarCalendar()),
            ("UmAlQuraCalendarTests", () => new UmAlQuraCalendar()),
        };

        void Capture(string calendarName, string operation, int[] arguments, Func<Calendar, object?> invoke,
            Func<Calendar> make, string? expectedParameter = null)
        {
            try
            {
                _ = invoke(make());
                throw new InvalidOperationException($"Expected an exception: {calendarName}/{operation}.");
            }
            catch (ArgumentOutOfRangeException error)
            {
                if (expectedParameter != null && error.ParamName != expectedParameter)
                    throw new InvalidOperationException($"Unexpected parameter: {calendarName}/{operation}.");
                rows.Add(JsonSerializer.Serialize(new {
                    calendarName, operation, arguments, error = error.GetType().Name,
                    paramName = error.ParamName, message = error.Message, actualValue = error.ActualValue,
                }));
            }
        }

        foreach (var (name, make) in calendars)
        {
            Calendar calendar = make();

            int era = calendar.Eras[0];
            int maxYear = calendar.GetYear(calendar.MaxSupportedDateTime);
            int minYear = calendar.GetYear(calendar.MinSupportedDateTime);
            int year = maxYear - 2;

            void Date(int y, int mo, int d, int h, int mi, int s, int ms, int e)
                => Capture(name, "ToDateTime_Invalid_ThrowsArgumentOutOfRangeException",
                    [y, mo, d, h, mi, s, ms, e],
                    c => c.ToDateTime(y, mo, d, h, mi, s, ms, e), make);

            foreach (int currentEra in calendar.Eras)
            {
                era = currentEra;
                year = CalendarReferenceInputs.MaxCalendarYearInEra(calendar, era) - 2;
                // CalendarTestBase.ToDateTime_Invalid_ThrowsArgumentOutOfRangeException.
                Date(-1, 1, 1, 1, 1, 1, 1, era);
                Date(0, 1, 1, 1, 1, 1, 1, era);
                Date(CalendarReferenceInputs.MaxCalendarYearInEras(calendar, era) + 1, 1, 1, 1, 1, 1, 1, era);
                Date(year, -1, 1, 1, 1, 1, 1, era);
                Date(year, 0, 1, 1, 1, 1, 1, era);
                Date(year, calendar.GetMonthsInYear(year, era) + 1, 1, 1, 1, 1, 1, era);
                Date(year, 1, -1, 1, 1, 1, 1, era);
                Date(year, 1, 0, 1, 1, 1, 1, era);
                Date(year, 1, calendar.GetDaysInMonth(year, 1, era) + 1, 1, 1, 1, 1, era);
                Date(year, 1, 1, -1, 1, 1, 1, era);
                Date(year, 1, 1, 60, 1, 1, 1, era);
                Date(year, 1, 1, 1, -1, 1, 1, era);
                Date(year, 1, 1, 1, 60, 1, 1, era);
                Date(year, 1, 1, 1, 1, -1, 1, era);
                Date(year, 1, 1, 1, 1, 60, 1, era);
                Date(year, 1, 1, 1, 1, 1, -1, era);
                Date(year, 1, 1, 1, 1, 1, 1000, era);
            }
            era = calendar.Eras[0];
            int minEra = CalendarReferenceInputs.MinEra(calendar);
            minYear = CalendarReferenceInputs.MinCalendarYearInEra(calendar, minEra);
            Date(minYear - 1, 1, 1, 1, 1, 1, 1, minEra);
            Date(maxYear, 1, 1, 1, 1, 1, 1, minEra - 2);
            Date(maxYear, 1, 1, 1, 1, 1, 1, era + 1);
            var minDate = CalendarReferenceInputs.GetCalendarMinSupportedDateTime(calendar);
            Date(minYear - 1, minDate.Month, minDate.Day,
                calendar.MinSupportedDateTime.Hour, calendar.MinSupportedDateTime.Minute,
                calendar.MinSupportedDateTime.Second, calendar.MinSupportedDateTime.Millisecond, minEra);
            Date(maxYear + 1, calendar.MaxSupportedDateTime.Month, calendar.MaxSupportedDateTime.Day,
                calendar.MaxSupportedDateTime.Hour, calendar.MaxSupportedDateTime.Minute,
                calendar.MaxSupportedDateTime.Second, calendar.MaxSupportedDateTime.Millisecond, era);

            // CalendarTestBase.ToFourDigitYear_Invalid_ThrowsArgumentOutOfRangeException.
            foreach (int value in calendar is JapaneseLunisolarCalendar ? new[] { -1, maxYear + 1 } : new[] { -1, maxYear + 1, minYear - 2 })
                Capture(name, "ToFourDigitYear_Invalid_ThrowsArgumentOutOfRangeException", [value],
                    c => c.ToFourDigitYear(value), make, "year");

            // CalendarTestBase.TwoDigitYearMax_Invalid_ThrowsArgumentOutOfRangeException.
            int max = Math.Max(calendar.MaxSupportedDateTime.Year, maxYear);
            foreach (int value in new[] { 98, max + 1 })
                Capture(name, "TwoDigitYearMax_Invalid_ThrowsArgumentOutOfRangeException", [value],
                    c => { c.TwoDigitYearMax = value; return c.TwoDigitYearMax; }, make);
        }

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row)) + "\n  ]\n}\n";
    }
}
