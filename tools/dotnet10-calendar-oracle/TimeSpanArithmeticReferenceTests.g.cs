// Derived from official .NET 10.0.7 TimeSpan tests.
// Licensed to the .NET Foundation under the MIT license.
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq.Expressions;
using TimeSpan = ObservedTimeSpan;
internal static class TimeSpanArithmeticTests {
        private const long maxMicroseconds = 922_337_203_685_477_580;
        private const long maxMilliseconds = 922_337_203_685_477;
        private const long maxSeconds = 922_337_203_685;
        private const long maxMinutes = 15_372_286_728;
        private const int maxHours = 256_204_778;
        private const int maxDays = 10_675_199;
[Theory]
[MemberData(nameof(Add_TestData))]
public static void Add(TimeSpan timeSpan1, TimeSpan timeSpan2, TimeSpan expected)
        {
            Assert.Equal(expected, timeSpan1.Add(timeSpan2));
            Assert.Equal(expected, timeSpan1 + timeSpan2);
        }
[Fact]
public static void Add_Invalid()
        {
            Assert.Throws<OverflowException>(() => TimeSpan.MaxValue.Add(new TimeSpan(1))); // Result > TimeSpan.MaxValue
            Assert.Throws<OverflowException>(() => TimeSpan.MinValue.Add(new TimeSpan(-1))); // Result < TimeSpan.MinValue

            Assert.Throws<OverflowException>(() => TimeSpan.MaxValue + new TimeSpan(1)); // Result > TimeSpan.MaxValue
            Assert.Throws<OverflowException>(() => TimeSpan.MinValue + new TimeSpan(-1)); // Result < TimeSpan.MinValue
        }
[Fact]
public static void FromMinMaxValue_DoesNotThrow()
        {
            TimeSpan maxTimeSpan = TimeSpan.FromDays(TimeSpan.MaxValue.TotalDays);
            TimeSpan minTimeSpan = TimeSpan.FromDays(TimeSpan.MinValue.TotalDays);

            Assert.Equal(TimeSpan.MaxValue, maxTimeSpan);
            Assert.Equal(TimeSpan.MinValue, minTimeSpan);
        }
[Theory]
[MemberData(nameof(CompareTo_TestData))]
public static void CompareTo(TimeSpan timeSpan1, object obj, int expected)
        {
            if (obj is TimeSpan)
            {
                TimeSpan timeSpan2 = (TimeSpan)obj;
                Assert.Equal(expected, Math.Sign(timeSpan1.CompareTo(timeSpan2)));
                Assert.Equal(expected, Math.Sign(TimeSpan.Compare(timeSpan1, timeSpan2)));

                if (expected >= 0)
                {
                    Assert.True(timeSpan1 >= timeSpan2);
                    Assert.False(timeSpan1 < timeSpan2);
                }
                if (expected > 0)
                {
                    Assert.True(timeSpan1 > timeSpan2);
                    Assert.False(timeSpan1 <= timeSpan2);
                }
                if (expected <= 0)
                {
                    Assert.True(timeSpan1 <= timeSpan2);
                    Assert.False(timeSpan1 > timeSpan2);
                }
                if (expected < 0)
                {
                    Assert.True(timeSpan1 < timeSpan2);
                    Assert.False(timeSpan1 >= timeSpan2);
                }
            }
            IComparable comparable = timeSpan1;
            Assert.Equal(expected, Math.Sign(comparable.CompareTo(obj)));
        }
[Fact]
public static void CompareTo_ObjectNotTimeSpan_ThrowsArgumentException()
        {
            IComparable comparable = new TimeSpan(10000);
            AssertExtensions.Throws<ArgumentException>(null, () => comparable.CompareTo("10000")); // Obj is not a time span
        }
[Theory]
[MemberData(nameof(Duration_TestData))]
public static void Duration(TimeSpan timeSpan, TimeSpan expected)
        {
            Assert.Equal(expected, timeSpan.Duration());
        }
[Fact]
public static void Duration_Invalid()
        {
            Assert.Throws<OverflowException>(() => TimeSpan.MinValue.Duration()); // TimeSpan.Ticks == TimeSpan.MinValue.Ticks
            Assert.Throws<OverflowException>(() => new TimeSpan(TimeSpan.MinValue.Ticks).Duration()); // TimeSpan.Ticks == TimeSpan.MinValue.Ticks
        }
[Theory]
[MemberData(nameof(Equals_TestData))]
public static void EqualsTest(TimeSpan timeSpan1, object obj, bool expected)
        {
            if (obj is TimeSpan)
            {
                TimeSpan timeSpan2 = (TimeSpan)obj;
                Assert.Equal(expected, TimeSpan.Equals(timeSpan1, timeSpan2));
                Assert.Equal(expected, timeSpan1.Equals(timeSpan2));
                Assert.Equal(expected, timeSpan1 == timeSpan2);
                Assert.Equal(!expected, timeSpan1 != timeSpan2);

                Assert.Equal(expected, timeSpan1.GetHashCode().Equals(timeSpan2.GetHashCode()));
            }
            Assert.Equal(expected, timeSpan1.Equals(obj));
        }
[Fact]
public static void FromDays_Int_Positive()
        {
            var expectedaaa = new TimeSpan(1, 2, 3, 4, 5, 6);
            var actual = TimeSpan.FromDays(1, 2, 3, 4, 5, 6);
            Assert.Equal(expectedaaa, actual);
        }
[Fact]
public static void FromDays_Int_Negative()
        {
            var expectedaaa = new TimeSpan(-1, -2, -3, -4, -5, -6);
            var actual = TimeSpan.FromDays(-1, -2, -3, -4, -5, -6);
            Assert.Equal(expectedaaa, actual);
        }
[Fact]
public static void FromDays_Int_Zero()
        {
            var expectedaaa = new TimeSpan(0, 0, 0, 0, 0, 0);
            var actual = TimeSpan.FromDays(0, 0, 0, 0, 0, 0);
            Assert.Equal(expectedaaa, actual);
        }
[Fact]
public static void FromSeconds_Int_ShouldGiveResultWithPrecision()
        {
            // Given example of problem with double in: https://github.com/dotnet/runtime/issues/93890#issue-1957706751
            Assert.Equal(new TimeSpan(0, 0, 0, 101, 832), TimeSpan.FromSeconds(101, 832));
        }
[Fact]
public static void FromDays_Int_ShouldOverflow_WhenIntermediateCalculationCouldOverflowBackIntoValidRange()
        {
            // Given example of problematic day count in comment in abandoned pr https://github.com/dotnet/runtime/pull/95779/files#r1439772903
            Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromDays(1067519900));
        }
