using System.Globalization;
using System.Text.Json;

internal static class ThaiBuddhistOracle
{
    internal static string Generate()
    {
        var rows = new List<string>();
        static string Ticks(DateTime date) => date.Ticks.ToString(CultureInfo.InvariantCulture);
        static object? Normalize(object? value) => value is DateTime date ? Ticks(date) : value;

        void Capture(string source, string operation, int? max, object[] arguments,
            Func<ThaiBuddhistCalendar, object?> apply)
        {
            try
            {
                var calendar = new ThaiBuddhistCalendar();
                if (max.HasValue) calendar.TwoDigitYearMax = max.Value;
                rows.Add(JsonSerializer.Serialize(new { source, operation, max, arguments,
                    result = Normalize(apply(calendar)), error = (string?)null, paramName = (string?)null,
                    message = (string?)null, actualValue = (object?)null }));
            }
            catch (ArgumentException error)
            {
                rows.Add(JsonSerializer.Serialize(new { source, operation, max, arguments,
                    result = (object?)null, error = error.GetType().Name, paramName = error.ParamName,
                    message = error.Message, actualValue = (error as ArgumentOutOfRangeException)?.ActualValue }));
            }
        }

        DateTime[] dates =
        [
            DateTime.MinValue, new DateTime(1996, 2, 29, 10, 30, 24),
            new DateTime(2000, 2, 29, 10, 30, 24).AddTicks(1234),
            new DateTime(2024, 1, 1), new DateTime(2024, 12, 31), DateTime.MaxValue,
        ];
        foreach (DateTime date in dates)
        {
            string ticks = Ticks(date);
            Capture("ThaiBuddhistCalendarGetDayOfMonth.GetDayOfMonth", "getDayOfMonth", null, [ticks], c => c.GetDayOfMonth(date));
            Capture("ThaiBuddhistCalendarGetDayOfWeek.GetDayOfWeek", "getDayOfWeek", null, [ticks], c => (int)c.GetDayOfWeek(date));
            Capture("ThaiBuddhistCalendarGetDayOfYear.GetDayOfYear", "getDayOfYear", null, [ticks], c => c.GetDayOfYear(date));
            Capture("ThaiBuddhistCalendarGetEra.GetEra", "getEra", null, [ticks], c => c.GetEra(date));
            Capture("ThaiBuddhistCalendarGetMonth.GetMonth", "getMonth", null, [ticks], c => c.GetMonth(date));
            Capture("ThaiBuddhistCalendarGetYear.GetYear", "getYear", null, [ticks], c => c.GetYear(date));
            foreach (CalendarWeekRule rule in Enum.GetValues<CalendarWeekRule>())
                foreach (DayOfWeek firstDay in new[] { DayOfWeek.Sunday, DayOfWeek.Monday, DayOfWeek.Saturday })
                    Capture("ThaiBuddhistCalendarGetWeekOfYear.GetWeekOfYear", "getWeekOfYear", null,
                        [ticks, (int)rule, (int)firstDay], c => c.GetWeekOfYear(date, rule, firstDay));
        }

        var thaiFormat = new CultureInfo("th-TH").DateTimeFormat;
        var lastDay = new DateTime(new Random(-55).Next(1, 9999), 12, 31);
        Capture("ThaiBuddhistCalendarGetWeekOfYear.GetWeekOfYear_LastDayOfYear", "getWeekOfYear", null,
            [Ticks(lastDay), (int)thaiFormat.CalendarWeekRule, (int)thaiFormat.FirstDayOfWeek],
            c => c.GetWeekOfYear(lastDay, thaiFormat.CalendarWeekRule, thaiFormat.FirstDayOfWeek));

        foreach (var (date, months) in new[]
        {
            (DateTime.MinValue, 1), (DateTime.MaxValue, -1),
            (new DateTime(1996, 2, 29, 10, 30, 24), 48),
            (new DateTime(2000, 2, 29, 10, 30, 24).AddTicks(1234), 13),
            (new DateTime(2024, 1, 31, 12, 0, 0), 1), (new DateTime(2024, 3, 31), -1),
            (DateTime.MinValue, -1), (DateTime.MaxValue, 1),
            (new DateTime(2024, 3, 20), -120001), (new DateTime(2024, 3, 20), 120001),
        })
            Capture("ThaiBuddhistCalendarAddMonths.AddMonths", "addMonths", null,
                [Ticks(date), months], c => c.AddMonths(date, months));

        foreach (var (date, years) in new[]
        {
            (DateTime.MinValue, 100), (DateTime.MaxValue, -99),
            (new DateTime(1996, 2, 29, 10, 30, 24), 4),
            (new DateTime(2000, 2, 29, 10, 30, 24).AddTicks(1234), 13),
            (DateTime.MinValue, -1), (DateTime.MaxValue, 1),
        })
            Capture("ThaiBuddhistCalendarAddYears.AddYears", "addYears", null,
                [Ticks(date), years], c => c.AddYears(date, years));

        foreach (int year in new[] { -1, 0, 1, 543, 544, 545, 2443, 2543, 2566, 2567, 10542, 10543 })
            foreach (int era in new[] { 0, 1, 2 })
            {
                Capture("ThaiBuddhistCalendarGetDaysInYear.GetDaysInYear", "getDaysInYear", null,
                    [year, era], c => c.GetDaysInYear(year, era));
                Capture("ThaiBuddhistCalendarGetMonthsInYear.GetMonthsInYear", "getMonthsInYear", null,
                    [year, era], c => c.GetMonthsInYear(year, era));
                Capture("ThaiBuddhistCalendarIsLeapYear.IsLeapYear", "isLeapYear", null,
                    [year, era], c => c.IsLeapYear(year, era));
                Capture("ThaiBuddhistCalendarGetLeapMonth.GetLeapMonth", "getLeapMonth", null,
                    [year, era], c => c.GetLeapMonth(year, era));
                foreach (int month in new[] { 0, 1, 2, 12, 13 })
                {
                    Capture("ThaiBuddhistCalendarGetDaysInMonth.GetDaysInMonth", "getDaysInMonth", null,
                        [year, month, era], c => c.GetDaysInMonth(year, month, era));
                    Capture("ThaiBuddhistCalendarIsLeapMonth.IsLeapMonth", "isLeapMonth", null,
                        [year, month, era], c => c.IsLeapMonth(year, month, era));
                }
            }

        foreach (var (year, month, day) in new[]
        {
            (543, 1, 1), (544, 1, 1), (2567, 0, 1), (2567, 2, 28),
            (2567, 2, 29), (2567, 2, 30), (2443, 2, 29), (10542, 12, 31),
        })
            foreach (int era in new[] { 0, 1, 2 })
                Capture("ThaiBuddhistCalendarIsLeapDay.IsLeapDay", "isLeapDay", null,
                    [year, month, day, era], c => c.IsLeapDay(year, month, day, era));

        foreach (var (year, month, day, hour, minute, second, millisecond) in new[]
        {
            (544, 1, 1, 0, 0, 0, 0), (2543, 2, 29, 10, 30, 24, 123),
            (10542, 12, 31, 23, 59, 59, 999), (543, 1, 1, 0, 0, 0, 0),
            (10543, 1, 1, 0, 0, 0, 0), (2567, 13, 1, 0, 0, 0, 0),
            (2567, 2, 30, 0, 0, 0, 0), (2567, 3, 20, 24, 0, 0, 0),
            (2567, 3, 20, 0, 0, 0, 1000),
        })
            foreach (int era in new[] { 0, 1, 2 })
                Capture("ThaiBuddhistCalendarToDateTime.ToDateTime", "toDateTime", null,
                    [year, month, day, hour, minute, second, millisecond, era],
                    c => c.ToDateTime(year, month, day, hour, minute, second, millisecond, era));

        Capture("ThaiBuddhistCalendarTwoDigitYearMax.TwoDigitYearMax_Get", "getTwoDigitYearMax", null,
            [], c => c.TwoDigitYearMax);
        foreach (int value in new[] { 98, 99, 2029, 2572, 10542, 10543 })
            Capture("ThaiBuddhistCalendarTwoDigitYearMax.TwoDigitYearMax_Set", "setTwoDigitYearMax", null,
                [value], c => { c.TwoDigitYearMax = value; return c.TwoDigitYearMax; });
        foreach (int year in new[] { -1, 0, 46, 49, 50, 99, 100, 5139, 10542, 10543 })
            foreach (int max in new[] { 2049, 2572 })
                Capture("ThaiBuddhistCalendarToFourDigitYear.ToFourDigitYear", "toFourDigitYear", max,
                    [year], c => c.ToFourDigitYear(year));

        Capture("ThaiBuddhistCalendar.Eras", "getEras", null, [], c => c.Eras);
        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row))
            + "\n  ]\n}\n";
    }
}
