import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, DateTimeKind, GregorianCalendar } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-constructor-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.rows.length, 180);
assert.equal(fixture.nullCalendar.length, 6);

function argumentsFor(row, calendar = new GregorianCalendar()) {
  const value = Number(row.input);
  let year = 1;
  let month = 1;
  let day = 1;
  let hour = 1;
  let minute = 1;
  let second = 1;
  let millisecond = 1;
  let microsecond = 1;
  let kind = DateTimeKind.utc;

  switch (row.source) {
    case 'DateTimeTests.Ctor_InvalidTicks_ThrowsArgumentOutOfRangeException':
      return row.variant === 'ticks' ? [BigInt(row.input)] : [BigInt(row.input), kind];
    case 'DateTimeTests.Ctor_InvalidYear_ThrowsArgumentOutOfRangeException': year = value; break;
    case 'DateTimeTests.Ctor_InvalidMonth_ThrowsArgumentOutOfRangeException': month = value; break;
    case 'DateTimeTests.Ctor_InvalidDay_ThrowsArgumentOutOfRangeException': day = value; break;
    case 'DateTimeTests.Ctor_InvalidHour_ThrowsArgumentOutOfRangeException': hour = value; break;
    case 'DateTimeTests.Ctor_InvalidMinute_ThrowsArgumentOutOfRangeException': minute = value; break;
    case 'DateTimeTests.Ctor_InvalidSecond_ThrowsArgumentOutOfRangeException': second = value; break;
    case 'DateTimeTests.Ctor_InvalidMillisecond_ThrowsArgumentOutOfRangeException': millisecond = value; break;
    case 'DateTimeTests.Ctor_InvalidMicrosecond_ThrowsArgumentOutOfRangeException': microsecond = value; break;
    case 'DateTimeTests.Ctor_InvalidDateTimeKind_ThrowsArgumentException': kind = new DateTimeKind(value); break;
  }

  switch (row.variant) {
    case 'ticks-kind': return [0n, kind];
    case 'date': return [year, month, day];
    case 'date-calendar': return [year, month, day, calendar];
    case 'date-time': return [year, month, day, hour, minute, second];
    case 'date-time-kind': return [year, month, day, hour, minute, second, kind];
    case 'date-time-calendar': return [year, month, day, hour, minute, second, calendar];
    case 'date-time-millisecond': return [year, month, day, hour, minute, second, millisecond];
    case 'date-time-millisecond-kind':
      return [year, month, day, hour, minute, second, millisecond, kind];
    case 'date-time-millisecond-calendar':
      return [year, month, day, hour, minute, second, millisecond, calendar];
    case 'date-time-millisecond-calendar-kind':
      return [year, month, day, hour, minute, second, millisecond, calendar, kind];
    case 'date-time-millisecond-microsecond':
      return [year, month, day, hour, minute, second, millisecond, microsecond];
    case 'date-time-millisecond-microsecond-kind':
      return [year, month, day, hour, minute, second, millisecond, microsecond, kind];
    case 'date-time-millisecond-microsecond-calendar':
      return [year, month, day, hour, minute, second, millisecond, microsecond, calendar];
    case 'date-time-millisecond-microsecond-calendar-kind':
      return [year, month, day, hour, minute, second, millisecond, microsecond, calendar, kind];
    default: throw new Error(`Unknown constructor variant: ${row.variant}`);
  }
}

function matches(error, row) {
  assert.equal(error.constructor.name, row.error);
  assert.equal(error.paramName ?? null, row.paramName);
  assert.equal(error.message, row.message);
  assert.equal(error.actualValue?.toString() ?? null, row.actualValue);
  return true;
}

for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => {
    assert.throws(() => new DateTime(...argumentsFor(row)), error => matches(error, row));
  });
}

test('DateTimeTests.Ctor_NullCalendar_ThrowsArgumentNullException', () => {
  for (const row of fixture.nullCalendar) {
    assert.throws(() => new DateTime(...argumentsFor(row, null)), error => matches(error, row));
  }
});