[Fact]
public static void FromDays_Int_ShouldConstructMaxValueAproximation()
        {
            var expected = TimeSpan.MaxValue;
            var actual = TimeSpan.FromDays(expected.Days, expected.Hours, expected.Minutes, expected.Seconds, expected.Milliseconds, expected.Microseconds);
            // Should be within TicksPerMicrosecond (10) ticks of expected
            var diffTicks = (expected - actual).Ticks;
            Assert.True(Math.Abs(diffTicks) < 10, $"Diff ticks was {diffTicks}");
        }
[Fact]
public static void FromDays_Int_ShouldConstructMinValueAproximation()
        {
            var expected = TimeSpan.MinValue;
            var actual = TimeSpan.FromDays(expected.Days, expected.Hours, expected.Minutes, expected.Seconds, expected.Milliseconds, expected.Microseconds);
            // Should be within TicksPerMicrosecond (10) ticks of expected
            var diffTicks = (actual - expected).Ticks;
            Assert.True(Math.Abs(diffTicks) < 10, $"Diff ticks was {diffTicks}");
        }
[Theory]
[MemberData(nameof(FromDays_Int_ShouldOverflowOrUnderflow_Data))]
public static void FromDays_Int_ShouldOverflowOrUnderflow(int days, int hours, long minutes, long seconds, long milliseconds, long microseconds)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromDays(days, hours, minutes, seconds, milliseconds, microseconds));
        }
[Theory]
[MemberData(nameof(FromDays_Int_ShouldNotOverflow_WhenOverflowingParamIsCounteredByOppositeSignParam_Data))]
public static void FromDays_Int_ShouldNotOverflow_WhenOverflowingParamIsCounteredByOppositeSignParam(int days, int hours, long minutes, long seconds, long milliseconds, long microseconds)
        {
            var actual = TimeSpan.FromDays(days, hours, minutes, seconds, milliseconds, microseconds);
            // 2 individually overflowing or underflowing params with opposite sign should end up close to TimeSpan.FromDays(0)
            // This is an implementation detail of the chosen test data, but a nice sanity check of expected result
            Assert.True(actual > TimeSpan.FromDays(-1));
            Assert.True(actual < TimeSpan.FromDays(1));
        }
[Theory]
[InlineData(maxDays, maxHours, maxMinutes, maxSeconds, maxMilliseconds, maxMicroseconds)]
[InlineData(-maxDays, -maxHours, -maxMinutes, -maxSeconds, -maxMilliseconds, -maxMicroseconds)]
[InlineData(int.MaxValue, int.MaxValue, long.MaxValue, long.MaxValue, long.MaxValue, long.MaxValue)]
[InlineData(int.MinValue, int.MinValue, long.MinValue, long.MinValue, long.MinValue, long.MinValue)]
[InlineData(int.MaxValue, 0, 0, 0, 0, 0)]
[InlineData(int.MinValue, 0, 0, 0, 0, 0)]
[InlineData(0, int.MaxValue, 0, 0, 0, 0)]
[InlineData(0, int.MinValue, 0, 0, 0, 0)]
[InlineData(0, 0, long.MaxValue, 0, 0, 0)]
[InlineData(0, 0, long.MinValue, 0, 0, 0)]
[InlineData(0, 0, 0, long.MaxValue, 0, 0)]
[InlineData(0, 0, 0, long.MinValue, 0, 0)]
[InlineData(0, 0, 0, 0, long.MaxValue, 0)]
[InlineData(0, 0, 0, 0, long.MinValue, 0)]
[InlineData(0, 0, 0, 0, 0, long.MaxValue)]
[InlineData(0, 0, 0, 0, 0, long.MinValue)]
public static void FromDays_Int_ShouldOverflow(int days, int hours, long minutes, long seconds, long milliseconds, long microseconds)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromDays(days, hours, minutes, seconds, milliseconds, microseconds));
        }
[Theory]
[InlineData(0)]
[InlineData(1)]
[InlineData(-1)]
[InlineData(maxDays)]
[InlineData(-maxDays)]
public static void FromDays_Int_Single_ShouldCreate(int days)
        {
            Assert.Equal(new TimeSpan(days, 0, 0, 0), TimeSpan.FromDays(days));
        }
[Theory]
[InlineData(maxDays + 1)]
[InlineData(-(maxDays + 1))]
[InlineData(int.MaxValue)]
[InlineData(int.MinValue)]
public static void FromDays_Int_Single_ShouldOverflow(int days)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromDays(days));
        }
[Theory]
[InlineData(0)]
[InlineData(1)]
[InlineData(-1)]
[InlineData(maxHours)]
[InlineData(-maxHours)]
public static void FromHours_Int_Single_ShouldCreate(int hours)
        {
            Assert.Equal(new TimeSpan(0, hours, 0, 0), TimeSpan.FromHours(hours));
        }
[Theory]
[InlineData(maxHours + 1)]
[InlineData(-(maxHours + 1))]
[InlineData(int.MaxValue)]
[InlineData(int.MinValue)]
public static void FromHours_Int_Single_ShouldOverflow(int hours)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromHours(hours));
        }
