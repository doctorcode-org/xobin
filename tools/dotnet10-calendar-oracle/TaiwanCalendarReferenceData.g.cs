// Generated from the official .NET 10.0.7 test input providers.
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
using System.Globalization;
namespace TaiwanReferenceData {
internal static class TaiwanCalendarIsLeapYear {
public static IEnumerable<object[]> IsLeapYear_TestData()
        {
            yield return new object[] { TaiwanCalendarUtilities.RandomYear() };
            yield return new object[] { 2000 - 1911 };
        }
}
internal static class TaiwanCalendarAddMonths {
public static IEnumerable<object[]> AddMonths_TestData()
        {
            TaiwanCalendar calendar = new TaiwanCalendar();
            Random random = new Random(-55);

            DateTime randomDateTime = TaiwanCalendarUtilities.RandomDateTime();
            if ((calendar.MaxSupportedDateTime.Year - randomDateTime.Year - 1911) > 1000)
            {
                yield return new object[] { randomDateTime, random.Next(1, 1000 * 12) };
            }
            else
            {
                yield return new object[] { randomDateTime, random.Next(1, (calendar.MaxSupportedDateTime.Year - randomDateTime.Year - 1911) * 12) };
            }

            if ((calendar.MinSupportedDateTime.Year - randomDateTime.Year) < -1000)
            {
                yield return new object[] { randomDateTime, random.Next(-1000 * 12, 0) };
            }
            else
            {
                yield return new object[] { randomDateTime, random.Next((calendar.MinSupportedDateTime.Year - randomDateTime.Year) * 12, 0) };
            }

            yield return new object[] { calendar.MaxSupportedDateTime, 0 };
            yield return new object[] { calendar.MinSupportedDateTime, 0 };
        }
}
internal static class TaiwanCalendarAddYears {
public static IEnumerable<object[]> AddYears_TestData()
        {
            Random rand = new Random(-55);
            TaiwanCalendar tc = new TaiwanCalendar();

            DateTime randomDateTime = TaiwanCalendarUtilities.RandomDateTime();
            yield return new object[] { randomDateTime, rand.Next(1, (tc.MaxSupportedDateTime.Year - randomDateTime.Year - 1911)) };

            yield return new object[] { randomDateTime, rand.Next((tc.MinSupportedDateTime.Year - randomDateTime.Year), 0) };

            yield return new object[] { tc.MinSupportedDateTime, 0 };
            yield return new object[] { tc.MaxSupportedDateTime, 0 };
            yield return new object[] { randomDateTime, 0 };
        }
}
internal static class TaiwanCalendarDaysAndMonths {
}
internal static class TaiwanCalendarGetDayOfMonth {
public static IEnumerable<object[]> GetDayOfMonth_TestData()
        {
            yield return new object[] { new TaiwanCalendar().MinSupportedDateTime };
            yield return new object[] { new TaiwanCalendar().MaxSupportedDateTime };
            yield return new object[] { TaiwanCalendarUtilities.RandomDateTime() };
            for (int i = 1; i <= 29; i++)
            {
                yield return new object[] { new DateTime(2000, 2, i) };
            }
        }
}
internal static class TaiwanCalendarGetDayOfWeek {
public static IEnumerable<object[]> GetDayOfWeek_TestData()
        {
            yield return new object[] { new TaiwanCalendar().MinSupportedDateTime };
            yield return new object[] { new TaiwanCalendar().MaxSupportedDateTime };
            yield return new object[] { TaiwanCalendarUtilities.RandomDateTime() };
        }
}
internal static class TaiwanCalendarGetDayOfYear {
public static IEnumerable<object[]> GetDayOfYear_TestData()
        {
            yield return new object[] { new TaiwanCalendar().MinSupportedDateTime };
            yield return new object[] { new TaiwanCalendar().MaxSupportedDateTime };
            yield return new object[] { TaiwanCalendarUtilities.RandomDateTime() };
            yield return new object[] { new DateTime(2000, 12, 31) };
        }
}
internal static class TaiwanCalendarGetDaysInMonth {
public static IEnumerable<object[]> GetDaysInMonth_TestData()
        {
            yield return new object[] { 1912, 1 };
            yield return new object[] { 8088, 12 };
            yield return new object[] { 2000, 12 };
            yield return new object[] { TaiwanCalendarUtilities.RandomYear(), TaiwanCalendarUtilities.RandomMonth() };
        }
}
internal static class TaiwanCalendarGetDaysInYear {
public static IEnumerable<object[]> GetDaysInYear_TestData()
        {
            yield return new object[] { 1912 };
            yield return new object[] { 8088 };
            yield return new object[] { 2000 };
            yield return new object[] { TaiwanCalendarUtilities.RandomYear() };
        }
}
internal static class TaiwanCalendarGetEra {
public static IEnumerable<object[]> GetEra_TestData()
        {
            yield return new object[] { new TaiwanCalendar().MinSupportedDateTime };
            yield return new object[] { new TaiwanCalendar().MaxSupportedDateTime };
            yield return new object[] { TaiwanCalendarUtilities.RandomDateTime() };
        }
}
internal static class TaiwanCalendarGetMonth {
public static IEnumerable<object[]> GetMonth_TestData()
        {
            yield return new object[] { new TaiwanCalendar().MinSupportedDateTime };
            yield return new object[] { new TaiwanCalendar().MaxSupportedDateTime };
            yield return new object[] { TaiwanCalendarUtilities.RandomDateTime() };
        }
}
internal static class TaiwanCalendarGetMonthsInYear {
public static IEnumerable<object[]> GetMonthsInYear_TestData()
        {
            yield return new object[] { 1912 };
            yield return new object[] { 8088 };
            yield return new object[] { TaiwanCalendarUtilities.RandomYear() };
        }
}
internal static class TaiwanCalendarGetWeekOfYear {
public static IEnumerable<object[]> GetWeekOfYear_TestData()
        {
            for (int i = 0; i < 3; i++)
            {
                for (int j = 0; j < 7; j++)
                {
                    yield return new object[] { new TaiwanCalendar().MinSupportedDateTime, (CalendarWeekRule)i, (DayOfWeek)j };
                    yield return new object[] { new TaiwanCalendar().MaxSupportedDateTime, (CalendarWeekRule)i, (DayOfWeek)j };
                    yield return new object[] { TaiwanCalendarUtilities.RandomDateTime(), (CalendarWeekRule)i, (DayOfWeek)j };
                }
            }
        }
}
internal static class TaiwanCalendarGetYear {
public static IEnumerable<object[]> GetYear_TestData()
        {
            yield return new object[] { new TaiwanCalendar().MinSupportedDateTime };
            yield return new object[] { new TaiwanCalendar().MaxSupportedDateTime };
            yield return new object[] { TaiwanCalendarUtilities.RandomDateTime() };
        }
}
internal static class TaiwanCalendarIsLeapDay {
public static IEnumerable<object[]> IsLeapDay_TestData()
        {
            yield return new object[] { 2000 - 1911, 2, 28, false };
            yield return new object[] { 2000 - 1911, 2, 29, true };
            yield return new object[] { 2000 - 1911, 3, 1, false };
            yield return new object[] { 2001 - 1911, 2, 28, false };
        }
}
internal static class TaiwanCalendarIsLeapMonth {
}
internal static class TaiwanCalendarToDateTime {
public static IEnumerable<object[]> ToDateTime_TestData()
        {
            yield return new object[] { 1, 1, 1, 0, 0, 0, 0 };
            yield return new object[] { 8088, 12, 31, 23, 59, 59, 999 };

            Random random = new Random(-55);
            yield return new object[] { TaiwanCalendarUtilities.RandomYear(), random.Next(1, 13), random.Next(1, 29), random.Next(0, 24), random.Next(0, 60), random.Next(0, 60), random.Next(0, 1000) };
        }
}
internal static class TaiwanCalendarToFourDigitYear {
public static IEnumerable<object[]> ToFourDigitYear_TestData()
        {
            yield return new object[] { new Random(-55).Next(1, 8088) };
            yield return new object[] { 1 };
            yield return new object[] { 8088 };
        }
}
internal static class TaiwanCalendarTwoDigitYearMax {
}
    public static class TaiwanCalendarUtilities
    {
        [ThreadStatic]
        private static RandomDataGenerator t_randomDataGenerator;

