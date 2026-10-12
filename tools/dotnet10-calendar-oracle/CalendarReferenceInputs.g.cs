// Derived from the official .NET 10.0.7 calendar test input providers.
// Licensed to the .NET Foundation under the MIT license.
using System.Globalization;
using System.Reflection;
internal static class CalendarReferenceInputs {
        public enum DataType
        {
            Year = 1,
            Month = 2,
            Day = 8
        }

        // ICU have introduced a breaking change regarding the Japanese Meiji era: the start date has been updated from 1868-09-08 to 1868-10-23.
        // Additional details are available in the relevant CLDR issue https://unicode-org.atlassian.net/browse/CLDR-11375 and CLDR pull request https://github.com/unicode-org/cldr/pull/4610.
        // This means the hardcoded MinSupportedDateTime for JapaneseCalendar (1868-09-08) is no longer valid on ICU and results in various tests failing.
        // We have fixed the issue in .NET 11 through the PR https://github.com/dotnet/runtime/pull/122480, we can consider porting the fix to earlier versions if requested by users.
        // For now, we are using reflection to get the correct MinSupportedDateTime for JapaneseCalendar on ICU and use that for testing.
        internal static DateTime JapaneseCalendaraMinSupportedDateTime { get; } = new Func<DateTime>(() =>
        {
            JapaneseCalendar calendar = new JapaneseCalendar();
            object[] eraInfo = (object[])calendar.GetType().GetMethod("GetEraInfo", BindingFlags.NonPublic | BindingFlags.Static)!.Invoke(null, null)!;
            long minTicks = (long)eraInfo[eraInfo.Length - 1].GetType().GetField("ticks", BindingFlags.NonPublic | BindingFlags.Instance)!.GetValue(eraInfo[eraInfo.Length - 1])!;
            return new DateTime(minTicks);
        })();

        internal static DateTime GetCalendarMinSupportedDateTime(Calendar calendar) =>
            (!System.AppContext.TryGetSwitch("System.Globalization.UseNls", out bool useNls) || !useNls) && calendar is JapaneseCalendar ? JapaneseCalendaraMinSupportedDateTime : calendar.MinSupportedDateTime;

        internal static int MinEra(Calendar calendar) => calendar.GetEra(GetCalendarMinSupportedDateTime(calendar));

        internal static int MaxEra(Calendar calendar) => calendar.GetEra(calendar.MaxSupportedDateTime);

        internal static int MaxCalendarYearInEra(Calendar calendar, int era)
        {
            int[] eras = calendar.Eras;
            if (era < 0 || era > eras[0]) throw new InvalidOperationException("Invalid reference era.");
            if (eras.Length == 1 || era == eras[0] || era == 0)
            {
                return calendar.GetYear(calendar.MaxSupportedDateTime);
            }
            return calendar.GetYear(calendar.ToDateTime(1, 1, 1, 0, 0, 0, 0, era + 1).AddDays(-1)) + 1;
        }

        // Get the max year in the passed era plus the sum of the max year for each subsequent era
        internal static int MaxCalendarYearInEras(Calendar calendar, int era)
        {
            int[] eras = calendar.Eras;
            if (era < 0 || era > eras[0]) throw new InvalidOperationException("Invalid reference era.");
            if (eras.Length == 1 || era == eras[0] || era == 0)
            {
                return MaxCalendarYearInEra(calendar, era);
            }

            int year = 0;
            for (int i = era; i <= calendar.Eras[0]; i++)
            {
                year += MaxCalendarYearInEra(calendar, i);
            }

            return year;
        }

        internal static int MaxGregorianYearInEra(Calendar calendar, int era)
        {
            int[] eras = calendar.Eras;
            if (era < 0 || era > eras[0]) throw new InvalidOperationException("Invalid reference era.");
            if (eras.Length == 1 || era == eras[0] || era == 0)
            {
                return calendar.MaxSupportedDateTime.Year;
            }
            return (calendar.ToDateTime(1, 1, 1, 0, 0, 0, 0, era + 1).AddDays(-1)).Year;
        }

        internal static int MinGregorianYearInEra(Calendar calendar, int era)
        {
            int[] eras = calendar.Eras;
            if (era < 0 || era > eras[0]) throw new InvalidOperationException("Invalid reference era.");
            if (eras.Length == 1 || era == eras[eras.Length - 1] || era == 0)
            {
                return calendar.MinSupportedDateTime.Year;
            }
            return calendar.ToDateTime(1, 1, 1, 0, 0, 0, 0, era).Year;
        }

        internal static int MinCalendarYearInEra(Calendar calendar, int era)
        {
            int[] eras = calendar.Eras;
            if (era < 0 || era > eras[0]) throw new InvalidOperationException("Invalid reference era.");
            if (eras.Length == 1 || era == eras[eras.Length - 1] || era == 0)
            {
                return calendar.GetYear(GetCalendarMinSupportedDateTime(calendar));
            }
            return calendar.GetYear(calendar.ToDateTime(1, 1, 1, 0, 0, 0, 0, era));
        }

        public static IEnumerable<(int year, int month, int day, int era, string exceptionParamName)> Year_Month_Day_Era_TestData(Calendar calendar, DataType type)
        {
            int month = 1;
            int day = 1;

            foreach (int era in calendar.Eras)
            {
                int year = MaxCalendarYearInEra(calendar, era) - 2;

                // Year is invalid
                yield return (-1, month, day, era, "year");
                yield return (0, month, day, era, "year");

                yield return (MaxCalendarYearInEras(calendar, era) + 1, month, day, era, "year");

                if ((type & DataType.Month) != 0)
                {
                    // Month is invalid
                    yield return (year, -1, day, era, "month");
                    yield return (year, 0, day, era, "month");
                    yield return (year, calendar.GetMonthsInYear(year, era) + 1, day, era, "month");
                }

                if ((type & DataType.Day) != 0)
                {
                    // Day is invalid
                    yield return (year, month, -1, era, "day");
                    yield return (year, month, 0, era, "day");
                    yield return (year, month, calendar.GetDaysInMonth(year, month, era) + 1, era, "day");
                }
            }
            // Year is invalid
            yield return (MinCalendarYearInEra(calendar, MinEra(calendar)) - 1, month, day, MinEra(calendar), "year");

            // Era is invalid
            yield return (calendar.GetYear(calendar.MaxSupportedDateTime), month, day, MinEra(calendar) - 2, "era");
            yield return (calendar.GetYear(calendar.MaxSupportedDateTime), month, day, MaxEra(calendar) + 1, "era");
        }

        public static IEnumerable<DateTime> DateTime_TestData(Calendar calendar)
        {
            DateTime minDate = calendar.MinSupportedDateTime;
            if (minDate != DateTime.MinValue)
            {
                yield return minDate.AddDays(-1);
            }
            DateTime maxDate = calendar.MaxSupportedDateTime;
            if (maxDate != DateTime.MaxValue)
            {
                yield return maxDate.AddDays(1);
            }
        }

}
