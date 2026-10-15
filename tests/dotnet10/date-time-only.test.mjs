import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateOnly, TimeOnly, DateTime, DateTimeKind, GregorianCalendar } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-only-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
for (const [index, row] of fixture.rows.entries()) {
  if (row.source.includes('.DeconstructionTest')) continue;
  test(`${row.source}/${index}`, () => {
    const [year, month, day, hour, minute, second, millisecond, microsecond = 0] = row.arguments;
    let dateTime;
    if (row.source.includes('.Ctor_')) {
      const date = new DateOnly(year, month, day);
      const time = new TimeOnly(hour, minute, second, millisecond);
      dateTime = row.kind === 2 ? new DateTime(date, time, DateTimeKind.local) : new DateTime(date, time);
    } else dateTime = new DateTime(year, month, day, hour, minute, second, millisecond, microsecond);
    assert.equal(dateTime.ticks, BigInt(row.ticks));
    assert.equal(dateTime.kind.value, row.kind);
    const date = DateOnly.fromDateTime(dateTime), time = TimeOnly.fromDateTime(dateTime);
    assert.ok(date instanceof DateOnly);
    assert.ok(time instanceof TimeOnly);
    assert.equal(date.dayNumber, row.dayNumber);
    assert.equal(time.ticks, BigInt(row.timeTicks));
    assert.deepEqual([time.hour, time.minute, time.second, time.millisecond, time.microsecond, time.nanosecond],
      [row.hour, row.minute, row.second, row.millisecond, row.microsecond, row.nanosecond]);
    assert.equal(date.toDateTime(time, dateTime.kind).ticks, dateTime.ticks);
  });
}

test('DateTimeOnly.BoundariesAndSubMicrosecondTicks', () => {
  for (const ticks of [0n, 1n, 9n, 863999999999n, DateTime.maxValue.ticks]) {
    const value = new DateTime(ticks);
    const date = DateOnly.fromDateTime(value), time = TimeOnly.fromDateTime(value);
    assert.equal(new DateTime(date, time).ticks, ticks);
  }
  assert.equal(new DateOnly().dayNumber, 0);
  assert.equal(new TimeOnly().ticks, 0n);
  assert.equal(new DateOnly(2000, 2, 29, new GregorianCalendar()).dayNumber, new DateOnly(2000, 2, 29).dayNumber);
  assert.equal(DateOnly.maxValue.dayNumber, 3652058);
  assert.equal(TimeOnly.maxValue.ticks, 863999999999n);
  assert.throws(() => new DateTime(new DateOnly(), new TimeOnly(), new DateTimeKind(3)), error => error.constructor.name === 'ArgumentException');
});