[Theory]
[InlineData(0, 0, 0, 0, 0)]
[InlineData(1, 1, 1, 1, 1)]
[InlineData(-1, -1, -1, -1, -1)]
[InlineData(maxHours, 0, 0, 0, 0)]
[InlineData(-maxHours, 0, 0, 0, 0)]
[InlineData(0, maxMinutes, 0, 0, 0)]
[InlineData(0, -maxMinutes, 0, 0, 0)]
[InlineData(0, 0, maxSeconds, 0, 0)]
[InlineData(0, 0, -maxSeconds, 0, 0)]
[InlineData(0, 0, 0, maxMilliseconds, 0)]
[InlineData(0, 0, 0, -maxMilliseconds, 0)]
[InlineData(0, 0, 0, 0, maxMicroseconds)]
[InlineData(0, 0, 0, 0, -maxMicroseconds)]
public static void FromHours_Int_ShouldCreate(int hours, long minutes, long seconds, long milliseconds, long microseconds)
        {
            var ticksFromHours = hours * TimeSpan.TicksPerHour;
            var ticksFromMinutes = minutes * TimeSpan.TicksPerMinute;
            var ticksFromSeconds = seconds * TimeSpan.TicksPerSecond;
            var ticksFromMilliseconds = milliseconds * TimeSpan.TicksPerMillisecond;
            var ticksFromMicroseconds = microseconds * TimeSpan.TicksPerMicrosecond;
            var expected = TimeSpan.FromTicks(ticksFromHours + ticksFromMinutes + ticksFromSeconds + ticksFromMilliseconds + ticksFromMicroseconds);
            Assert.Equal(expected, TimeSpan.FromHours(hours, minutes, seconds, milliseconds, microseconds));
        }
[Theory]
[InlineData(maxHours + 1, 0, 0, 0, 0)]
[InlineData(-(maxHours + 1), 0, 0, 0, 0)]
[InlineData(0, maxMinutes + 1, 0, 0, 0)]
[InlineData(0, -(maxMinutes + 1), 0, 0, 0)]
[InlineData(0, 0, maxSeconds + 1, 0, 0)]
[InlineData(0, 0, -(maxSeconds + 1), 0, 0)]
[InlineData(0, 0, 0, maxMilliseconds + 1, 0)]
[InlineData(0, 0, 0, -(maxMilliseconds + 1), 0)]
[InlineData(0, 0, 0, 0, maxMicroseconds + 1)]
[InlineData(0, 0, 0, 0, -(maxMicroseconds + 1))]
public static void FromHours_Int_ShouldOverflow(int hours, long minutes, long seconds, long milliseconds, long microseconds)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromHours(hours, minutes, seconds, milliseconds, microseconds));
        }
[Theory]
[InlineData(0)]
[InlineData(1)]
[InlineData(-1)]
[InlineData(maxMinutes)]
[InlineData(-maxMinutes)]
public static void FromMinutes_Int_Single_ShouldCreate(long minutes)
        {
            Assert.Equal(TimeSpan.FromDays(0, minutes: minutes), TimeSpan.FromMinutes(minutes));
        }
[Theory]
[InlineData(maxMinutes + 1)]
[InlineData(-(maxMinutes + 1))]
[InlineData(long.MaxValue)]
[InlineData(long.MinValue)]
public static void FromMinutes_Int_Single_ShouldOverflow(long minutes)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromMinutes(minutes));
        }
[Theory]
[InlineData(0, 0, 0, 0)]
[InlineData(1, 1, 1, 1)]
[InlineData(-1, -1, -1, -1)]
[InlineData(maxMinutes, 0, 0, 0)]
[InlineData(-maxMinutes, 0, 0, 0)]
[InlineData(0, maxSeconds, 0, 0)]
[InlineData(0, -maxSeconds, 0, 0)]
[InlineData(0, 0, maxMilliseconds, 0)]
[InlineData(0, 0, -maxMilliseconds, 0)]
[InlineData(0, 0, 0, maxMicroseconds)]
[InlineData(0, 0, 0, -maxMicroseconds)]
public static void FromMinutes_Int_ShouldCreate(long minutes, long seconds, long milliseconds, long microseconds)
        {
            var ticksFromMinutes = minutes * TimeSpan.TicksPerMinute;
            var ticksFromSeconds = seconds * TimeSpan.TicksPerSecond;
            var ticksFromMilliseconds = milliseconds * TimeSpan.TicksPerMillisecond;
            var ticksFromMicroseconds = microseconds * TimeSpan.TicksPerMicrosecond;
            var expected = TimeSpan.FromTicks(ticksFromMinutes + ticksFromSeconds + ticksFromMilliseconds + ticksFromMicroseconds);
            Assert.Equal(expected, TimeSpan.FromMinutes(minutes, seconds, milliseconds, microseconds));
        }
[Theory]
[InlineData(maxMinutes + 1, 0, 0, 0)]
[InlineData(-(maxMinutes + 1), 0, 0, 0)]
[InlineData(0, maxSeconds + 1, 0, 0)]
[InlineData(0, -(maxSeconds + 1), 0, 0)]
[InlineData(0, 0, maxMilliseconds + 1, 0)]
[InlineData(0, 0, -(maxMilliseconds + 1), 0)]
[InlineData(0, 0, 0, maxMicroseconds + 1)]
[InlineData(0, 0, 0, -(maxMicroseconds + 1))]
public static void FromMinutes_Int_ShouldOverflow(long minutes, long seconds, long milliseconds, long microseconds)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromMinutes(minutes, seconds, milliseconds, microseconds));
        }
[Theory]
[InlineData(0)]
[InlineData(1)]
[InlineData(-1)]
[InlineData(maxSeconds)]
[InlineData(-maxSeconds)]
public static void FromSeconds_Int_Single_ShouldCreate(long seconds)
        {
            Assert.Equal(TimeSpan.FromDays(0, seconds: seconds), TimeSpan.FromSeconds(seconds));
        }
[Theory]
[InlineData(maxSeconds + 1)]
[InlineData(-(maxSeconds + 1))]
[InlineData(long.MaxValue)]
[InlineData(long.MinValue)]
public static void FromSeconds_Int_Single_ShouldOverflow(long seconds)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromSeconds(seconds));
        }
[Theory]
[InlineData(0, 0, 0)]
[InlineData(1, 1, 1)]
[InlineData(-1, -1, -1)]
[InlineData(maxSeconds, 0, 0)]
[InlineData(-maxSeconds, 0, 0)]
[InlineData(0, maxMilliseconds, 0)]
[InlineData(0, -maxMilliseconds, 0)]
[InlineData(0, 0, maxMicroseconds)]
[InlineData(0, 0, -maxMicroseconds)]
public static void FromSeconds_Int_ShouldCreate(long seconds, long milliseconds, long microseconds)
        {
            var ticksFromSeconds = seconds * TimeSpan.TicksPerSecond;
            var ticksFromMilliseconds = milliseconds * TimeSpan.TicksPerMillisecond;
            var ticksFromMicroseconds = microseconds * TimeSpan.TicksPerMicrosecond;
            var expected = TimeSpan.FromTicks(ticksFromSeconds + ticksFromMilliseconds + ticksFromMicroseconds);
            Assert.Equal(expected, TimeSpan.FromSeconds(seconds, milliseconds, microseconds));
        }
