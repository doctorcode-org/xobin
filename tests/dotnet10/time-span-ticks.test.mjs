import assert from 'node:assert/strict';
import test from 'node:test';
import { TimeSpan } from '@xobin/globalization';
import { OverflowException } from '@xobin/core';

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
