import assert from 'node:assert/strict';
import test from 'node:test';
import { DateTime, DateTimeKind, GregorianCalendar, PersianCalendar, TimeSpan, UmAlQuraCalendar } from '@xobin/globalization';
import { ArgumentOutOfRangeException } from '@xobin/core';

// Source: .NET runtime v10.0.7, System.Runtime.Tests/System/DateTimeTests.cs.
function verify(value, year, month, day, hour, minute, second, millisecond, kind, microsecond = 0, nanosecond = 0) {
  assert.deepEqual(
    [value.year, value.month, value.day, value.hour, value.minute, value.second, value.millisecond,
      value.kind.value, value.microsecond, value.nanosecond],
    [year, month, day, hour, minute, second, millisecond, kind.value, microsecond, nanosecond],
  );
}

test('DateTimeTests.MaxValue', () => {
  assert.equal(DateTime.maxValue.ticks, 3155378975999999999n);
  verify(DateTime.maxValue, 9999, 12, 31, 23, 59, 59, 999, DateTimeKind.unspecified, 999, 900);
});

test('DateTimeTests.MinValue', () => {
  assert.equal(DateTime.minValue.ticks, 0n);
  verify(DateTime.minValue, 1, 1, 1, 0, 0, 0, 0, DateTimeKind.unspecified);
});

test('DateTimeTests.Ctor_Long', () => {
  verify(new DateTime(999999999999999999n), 3169, 11, 16, 9, 46, 39, 999, DateTimeKind.unspecified, 999, 900);
});

test('DateTimeTests.Ctor_Long_DateTimeKind', () => {
  verify(new DateTime(999999999999999999n, DateTimeKind.utc), 3169, 11, 16, 9, 46, 39, 999, DateTimeKind.utc, 999, 900);
});

test('DateTimeTests.Ctor_InvalidTicks_ThrowsArgumentOutOfRangeException', () => {
  for (const ticks of [-1n, 3155378976000000000n]) {
    assert.throws(() => new DateTime(ticks), (error) => error instanceof ArgumentOutOfRangeException && error.paramName === 'ticks');
    assert.throws(() => new DateTime(ticks, DateTimeKind.utc), (error) => error instanceof ArgumentOutOfRangeException && error.paramName === 'ticks');
  }
});

test('DateTimeTests.Ctor_Int_Int_Int', () => {
  verify(new DateTime(2012, 6, 11), 2012, 6, 11, 0, 0, 0, 0, DateTimeKind.unspecified);
});

test('DateTimeTests.Ctor_Int_Int_Int_Calendar', () => {
  verify(new DateTime(2012, 6, 11, new GregorianCalendar()), 2012, 6, 11, 0, 0, 0, 0, DateTimeKind.unspecified);
});

test('DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int', () => {
  verify(new DateTime(2012, 12, 31, 13, 50, 10), 2012, 12, 31, 13, 50, 10, 0, DateTimeKind.unspecified);
});

test('DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_DateTimeKind', () => {
  verify(new DateTime(1986, 8, 15, 10, 20, 5, DateTimeKind.local), 1986, 8, 15, 10, 20, 5, 0, DateTimeKind.local);
});

test('DateTimeTests.Ctor_Int_Int_Int_Int_Int_Int_Calendar', () => {
  verify(new DateTime(2012, 12, 31, 13, 50, 10, new GregorianCalendar()), 2012, 12, 31, 13, 50, 10, 0, DateTimeKind.unspecified);
});

const constructorRows = [
  [1986, 8, 15, 10, 20, 5, 600], [1986, 2, 28, 10, 20, 5, 600],
  [1986, 12, 31, 10, 20, 5, 600], [2000, 2, 28, 10, 20, 5, 600],
  [2000, 2, 29, 10, 20, 5, 600], [2000, 12, 31, 10, 20, 5, 600],
  [1900, 2, 28, 10, 20, 5, 600], [1900, 12, 31, 10, 20, 5, 600],
];

const constructorVariants = [
  ['Ctor_Int_Int_Int_Int_Int_Int_Int', (row) => row, DateTimeKind.unspecified, 0],
  ['Ctor_Int_Int_Int_Int_Int_Int_Int_Calendar', (row) => [...row, new GregorianCalendar()], DateTimeKind.unspecified, 0],
  ['Ctor_Int_Int_Int_Int_Int_Int_Int_Int_DateTimeKind', (row) => [...row, DateTimeKind.local], DateTimeKind.local, 0],
  ['Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Calendar_DateTimeKind', (row) => [...row, new GregorianCalendar(), DateTimeKind.local], DateTimeKind.local, 0],
  ['Ctor_Int_Int_Int_Int_Int_Int_Int_Int', (row) => [...row, 300], DateTimeKind.unspecified, 300],
  ['Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Calendar', (row) => [...row, 300, new GregorianCalendar()], DateTimeKind.unspecified, 300],
  ['Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Int_DateTimeKind', (row) => [...row, 300, DateTimeKind.local], DateTimeKind.local, 300],
  ['Ctor_Int_Int_Int_Int_Int_Int_Int_Int_Int_Calendar_DateTimeKind', (row) => [...row, 300, new GregorianCalendar(), DateTimeKind.local], DateTimeKind.local, 300],
];

for (const row of constructorRows) {
  const key = `${row[0]}-${row[1]}-${row[2]}`;
  for (const [name, args, kind, microsecond] of constructorVariants) {
    test(`DateTimeTests.${name}/${key}`, () => {
      verify(new DateTime(...args(row)), ...row, kind, microsecond);
    });
  }
}

test('100-nanosecond DateTime arithmetic and TimeSpan interop', () => {
  const start = new DateTime(2000, 2, 29, 23, 59, 59, 999, 999, DateTimeKind.utc);
  const end = start.addTicks(1n);
  verify(end, 2000, 2, 29, 23, 59, 59, 999, DateTimeKind.utc, 999, 100);
  assert.equal(end.subtract(start).ticks, 1n);
  assert.equal(start.add(new TimeSpan(1n)).ticks, end.ticks);
  assert.equal(end.timeOfDay.ticks, end.ticks % 864000000000n);
  assert.equal(start.addMicroseconds(0.1).ticks, end.ticks);
  assert.throws(() => DateTime.maxValue.addTicks(1n), ArgumentOutOfRangeException);
});

test('calendar conversion preserves ticks below one millisecond', () => {
  const gregorian = new GregorianCalendar();
  const date = new DateTime(2024, 3, 20, 12, 13, 14, 15).addTicks(1234n);
  assert.equal(gregorian.getYear(date), 2024);
  assert.equal(gregorian.getMonth(date), 3);
  assert.equal(gregorian.getDayOfMonth(date), 20);
  assert.equal(new PersianCalendar().getYear(date), 1403);
  assert.equal(new PersianCalendar().getMonth(date), 1);
  assert.equal(new PersianCalendar().getDayOfMonth(date), 1);
  assert.equal(date.timeOfDay.ticks % 10000n, 1234n);
  const umAlQura = new UmAlQuraCalendar();
  const hijri = umAlQura.toDateTime(1445, 1, 1, 0, 0, 0, 0).addTicks(1n);
  assert.equal(umAlQura.getYear(hijri), 1445);
  assert.equal(umAlQura.getMonth(hijri), 1);
  assert.equal(umAlQura.getDayOfMonth(hijri), 1);
  assert.equal(hijri.ticks % 10000n, 1n);
});
