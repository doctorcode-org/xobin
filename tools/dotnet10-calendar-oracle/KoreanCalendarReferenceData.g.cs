// Generated from the official .NET 10.0.7 test input providers.
// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.
using System.Globalization;
namespace KoreanReferenceData {
internal static class KoreanCalendarAddMonths {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> AddMonths_TestData()
        {
            yield return new object[] { DateTime.MinValue, 1 };
            yield return new object[] { DateTime.MaxValue, -2 };
            yield return new object[] { new DateTime(2003, 1, 29), 1 };
            yield return new object[] { new DateTime(2006, 7, 31), 2 };
        }
}
internal static class KoreanCalendarAddYears {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> AddYears_TestData()
        {
            yield return new object[] { DateTime.MinValue, s_randomDataGenerator.GetInt16(-55) % 9999 };
            yield return new object[] { DateTime.MaxValue, -(s_randomDataGenerator.GetInt16(-55) % 9999) };

            yield return new object[] { new DateTime(2000, 1, 1), s_randomDataGenerator.GetInt16(-55) % 7999 };
            yield return new object[] { new DateTime(2000, 1, 1), -(s_randomDataGenerator.GetInt16(-55) % 2000) };

            // Leap year
            yield return new object[] { new DateTime(2004, 2, 9), 2 };
        }
}
internal static class KoreanCalendarGetDayOfMonth {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> GetDayOfMonth_TestData()
        {
            yield return new object[] { DateTime.MinValue };
            yield return new object[] { DateTime.MaxValue };
            yield return new object[] { new DateTime(2008, 2, 29) };
            yield return new object[] { s_randomDataGenerator.GetDateTime(-55) };
        }
}
internal static class KoreanCalendarGetDayOfWeek {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> GetDayOfWeek_TestData()
        {
            yield return new object[] { DateTime.MinValue };
            yield return new object[] { DateTime.MaxValue };
            yield return new object[] { new DateTime(2000, 2, 29) };
            yield return new object[] { s_randomDataGenerator.GetDateTime(-55) };
        }
}
internal static class KoreanCalendarGetDayOfYear {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> GetDayOfYear_TestData()
        {
            yield return new object[] { DateTime.MinValue };
            yield return new object[] { DateTime.MaxValue };
            yield return new object[] { new DateTime(2000, 2, 20) };
            yield return new object[] { s_randomDataGenerator.GetDateTime(-55) };
        }
}
internal static class KoreanCalendarGetDaysInMonth {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> GetDaysInMonth_TestData()
        {
            yield return new object[] { 1, 1 };
            yield return new object[] { 9999, 12 };
            yield return new object[] { 2004, 2 };
            yield return new object[] { s_randomDataGenerator.GetInt16(-55) % 9999, s_randomDataGenerator.GetInt16(-55) % 12 + 1 };
        }
}
internal static class KoreanCalendarGetDaysInYear {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> GetDaysInYear_TestData()
        {
            yield return new object[] { 1 };
            yield return new object[] { 9999 };
            yield return new object[] { 2004 };
            yield return new object[] { s_randomDataGenerator.GetInt16(-55) % 9999 };
        }
}
internal static class KoreanCalendarGetEra {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> GetEra_TestData()
        {
            yield return new object[] { DateTime.MinValue };
            yield return new object[] { DateTime.MaxValue };
            yield return new object[] { new DateTime(2004, 2, 29) };
        }
}
internal static class KoreanCalendarGetMonth {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> GetMonth_TestData()
        {
            yield return new object[] { DateTime.MinValue };
            yield return new object[] { DateTime.MaxValue };
            yield return new object[] { new DateTime(2004, 2, 29) };
        }
}
internal static class KoreanCalendarGetMonthsInYear {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> GetMonthsInYear_TestData()
        {
            yield return new object[] { 1 };
            yield return new object[] { 9999 };
            yield return new object[] { 2004 };
            yield return new object[] { s_randomDataGenerator.GetInt16(-55) % 9999 };
        }
}
internal static class KoreanCalendarGetWeekOfYear {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> GetWeekOfYear_TestData()
        {
            CalendarWeekRule rule = new CultureInfo("ko-KR").DateTimeFormat.CalendarWeekRule;
            DayOfWeek firstDayOfWeek = new CultureInfo("ko-KR").DateTimeFormat.FirstDayOfWeek;

            yield return new object[] { DateTime.MinValue, rule, firstDayOfWeek };
            yield return new object[] { DateTime.MaxValue, rule, firstDayOfWeek };
            yield return new object[] { new DateTime(2008, 2, 29), rule, firstDayOfWeek };
            yield return new object[] { s_randomDataGenerator.GetDateTime(-55), rule, firstDayOfWeek };
        }
}
internal static class KoreanCalendarGetYear {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> GetYear_TestData()
        {
            yield return new object[] { DateTime.MinValue };
            yield return new object[] { DateTime.MaxValue };
            yield return new object[] { new DateTime(2008, 2, 29) };
            yield return new object[] { s_randomDataGenerator.GetDateTime(-55) };
        }
}
internal static class KoreanCalendarIsLeapDay {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
}
internal static class KoreanCalendarIsLeapMonth {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
}
internal static class KoreanCalendarIsLeapYear {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
}
internal static class KoreanCalendarToDateTime {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> ToDateTime_TestData()
        {
            yield return new object[] { 1, 1, 1, 0, 0, 0, 0 };
            yield return new object[] { 9999, 12, 31, 23, 59, 59, 999 };
            yield return new object[] { 2004, 2, 29, 1, 1, 1, 0 };
            yield return new object[] { 1600, 1, 1, 0, 0, 0, 0 };

