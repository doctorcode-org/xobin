// Derived from official .NET 10.0.7 tests.
// Licensed to the .NET Foundation under the MIT license.
using System.Globalization;
internal static partial class DateOnlyConstructorOracle {
public static void MinMaxValuesTest()
        {
            DateOnly date = Record("min", [], () => DateOnly.MinValue);
            Assert.Equal(0, date.DayNumber);
            Assert.Equal(1, date.Year);
            Assert.Equal(1, date.Month);
            Assert.Equal(1, date.Day);

            date = Record("max", [], () => DateOnly.MaxValue);
            Assert.Equal(3652058, date.DayNumber);
            Assert.Equal(9999, date.Year);
            Assert.Equal(12, date.Month);
            Assert.Equal(31, date.Day);
        }
public static IEnumerable<object[]> Constructor_TestData()
        {
            yield return new object[] { 1, 1, 1, null };
            yield return new object[] { 9999, 12, 31, null };
            yield return new object[] { 2001, 4, 7, null };
            yield return new object[] { 1, 1, 1, new HijriCalendar() };
            yield return new object[] { 1, 1, 1, new JapaneseCalendar() };
        }
public static void ConstructorsTest(int year, int month, int day, Calendar calendar)
        {
            if (calendar == null)
            {
                DateOnly dateOnly = Create(year, month, day);
                Assert.Equal(year, dateOnly.Year);
                Assert.Equal(month, dateOnly.Month);
                Assert.Equal(day, dateOnly.Day);
            }
            else
            {
                DateTime dt = calendar.ToDateTime(year, month, day, 0, 0, 0, 0);
                DateOnly dateOnly = Create(year, month, day, calendar);
                Assert.Equal(dt.Year, dateOnly.Year);
                Assert.Equal(dt.Month, dateOnly.Month);
                Assert.Equal(dt.Day, dateOnly.Day);
            }
        }
public static void ConstructorsNegativeCasesTest()
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => Create(10000, 1, 1));
            Assert.Throws<ArgumentOutOfRangeException>(() => Create(-2021, 1, 1));
            Assert.Throws<ArgumentOutOfRangeException>(() => Create(2020, 13, 1));
            Assert.Throws<ArgumentOutOfRangeException>(() => Create(2020, -1, 1));
            Assert.Throws<ArgumentOutOfRangeException>(() => Create(2020, 0, 1));
            Assert.Throws<ArgumentOutOfRangeException>(() => Create(2020, 1, 0));
            Assert.Throws<ArgumentOutOfRangeException>(() => Create(2020, 1, 32));
            Assert.Throws<ArgumentOutOfRangeException>(() => Create(2020, 1, -1));
            Assert.Throws<ArgumentOutOfRangeException>(() => Create(2003, 2, 29));
        }
}
