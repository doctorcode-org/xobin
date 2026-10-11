using System.Globalization;
using System.Text.Json;
internal static class CalendarDependenciesOracle
{
    internal static string Generate()
    {
        var rows = new List<object>();
        foreach (Calendar calendar in new Calendar[] { new KoreanCalendar(), new TaiwanCalendar(), new JapaneseCalendar(), new HijriCalendar(), new HebrewCalendar() }) {
            string name = calendar.GetType().Name;
            void Add(string method, object[] args, Func<object> invoke) {
                try { rows.Add(new { name, method, args, result = invoke() }); }
                catch (Exception error) { rows.Add(new { name, method, args, error = error.GetType().Name, message = error.Message, paramName = (error as ArgumentException)?.ParamName, actualValue = (error as ArgumentOutOfRangeException)?.ActualValue is long longValue ? (object)longValue.ToString() : (error as ArgumentOutOfRangeException)?.ActualValue }); }
            }
            foreach (bool readOnly in new[] { false, true }) {
                foreach (int value in new[] { -1, 0, 98, 99, 100, 5343, 5999, 6000, 12332, 12333 }) {
                    Calendar target = (Calendar)calendar.Clone();
                    if (readOnly) target=Calendar.ReadOnly(target);
                    Add("twoDigitYearMaxSet", [value,readOnly], () => { target.TwoDigitYearMax=value; return target.TwoDigitYearMax; });
                }
                if (calendar is HijriCalendar) foreach(int value in new[] {-3,-2,0,2,3}) {
                    var target=(HijriCalendar)calendar.Clone();
                    if(readOnly) target=(HijriCalendar)Calendar.ReadOnly(target);
                    Add("hijriAdjustmentSet", [value,readOnly], () => { target.HijriAdjustment=value; return target.HijriAdjustment; });
                }
            }
            Add("eras", [], () => calendar.Eras);
            Add("twoDigitYearMax", [], () => calendar.TwoDigitYearMax);
            Add("minSupportedDateTime", [], () => calendar.MinSupportedDateTime.Ticks.ToString());
            Add("maxSupportedDateTime", [], () => calendar.MaxSupportedDateTime.Ticks.ToString());
            foreach (string locale in new[] { "ja-JP", "zh-TW", "ko-KR", "ar-SA", "he-IL" }) {
                var culture = new CultureInfo(locale, false);
                try { culture.DateTimeFormat.Calendar = calendar; } catch (ArgumentException) { continue; }
                foreach (DateTime date in new[] { new DateTime(1989,1,8), new DateTime(2019,5,1), new DateTime(2024,6,18) })
                    foreach (string pattern in new[] { "y yy yyy yyyy yyyyy", "gg yyyy'年' MM'月' dd'日'", "yyyy/MM/dd" })
                        rows.Add(new { name, method = "format", args = new object[] { date.Ticks.ToString(), locale, pattern }, result = date.ToString(pattern, culture) });
            }
            foreach (int year in new[] { -1, 0, 1, 99, 100, 113, 2333, 2334, 4362, 12332, 12333 }) {
                Add("toFourDigitYear", [year], () => calendar.ToFourDigitYear(year));
                foreach (int era in new[] { 0, 1, 2, 3, 4, 5, 6 }) {
                    Add("getDaysInYear", [year, era], () => calendar.GetDaysInYear(year, era));
                    Add("getMonthsInYear", [year, era], () => calendar.GetMonthsInYear(year, era));
                    Add("isLeapYear", [year, era], () => calendar.IsLeapYear(year, era));
                    Add("getLeapMonth", [year, era], () => calendar.GetLeapMonth(year, era));
                    foreach (int month in new[] { 0, 1, 2, 12, 13 })
                        Add("getDaysInMonth", [year, month, era], () => calendar.GetDaysInMonth(year, month, era));
                }
            }
            if (calendar is HebrewCalendar || calendar is HijriCalendar) {
                int first = calendar is HebrewCalendar ? 5343 : 1;
                int last = calendar is HebrewCalendar ? 5999 : 9666;
                for (int year = first; year <= last; year += calendar is HijriCalendar && year > 30 && year < 9666 ? Math.Min(30, 9666 - year) : 1) {
                    Add("getDaysInYear", [year,0], () => calendar.GetDaysInYear(year));
                    for (int month = 1; month <= (year == 9666 ? 4 : calendar.GetMonthsInYear(year)); month++) {
                        Add("getDaysInMonth", [year,month,0], () => calendar.GetDaysInMonth(year,month));
                        DateTime date;
                        try { date=calendar.ToDateTime(year,month,1,0,0,0,0); } catch (ArgumentException) { continue; }
                        string ticks = date.Ticks.ToString();
                        Add("getYear", [ticks], () => calendar.GetYear(date));
                        Add("getMonth", [ticks], () => calendar.GetMonth(date));
                        Add("getDayOfMonth", [ticks], () => calendar.GetDayOfMonth(date));
                    }
                }
            }
            foreach (DateTime date in new[] { DateTime.MinValue, new DateTime(1868,9,7), new DateTime(1868,9,8), new DateTime(1912,7,29), new DateTime(1912,7,30), new DateTime(1926,12,24), new DateTime(1926,12,25), new DateTime(1989,1,7), new DateTime(1989,1,8), new DateTime(2019,4,30), new DateTime(2019,5,1), new DateTime(1911,12,31), new DateTime(1912,1,1), new DateTime(2000,2,29), new DateTime(2024,6,18), DateTime.MaxValue, calendar.MinSupportedDateTime, calendar.MaxSupportedDateTime }) {
                string ticks = date.Ticks.ToString();
                Add("getYear", [ticks], () => calendar.GetYear(date));
                Add("getMonth", [ticks], () => calendar.GetMonth(date));
                Add("getDayOfMonth", [ticks], () => calendar.GetDayOfMonth(date));
                Add("getDayOfYear", [ticks], () => calendar.GetDayOfYear(date));
                Add("getDayOfWeek", [ticks], () => (int)calendar.GetDayOfWeek(date));
                Add("getEra", [ticks], () => calendar.GetEra(date));
                foreach(int months in new[] {-120001,-1,0,1,120001})
                    Add("addMonths", [ticks,months], () => calendar.AddMonths(date,months).Ticks.ToString());
                if(date >= calendar.MinSupportedDateTime && date <= calendar.MaxSupportedDateTime) {
                    int y=calendar.GetYear(date), m=calendar.GetMonth(date), d=calendar.GetDayOfMonth(date);
                    Add("toDateTime", [y,m,d,12,34,56,789,calendar.GetEra(date)], () => calendar.ToDateTime(y,m,d,12,34,56,789,calendar.GetEra(date)).Ticks.ToString());
                }
            }
        }
        return JsonSerializer.Serialize(new { runtime = Environment.Version.ToString(), sourceTag = "v10.0.7", rows }, new JsonSerializerOptions { WriteIndented=true })+"\n";
    }
}
