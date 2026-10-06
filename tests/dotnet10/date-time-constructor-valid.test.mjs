import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, DateTimeKind, GregorianCalendar } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-constructor-valid-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.rows.length, 72);

function construct(row) {
  const a = row.arguments;
  switch (row.source) {
    case 'DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int':
      return new DateTime(...a);
    case 'DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Calendar':
      return new DateTime(...a, new GregorianCalendar());
    case 'DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int_DateTimeKind':
      return new DateTime(...a, DateTimeKind.local);
    case 'DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Calendar_DateTimeKind':
      return new DateTime(...a, new GregorianCalendar(), DateTimeKind.local);
    case 'DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int':
      return new DateTime(...a);
    case 'DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Calendar':
      return new DateTime(...a, new GregorianCalendar());
    case 'DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Int_DateTimeKind':
      return new DateTime(...a, DateTimeKind.local);
    case 'DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Int_Calendar_DateTimeKind':
      return new DateTime(...a, new GregorianCalendar(), DateTimeKind.local);
    case 'DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Int_WithNanoseconds':
      return new DateTime(...a.slice(0, 8)).addTicks(BigInt(a[8] / 100));
    default:
      throw new Error(`Unknown constructor source: ${row.source}`);
  }
}

for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => {
    const actual = construct(row);
    assert.deepEqual({
      ticks: actual.ticks.toString(),
      year: actual.year,
      month: actual.month,
      day: actual.day,
      hour: actual.hour,
      minute: actual.minute,
      second: actual.second,
      millisecond: actual.millisecond,
      microsecond: actual.microsecond,
      nanosecond: actual.nanosecond,
      kind: actual.kind.value,
    }, {
      ticks: row.ticks,
      year: row.year,
      month: row.month,
      day: row.day,
      hour: row.hour,
      minute: row.minute,
      second: row.second,
      millisecond: row.millisecond,
      microsecond: row.microsecond,
      nanosecond: row.nanosecond,
      kind: row.kind,
    });
  });
}
