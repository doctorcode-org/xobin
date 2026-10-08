import assert from 'node:assert/strict';
import test from 'node:test';
import { DateTime, DateTimeKind } from '@xobin/globalization';

const UnixEpochTicks = 621355968000000000n;
const TicksPerMillisecond = 10000n;

function withFixedClock(iso, action) {
  const OriginalDate = globalThis.Date;
  const fixedMilliseconds = OriginalDate.parse(iso);
  class FixedDate extends OriginalDate {
    constructor(...args) {
      if (args.length === 0) super(fixedMilliseconds);
      else super(...args);
    }
    static now() { return fixedMilliseconds; }
  }
  globalThis.Date = FixedDate;
  try {
    action(new OriginalDate(fixedMilliseconds));
  } finally {
    globalThis.Date = OriginalDate;
  }
}

function assertClockAt(iso) {
  withFixedClock(iso, expected => {
    const now = DateTime.now;
    assert.equal(now.kind.value, DateTimeKind.local.value);
    assert.deepEqual(
      [now.year, now.month, now.day, now.hour, now.minute, now.second, now.millisecond],
      [expected.getFullYear(), expected.getMonth() + 1, expected.getDate(), expected.getHours(), expected.getMinutes(), expected.getSeconds(), expected.getMilliseconds()]
    );

    const utcNow = DateTime.utcNow;
    assert.equal(utcNow.kind.value, DateTimeKind.utc.value);
    assert.deepEqual(
      [utcNow.year, utcNow.month, utcNow.day, utcNow.hour, utcNow.minute, utcNow.second, utcNow.millisecond],
      [expected.getUTCFullYear(), expected.getUTCMonth() + 1, expected.getUTCDate(), expected.getUTCHours(), expected.getUTCMinutes(), expected.getUTCSeconds(), expected.getUTCMilliseconds()]
    );

    const today = DateTime.today;
    assert.equal(today.kind.value, DateTimeKind.local.value);
    assert.deepEqual(
      [today.year, today.month, today.day, today.hour, today.minute, today.second, today.millisecond],
      [expected.getFullYear(), expected.getMonth() + 1, expected.getDate(), 0, 0, 0, 0]
    );
  });
}

test('DateTimeTests.Today_Get_ReturnsExpected', () => {
  withFixedClock('2024-02-29T23:59:59.999Z', expected => {
    const today = DateTime.today;
    const now = DateTime.now;
    assert.deepEqual(
      [today.year, today.month, today.day, today.hour, today.minute, today.second, today.millisecond],
      [now.year, now.month, now.day, 0, 0, 0, 0]
    );
    assert.equal(today.kind.value, DateTimeKind.local.value);

    const utc = new DateTime(
      expected.getFullYear(), expected.getMonth() + 1, expected.getDate(),
      expected.getHours(), expected.getMinutes(), expected.getSeconds(), DateTimeKind.utc
    );
    assert.equal(utc.kind.value, DateTimeKind.utc.value);
    assert.equal(utc.isDaylightSavingTime(), false);
  });
});

test('DateTimeTests.TestTimeSynchronizationWithTheSystem', () => {
  const before = Date.now();
  const actual = DateTime.utcNow;
  const after = Date.now();
  const beforeTicks = UnixEpochTicks + BigInt(before) * TicksPerMillisecond;
  const afterTicks = UnixEpochTicks + BigInt(after) * TicksPerMillisecond;
  assert.equal(actual.kind.value, DateTimeKind.utc.value);
  assert.ok(actual.ticks >= beforeTicks && actual.ticks <= afterTicks);
});

test('DateTimeClockHarness.NowUtcNowToday', () => {
  for (const iso of [
    '2000-02-29T00:00:00.000Z',
    '2023-12-31T23:59:59.999Z',
    '2024-03-20T12:34:56.789Z',
    '2024-06-21T23:59:59.999Z',
  ]) assertClockAt(iso);
});
