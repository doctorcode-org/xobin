using System.Globalization;
using System.Text.Json;

internal static class CalendarMathOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        foreach (Calendar c in new Calendar[] { new JulianCalendar(), new JapaneseCalendar(), new HijriCalendar(), new HebrewCalendar(),
            new GregorianCalendar(), new PersianCalendar(), new ThaiBuddhistCalendar(), new KoreanCalendar(), new TaiwanCalendar(), new UmAlQuraCalendar() })
        {
            string calendar = c.GetType().Name;
            void Capture(string operation, object[] arguments, Func<object?> invoke)
            {
                try
                {
                    object? result = invoke();
                    if (result is DateTime date) result = date.Ticks.ToString(CultureInfo.InvariantCulture);
                    rows.Add(new { calendar, operation, arguments, result, error = (string?)null });
                }
                catch (ArgumentException error)
                {
                    rows.Add(new { calendar, operation, arguments, result = (object?)null, error = error.GetType().Name,
                        message = error.Message, paramName = error.ParamName,
                        actualValue = (error as ArgumentOutOfRangeException)?.ActualValue is long ticks ? (object)ticks.ToString(CultureInfo.InvariantCulture) : (error as ArgumentOutOfRangeException)?.ActualValue });
                }
            }

            if (c is not (JulianCalendar or JapaneseCalendar or HijriCalendar or HebrewCalendar))
            {
                var sample = new DateTime(2024,3,20,12,34,56,789).AddTicks(1234);
                foreach (int years in new[] { int.MinValue,int.MaxValue,178956971,-178956971 })
                    Capture("addYears", [sample.Ticks.ToString(CultureInfo.InvariantCulture), years], () => c.AddYears(sample,years));
                continue;
            }

            var dates = new SortedSet<long> { c.MinSupportedDateTime.Ticks, c.MaxSupportedDateTime.Ticks };
            foreach (var date in new[] { new DateTime(1600,1,1), new DateTime(1700,3,1), new DateTime(1900,2,28), new DateTime(2000,2,29), new DateTime(2024,3,20,12,34,56,789).AddTicks(1234), new DateTime(2239,9,29) })
                if (date >= c.MinSupportedDateTime && date <= c.MaxSupportedDateTime) dates.Add(date.Ticks);
            for (int i = 1; i <= 64; i++)
                dates.Add(c.MinSupportedDateTime.Ticks + (c.MaxSupportedDateTime.Ticks - c.MinSupportedDateTime.Ticks) / 65 * i);
            if (c is JapaneseCalendar)
                foreach (var boundary in new[] { new DateTime(1868,9,8), new DateTime(1912,7,30), new DateTime(1926,12,25), new DateTime(1989,1,8), new DateTime(2019,5,1) })
                    foreach (int offset in new[] { -1,0,1 })
                        if (boundary.AddDays(offset) >= c.MinSupportedDateTime) dates.Add(boundary.AddDays(offset).Ticks);

            foreach (long ticks in dates)
            {
                var date = new DateTime(ticks);
                string encoded = ticks.ToString(CultureInfo.InvariantCulture);
                Capture("dateParts", [encoded], () => new[] { c.GetYear(date), c.GetMonth(date), c.GetDayOfMonth(date), c.GetDayOfYear(date), (int)c.GetDayOfWeek(date), c.GetEra(date) });
                Capture("roundTrip", [encoded], () => c.ToDateTime(c.GetYear(date), c.GetMonth(date), c.GetDayOfMonth(date), date.Hour, date.Minute, date.Second, date.Millisecond, c.GetEra(date)));
                foreach (int months in new[] { -13,-1,0,1,13 }) Capture("addMonths", [encoded, months], () => c.AddMonths(date, months));
                foreach (int years in new[] { -4,-1,0,1,4,int.MinValue,int.MaxValue }) Capture("addYears", [encoded, years], () => c.AddYears(date, years));
            }

            int[] yearsToCheck = c switch
            {
                JulianCalendar => [1,4,100,400,1600,1700,1900,2000,2024,9999],
                JapaneseCalendar => [1,4,15,31,64,100,7981],
                HijriCalendar => [1,2,3,29,30,31,1008,1445,1446,9666],
                _ => [5343,5344,5345,5360,5783,5784,5785,5999],
            };
            foreach (int era in c.Eras)
                foreach (int year in yearsToCheck)
                {
                    Capture("yearInfo", [year, era], () => new object[] { c.GetDaysInYear(year,era), c.GetMonthsInYear(year,era), c.IsLeapYear(year,era), c.GetLeapMonth(year,era) });
                    int months;
                    try { months = c.GetMonthsInYear(year,era); } catch (ArgumentException) { continue; }
                    for (int month = 1; month <= months; month++)
                    {
                        Capture("monthInfo", [year,month,era], () => new object[] { c.GetDaysInMonth(year,month,era), c.IsLeapMonth(year,month,era) });
                        int days;
                        try { days = c.GetDaysInMonth(year,month,era); } catch (ArgumentException) { continue; }
                        foreach (int day in new[] { 1,days })
                        {
                            Capture("isLeapDay", [year,month,day,era], () => c.IsLeapDay(year,month,day,era));
                            Capture("toDateTime", [year,month,day,23,59,59,999,era], () => c.ToDateTime(year,month,day,23,59,59,999,era));
                        }
                    }
                }
            if (c is HijriCalendar hijri)
                foreach (int adjustment in new[] { -2,-1,0,1,2 })
                {
                    hijri.HijriAdjustment = adjustment;
                    Capture("adjustedDate", [adjustment,1445,9,1], () => hijri.ToDateTime(1445,9,1,0,0,0,0));
                }
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), rows }, new JsonSerializerOptions { WriteIndented = true }) + "\n";
    }
}