            // Random
            DateTime randomTime = s_randomDataGenerator.GetDateTime(-55);
            yield return new object[] { randomTime.Year, randomTime.Month, randomTime.Day, randomTime.Hour, randomTime.Minute, randomTime.Second, randomTime.Millisecond };
        }
}
internal static class KoreanCalendarToFourDigitYear {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
public static IEnumerable<object[]> ToFourDigitYear_TestData()
        {
            yield return new object[] { 0 };
            yield return new object[] { 99 };
            yield return new object[] { s_randomDataGenerator.GetInt16(-55) % 100 };
        }
}
internal static class KoreanCalendarTwoDigitYearMax {
private static readonly RandomDataGenerator s_randomDataGenerator = new();
}
internal static class Inputs { internal static IEnumerable<(string Source, object[] Input)> Get() {
foreach (var input in KoreanCalendarAddMonths.AddMonths_TestData()) yield return ("KoreanCalendarAddMonths.AddMonths", input);
foreach (var input in KoreanCalendarAddYears.AddYears_TestData()) yield return ("KoreanCalendarAddYears.AddYears", input);
foreach (var input in KoreanCalendarGetDayOfMonth.GetDayOfMonth_TestData()) yield return ("KoreanCalendarGetDayOfMonth.GetDayOfMonth", input);
foreach (var input in KoreanCalendarGetDayOfWeek.GetDayOfWeek_TestData()) yield return ("KoreanCalendarGetDayOfWeek.GetDayOfWeek", input);
foreach (var input in KoreanCalendarGetDayOfYear.GetDayOfYear_TestData()) yield return ("KoreanCalendarGetDayOfYear.GetDayOfYear", input);
foreach (var input in KoreanCalendarGetDaysInMonth.GetDaysInMonth_TestData()) yield return ("KoreanCalendarGetDaysInMonth.GetDaysInMonth", input);
foreach (var input in KoreanCalendarGetDaysInYear.GetDaysInYear_TestData()) yield return ("KoreanCalendarGetDaysInYear.GetDaysInYear", input);
foreach (var input in KoreanCalendarGetEra.GetEra_TestData()) yield return ("KoreanCalendarGetEra.GetEra", input);
foreach (var input in KoreanCalendarGetMonth.GetMonth_TestData()) yield return ("KoreanCalendarGetMonth.GetMonth", input);
foreach (var input in KoreanCalendarGetMonthsInYear.GetMonthsInYear_TestData()) yield return ("KoreanCalendarGetMonthsInYear.GetMonthsInYear", input);
foreach (var input in KoreanCalendarGetWeekOfYear.GetWeekOfYear_TestData()) yield return ("KoreanCalendarGetWeekOfYear.GetWeekOfYear", input);
foreach (var input in KoreanCalendarGetYear.GetYear_TestData()) yield return ("KoreanCalendarGetYear.GetYear", input);
yield return ("KoreanCalendarIsLeapDay.IsLeapDay", new object[] { 1, 1, 1 });
yield return ("KoreanCalendarIsLeapDay.IsLeapDay", new object[] { 9999, 12, 31 });
yield return ("KoreanCalendarIsLeapDay.IsLeapDay", new object[] { 1900, 2, 28 });
yield return ("KoreanCalendarIsLeapDay.IsLeapDay", new object[] { 1200, 2, 29 });
yield return ("KoreanCalendarIsLeapMonth.IsLeapMonth", new object[] { 1, 1 });
yield return ("KoreanCalendarIsLeapMonth.IsLeapMonth", new object[] { 9999, 12 });
yield return ("KoreanCalendarIsLeapMonth.IsLeapMonth", new object[] { 1900, 2 });
yield return ("KoreanCalendarIsLeapMonth.IsLeapMonth", new object[] { 1200, 2 });
yield return ("KoreanCalendarIsLeapYear.IsLeapYear", new object[] { 1 });
yield return ("KoreanCalendarIsLeapYear.IsLeapYear", new object[] { 9999 });
yield return ("KoreanCalendarIsLeapYear.IsLeapYear", new object[] { 1900 });
yield return ("KoreanCalendarIsLeapYear.IsLeapYear", new object[] { 1200 });
foreach (var input in KoreanCalendarToDateTime.ToDateTime_TestData()) yield return ("KoreanCalendarToDateTime.ToDateTime", input);
foreach (var input in KoreanCalendarToFourDigitYear.ToFourDigitYear_TestData()) yield return ("KoreanCalendarToFourDigitYear.ToFourDigitYear", input);
yield return ("KoreanCalendarTwoDigitYearMax.TwoDigitYearMax_Set", new object[] { 99 });
yield return ("KoreanCalendarTwoDigitYearMax.TwoDigitYearMax_Set", new object[] { 2016 });
} }
}
