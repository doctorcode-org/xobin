// Derived from official .NET 10.0.7 tests.
// Licensed to the .NET Foundation under the MIT license.
using DateOnly = ObservedDateOnly;
internal static class DateOnlyCoreTests {
[Fact]
public static void FromDayNumberTest()
        {
            DateOnly dateOnly = DateOnly.FromDayNumber(DateOnly.MinValue.DayNumber);
            Assert.Equal(1, dateOnly.Year);
            Assert.Equal(1, dateOnly.Month);
            Assert.Equal(1, dateOnly.Day);
            Assert.Equal(DateOnly.MinValue.DayNumber, dateOnly.DayNumber);

            dateOnly = DateOnly.FromDayNumber(DateOnly.MaxValue.DayNumber);
            Assert.Equal(9999, dateOnly.Year);
            Assert.Equal(12, dateOnly.Month);
            Assert.Equal(31, dateOnly.Day);
            Assert.Equal(DateOnly.MaxValue.DayNumber, dateOnly.DayNumber);

            DateTime dt = DateOnlyCoreOracle.Today;
            int dayNumber = (int) (dt.Ticks / TimeSpan.TicksPerDay);
            dateOnly = DateOnly.FromDayNumber(dayNumber);
            Assert.Equal(dt.Year, dateOnly.Year);
            Assert.Equal(dt.Month, dateOnly.Month);
            Assert.Equal(dt.Day, dateOnly.Day);
            Assert.Equal(dayNumber, dateOnly.DayNumber);

            Assert.Throws<ArgumentOutOfRangeException>(() => DateOnly.FromDayNumber(-1));
            Assert.Throws<ArgumentOutOfRangeException>(() => DateOnly.FromDayNumber(DateOnly.MaxValue.DayNumber + 1));
        }
[Fact]
public static void DayOfWeekAndDayOfYearTest()
        {
            DateTime dt = DateOnlyCoreOracle.Today;
            DateOnly dateOnly = DateOnly.FromDayNumber((int) (dt.Ticks / TimeSpan.TicksPerDay));
            Assert.Equal(dt.DayOfWeek, dateOnly.DayOfWeek);
            Assert.Equal(dt.DayOfYear, dateOnly.DayOfYear);
        }
[Fact]
public static void AddDaysTest()
        {
            DateOnly dateOnly = DateOnly.MinValue.AddDays(1);
            Assert.Equal(1, dateOnly.DayNumber);
            dateOnly = dateOnly.AddDays(1);
            Assert.Equal(2, dateOnly.DayNumber);
            dateOnly = dateOnly.AddDays(100);
            Assert.Equal(102, dateOnly.DayNumber);

            dateOnly = DateOnly.MaxValue.AddDays(-1);
            Assert.Equal(DateOnly.MaxValue.DayNumber - 1, dateOnly.DayNumber);
            dateOnly = dateOnly.AddDays(-1);
            Assert.Equal(DateOnly.MaxValue.DayNumber - 2, dateOnly.DayNumber);
            dateOnly = dateOnly.AddDays(-100);
            Assert.Equal(DateOnly.MaxValue.DayNumber - 102, dateOnly.DayNumber);

            Assert.Throws<ArgumentOutOfRangeException>(() => DateOnly.MinValue.AddDays(-1));
            Assert.Throws<ArgumentOutOfRangeException>(() => DateOnly.MaxValue.AddDays(1));
        }
[Fact]
public static void AddMonthsTest()
        {
            DateOnly dateOnly = new DateOnly(2021, 1, 31);
            for (int i = 1; i < 12; i++)
            {
                Assert.Equal(i, dateOnly.Month);
                dateOnly = dateOnly.AddMonths(1);
            }

            for (int i = 12; i > 1; i--)
            {
                Assert.Equal(i, dateOnly.Month);
                dateOnly = dateOnly.AddMonths(-1);
            }

            DateTime dt = DateOnlyCoreOracle.Today;
            dateOnly = DateOnly.FromDayNumber((int) (dt.Ticks / TimeSpan.TicksPerDay));

            Assert.Equal(dt.Year, dateOnly.Year);
            Assert.Equal(dt.Month, dateOnly.Month);
            Assert.Equal(dt.Day, dateOnly.Day);

            dt = dt.AddMonths(1);
            dateOnly = dateOnly.AddMonths(1);
            Assert.Equal(dt.Month, dateOnly.Month);

            dt = dt.AddMonths(50);
            dateOnly = dateOnly.AddMonths(50);
            Assert.Equal(dt.Month, dateOnly.Month);

            dt = dt.AddMonths(-150);
            dateOnly = dateOnly.AddMonths(-150);
            Assert.Equal(dt.Month, dateOnly.Month);

            Assert.Throws<ArgumentOutOfRangeException>(() => DateOnly.MinValue.AddMonths(-1));
            Assert.Throws<ArgumentOutOfRangeException>(() => DateOnly.MaxValue.AddMonths(1));
        }
[Fact]
public static void AddYearsTest()
        {
            DateOnly dateOnly = new DateOnly(2021, 1, 31);
            for (int i = 2021; i < 2040; i++)
            {
                Assert.Equal(i, dateOnly.Year);
                dateOnly = dateOnly.AddYears(1);
            }

            for (int i = dateOnly.Year; i > 2020; i--)
            {
                Assert.Equal(i, dateOnly.Year);
                dateOnly = dateOnly.AddYears(-1);
            }

            DateTime dt = DateOnlyCoreOracle.Today;
            dateOnly = DateOnly.FromDayNumber((int) (dt.Ticks / TimeSpan.TicksPerDay));

            Assert.Equal(dt.Year, dateOnly.Year);
            Assert.Equal(dt.Month, dateOnly.Month);
            Assert.Equal(dt.Day, dateOnly.Day);

            dt = dt.AddYears(1);
            dateOnly = dateOnly.AddYears(1);
            Assert.Equal(dt.Year, dateOnly.Year);

            dt = dt.AddYears(50);
            dateOnly = dateOnly.AddYears(50);
            Assert.Equal(dt.Year, dateOnly.Year);

            dt = dt.AddYears(-150);
            dateOnly = dateOnly.AddYears(-150);
            Assert.Equal(dt.Year, dateOnly.Year);

            Assert.Throws<ArgumentOutOfRangeException>(() => DateOnly.MinValue.AddYears(-1));
            Assert.Throws<ArgumentOutOfRangeException>(() => DateOnly.MaxValue.AddYears(1));
        }
[Fact]
public static void OperatorsTest()
        {
            Assert.True(DateOnly.MinValue != DateOnly.MaxValue);
            Assert.True(DateOnly.MinValue < DateOnly.MaxValue);
            Assert.True(DateOnly.MinValue <= DateOnly.MaxValue);
            Assert.True(DateOnly.MaxValue > DateOnly.MinValue);
            Assert.True(DateOnly.MaxValue >= DateOnly.MinValue);

            DateOnly dateOnly1 = new DateOnly(2021, 10, 10);
            DateOnly dateOnly2 = new DateOnly(2021, 10, 11);
            DateOnly dateOnly3 = new DateOnly(2021, 10, 10);

            Assert.True(dateOnly1 == dateOnly3);
            Assert.True(dateOnly1 >= dateOnly3);
            Assert.True(dateOnly1 <= dateOnly3);
            Assert.True(dateOnly1 != dateOnly2);
            Assert.True(dateOnly1 < dateOnly2);
            Assert.True(dateOnly1 <= dateOnly2);
            Assert.True(dateOnly2 > dateOnly1);
            Assert.True(dateOnly2 >= dateOnly1);
        }
[Fact]
public static void DateTimeConversionTest()
        {
            DateTime dt = DateOnlyCoreOracle.Today;
            DateOnly dateOnly = DateOnly.FromDateTime(dt);
            Assert.Equal(dt.Year, dateOnly.Year);
            Assert.Equal(dt.Month, dateOnly.Month);
            Assert.Equal(dt.Day, dateOnly.Day);

            dt = dateOnly.ToDateTime(new TimeOnly(1, 10, 20));
            Assert.Equal(dateOnly.Year, dt.Year);
            Assert.Equal(dateOnly.Month, dt.Month);
            Assert.Equal(dateOnly.Day, dt.Day);

            Assert.Equal(1, dt.Hour);
            Assert.Equal(10, dt.Minute);
            Assert.Equal(20, dt.Second);
            Assert.Equal(DateTimeKind.Unspecified, dt.Kind);


            dt = dateOnly.ToDateTime(new TimeOnly(23, 59, 59), DateTimeKind.Utc);
            Assert.Equal(dateOnly.Year, dt.Year);
            Assert.Equal(dateOnly.Month, dt.Month);
            Assert.Equal(dateOnly.Day, dt.Day);

            Assert.Equal(23, dt.Hour);
            Assert.Equal(59, dt.Minute);
            Assert.Equal(59, dt.Second);
            Assert.Equal(DateTimeKind.Utc, dt.Kind);

            dt = dateOnly.ToDateTime(new TimeOnly(23, 59, 59), DateTimeKind.Local);
            Assert.Equal(DateTimeKind.Local, dt.Kind);

            dateOnly = DateOnly.FromDateTime(dt);
            Assert.Equal(dt.Year, dateOnly.Year);
            Assert.Equal(dt.Month, dateOnly.Month);
            Assert.Equal(dt.Day, dateOnly.Day);
        }
[Fact]
public static void ComparisonsTest()
        {
            DateOnly dateOnly1 = DateOnly.FromDateTime(DateOnlyCoreOracle.Today);
            DateOnly dateOnly2 = DateOnly.FromDateTime(DateOnlyCoreOracle.Today);
            DateOnly dateOnly3 = dateOnly1.AddYears(-10);

            Assert.Equal(0, dateOnly1.CompareTo(dateOnly2));
            Assert.True(dateOnly1.Equals(dateOnly2));
            Assert.True(dateOnly1.Equals((object)dateOnly2));
            Assert.Equal(0, dateOnly2.CompareTo(dateOnly1));
            Assert.True(dateOnly2.Equals(dateOnly1));
            Assert.True(dateOnly2.Equals((object)dateOnly1));
            Assert.Equal(1, dateOnly1.CompareTo(dateOnly3));
            Assert.False(dateOnly1.Equals(dateOnly3));
            Assert.False(dateOnly1.Equals((object)dateOnly3));
            Assert.Equal(-1, dateOnly3.CompareTo(dateOnly1));
            Assert.False(dateOnly3.Equals(dateOnly1));
            Assert.False(dateOnly3.Equals((object)dateOnly1));

            Assert.Equal(0, dateOnly1.CompareTo((object)dateOnly2));
            Assert.Equal(0, dateOnly2.CompareTo((object)dateOnly1));
            Assert.Equal(1, dateOnly1.CompareTo((object)dateOnly3));
            Assert.Equal(-1, dateOnly3.CompareTo((object)dateOnly1));

            Assert.Equal(1, dateOnly1.CompareTo(null));

            Assert.Throws<ArgumentException>(() => dateOnly1.CompareTo(new object()));
            Assert.False(dateOnly3.Equals(new object()));
        }
[Fact]
public static void GetHashCodeTest()
        {
            Assert.Equal(DateOnly.MinValue.DayNumber, DateOnly.MinValue.GetHashCode());
            Assert.Equal(DateOnly.MaxValue.DayNumber, DateOnly.MaxValue.GetHashCode());
            DateOnly dateOnly = DateOnly.FromDateTime(DateOnlyCoreOracle.Today);
            Assert.Equal(dateOnly.DayNumber, dateOnly.GetHashCode());
        }
[Theory]
        [InlineData(2090, 12, 31)]
        [InlineData(2003, 2, 28)]
        [InlineData(2020, 11, 1)]
        [InlineData(1, 1, 1)]
        [InlineData(9999, 12, 31)]
public static void DeconstructionTest(int year, int month, int day)
        {
            var date = new DateOnly(year, month, day);
            var (obtainedYear, obtainedMonth, obtainedDay) = date;

            Assert.Equal((year, month, day), (obtainedYear, obtainedMonth, obtainedDay));
        }
}
