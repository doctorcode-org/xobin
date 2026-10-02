import assert from 'node:assert/strict';
import test from 'node:test';
import { TimeSpan } from '@xobin/globalization';
import { ArgumentOutOfRangeException, OverflowException } from '@xobin/core';

// Source: .NET runtime v10.0.7, System.Runtime.Tests/System/TimeSpanTests.cs.
function verify(value, days, hours, minutes, seconds, milliseconds, microseconds = 0, nanoseconds = 0) {
  assert.deepEqual(
    [value.days, value.hours, value.minutes, value.seconds, value.milliseconds, value.microseconds, value.nanoseconds],
    [days, hours, minutes, seconds, milliseconds, microseconds, nanoseconds],
  );
  assert.equal(value.valueOf(), value.ticks);
}

test('TimeSpanTests.MaxValue', () => {
  assert.equal(TimeSpan.maxValue.ticks, 9223372036854775807n);
  verify(TimeSpan.maxValue, 10675199, 2, 48, 5, 477, 580, 700);
});

test('TimeSpanTests.MinValue', () => {
  assert.equal(TimeSpan.minValue.ticks, -9223372036854775808n);
  verify(TimeSpan.minValue, -10675199, -2, -48, -5, -477, -580, -800);
});

test('TimeSpanTests.Zero', () => {
  assert.equal(TimeSpan.zero.ticks, 0n);
  verify(TimeSpan.zero, 0, 0, 0, 0, 0);
});

test('TimeSpanTests.Ctor_Empty', () => {
  verify(new TimeSpan(), 0, 0, 0, 0, 0);
  verify(TimeSpan.zero, 0, 0, 0, 0, 0);
});

test('TimeSpanTests.Ctor_Long', () => {
  verify(new TimeSpan(999999999999999999n), 1157407, 9, 46, 39, 999, 999, 900);
});

test('TimeSpanTests.Ctor_Int_Int_Int', () => {
  verify(new TimeSpan(10, 9, 8), 0, 10, 9, 8, 0);
});

test('TimeSpanTests.Ctor_Int_Int_Int_Invalid', () => {
  assert.throws(() => new TimeSpan(-256204779, 0, 0), ArgumentOutOfRangeException);
  assert.throws(() => new TimeSpan(256204779, 0, 0), ArgumentOutOfRangeException);
});

test('TimeSpanTests.Ctor_Int_Int_Int_Int_Int', () => {
  verify(new TimeSpan(10, 9, 8, 7, 6), 10, 9, 8, 7, 6);
});

test('TimeSpanTests.Ctor_Int_Int_Int_Int_Int_Invalid', () => {
  const min = TimeSpan.minValue;
  const max = TimeSpan.maxValue;
  for (const [value, delta] of [[min, -1], [max, 1]]) {
    const parts = [value.days, value.hours, value.minutes, value.seconds, value.milliseconds];
    for (let i = 0; i < parts.length; i++) {
      const outside = [...parts];
      outside[i] += delta;
      assert.throws(() => new TimeSpan(...outside), ArgumentOutOfRangeException);
    }
  }
});

test('TimeSpanTests.Ctor_Int_Int_Int_Int_Int_Int', () => {
  verify(new TimeSpan(10, 9, 8, 7, 6, 5), 10, 9, 8, 7, 6, 5);
});

for (const nanoseconds of [100, 300, 900]) {
  test(`TimeSpanTests.Ctor_Int_Int_Int_Int_Int_Int_WithNanosecond/${nanoseconds}`, () => {
    const original = new TimeSpan(10, 9, 8, 7, 6, 5);
    verify(new TimeSpan(original.ticks + BigInt(nanoseconds / 100)), 10, 9, 8, 7, 6, 5, nanoseconds);
  });
}

test('TimeSpanTests.Ctor_Int_Int_Int_Int_Int_Int_Invalid', () => {
  const min = TimeSpan.minValue;
  const max = TimeSpan.maxValue;
  for (const [value, delta] of [[min, -1], [max, 1]]) {
    const parts = [value.days, value.hours, value.minutes, value.seconds, value.milliseconds, value.microseconds];
    for (let i = 0; i < parts.length; i++) {
      const outside = [...parts];
      outside[i] += delta;
      assert.throws(() => new TimeSpan(...outside), ArgumentOutOfRangeException);
    }
  }
});

test('TimeSpanTests.Total_Days_Hours_Minutes_Seconds_Milliseconds', () => {
  const rows = [
    [new TimeSpan(0, 0, 0, 0, 0), 0, 0, 0, 0, 0],
    [new TimeSpan(0, 0, 0, 0, 500), 0.5 / 60 / 60 / 24, 0.5 / 60 / 60, 0.5 / 60, 0.5, 500],
    [new TimeSpan(0, 1, 0, 0, 0), 1 / 24, 1, 60, 3600, 3600000],
    [new TimeSpan(1, 0, 0, 0, 0), 1, 24, 1440, 86400, 86400000],
    [new TimeSpan(1, 1, 0, 0, 0), 25 / 24, 25, 1500, 90000, 90000000],
  ];
  for (const [span, days, hours, minutes, seconds, milliseconds] of rows) {
    assert.equal(span.totalDays.toPrecision(15), days.toPrecision(15));
    assert.equal(span.totalHours, hours);
    assert.equal(span.totalMinutes, minutes);
    assert.equal(span.totalSeconds, seconds);
    assert.equal(span.totalMilliseconds, milliseconds);
  }
});

test('TimeSpanTests.TotalMilliseconds_Invalid', () => {
  assert.equal(TimeSpan.maxValue.totalMilliseconds, 922337203685477);
  assert.equal(TimeSpan.minValue.totalMilliseconds, -922337203685477);
});

test('TimeSpanTests.FromMinMaxValue_DoesNotThrow', () => {
  assert.equal(TimeSpan.fromDays(TimeSpan.maxValue.totalDays).ticks, TimeSpan.maxValue.ticks);
  assert.equal(TimeSpan.fromDays(TimeSpan.minValue.totalDays).ticks, TimeSpan.minValue.ticks);
});

test('tick arithmetic retains every 100-nanosecond unit and checks Int64 bounds', () => {
  assert.equal(new TimeSpan(1n).add(new TimeSpan(2n)).ticks, 3n);
  assert.equal(new TimeSpan(1n).subtract(new TimeSpan(2n)).ticks, -1n);
  assert.equal(new TimeSpan(-1n).duration().ticks, 1n);
  assert.equal(new TimeSpan(1n).negate().ticks, -1n);
  assert.throws(() => TimeSpan.maxValue.add(new TimeSpan(1n)), OverflowException);
  assert.throws(() => TimeSpan.minValue.subtract(new TimeSpan(1n)), OverflowException);
  assert.throws(() => TimeSpan.minValue.duration(), OverflowException);
});
