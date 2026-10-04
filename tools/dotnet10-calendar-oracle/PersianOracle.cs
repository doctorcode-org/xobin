using System.Globalization;
using System.Text.Json;

internal static class PersianOracle
{
    internal static string Generate()
    {
        var rows = new List<string>();
        static string Ticks(DateTime date) => date.Ticks.ToString(CultureInfo.InvariantCulture);
        static object? Normalize(object? value) => value is DateTime date ? Ticks(date) : value;

        void Capture(string source, string operation, int? max, object[] arguments,
            Func<PersianCalendar, object?> apply)
        {
            try
            {
                var calendar = new PersianCalendar();
                if (max.HasValue) calendar.TwoDigitYearMax = max.Value;
                rows.Add(JsonSerializer.Serialize(new { source, operation, max, arguments,
                    result = Normalize(apply(calendar)), error = (string?)null, paramName = (string?)null,
                    message = (string?)null, actualValue = (object?)null }));
            }
            catch (ArgumentException error)
            {
                rows.Add(JsonSerializer.Serialize(new { source, operation, max, arguments,
                    result = (object?)null, error = error.GetType().Name, paramName = error.ParamName,
                    message = error.Message,
                    actualValue = (error as ArgumentOutOfRangeException)?.ActualValue is long ticks
                        ? ticks.ToString(CultureInfo.InvariantCulture)
                        : (error as ArgumentOutOfRangeException)?.ActualValue }));
            }
        }

        foreach (var (year, month) in new[] { (9378, 10), (1, 2), (5, 2) })
            Capture("PersianCalendarTests.IsLeapMonth", "isLeapMonthAllEras", null,
                [year, month], c => new[] { c.IsLeapMonth(year, month), c.IsLeapMonth(year, month, 0), c.IsLeapMonth(year, month, 1) });
        foreach (var (year, month, day) in new[] { (9378, 10, 1), (1, 2, 28), (5, 12, 30) })
            Capture("PersianCalendarTests.IsLeapDay", "isLeapDayAllEras", null,
                [year, month, day], c => new[] { c.IsLeapDay(year, month, day), c.IsLeapDay(year, month, day, 0), c.IsLeapDay(year, month, day, 1) });
        foreach (int year in new[] { 9378, 1, 5 })
        {
            Capture("PersianCalendarTests.GetLeapMonth", "getLeapMonthAllEras", null,
                [year], c => new[] { c.GetLeapMonth(year, 0), c.GetLeapMonth(year, 1) });
            Capture("PersianCalendarTests.GetDaysInYear", "getDaysInYearAllEras", null,
                [year], c => new[] { c.GetDaysInYear(year), c.GetDaysInYear(year, 0), c.GetDaysInYear(year, 1) });
            Capture("PersianCalendarTests.GetMonthsInYear", "getMonthsInYearAllEras", null,
                [year], c => new[] { c.GetMonthsInYear(year), c.GetMonthsInYear(year, 0), c.GetMonthsInYear(year, 1) });
        }
        foreach (DateTime date in new[] { DateTime.MinValue, new DateTime(5, 12, 30), DateTime.MaxValue })
            Capture("PersianCalendarTests.GetDayOfWeek", "getDayOfWeek", null,
                [Ticks(date)], c => (int)c.GetDayOfWeek(date));
        foreach (int value in new[] { 99, 2016, 9378 })
            Capture("PersianCalendarTests.TwoDigitYearMax_Set", "setTwoDigitYearMax", null,
                [value], c => { c.TwoDigitYearMax = value; return c.TwoDigitYearMax; });
        foreach (int year in new[] { 99, 100, 2016 })
            Capture("PersianCalendarTests.ToFourDigitYear", "toFourDigitYear", 1410,
                [year], c => c.ToFourDigitYear(year));

        var min = new DateTime(622, 3, 22);
        foreach (DateTime date in new[]
        {
            DateTime.MinValue, min.AddTicks(-1), min,
            new DateTime(2000, 3, 20), new DateTime(2024, 3, 20).AddTicks(1234), DateTime.MaxValue,
        })
        {
            var ticks = Ticks(date);
            Capture("PersianCalendar.Boundary", "getYear", null, [ticks], c => c.GetYear(date));
            Capture("PersianCalendar.Boundary", "getMonth", null, [ticks], c => c.GetMonth(date));
            Capture("PersianCalendar.Boundary", "getDayOfMonth", null, [ticks], c => c.GetDayOfMonth(date));
            Capture("PersianCalendar.Boundary", "getDayOfYear", null, [ticks], c => c.GetDayOfYear(date));
            Capture("PersianCalendar.Boundary", "getEra", null, [ticks], c => c.GetEra(date));
            Capture("PersianCalendar.Boundary", "getDayOfWeek", null, [ticks], c => (int)c.GetDayOfWeek(date));
            if (date >= min)
                foreach (CalendarWeekRule rule in Enum.GetValues<CalendarWeekRule>())
                    Capture("PersianCalendar.Boundary", "getWeekOfYear", null,
                        [ticks, (int)rule, 6], c => c.GetWeekOfYear(date, rule, DayOfWeek.Saturday));
        }

        foreach (var (date, months) in new[]
        {
            (min, 1), (DateTime.MaxValue, -1), (new DateTime(2024, 3, 20).AddTicks(1234), 12),
            (min, -1), (DateTime.MaxValue, 1), (new DateTime(2024, 3, 20), -120001),
        })
            Capture("PersianCalendar.Boundary", "addMonths", null,
                [Ticks(date), months], c => c.AddMonths(date, months));

        foreach (int year in new[] { -1, 0, 1, 5, 1403, 9378, 9379 })
            foreach (int era in new[] { 0, 1, 2 })
            {
                Capture("PersianCalendar.Boundary", "isLeapYear", null,
                    [year, era], c => c.IsLeapYear(year, era));
                Capture("PersianCalendar.Boundary", "getDaysInYear", null,
                    [year, era], c => c.GetDaysInYear(year, era));
                Capture("PersianCalendar.Boundary", "getMonthsInYear", null,
                    [year, era], c => c.GetMonthsInYear(year, era));
                Capture("PersianCalendar.Boundary", "getLeapMonth", null,
                    [year, era], c => c.GetLeapMonth(year, era));
                foreach (int month in new[] { 0, 1, 10, 11, 12, 13 })
                {
                    Capture("PersianCalendar.Boundary", "getDaysInMonth", null,
                        [year, month, era], c => c.GetDaysInMonth(year, month, era));
                    Capture("PersianCalendar.Boundary", "isLeapMonth", null,
                        [year, month, era], c => c.IsLeapMonth(year, month, era));
                }
            }

        foreach (var (year, month, day, hour, millisecond) in new[]
        {
            (1, 1, 1, 0, 0), (5, 12, 30, 0, 0), (9378, 10, 13, 23, 999),
            (0, 1, 1, 0, 0), (9378, 11, 1, 0, 0), (1403, 12, 31, 0, 0),
            (1403, 1, 1, 24, 0), (1403, 1, 1, 0, 1000),
        })
            foreach (int era in new[] { 0, 1, 2 })
            {
                Capture("PersianCalendar.Boundary", "isLeapDay", null,
                    [year, month, day, era], c => c.IsLeapDay(year, month, day, era));
                Capture("PersianCalendar.Boundary", "toDateTime", null,
                    [year, month, day, hour, 0, 0, millisecond, era],
                    c => c.ToDateTime(year, month, day, hour, 0, 0, millisecond, era));
            }

        Capture("PersianCalendar.Boundary", "getTwoDigitYearMax", null, [], c => c.TwoDigitYearMax);
        foreach (int value in new[] { 98, 99, 9378, 9379 })
            Capture("PersianCalendar.Boundary", "setTwoDigitYearMax", null,
                [value], c => { c.TwoDigitYearMax = value; return c.TwoDigitYearMax; });
        foreach (int year in new[] { -1, 0, 10, 99, 100, 9378, 9379 })
            Capture("PersianCalendar.Boundary", "toFourDigitYear", 1410,
                [year], c => c.ToFourDigitYear(year));
        Capture("PersianCalendar.Boundary", "getEras", null, [], c => c.Eras);

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row))
            + "\n  ]\n}\n";
    }
}