[Theory]
[InlineData(maxSeconds + 1, 0, 0)]
[InlineData(-(maxSeconds + 1), 0, 0)]
[InlineData(0, maxMilliseconds + 1, 0)]
[InlineData(0, -(maxMilliseconds + 1), 0)]
[InlineData(0, 0, maxMicroseconds + 1)]
[InlineData(0, 0, -(maxMicroseconds + 1))]
[InlineData(long.MaxValue, 0, 0)]
[InlineData(long.MinValue, 0, 0)]
[InlineData(0, long.MaxValue, 0)]
[InlineData(0, long.MinValue, 0)]
[InlineData(0, 0, long.MaxValue)]
[InlineData(0, 0, long.MinValue)]
[InlineData(maxSeconds, maxMilliseconds, 0)]
[InlineData(0, maxMilliseconds, maxMicroseconds)]
[InlineData(maxSeconds, 0, maxMicroseconds)]
public static void FromSeconds_Int_ShouldOverflow(long seconds, long milliseconds, long microseconds)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromSeconds(seconds, milliseconds, microseconds));
        }
[Theory]
[InlineData(0, 0)]
[InlineData(1, 0)]
[InlineData(0, 1)]
[InlineData(-1, 0)]
[InlineData(0, -1)]
[InlineData(maxMilliseconds, 0)]
[InlineData(-maxMilliseconds, 0)]
[InlineData(0, maxMicroseconds)]
[InlineData(0, -maxMicroseconds)]
public static void FromMilliseconds_Int_ShouldCreate(long milliseconds, long microseconds)
        {
            long ticksFromMilliseconds = milliseconds * TimeSpan.TicksPerMillisecond;
            long ticksFromMicroseconds = microseconds * TimeSpan.TicksPerMicrosecond;
            var expected = TimeSpan.FromTicks(ticksFromMilliseconds + ticksFromMicroseconds);
            Assert.Equal(expected, TimeSpan.FromMilliseconds(milliseconds, microseconds));

            expected = TimeSpan.FromTicks(ticksFromMilliseconds);
            Assert.Equal(expected, TimeSpan.FromMilliseconds(milliseconds));

            // The following exist to ensure compilation of the expressions
            Expression<Action> a = () => TimeSpan.FromMilliseconds(milliseconds);
            Expression<Action> b = () => TimeSpan.FromMilliseconds(milliseconds, microseconds);
            Expression<Action> c = () => TimeSpan.FromMilliseconds((double)milliseconds);
        }
[Theory]
[InlineData(maxMilliseconds + 1, 0)]
[InlineData(-(maxMilliseconds + 1), 0)]
[InlineData(long.MaxValue, 0)]
[InlineData(long.MinValue, 0)]
[InlineData(0, maxMicroseconds + 1)]
[InlineData(0, -(maxMicroseconds + 1))]
[InlineData(0, long.MaxValue)]
[InlineData(0, long.MinValue)]
[InlineData(maxMilliseconds, 1000)]
[InlineData(-maxMilliseconds, -1000)]
[InlineData(1, maxMicroseconds)]
[InlineData(-1, -maxMicroseconds)]
public static void FromMilliseconds_Int_ShouldOverflow(long milliseconds, long microseconds)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromMilliseconds(milliseconds, microseconds));

            if (microseconds == 0)
            {
                Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromMilliseconds(milliseconds));
            }
        }
[Theory]
[InlineData(0)]
[InlineData(1)]
[InlineData(-1)]
[InlineData(maxMicroseconds)]
[InlineData(-maxMicroseconds)]
public static void FromMicroseconds_Int_Single_ShouldCreate(long microseconds)
        {
            Assert.Equal(TimeSpan.FromDays(0, microseconds: microseconds), TimeSpan.FromMicroseconds(microseconds));
        }
[Theory]
[InlineData(maxMicroseconds + 1)]
[InlineData(-(maxMicroseconds + 1))]
[InlineData(long.MaxValue)]
[InlineData(long.MinValue)]
public static void FromMicroseconds_Int_Single_ShouldOverflow(long microseconds)
        {
            Assert.Throws<ArgumentOutOfRangeException>(() => TimeSpan.FromMicroseconds(microseconds));
        }
[Theory]
[MemberData(nameof(FromDays_TestData))]
public static void FromDays(double value, TimeSpan expected)
        {
            Assert.Equal(expected, TimeSpan.FromDays(value));
        }
[Fact]
public static void FromDays_Invalid()
        {
            double maxDays = long.MaxValue / (TimeSpan.TicksPerMillisecond / 1000.0 / 60.0 / 60.0 / 24.0);

            Assert.Throws<OverflowException>(() => TimeSpan.FromDays(double.PositiveInfinity)); // Value is positive infinity
            Assert.Throws<OverflowException>(() => TimeSpan.FromDays(double.NegativeInfinity)); // Value is positive infinity

            Assert.Throws<OverflowException>(() => TimeSpan.FromDays(maxDays)); // Value > TimeSpan.MaxValue
            Assert.Throws<OverflowException>(() => TimeSpan.FromDays(-maxDays)); // Value < TimeSpan.MinValue

            AssertExtensions.Throws<ArgumentException>(null, () => TimeSpan.FromMinutes(double.NaN)); // Value is NaN
        }
[Theory]
[MemberData(nameof(FromHours_TestData))]
public static void FromHours(double value, TimeSpan expected)
        {
            Assert.Equal(expected, TimeSpan.FromHours(value));
        }
