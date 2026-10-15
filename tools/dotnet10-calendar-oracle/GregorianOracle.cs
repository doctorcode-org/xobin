using System.Globalization;
using System.Text.Json;

internal static class GregorianOracle
{
    internal static string Generate()
    {
        var rows = new List<string>();
        static object? Normalize(object? value) => value is DateTime date
            ? date.Ticks.ToString(CultureInfo.InvariantCulture)
            : value;

        void Capture(string source, string operation, int calendarType, int? max, object[] arguments,
            Func<GregorianCalendar, object?> apply)
        {
            try
            {
                var calendar = new GregorianCalendar((GregorianCalendarTypes)calendarType);
                if (max.HasValue) calendar.TwoDigitYearMax = max.Value;
                rows.Add(JsonSerializer.Serialize(new { source, operation, calendarType, max, arguments,
                    result = Normalize(apply(calendar)), error = (string?)null, paramName = (string?)null,
                    message = (string?)null, actualValue = (object?)null }));
            }
            catch (ArgumentException error)
            {
                rows.Add(JsonSerializer.Serialize(new { source, operation, calendarType, max, arguments,
                    result = (object?)null, error = error.GetType().Name, paramName = error.ParamName,
                    message = error.Message, actualValue = (error as ArgumentOutOfRangeException)?.ActualValue }));
            }
        }

        static string Ticks(DateTime date) => date.Ticks.ToString(CultureInfo.InvariantCulture);
        DateTime[] dates =
        [
            DateTime.MinValue, new DateTime(1996, 2, 29, 10, 30, 24),
            new DateTime(2000, 2, 29, 10, 30, 24).AddTicks(1234),
            new DateTime(2024, 1, 1), new DateTime(2024, 12, 31), DateTime.MaxValue,
        ];

        foreach (DateTime date in dates)
        {
            string ticks = Ticks(date);
            Capture("GregorianCalendarGetDayOfMonth.GetDayOfMonth", "getDayOfMonth", 1, null, [ticks], c => c.GetDayOfMonth(date));
            Capture("GregorianCalendarGetDayOfWeek.GetDayOfWeek", "getDayOfWeek", 1, null, [ticks], c => (int)c.GetDayOfWeek(date));
            Capture("GregorianCalendarGetDayOfYear.GetDayOfYear", "getDayOfYear", 1, null, [ticks], c => c.GetDayOfYear(date));
            Capture("GregorianCalendarGetEra.GetEra", "getEra", 1, null, [ticks], c => c.GetEra(date));
            Capture("GregorianCalendarGetMonth.GetMonth", "getMonth", 1, null, [ticks], c => c.GetMonth(date));
            Capture("GregorianCalendarGetYear.GetYear", "getYear", 1, null, [ticks], c => c.GetYear(date));
            foreach (CalendarWeekRule rule in Enum.GetValues<CalendarWeekRule>())
            {
                foreach (DayOfWeek firstDay in new[] { DayOfWeek.Sunday, DayOfWeek.Monday, DayOfWeek.Saturday })
                    Capture("GregorianCalendarGetWeekOfYears.GetWeekOfYear", "getWeekOfYear", 1, null,
                        [ticks, (int)rule, (int)firstDay], c => c.GetWeekOfYear(date, rule, firstDay));
            }
        }

        foreach (var (date, months) in new[]
        {
            (DateTime.MinValue, 1), (DateTime.MaxValue, -1),
            (new DateTime(1996, 2, 29, 10, 30, 24), 48),
            (new DateTime(2000, 2, 29, 10, 30, 24).AddTicks(1234), 13),
            (new DateTime(2024, 1, 31, 12, 0, 0), 1),
            (new DateTime(2024, 3, 31), -1),
            (new DateTime(2024, 3, 20), 0),
            (DateTime.MinValue, -1), (DateTime.MaxValue, 1),
            (new DateTime(2024, 3, 20), -120001), (new DateTime(2024, 3, 20), 120001),
        })
            Capture("GregorianCalendarAddMonths.AddMonths", "addMonths", 1, null,
                [Ticks(date), months], c => c.AddMonths(date, months));

        foreach (var (date, years) in new[]
        {
            (DateTime.MinValue, 100), (DateTime.MaxValue, -99),
            (new DateTime(1996, 2, 29, 10, 30, 24), 4),
            (new DateTime(2000, 2, 29, 10, 30, 24).AddTicks(1234), 13),
            (new DateTime(1999, 2, 28, 10, 30, 24), 48),
            (new DateTime(2024, 3, 20), 0),
            (DateTime.MinValue, -1), (DateTime.MaxValue, 1),
        })
            Capture("GregorianCalendarAddYears.AddYears", "addYears", 1, null,
                [Ticks(date), years], c => c.AddYears(date, years));

        foreach (int year in new[] { 0, 1, 4, 100, 400, 1900, 1996, 2000, 2023, 2024, 9999, 10000 })
        {
            foreach (int era in new[] { 0, 1, 2 })
            {
                Capture("GregorianCalendarGetDaysInYear.GetDaysInYear", "getDaysInYear", 1, null,
                    [year, era], c => c.GetDaysInYear(year, era));
                Capture("GregorianCalendarGetMonthsInYear.GetMonthsInYear", "getMonthsInYear", 1, null,
                    [year, era], c => c.GetMonthsInYear(year, era));
                Capture("GregorianCalendarIsLeapYear.IsLeapYearTest", "isLeapYear", 1, null,
                    [year, era], c => c.IsLeapYear(year, era));
                Capture("GregorianCalendarGetLeapMonth.GetLeapMonth", "getLeapMonth", 1, null,
                    [year, era], c => c.GetLeapMonth(year, era));
                foreach (int month in new[] { 0, 1, 2, 12, 13 })
                {
                    Capture("GregorianCalendarGetDaysInMonth.GetDaysInMonth", "getDaysInMonth", 1, null,
                        [year, month, era], c => c.GetDaysInMonth(year, month, era));
                    Capture("GregorianCalendarIsLeapMonth.IsLeapMonth", "isLeapMonth", 1, null,
                        [year, month, era], c => c.IsLeapMonth(year, month, era));
                }
            }
        }

        foreach (var (year, month, day) in new[]
        {
            (0, 1, 1), (2024, 0, 1), (2024, 2, 28), (2024, 2, 29),
            (2024, 2, 30), (1900, 2, 29), (2000, 2, 29), (9999, 12, 31),
        })
            foreach (int era in new[] { 0, 1, 2 })
                Capture("GregorianCalendarIsLeapDay.IsLeapDay", "isLeapDay", 1, null,
                    [year, month, day, era], c => c.IsLeapDay(year, month, day, era));

        foreach (var (year, month, day, hour, minute, second, millisecond) in new[]
        {
            (1, 1, 1, 0, 0, 0, 0), (1600, 1, 1, 0, 0, 0, 0),
            (2000, 2, 29, 10, 30, 24, 123), (9999, 12, 31, 23, 59, 59, 999),
            (0, 1, 1, 0, 0, 0, 0), (2024, 13, 1, 0, 0, 0, 0),
            (2024, 2, 30, 0, 0, 0, 0), (2024, 3, 20, 24, 0, 0, 0),
            (2024, 3, 20, 0, 0, 0, 1000),
        })
            foreach (int era in new[] { 0, 1, 2 })
                Capture("GregorianCalendarToDateTime.ToDateTime", "toDateTime", 1, null,
                    [year, month, day, hour, minute, second, millisecond, era],
                    c => c.ToDateTime(year, month, day, hour, minute, second, millisecond, era));

        foreach (int type in new[] { 1, 2, 9, 10, 11, 12 })
        {
            Capture("GregorianCalendarTwoDigitYearMax.TwoDigitYearMax", "getTwoDigitYearMax", type, null,
                [], c => c.TwoDigitYearMax);
            foreach (int max in new[] { 98, 99, 2029, 2049, 9999, 10000 })
                Capture("GregorianCalendarTwoDigitYearMax.TwoDigitYearMax", "setTwoDigitYearMax", type, null,
                    [max], c => { c.TwoDigitYearMax = max; return c.TwoDigitYearMax; });
            foreach (int year in new[] { -1, 0, 29, 30, 99, 100, 2024, 9999, 10000 })
            {
                Capture("GregorianCalendarToFourDigitYear.ToFourDigitYear", "toFourDigitYear", type, null,
                    [year], c => c.ToFourDigitYear(year));
                Capture("GregorianCalendarToFourDigitYear.ToFourDigitYear", "toFourDigitYear", type, 2049,
                    [year], c => c.ToFourDigitYear(year));
            }
        }

        foreach (int type in new[] { 0, 1, 2, 9, 10, 11, 12, 13 })
        {
            Capture("GregorianCalendarTests.Constructor", "constructor", type, null, [], c => (int)c.CalendarType);
            if (type is 1 or 2 or 9 or 10 or 11 or 12)
                foreach (int value in new[] { 0, 1, 2, 9, 10, 11, 12, 13 })
                    Capture("GregorianCalendarTests.CalendarType", "setCalendarType", type, null,
                        [value], c => { c.CalendarType = (GregorianCalendarTypes)value; return (int)c.CalendarType; });
        }

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row))
            + "\n  ]\n}\n";
    }
}