        private static RandomDataGenerator Generator => t_randomDataGenerator ??= new RandomDataGenerator();

        private static readonly int[] s_daysPerMonthLeapYear = new int[]
        {
            0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        };

        private static readonly int[] s_daysPerMonthCommonYear = new int[]
        {
            0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
        };

        public static int RandomYear()
        {
            TaiwanCalendar calendar = new TaiwanCalendar();
            int maxYear = calendar.MaxSupportedDateTime.Year;
            int minYear = calendar.MinSupportedDateTime.Year;
            return minYear + Generator.GetInt32(-55) % (maxYear - 1911 + 1 - minYear);
        }

        public static int RandomMonth() => Generator.GetInt32(-55) % 12 + 1;

        public static int RandomDay(int year, int month)
        {
            if (new TaiwanCalendar().IsLeapYear(year))
            {
                return Generator.GetInt32(-55) % s_daysPerMonthLeapYear[month] + 1;
            }
            else
            {
                return Generator.GetInt32(-55) % s_daysPerMonthCommonYear[month] + 1;
            }
        }

        public static DateTime RandomDateTime()
        {
            int randomYear = RandomYear();
            int randomMonth = RandomMonth();
            int randomDay = RandomDay(randomYear, randomMonth);
            return new DateTime(randomYear, randomMonth, randomDay);
        }
    }
}
namespace TaiwanReferenceData { internal static class Inputs { internal static IEnumerable<(string Source, object[] Input)> Get() {
foreach (var input in TaiwanCalendarIsLeapYear.IsLeapYear_TestData()) yield return ("TaiwanCalendarIsLeapYear.IsLeapYear", input);
foreach (var input in TaiwanCalendarAddMonths.AddMonths_TestData()) yield return ("TaiwanCalendarAddMonths.AddMonths", input);
foreach (var input in TaiwanCalendarAddYears.AddYears_TestData()) yield return ("TaiwanCalendarAddYears.AddYears", input);
foreach (var input in TaiwanCalendarGetDayOfMonth.GetDayOfMonth_TestData()) yield return ("TaiwanCalendarGetDayOfMonth.GetDayOfMonth", input);
foreach (var input in TaiwanCalendarGetDayOfWeek.GetDayOfWeek_TestData()) yield return ("TaiwanCalendarGetDayOfWeek.GetDayOfWeek", input);
foreach (var input in TaiwanCalendarGetDayOfYear.GetDayOfYear_TestData()) yield return ("TaiwanCalendarGetDayOfYear.GetDayOfYear", input);
foreach (var input in TaiwanCalendarGetDaysInMonth.GetDaysInMonth_TestData()) yield return ("TaiwanCalendarGetDaysInMonth.GetDaysInMonth", input);
foreach (var input in TaiwanCalendarGetDaysInYear.GetDaysInYear_TestData()) yield return ("TaiwanCalendarGetDaysInYear.GetDaysInYear", input);
foreach (var input in TaiwanCalendarGetEra.GetEra_TestData()) yield return ("TaiwanCalendarGetEra.GetEra", input);
foreach (var input in TaiwanCalendarGetMonth.GetMonth_TestData()) yield return ("TaiwanCalendarGetMonth.GetMonth", input);
foreach (var input in TaiwanCalendarGetMonthsInYear.GetMonthsInYear_TestData()) yield return ("TaiwanCalendarGetMonthsInYear.GetMonthsInYear", input);
foreach (var input in TaiwanCalendarGetWeekOfYear.GetWeekOfYear_TestData()) yield return ("TaiwanCalendarGetWeekOfYear.GetWeekOfYear", input);
foreach (var input in TaiwanCalendarGetYear.GetYear_TestData()) yield return ("TaiwanCalendarGetYear.GetYear", input);
foreach (var input in TaiwanCalendarIsLeapDay.IsLeapDay_TestData()) yield return ("TaiwanCalendarIsLeapDay.IsLeapDay", input);
foreach (var input in TaiwanCalendarToDateTime.ToDateTime_TestData()) yield return ("TaiwanCalendarToDateTime.ToDateTime", input);
foreach (var input in TaiwanCalendarToFourDigitYear.ToFourDigitYear_TestData()) yield return ("TaiwanCalendarToFourDigitYear.ToFourDigitYear", input);
} } }