[Fact]
public static void FromHours_Invalid()
        {
            double maxHours = long.MaxValue / (TimeSpan.TicksPerMillisecond / 1000.0 / 60.0 / 60.0);

            Assert.Throws<OverflowException>(() => TimeSpan.FromHours(double.PositiveInfinity)); // Value is positive infinity
            Assert.Throws<OverflowException>(() => TimeSpan.FromHours(double.NegativeInfinity)); // Value is positive infinity

            Assert.Throws<OverflowException>(() => TimeSpan.FromHours(maxHours)); // Value > TimeSpan.MaxValue
            Assert.Throws<OverflowException>(() => TimeSpan.FromHours(-maxHours)); // Value < TimeSpan.MinValue

            AssertExtensions.Throws<ArgumentException>(null, () => TimeSpan.FromMinutes(double.NaN)); // Value is NaN
        }
[Theory]
[MemberData(nameof(FromMinutes_TestData))]
public static void FromMinutes(double value, TimeSpan expected)
        {
            Assert.Equal(expected, TimeSpan.FromMinutes(value));
        }
[Fact]
public static void FromMinutes_Invalid()
        {
            double maxMinutes = long.MaxValue / (TimeSpan.TicksPerMillisecond / 1000.0 / 60.0);

            Assert.Throws<OverflowException>(() => TimeSpan.FromMinutes(double.PositiveInfinity)); // Value is positive infinity
            Assert.Throws<OverflowException>(() => TimeSpan.FromMinutes(double.NegativeInfinity)); // Value is positive infinity

            Assert.Throws<OverflowException>(() => TimeSpan.FromMinutes(maxMinutes)); // Value > TimeSpan.MaxValue
            Assert.Throws<OverflowException>(() => TimeSpan.FromMinutes(-maxMinutes)); // Value < TimeSpan.MinValue

            AssertExtensions.Throws<ArgumentException>(null, () => TimeSpan.FromMinutes(double.NaN)); // Value is NaN
        }
[Theory]
[MemberData(nameof(FromSeconds_TestData))]
public static void FromSeconds(double value, TimeSpan expected)
        {
            Assert.Equal(expected, TimeSpan.FromSeconds(value));
        }
[Fact]
public static void FromSeconds_Invalid()
        {
            double maxSeconds = long.MaxValue / (TimeSpan.TicksPerMillisecond / 1000.0);

            Assert.Throws<OverflowException>(() => TimeSpan.FromSeconds(double.PositiveInfinity)); // Value is positive infinity
            Assert.Throws<OverflowException>(() => TimeSpan.FromSeconds(double.NegativeInfinity)); // Value is positive infinity

            Assert.Throws<OverflowException>(() => TimeSpan.FromSeconds(maxSeconds)); // Value > TimeSpan.MaxValue
            Assert.Throws<OverflowException>(() => TimeSpan.FromSeconds(-maxSeconds)); // Value < TimeSpan.MinValue

            AssertExtensions.Throws<ArgumentException>(null, () => TimeSpan.FromSeconds(double.NaN)); // Value is NaN
        }
[Theory]
[MemberData(nameof(FromMilliseconds_TestData_NetCore))]
public static void FromMilliseconds_Netcore(double value, TimeSpan expected)
        {
            Assert.Equal(expected, TimeSpan.FromMilliseconds(value));
        }
[Fact]
public static void FromMilliseconds_Invalid()
        {
            double maxMilliseconds = (double)TimeSpan.MaxValue.Ticks / (double)TimeSpan.TicksPerMillisecond + 1;

            Assert.Throws<OverflowException>(() => TimeSpan.FromMilliseconds(double.PositiveInfinity)); // Value is positive infinity
            Assert.Throws<OverflowException>(() => TimeSpan.FromMilliseconds(double.NegativeInfinity)); // Value is positive infinity

            Assert.Throws<OverflowException>(() => TimeSpan.FromMilliseconds(maxMilliseconds)); // Value > TimeSpan.MaxValue
            Assert.Throws<OverflowException>(() => TimeSpan.FromMilliseconds(-maxMilliseconds)); // Value < TimeSpan.MinValue

            AssertExtensions.Throws<ArgumentException>(null, () => TimeSpan.FromMilliseconds(double.NaN)); // Value is NaN
        }
[Theory]
[MemberData(nameof(FromTicks_TestData))]
public static void FromTicks(long value, TimeSpan expected)
        {
            Assert.Equal(expected, TimeSpan.FromTicks(value));
        }
[Theory]
[MemberData(nameof(TotalSeconds_ExactRepresentation_TestData))]
public static void TotalSeconds_ExactRepresentation(TimeSpan value)
        {
            Assert.Equal(value, TimeSpan.FromSeconds(value.TotalSeconds));
        }
[Theory]
[MemberData(nameof(Negate_TestData))]
public static void Negate(TimeSpan timeSpan, TimeSpan expected)
        {
            Assert.Equal(expected, timeSpan.Negate());
            Assert.Equal(expected, -timeSpan);
        }
[Fact]
public static void Negate_Invalid()
        {
            Assert.Throws<OverflowException>(() => TimeSpan.MinValue.Negate()); // TimeSpan.MinValue cannot be negated
            Assert.Throws<OverflowException>(() => -TimeSpan.MinValue); // TimeSpan.MinValue cannot be negated
        }
[Theory]
[MemberData(nameof(Subtract_TestData))]
public static void Subtract(TimeSpan ts1, TimeSpan ts2, TimeSpan expected)
        {
            Assert.Equal(expected, ts1.Subtract(ts2));
            Assert.Equal(expected, ts1 - ts2);
        }
[Fact]
public static void Subtract_Invalid()
        {
            Assert.Throws<OverflowException>(() => TimeSpan.MaxValue.Subtract(new TimeSpan(-1))); // Result > TimeSpan.MaxValue
            Assert.Throws<OverflowException>(() => TimeSpan.MinValue.Subtract(new TimeSpan(1))); // Result < TimeSpan.MinValue

            Assert.Throws<OverflowException>(() => TimeSpan.MaxValue - new TimeSpan(-1)); // Result > TimeSpan.MaxValue
            Assert.Throws<OverflowException>(() => TimeSpan.MinValue - new TimeSpan(1)); // Result < TimeSpan.MinValue
        }
[Theory]
[MemberData(nameof(CompareTo_TestData))]
public static void CompareTo_Object(TimeSpan timeSpan1, object obj, int expected)
        {
            Assert.Equal(expected, Math.Sign(timeSpan1.CompareTo(obj)));
        }
