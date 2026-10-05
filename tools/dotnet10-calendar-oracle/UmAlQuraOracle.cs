using System.Globalization;
using System.Text.Json;

internal static class UmAlQuraOracle
{
    internal static string Generate()
    {
        var rows = new List<string>();
        static string Ticks(DateTime date) => date.Ticks.ToString(CultureInfo.InvariantCulture);
        static object? Normalize(object? value) => value is DateTime date ? Ticks(date) : value;

        void Capture(string operation, object[] arguments, Func<UmAlQuraCalendar, object?> apply, int? max = null)
        {
            try
            {
                var calendar = new UmAlQuraCalendar();
                if (max.HasValue) calendar.TwoDigitYearMax = max.Value;
                rows.Add(JsonSerializer.Serialize(new { operation, arguments,
                    result = Normalize(apply(calendar)), error = (string?)null, paramName = (string?)null,
                    message = (string?)null, actualValue = (object?)null }));
            }
            catch (ArgumentException error)
            {
                rows.Add(JsonSerializer.Serialize(new { operation, arguments,
                    result = (object?)null, error = error.GetType().Name, paramName = error.ParamName,
                    message = error.Message,
                    actualValue = (error as ArgumentOutOfRangeException)?.ActualValue is long ticks
                        ? ticks.ToString(CultureInfo.InvariantCulture) : (error as ArgumentOutOfRangeException)?.ActualValue }));
            }
        }

        Capture("metadata", [], c => new {
            min = Ticks(c.MinSupportedDateTime), max = Ticks(c.MaxSupportedDateTime),
            algorithmType = (int)c.AlgorithmType, eras = c.Eras, twoDigitYearMax = c.TwoDigitYearMax,
        });

        for (int year = 1318; year <= 1500; year++)
        {
            int y = year;
            Capture("year", [y], c => new {
                days = c.GetDaysInYear(y), months = c.GetMonthsInYear(y),
                leap = c.IsLeapYear(y), leapMonth = c.GetLeapMonth(y),
            });
            for (int month = 1; month <= 12; month++)
            {
                int m = month;
                Capture("month", [y, m], c => {
                    int days = c.GetDaysInMonth(y, m);
                    DateTime first = c.ToDateTime(y, m, 1, 0, 0, 0, 0);
                    DateTime last = c.ToDateTime(y, m, days, 23, 59, 59, 999).AddTicks(9999);
                    return new {
                        days, first = Ticks(first), last = Ticks(last),
                        firstDayOfYear = c.GetDayOfYear(first), lastDayOfYear = c.GetDayOfYear(last),
                        firstDayOfWeek = (int)c.GetDayOfWeek(first), lastDayOfWeek = (int)c.GetDayOfWeek(last),
                        firstEra = c.GetEra(first), lastEra = c.GetEra(last),
                        isLeapMonth = c.IsLeapMonth(y, m), isLeapDay = c.IsLeapDay(y, m, days),
                    };
                });
            }
        }

        DateTime min = new UmAlQuraCalendar().MinSupportedDateTime;
        DateTime maxDate = new UmAlQuraCalendar().MaxSupportedDateTime;
        foreach (DateTime date in new[] { DateTime.MinValue, min.AddTicks(-1), min,
            min.AddTicks(1), new DateTime(2024, 3, 20).AddTicks(1234),
            maxDate.AddTicks(-1), maxDate, maxDate.AddTicks(1), DateTime.MaxValue })
        {
            string ticks = Ticks(date);
            foreach (string operation in new[] { "getYear", "getMonth", "getDayOfMonth",
                "getDayOfYear", "getEra", "getDayOfWeek" })
                Capture(operation, [ticks], c => operation switch {
                    "getYear" => c.GetYear(date), "getMonth" => c.GetMonth(date),
                    "getDayOfMonth" => c.GetDayOfMonth(date), "getDayOfYear" => c.GetDayOfYear(date),
                    "getEra" => c.GetEra(date), _ => (int)c.GetDayOfWeek(date),
                });
        }

        foreach (int year in new[] { -1, 0, 99, 1317, 1318, 1445, 1500, 1501 })
            foreach (int era in new[] { -1, 0, 1, 2 })
            {
                Capture("getDaysInYear", [year, era], c => c.GetDaysInYear(year, era));
                Capture("getMonthsInYear", [year, era], c => c.GetMonthsInYear(year, era));
                Capture("getLeapMonth", [year, era], c => c.GetLeapMonth(year, era));
                Capture("isLeapYear", [year, era], c => c.IsLeapYear(year, era));
                foreach (int month in new[] { 0, 1, 12, 13 })
                {
                    Capture("getDaysInMonth", [year, month, era], c => c.GetDaysInMonth(year, month, era));
                    Capture("isLeapMonth", [year, month, era], c => c.IsLeapMonth(year, month, era));
                }
            }

        foreach (var (year, month, day, hour, millisecond) in new[] {
            (1318, 1, 1, 0, 0), (1500, 12, 30, 23, 999), (1445, 9, 29, 0, 0),
            (1445, 9, 0, 0, 0), (1445, 9, 31, 0, 0), (1445, 0, 1, 0, 0),
            (1445, 13, 1, 0, 0), (1317, 1, 1, 0, 0), (1501, 1, 1, 0, 0),
            (1445, 9, 1, 24, 0), (1445, 9, 1, 0, 1000),
        })
            foreach (int era in new[] { 0, 1, 2 })
            {
                Capture("toDateTime", [year, month, day, hour, 0, 0, millisecond, era],
                    c => c.ToDateTime(year, month, day, hour, 0, 0, millisecond, era));
                Capture("isLeapDay", [year, month, day, era], c => c.IsLeapDay(year, month, day, era));
            }

        foreach (var (date, offset) in new[] { (min, -1), (min, 1), (maxDate, -1),
            (maxDate, 1), (new DateTime(2024, 3, 20).AddTicks(1234), -12),
            (new DateTime(2024, 3, 20), -120001), (new DateTime(2024, 3, 20), 120001) })
        {
            Capture("addMonths", [Ticks(date), offset], c => c.AddMonths(date, offset));
            Capture("addYears", [Ticks(date), offset], c => c.AddYears(date, offset));
        }
        foreach (int years in new[] { int.MinValue, int.MaxValue, 357913941, -357913941 })
            Capture("addYears", [Ticks(new DateTime(2024, 3, 20)), years],
                c => c.AddYears(new DateTime(2024, 3, 20), years));
        foreach (int value in new[] { 98, 99, 1317, 1318, 1500, 1501 })
            Capture("setTwoDigitYearMax", [value], c => { c.TwoDigitYearMax = value; return c.TwoDigitYearMax; });
        foreach (int year in new[] { -1, 0, 10, 99, 100, 1317, 1318, 1500, 1501 })
            Capture("toFourDigitYear", [year], c => c.ToFourDigitYear(year), 1451);

        return "{\n  \"runtime\": \"10.0.7\",\n  \"rows\": [\n"
            + string.Join(",\n", rows.Select(row => "    " + row)) + "\n  ]\n}\n";
    }
}
