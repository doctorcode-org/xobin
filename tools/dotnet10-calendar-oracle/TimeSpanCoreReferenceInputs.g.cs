// Derived from official .NET 10.0.7 TimeSpan tests.
// Licensed to the .NET Foundation under the MIT license.
internal static partial class TimeSpanCoreOracle {
public static void MaxValue()
        {
            VerifyTimeSpan(TimeSpan.MaxValue, 10675199, 2, 48, 5, 477);
        }
public static void MinValue()
        {
            VerifyTimeSpan(TimeSpan.MinValue, -10675199, -2, -48, -5, -477);
        }
public static void Zero()
        {
            VerifyTimeSpan(TimeSpan.Zero, 0, 0, 0, 0, 0);
        }
public static void Ctor_Empty()
        {
            VerifyTimeSpan(Create(), 0, 0, 0, 0, 0);
            VerifyTimeSpan(default(TimeSpan), 0, 0, 0, 0, 0);
        }
public static void Ctor_Long()
        {
            VerifyTimeSpan(Create(999999999999999999), 1157407, 9, 46, 39, 999);
        }
public static void Ctor_Int_Int_Int()
        {
            var timeSpan = Create(10, 9, 8);
            VerifyTimeSpan(timeSpan, 0, 10, 9, 8, 0);
        }
public static void Ctor_Int_Int_Int_Invalid()
        {
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create((int)TimeSpan.MinValue.TotalHours - 1, 0, 0)); // TimeSpan < TimeSpan.MinValue
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create((int)TimeSpan.MaxValue.TotalHours + 1, 0, 0)); // TimeSpan > TimeSpan.MaxValue
        }
public static void Ctor_Int_Int_Int_Int_Int()
        {
            var timeSpan = Create(10, 9, 8, 7, 6);
            VerifyTimeSpan(timeSpan, 10, 9, 8, 7, 6);
        }
public static void Ctor_Int_Int_Int_Int_Int_Invalid()
        {
            // TimeSpan > TimeSpan.MinValue
            TimeSpan min = TimeSpan.MinValue;
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(min.Days - 1, min.Hours, min.Minutes, min.Seconds, min.Milliseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(min.Days, min.Hours - 1, min.Minutes, min.Seconds, min.Milliseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(min.Days, min.Hours, min.Minutes - 1, min.Seconds, min.Milliseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(min.Days, min.Hours, min.Minutes, min.Seconds - 1, min.Milliseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(min.Days, min.Hours, min.Minutes, min.Seconds, min.Milliseconds - 1));

            // TimeSpan > TimeSpan.MaxValue
            TimeSpan max = TimeSpan.MaxValue;
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(max.Days + 1, max.Hours, max.Minutes, max.Seconds, max.Milliseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(max.Days, max.Hours + 1, max.Minutes, max.Seconds, max.Milliseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(max.Days, max.Hours, max.Minutes + 1, max.Seconds, max.Milliseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(max.Days, max.Hours, max.Minutes, max.Seconds + 1, max.Milliseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(max.Days, max.Hours, max.Minutes, max.Seconds, max.Milliseconds + 1));
        }
public static void Ctor_Int_Int_Int_Int_Int_Int()
        {
            var timeSpan = Create(10, 9, 8, 7, 6, 5);
            VerifyTimeSpan(timeSpan, 10, 9, 8, 7, 6, 5);
        }
public static void Ctor_Int_Int_Int_Int_Int_Int_Invalid()
        {
            // TimeSpan > TimeSpan.MinValue
            TimeSpan min = TimeSpan.MinValue;
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(min.Days - 1, min.Hours, min.Minutes, min.Seconds, min.Milliseconds, min.Microseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(min.Days, min.Hours - 1, min.Minutes, min.Seconds, min.Milliseconds, min.Microseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(min.Days, min.Hours, min.Minutes - 1, min.Seconds, min.Milliseconds, min.Microseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(min.Days, min.Hours, min.Minutes, min.Seconds - 1, min.Milliseconds, min.Microseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(min.Days, min.Hours, min.Minutes, min.Seconds, min.Milliseconds, min.Microseconds - 1));

            // TimeSpan > TimeSpan.MaxValue
            TimeSpan max = TimeSpan.MaxValue;
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(max.Days + 1, max.Hours, max.Minutes, max.Seconds, max.Milliseconds, max.Microseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(max.Days, max.Hours + 1, max.Minutes, max.Seconds, max.Milliseconds, max.Microseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(max.Days, max.Hours, max.Minutes + 1, max.Seconds, max.Milliseconds, max.Microseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(max.Days, max.Hours, max.Minutes, max.Seconds + 1, max.Milliseconds, max.Microseconds));
            AssertExtensions.Throws<ArgumentOutOfRangeException>(null, () => Create(max.Days, max.Hours, max.Minutes, max.Seconds, max.Milliseconds, max.Microseconds + 1));
        }
public static void Ctor_Int_Int_Int_Int_Int_Int_WithNanosecond(int nanoseconds)
        {
            var timeSpan = Create(10, 9, 8, 7, 6, 5);
            timeSpan = Create(timeSpan.Ticks + nanoseconds / 100);

            VerifyTimeSpan(timeSpan, 10, 9, 8, 7, 6, 5, nanoseconds);
        }
public static void TotalMilliseconds_Invalid()
        {
            long maxMilliseconds = long.MaxValue / 10000;
            long minMilliseconds = long.MinValue / 10000;
            Assert.Equal(maxMilliseconds, TimeSpan.MaxValue.TotalMilliseconds);
            Assert.Equal(minMilliseconds, TimeSpan.MinValue.TotalMilliseconds);
        }
internal static readonly int[] Nanoseconds_TestData = { 100, 300, 900 };
public static IEnumerable<object[]> Total_Days_Hours_Minutes_Seconds_Milliseconds_TestData()
        {
            yield return new object[] { new TimeSpan(0, 0, 0, 0, 0), 0.0, 0.0, 0.0, 0.0, 0.0 };
            yield return new object[] { new TimeSpan(0, 0, 0, 0, 500), 0.5 / 60.0 / 60.0 / 24.0, 0.5 / 60.0 / 60.0, 0.5 / 60.0, 0.5, 500.0 };
            yield return new object[] { new TimeSpan(0, 1, 0, 0, 0), 1 / 24.0, 1, 60, 3600, 3600000 };
            yield return new object[] { new TimeSpan(1, 0, 0, 0, 0), 1, 24, 1440, 86400, 86400000 };
            yield return new object[] { new TimeSpan(1, 1, 0, 0, 0), 25.0 / 24.0, 25, 1500, 90000, 90000000 };
        }
}