[Theory, MemberData(nameof(MultiplicationTestData))]
public static void Multiplication(TimeSpan timeSpan, double factor, TimeSpan expected)
        {
            Assert.Equal(expected, timeSpan * factor);
            Assert.Equal(expected, factor * timeSpan);
        }
[Fact]
public static void OverflowingMultiplication()
        {
            Assert.Throws<OverflowException>(() => TimeSpan.MaxValue * 1.000000001);
            Assert.Throws<OverflowException>(() => -1.000000001 * TimeSpan.MaxValue);
        }
[Fact]
public static void NaNMultiplication()
        {
            AssertExtensions.Throws<ArgumentException>("factor", () => TimeSpan.FromDays(1) * double.NaN);
            AssertExtensions.Throws<ArgumentException>("factor", () => double.NaN * TimeSpan.FromDays(1));
        }
[Theory, MemberData(nameof(MultiplicationTestData))]
public static void Division(TimeSpan timeSpan, double factor, TimeSpan expected)
        {
            Assert.Equal(factor, expected / timeSpan, 14);
            double divisor = 1.0 / factor;
            Assert.Equal(expected, timeSpan / divisor);
        }
[Fact]
public static void DivideByZero()
        {
            Assert.Throws<OverflowException>(() => TimeSpan.FromDays(1) / 0);
            Assert.Throws<OverflowException>(() => TimeSpan.FromDays(-1) / 0);
            Assert.Throws<OverflowException>(() => TimeSpan.Zero / 0);
            Assert.Equal(double.PositiveInfinity, TimeSpan.FromDays(1) / TimeSpan.Zero);
            Assert.Equal(double.NegativeInfinity, TimeSpan.FromDays(-1) / TimeSpan.Zero);
            Assert.True(double.IsNaN(TimeSpan.Zero / TimeSpan.Zero));
        }
[Fact]
public static void NaNDivision()
        {
            AssertExtensions.Throws<ArgumentException>("divisor", () => TimeSpan.FromDays(1) / double.NaN);
        }
[Theory, MemberData(nameof(MultiplicationTestData))]
public static void NamedMultiplication(TimeSpan timeSpan, double factor, TimeSpan expected)
        {
            Assert.Equal(expected, timeSpan.Multiply(factor));
        }
[Fact]
public static void NamedOverflowingMultiplication()
        {
            Assert.Throws<OverflowException>(() => TimeSpan.MaxValue.Multiply(1.000000001));
        }
[Fact]
public static void NamedNaNMultiplication()
        {
            AssertExtensions.Throws<ArgumentException>("factor", () => TimeSpan.FromDays(1).Multiply(double.NaN));
        }
[Theory, MemberData(nameof(MultiplicationTestData))]
public static void NamedDivision(TimeSpan timeSpan, double factor, TimeSpan expected)
        {
            Assert.Equal(factor, expected.Divide(timeSpan), 14);
            double divisor = 1.0 / factor;
            Assert.Equal(expected, timeSpan.Divide(divisor));
        }
[Fact]
public static void NamedDivideByZero()
        {
            Assert.Throws<OverflowException>(() => TimeSpan.FromDays(1).Divide(0));
            Assert.Throws<OverflowException>(() => TimeSpan.FromDays(-1).Divide(0));
            Assert.Throws<OverflowException>(() => TimeSpan.Zero.Divide(0));
            Assert.Equal(double.PositiveInfinity, TimeSpan.FromDays(1).Divide(TimeSpan.Zero));
            Assert.Equal(double.NegativeInfinity, TimeSpan.FromDays(-1).Divide(TimeSpan.Zero));
            Assert.True(double.IsNaN(TimeSpan.Zero.Divide(TimeSpan.Zero)));
        }
[Fact]
public static void NamedNaNDivision()
        {
            AssertExtensions.Throws<ArgumentException>("divisor", () => TimeSpan.FromDays(1).Divide(double.NaN));
        }
[Fact]
public static void ConvertToTimeSpanPrecisionTest()
        {
            Assert.Equal(12345, TimeSpan.FromMilliseconds(1.23456).Ticks);
            Assert.Equal(12345, TimeSpan.FromMilliseconds(1.234567).Ticks);

            Assert.Equal(12345600, TimeSpan.FromSeconds(1.23456).Ticks);

            Assert.Equal(1.23456 * 60 * 10_000_000, TimeSpan.FromMinutes(1.23456).Ticks);
        }
[Theory]
[InlineData(0, 0)]
[InlineData(100, 10)]
[InlineData(1_000, 100)]
public static void TestTotalMicroseconds(long ticks, double totalMicroseconds)
        {
            var timeSpan = new TimeSpan(ticks);
            Assert.Equal(totalMicroseconds, timeSpan.TotalMicroseconds);
        }
[Theory]
[InlineData(0, 0)]
[InlineData(100, 10_000)]
[InlineData(1_000, 100_000)]
public static void TestTotalNanoseconds(long ticks, double totalNanoseconds)
        {
            var timeSpan = new TimeSpan(ticks);
            Assert.Equal(totalNanoseconds, timeSpan.TotalNanoseconds);
        }
public static IEnumerable<object[]> Add_TestData()
        {
            yield return new object[] { new TimeSpan(0, 0, 0), new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 3) };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(4, 5, 6), new TimeSpan(5, 7, 9) };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(-4, -5, -6), new TimeSpan(-3, -3, -3) };

            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3), new TimeSpan(1, 3, 5, 7, 5) };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(10, 12, 13, 14, 15), new TimeSpan(11, 14, 16, 18, 20) };
            yield return new object[] { new TimeSpan(10000), new TimeSpan(200000), new TimeSpan(210000) };
        }
