// Derived from official .NET 10.0.7 tests.
// Licensed to the .NET Foundation under the MIT license.
using TimeOnly = ObservedTimeOnly;
internal static class TimeOnlyCoreTests {
[Fact]
public static void MinMaxValuesTest()
        {
            Assert.Equal(0, TimeOnly.MinValue.Ticks);
            Assert.Equal(0, TimeOnly.MinValue.Hour);
            Assert.Equal(0, TimeOnly.MinValue.Minute);
            Assert.Equal(0, TimeOnly.MinValue.Second);
            Assert.Equal(0, TimeOnly.MinValue.Millisecond);

            Assert.Equal(TimeOnlyCoreOracle.Today.AddTicks(-1).TimeOfDay.Ticks, TimeOnly.MaxValue.Ticks); // ticks should be 863999999999;
            Assert.Equal(23, TimeOnly.MaxValue.Hour);
            Assert.Equal(59, TimeOnly.MaxValue.Minute);
            Assert.Equal(59, TimeOnly.MaxValue.Second);
            Assert.Equal(999, TimeOnly.MaxValue.Millisecond);
        }
[Fact]
public static void ConstructorsTest()
        {
            TimeOnly to = new TimeOnly(14, 35);
            Assert.Equal(14, to.Hour);
            Assert.Equal(35, to.Minute);
            Assert.Equal(0, to.Second);
            Assert.Equal(0, to.Millisecond);
            Assert.Equal(0, to.Microsecond);
            Assert.Equal(0, to.Nanosecond);
            Assert.Equal(new DateTime(1, 1, 1, to.Hour, to.Minute, to.Second, to.Millisecond).Ticks, to.Ticks);

            to = new TimeOnly(10, 20, 30);
            Assert.Equal(10, to.Hour);
            Assert.Equal(20, to.Minute);
            Assert.Equal(30, to.Second);
            Assert.Equal(0, to.Millisecond);
            Assert.Equal(0, to.Microsecond);
            Assert.Equal(0, to.Nanosecond);
            Assert.Equal(new DateTime(1, 1, 1, to.Hour, to.Minute, to.Second, to.Millisecond).Ticks, to.Ticks);

            to = new TimeOnly(23, 59, 59, 999);
            Assert.Equal(23, to.Hour);
            Assert.Equal(59, to.Minute);
            Assert.Equal(59, to.Second);
            Assert.Equal(999, to.Millisecond);
            Assert.Equal(0, to.Microsecond);
            Assert.Equal(0, to.Nanosecond);
            Assert.Equal(new DateTime(1, 1, 1, to.Hour, to.Minute, to.Second, to.Millisecond).Ticks, to.Ticks);

            to = new TimeOnly(23, 59, 59, 999, 999);
            Assert.Equal(23, to.Hour);
            Assert.Equal(59, to.Minute);
            Assert.Equal(59, to.Second);
            Assert.Equal(999, to.Millisecond);
            Assert.Equal(999, to.Microsecond);
            Assert.Equal(0, to.Nanosecond);
            Assert.Equal(new DateTime(1, 1, 1, to.Hour, to.Minute, to.Second, to.Millisecond, to.Microsecond).Ticks, to.Ticks);

            DateTime dt = TimeOnlyCoreOracle.Now;
            to = new TimeOnly(dt.TimeOfDay.Ticks);
            Assert.Equal(dt.Hour, to.Hour);
            Assert.Equal(dt.Minute, to.Minute);
            Assert.Equal(dt.Second, to.Second);
            Assert.Equal(dt.Millisecond, to.Millisecond);
            Assert.Equal(dt.Microsecond, to.Microsecond);
            Assert.Equal(dt.Nanosecond, to.Nanosecond);

            Assert.Throws<ArgumentOutOfRangeException>(() => new TimeOnly(24, 10));
            Assert.Throws<ArgumentOutOfRangeException>(() => new TimeOnly(-1, 10));
            Assert.Throws<ArgumentOutOfRangeException>(() => new TimeOnly(10, 60));
            Assert.Throws<ArgumentOutOfRangeException>(() => new TimeOnly(10, -2));
            Assert.Throws<ArgumentOutOfRangeException>(() => new TimeOnly(10, 10, 60));
            Assert.Throws<ArgumentOutOfRangeException>(() => new TimeOnly(10, 10, -3));
            AssertExtensions.Throws<ArgumentOutOfRangeException>("millisecond", () => new TimeOnly(10, 10, 10, 1000));
            AssertExtensions.Throws<ArgumentOutOfRangeException>("millisecond", () => new TimeOnly(10, 10, 10, -4));
            AssertExtensions.Throws<ArgumentOutOfRangeException>("microsecond", () => new TimeOnly(10, 10, 10, 10, 1000));
            AssertExtensions.Throws<ArgumentOutOfRangeException>("microsecond", () => new TimeOnly(10, 10, 10, 10, -4));
            AssertExtensions.Throws<ArgumentOutOfRangeException>("ticks", () => new TimeOnly(TimeOnly.MaxValue.Ticks + 1));
            AssertExtensions.Throws<ArgumentOutOfRangeException>("ticks", () => new TimeOnly(-1));
        }
[Theory]
[InlineData(12, 59)]
[InlineData(14, 2)]
[InlineData(1, 13)]
public static void DeconstructionTest_Hour_Minute(int hour, int minute)
        {
            var time = new TimeOnly(hour, minute);
            (int obtainedHour, int obtainedMinute) = time;

            Assert.Equal(hour, obtainedHour);
            Assert.Equal(minute, obtainedMinute);
        }
[Theory]
[InlineData(12, 59, 31)]
[InlineData(14, 2, 2)]
[InlineData(1, 13, 1)]
public static void DeconstructionTest_Hour_Minute_Second(int hour, int minute, int second)
        {
            var time = new TimeOnly(hour, minute, second);
            (int obtainedHour, int obtainedMinute, int obtainedSecond) = time;

            Assert.Equal(hour, obtainedHour);
            Assert.Equal(minute, obtainedMinute);
            Assert.Equal(second, obtainedSecond);
        }
[Theory]
[InlineData(12, 59, 31, 1)]
[InlineData(14, 2, 29, 2)]
[InlineData(1, 13, 1, 100)]
public static void DeconstructionTest_Hour_Minute_Second_Millisecond(int hour, int minute, int second, int millisecond)
        {
            var time = new TimeOnly(hour, minute, second, millisecond);
            (int obtainedHour, int obtainedMinute, int obtainedSecond, int obtainedMillisecond) = time;

            Assert.Equal(hour, obtainedHour);
            Assert.Equal(minute, obtainedMinute);
            Assert.Equal(second, obtainedSecond);
            Assert.Equal(millisecond, obtainedMillisecond);
        }
[Theory]
[InlineData(12, 59, 31, 1, 7)]
[InlineData(14, 2, 29, 2, 3)]
[InlineData(1, 13, 1, 100, 2)]
public static void DeconstructionTest_Hour_Minute_Second_Millisecond_Microsecond(int hour, int minute, int second, int millisecond, int microsecond)
        {
            var time = new TimeOnly(hour, minute, second, millisecond, microsecond);
            (int obtainedHour, int obtainedMinute, int obtainedSecond, int obtainedMillisecond, int obtainedMicrosecond) = time;

            Assert.Equal(hour, obtainedHour);
            Assert.Equal(minute, obtainedMinute);
            Assert.Equal(second, obtainedSecond);
            Assert.Equal(millisecond, obtainedMillisecond);
            Assert.Equal(microsecond, obtainedMicrosecond);
        }
[Fact]
public static void DeconstructionTest_Hour_Minute_Second_Millisecond_Microsecond_Now()
        {
            var time = TimeOnly.FromDateTime(TimeOnlyCoreOracle.Now);
            (int obtainedHour, int obtainedMinute, int obtainedSecond, int obtainedMillisecond, int obtainedMicrosecond) = time;

            Assert.Equal(time.Hour, obtainedHour);
            Assert.Equal(time.Minute, obtainedMinute);
            Assert.Equal(time.Second, obtainedSecond);
            Assert.Equal(time.Millisecond, obtainedMillisecond);
            Assert.Equal(time.Microsecond, obtainedMicrosecond);
        }
[Fact]
public static void AddTest()
        {
            TimeOnly to = new TimeOnly(1, 10, 20, 900);
            to = to.Add(new TimeSpan(1));
            Assert.Equal(TimeSpan.NanosecondsPerTick, to.Nanosecond);
            to = to.Add(new TimeSpan(TimeSpan.TicksPerMicrosecond));
            Assert.Equal(1, to.Microsecond);
            to = to.Add(new TimeSpan(TimeSpan.TicksPerMillisecond));
            Assert.Equal(901, to.Millisecond);
            to = to.Add(new TimeSpan(TimeSpan.TicksPerSecond));
            Assert.Equal(21, to.Second);
            to = to.Add(new TimeSpan(TimeSpan.TicksPerMinute));
            Assert.Equal(11, to.Minute);
            to = to.Add(new TimeSpan(TimeSpan.TicksPerHour));
            Assert.Equal(2, to.Hour);

            to = TimeOnly.MinValue.Add(new TimeSpan(-1), out int wrappedDays);
            Assert.Equal(23, to.Hour);
            Assert.Equal(59, to.Minute);
            Assert.Equal(59, to.Second);
            Assert.Equal(999, to.Millisecond);
            Assert.Equal(-1, wrappedDays);

            to = TimeOnly.MinValue.Add(new TimeSpan(48, 0, 0), out wrappedDays);
            Assert.Equal(0, to.Hour);
            Assert.Equal(0, to.Minute);
            Assert.Equal(0, to.Second);
            Assert.Equal(0, to.Millisecond);
            Assert.Equal(2, wrappedDays);
            to = to.Add(new TimeSpan(1, 0, 0), out wrappedDays);
            Assert.Equal(0, wrappedDays);

            to = TimeOnly.MinValue.AddHours(1.5);
            Assert.Equal(1, to.Hour);
            Assert.Equal(30, to.Minute);
            Assert.Equal(0, to.Second);
            Assert.Equal(0, to.Millisecond);
            Assert.Equal(0, to.Microsecond);
            Assert.Equal(0, to.Nanosecond);
            to = to.AddHours(1.5, out wrappedDays);
            Assert.Equal(3, to.Hour);
            Assert.Equal(0, to.Minute);
            Assert.Equal(0, to.Second);
            Assert.Equal(0, to.Microsecond);
            Assert.Equal(0, to.Nanosecond);
            Assert.Equal(0, wrappedDays);
            to = to.AddHours(-28, out wrappedDays);
            Assert.Equal(23, to.Hour);
            Assert.Equal(0, to.Minute);
            Assert.Equal(-2, wrappedDays);
            to = to.AddHours(1, out wrappedDays);
            Assert.Equal(1, wrappedDays);
            Assert.Equal(0, to.Hour);
            Assert.Equal(0, to.Minute);

            to = to.AddMinutes(190.5);
            Assert.Equal(3, to.Hour);
            Assert.Equal(10, to.Minute);
            Assert.Equal(30, to.Second);

            to = to.AddMinutes(-4 * 60, out wrappedDays);
            Assert.Equal(23, to.Hour);
            Assert.Equal(10, to.Minute);
            Assert.Equal(30, to.Second);
            Assert.Equal(-1, wrappedDays);

            to = to.AddMinutes(60.5, out wrappedDays);
            Assert.Equal(0, to.Hour);
            Assert.Equal(11, to.Minute);
            Assert.Equal(0, to.Second);
            Assert.Equal(1, wrappedDays);
        }
[Fact]
public static void IsBetweenTest()
        {
            TimeOnly to1 = new TimeOnly(14, 30);
            TimeOnly to2 = new TimeOnly(2, 0);
            TimeOnly to3 = new TimeOnly(12, 0);

            Assert.True(to3.IsBetween(to2, to1));
            Assert.True(to1.IsBetween(to3, to2));

            Assert.True(to3.IsBetween(to3, to1));
            Assert.True(to1.IsBetween(to1, to2));

            Assert.False(to1.IsBetween(to3, to1));
            Assert.False(to2.IsBetween(to3, to2));

            Assert.True(to1.IsBetween(to3, to1.Add(new TimeSpan(1))));
            Assert.True(to2.IsBetween(to3, to2.Add(new TimeSpan(1))));
        }
[Fact]
public static void CompareOperatorsTest()
        {
            TimeOnly to1 = new TimeOnly(14, 30);
            TimeOnly to2 = new TimeOnly(14, 30);
            TimeOnly to3 = new TimeOnly(14, 30, 1);

            Assert.True(to1 == to2);
            Assert.True(to1 >= to2);
            Assert.True(to1 <= to2);

            Assert.True(to1 != to3);
            Assert.True(to1 < to3);
            Assert.True(to1 <= to3);

            Assert.True(to3 > to1);
            Assert.True(to3 >= to1);

            Assert.False(to1 == to3);
            Assert.False(to1 > to3);
            Assert.False(to3 < to1);
            Assert.False(to1 != to2);
        }
[Fact]
public static void SubtractOperatorTest()
        {
            TimeOnly to1 = new TimeOnly(10, 30, 40);
            TimeOnly to2 = new TimeOnly(14, 0);

            Assert.Equal(new TimeSpan(3, 29, 20), to2 - to1);
            Assert.Equal(new TimeSpan(20,30, 40), to1 - to2);
            Assert.Equal(TimeSpan.Zero, to1 - to1);
            Assert.Equal(new TimeSpan(2,0, 0), new TimeOnly(1, 0) - new TimeOnly(23, 0));
        }
[Fact]
public static void FromToTimeSpanTest()
        {
            Assert.Equal(TimeOnly.MinValue, TimeOnly.FromTimeSpan(TimeSpan.Zero));
            Assert.Equal(TimeSpan.Zero, TimeOnly.MinValue.ToTimeSpan());

            Assert.Equal(new TimeOnly(10, 20, 30), TimeOnly.FromTimeSpan(new TimeSpan(10, 20, 30)));
            Assert.Equal(new TimeSpan(14, 10, 50), new TimeOnly(14, 10, 50).ToTimeSpan());

            Assert.Equal(TimeOnly.MaxValue, TimeOnly.FromTimeSpan(TimeOnly.MaxValue.ToTimeSpan()));

            AssertExtensions.Throws<ArgumentOutOfRangeException>("ticks", () => TimeOnly.FromTimeSpan(new TimeSpan(24, 0, 0)));
            AssertExtensions.Throws<ArgumentOutOfRangeException>("ticks", () => TimeOnly.FromTimeSpan(new TimeSpan(-1, 0, 0)));
        }
[Fact]
public static void FromDateTimeTest()
        {
            DateTime dt = TimeOnlyCoreOracle.Now;
            TimeOnly timeOnly = TimeOnly.FromDateTime(dt);

            Assert.Equal(dt.Hour, timeOnly.Hour);
            Assert.Equal(dt.Minute, timeOnly.Minute);
            Assert.Equal(dt.Second, timeOnly.Second);
            Assert.Equal(dt.Millisecond, timeOnly.Millisecond);
            Assert.Equal(dt.Microsecond, timeOnly.Microsecond);
            Assert.Equal(dt.Nanosecond, timeOnly.Nanosecond);
            Assert.Equal(dt.TimeOfDay.Ticks, timeOnly.Ticks);
        }
[Fact]
public static void ComparisonsTest()
        {
            TimeOnly timeOnly1 = TimeOnly.FromDateTime(TimeOnlyCoreOracle.Now);
            TimeOnly timeOnly2 = timeOnly1.Add(new TimeSpan(1));
            TimeOnly timeOnly3 = new TimeOnly(timeOnly1.Ticks);

            Assert.Equal(-1, timeOnly1.CompareTo(timeOnly2));
            Assert.Equal(1, timeOnly2.CompareTo(timeOnly1));
            Assert.Equal(-1, timeOnly1.CompareTo(timeOnly2));
            Assert.Equal(0, timeOnly1.CompareTo(timeOnly3));

            Assert.Equal(-1, timeOnly1.CompareTo((object)timeOnly2));
            Assert.Equal(1, timeOnly2.CompareTo((object)timeOnly1));
            Assert.Equal(-1, timeOnly1.CompareTo((object)timeOnly2));
            Assert.Equal(0, timeOnly1.CompareTo((object)timeOnly3));

            Assert.True(timeOnly1.Equals(timeOnly3));
            Assert.True(timeOnly1.Equals((object)timeOnly3));
            Assert.False(timeOnly2.Equals(timeOnly3));
            Assert.False(timeOnly2.Equals((object)timeOnly3));

            Assert.False(timeOnly2.Equals(null));
            Assert.False(timeOnly2.Equals(new object()));
        }
[Fact]
public static void GetHashCodeTest()
        {
            TimeOnly timeOnly1 = TimeOnly.FromDateTime(TimeOnlyCoreOracle.Now);
            TimeOnly timeOnly2 = timeOnly1.Add(new TimeSpan(1));
            TimeOnly timeOnly3 = new TimeOnly(timeOnly1.Ticks);

            Assert.True(timeOnly1.GetHashCode() == timeOnly3.GetHashCode());
            Assert.False(timeOnly1.GetHashCode() == timeOnly2.GetHashCode());
        }
}