public static IEnumerable<object[]> CompareTo_TestData()
        {
            yield return new object[] { new TimeSpan(10000), new TimeSpan(10000), 0 };
            yield return new object[] { new TimeSpan(20000), new TimeSpan(10000), 1 };
            yield return new object[] { new TimeSpan(10000), new TimeSpan(20000), -1 };

            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 3), 0 };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 4), -1 };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 2), 1 };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(1, 3, 3), -1 };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(1, 1, 3), 1 };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(2, 2, 3), -1 };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(0, 2, 3), 1 };

            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 3, 4), 0 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 3, 5), -1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 3, 3), 1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 4, 4), -1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 2, 4), 1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 3, 3, 4), -1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 1, 3, 4), 1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(2, 2, 3, 4), -1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(0, 2, 3, 4), 1 };

            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 4, 5), 0 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 4, 6), -1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 4, 4), 1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 5, 5), -1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 3, 5), 1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 4, 4, 5), -1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 2, 4, 5), 1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 3, 3, 4, 5), -1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 1, 3, 4, 5), 1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(2, 2, 3, 4, 5), -1 };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(0, 2, 3, 4, 5), 1 };

            yield return new object[] { new TimeSpan(10000), null, 1 };
        }
public static IEnumerable<object[]> Duration_TestData()
        {
            yield return new object[] { new TimeSpan(0, 0, 0), new TimeSpan(0, 0, 0) };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 3) };
            yield return new object[] { new TimeSpan(-1, -2, -3), new TimeSpan(1, 2, 3) };
            yield return new object[] { new TimeSpan(12345), new TimeSpan(12345) };
            yield return new object[] { new TimeSpan(-12345), new TimeSpan(12345) };
        }
public static IEnumerable<object[]> Equals_TestData()
        {
            yield return new object[] { new TimeSpan(0, 0, 0), new TimeSpan(0, 0, 0), true };

            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 3), true };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(1, 2, 4), false };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(1, 3, 3), false };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(2, 2, 3), false };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(0, 1, 2, 3), true };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(0, 1, 2, 3, 0), true };

            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 3, 4), true };
            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 3, 5), false };
            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 2, 4, 4), false };
            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(1, 3, 3, 4), false };
            yield return new object[] { new TimeSpan(1, 2, 3, 4), new TimeSpan(2, 2, 3, 4), false };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(2, 3, 4), false };

            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 4, 5), true };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 4, 6), false };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 5, 5), false };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 4, 4, 5), false };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 3, 3, 4, 5), false };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(2, 2, 3, 4, 5), false };

            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3, 4), false };
            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(2, 2, 3), false };

            yield return new object[] { new TimeSpan(10000), new TimeSpan(10000), true };
            yield return new object[] { new TimeSpan(10000), new TimeSpan(20000), false };

            yield return new object[] { new TimeSpan(10000), "20000", false };
            yield return new object[] { new TimeSpan(10000), null, false };
        }
public static IEnumerable<object[]> FromDays_Int_ShouldOverflowOrUnderflow_Data()
        {
            long[] individualMaxValues = [ maxDays, maxHours, maxMinutes, maxSeconds, maxMilliseconds, maxMicroseconds ];
            // Each possibility for individual property to overflow or underflow
            for (var i = 0; i < individualMaxValues.Length; i++)
            {
                var iVal = individualMaxValues[i] + 1;
               object[] resultPos = [ 0, 0, 0, 0, 0, 0 ];
               resultPos[i] = iVal;
               yield return resultPos;
               object[] resultNeg = [ 0, 0, 0, 0, 0, 0 ];
               resultNeg[i] = -iVal;
               yield return resultNeg;
            }
            // Each possibility for 2 properties to overflow or underflow
            // while neither of them individually overflow or underflow
            for (var i = 0; i < individualMaxValues.Length; i++)
            {
                for (var j = i + 1; j < individualMaxValues.Length; j++)
                {
                    var iVal = individualMaxValues[i];
                    var jVal = individualMaxValues[j];
                    object[] resultPos = [ 0, 0, 0, 0, 0, 0 ];
                    resultPos[i] = iVal;
                    resultPos[j] = jVal;
                    yield return resultPos;
                    object[] resultNeg = [ 0, 0, 0, 0, 0, 0 ];
                    resultNeg[i] = -iVal;
                    resultNeg[j] = -jVal;
                    yield return resultNeg;
                }
            }
        }
public static IEnumerable<object[]> FromDays_Int_ShouldNotOverflow_WhenOverflowingParamIsCounteredByOppositeSignParam_Data()
        {
            long[] individualMaxValues = [ maxDays, maxHours, maxMinutes, maxSeconds, maxMilliseconds, maxMicroseconds ];
            for (var i = 0; i < individualMaxValues.Length; i++)
            {
                for (var j = 0; j < individualMaxValues.Length; j++)
                {
                    if (i == j)
                    {
                        continue;
                    }
                    var iVal = individualMaxValues[i] + 1;
                    var jVal = individualMaxValues[j] + 1;
                    object[] result = [ 0, 0, 0, 0, 0, 0 ];
                    result[i] = iVal;
                    result[j] = -jVal;
                    yield return result;
                }
            }
        }
public static IEnumerable<object[]> FromDays_TestData()
        {
            yield return new object[] { 100.5, new TimeSpan(100, 12, 0, 0) };
            yield return new object[] { 2.5, new TimeSpan(2, 12, 0, 0) };
            yield return new object[] { 1.0, new TimeSpan(1, 0, 0, 0) };
            yield return new object[] { 0.0, new TimeSpan(0, 0, 0, 0) };
            yield return new object[] { -1.0, new TimeSpan(-1, 0, 0, 0) };
            yield return new object[] { -2.5, new TimeSpan(-2, -12, 0, 0) };
            yield return new object[] { -100.5, new TimeSpan(-100, -12, 0, 0) };
        }
public static IEnumerable<object[]> FromHours_TestData()
        {
            yield return new object[] { 100.5, new TimeSpan(4, 4, 30, 0) };
            yield return new object[] { 2.5, new TimeSpan(2, 30, 0) };
            yield return new object[] { 1.0, new TimeSpan(1, 0, 0) };
            yield return new object[] { 0.0, new TimeSpan(0, 0, 0) };
            yield return new object[] { -1.0, new TimeSpan(-1, 0, 0) };
            yield return new object[] { -2.5, new TimeSpan(-2, -30, 0) };
            yield return new object[] { -100.5, new TimeSpan(-4, -4, -30, 0) };
        }
public static IEnumerable<object[]> FromMinutes_TestData()
        {
            yield return new object[] { 100.5, new TimeSpan(1, 40, 30) };
            yield return new object[] { 2.5, new TimeSpan(0, 2, 30) };
            yield return new object[] { 1.0, new TimeSpan(0, 1, 0) };
            yield return new object[] { 0.0, new TimeSpan(0, 0, 0) };
            yield return new object[] { -1.0, new TimeSpan(0, -1, 0) };
            yield return new object[] { -2.5, new TimeSpan(0, -2, -30) };
            yield return new object[] { -100.5, new TimeSpan(-1, -40, -30) };
        }
public static IEnumerable<object[]> FromSeconds_TestData()
        {
            yield return new object[] { 100.5, new TimeSpan(0, 0, 1, 40, 500) };
            yield return new object[] { 2.5, new TimeSpan(0, 0, 0, 2, 500) };
            yield return new object[] { 1.0, new TimeSpan(0, 0, 0, 1, 0) };
            yield return new object[] { 0.0, new TimeSpan(0, 0, 0, 0, 0) };
            yield return new object[] { -1.0, new TimeSpan(0, 0, 0, -1, 0) };
            yield return new object[] { -2.5, new TimeSpan(0, 0, 0, -2, -500) };
            yield return new object[] { -100.5, new TimeSpan(0, 0, -1, -40, -500) };
        }
public static IEnumerable<object[]> FromMilliseconds_TestData_NetCore()
        {
            yield return new object[] { 1500.5, new TimeSpan(15005000) };
            yield return new object[] { 2.5, new TimeSpan(25000) };
            yield return new object[] { 1.0, new TimeSpan(10000) };
            yield return new object[] { 0.0, new TimeSpan(0) };
            yield return new object[] { -1.0, new TimeSpan(-10000) };
            yield return new object[] { -2.5, new TimeSpan(-25000) };
            yield return new object[] { -1500.5, new TimeSpan(-15005000) };
        }
public static IEnumerable<object[]> FromTicks_TestData()
        {
            yield return new object[] { TimeSpan.TicksPerMillisecond, new TimeSpan(0, 0, 0, 0, 1) };
            yield return new object[] { TimeSpan.TicksPerSecond, new TimeSpan(0, 0, 0, 1, 0) };
            yield return new object[] { TimeSpan.TicksPerMinute, new TimeSpan(0, 0, 1, 0, 0) };
            yield return new object[] { TimeSpan.TicksPerHour, new TimeSpan(0, 1, 0, 0, 0) };
            yield return new object[] { TimeSpan.TicksPerDay, new TimeSpan(1, 0, 0, 0, 0) };
            yield return new object[] { 1.0, new TimeSpan(1) };
            yield return new object[] { 0.0, new TimeSpan(0, 0, 0) };
            yield return new object[] { -1.0, new TimeSpan(-1) };
            yield return new object[] { -TimeSpan.TicksPerMillisecond, new TimeSpan(0, 0, 0, 0, -1) };
            yield return new object[] { -TimeSpan.TicksPerSecond, new TimeSpan(0, 0, 0, -1, 0) };
            yield return new object[] { -TimeSpan.TicksPerMinute, new TimeSpan(0, 0, -1, 0, 0) };
            yield return new object[] { -TimeSpan.TicksPerHour, new TimeSpan(0, -1, 0, 0, 0) };
            yield return new object[] { -TimeSpan.TicksPerDay, new TimeSpan(-1, 0, 0, 0, 0) };
        }
public static IEnumerable<object[]> TotalSeconds_ExactRepresentation_TestData()
        {
            yield return new object[] { new TimeSpan(0, 0, 0, 0, 0) };
            yield return new object[] { new TimeSpan(0, 0, 0, 1, 0) };
            yield return new object[] { new TimeSpan(0, 0, 0, 1, 100) };
            yield return new object[] { new TimeSpan(0, 0, 0, 0, -100) };
            yield return new object[] { new TimeSpan(0, 0, 0, 0, 34967800) };
        }
public static IEnumerable<object[]> Negate_TestData()
        {
            yield return new object[] { new TimeSpan(0, 0, 0), new TimeSpan(0, 0, 0) };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(-1, -2, -3) };
            yield return new object[] { new TimeSpan(-1, -2, -3), new TimeSpan(1, 2, 3) };
            yield return new object[] { new TimeSpan(12345), new TimeSpan(-12345) };
            yield return new object[] { new TimeSpan(-12345), new TimeSpan(12345) };
        }
public static IEnumerable<object[]> Subtract_TestData()
        {
            yield return new object[] { new TimeSpan(0, 0, 0), new TimeSpan(1, 2, 3), new TimeSpan(-1, -2, -3) };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(4, 5, 6), new TimeSpan(-3, -3, -3) };
            yield return new object[] { new TimeSpan(1, 2, 3), new TimeSpan(-4, -5, -6), new TimeSpan(5, 7, 9) };

            yield return new object[] { new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(1, 2, 3), new TimeSpan(1, 1, 1, 1, 5) };
            yield return new object[] { new TimeSpan(10, 11, 12, 13, 14), new TimeSpan(1, 2, 3, 4, 5), new TimeSpan(9, 9, 9, 9, 9) };
            yield return new object[] { new TimeSpan(200000), new TimeSpan(10000), new TimeSpan(190000) };
        }
public static IEnumerable<object[]> MultiplicationTestData()
        {
            yield return new object[] {new TimeSpan(2, 30, 0), 2.0, new TimeSpan(5, 0, 0)};
            yield return new object[] {new TimeSpan(14, 2, 30, 0), 192.0, TimeSpan.FromDays(2708)};
            yield return new object[] {TimeSpan.FromDays(366), Math.PI, new TimeSpan(993446995288779)};
            yield return new object[] {TimeSpan.FromDays(366), -Math.E, new TimeSpan(-859585952922633)};
            yield return new object[] {TimeSpan.FromDays(29.530587981), 13.0, TimeSpan.FromDays(29.530587981 * 13.0) };
            yield return new object[] {TimeSpan.FromDays(-29.530587981), -12.0, TimeSpan.FromDays(-29.530587981 * -12.0) };
            yield return new object[] {TimeSpan.FromDays(-29.530587981), 0.0, TimeSpan.Zero};
            yield return new object[] {TimeSpan.MaxValue, 0.5, TimeSpan.FromTicks((long)(long.MaxValue * 0.5))};
        }
}
