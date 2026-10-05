import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  DateTime, GregorianCalendar, GregorianCalendarTypes, PersianCalendar,
  ThaiBuddhistCalendar, UmAlQuraCalendar,
} from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./calendar-add-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');

const createCalendar = {
  'GregorianCalendarDefaultTests': () => new GregorianCalendar(),
  'GregorianCalendarArabicTests': () => new GregorianCalendar(GregorianCalendarTypes.Arabic),
  'GregorianCalendarLocalizedTests': () => new GregorianCalendar(GregorianCalendarTypes.Localized),
  'GregorianCalendarMiddleEastFrenchTests': () => new GregorianCalendar(GregorianCalendarTypes.MiddleEastFrench),
  'GregorianCalendarTransliteratedEnglishTests': () => new GregorianCalendar(GregorianCalendarTypes.TransliteratedEnglish),
  'GregorianCalendarTransliteratedFrenchTests': () => new GregorianCalendar(GregorianCalendarTypes.TransliteratedFrench),
  'GregorianCalendarUSEnglishTests': () => new GregorianCalendar(GregorianCalendarTypes.USEnglish),
  'PersianCalendarTests': () => new PersianCalendar(),
  'ThaiBuddhistCalendarTests': () => new ThaiBuddhistCalendar(),
  'UmAlQuraCalendarTests': () => new UmAlQuraCalendar(),
};

function run(name, operation, expectedCount) {
  const rows = fixture.rows.filter(row => row.calendarName === name && row.operation === operation);
  assert.equal(rows.length, expectedCount, `${name}/${operation} case count`);
  const api = operation.slice(0, operation.indexOf('_'));
  const method = api[0].toLowerCase() + api.slice(1);
  for (const row of rows) {
    const calendar = createCalendar[name]();
    const date = row.dateKind === 'min' ? calendar.minSupportedDateTime
      : row.dateKind === 'max' ? calendar.maxSupportedDateTime : DateTime.now;
    assert.throws(() => calendar[method](date, row.value), error => {
      assert.equal(error.constructor.name, row.error);
      assert.equal(error.paramName ?? null, row.paramName);
      assert.equal(error.message, row.message);
      assert.equal(error.actualValue ?? null, row.actualValue);
      return true;
    }, `${name}/${operation}/${row.dateKind}/${row.value}`);
  }
}

for (const name of Object.keys(createCalendar)) {
  test(`CalendarTestBase.AddYears_Invalid_ThrowsArgumentException/${name}`, () => {
    run(name, 'AddYears_Invalid_ThrowsArgumentException', 2);
  });
  test(`CalendarTestBase.AddMonths_Invalid_ThrowsArgumentException/${name}`, () => {
    run(name, 'AddMonths_Invalid_ThrowsArgumentException', 4);
  });
  test(`CalendarTestBase.AddDays_Invalid_ThrowsArgumentException/${name}`, () => {
    run(name, 'AddDays_Invalid_ThrowsArgumentException', 4);
  });
  test(`CalendarTestBase.AddHours_Invalid_ThrowsArgumentException/${name}`, () => {
    run(name, 'AddHours_Invalid_ThrowsArgumentException', 4);
  });
  test(`CalendarTestBase.AddMinutes_Invalid_ThrowsArgumentException/${name}`, () => {
    run(name, 'AddMinutes_Invalid_ThrowsArgumentException', 2);
  });
  test(`CalendarTestBase.AddSeconds_Invalid_ThrowsArgumentException/${name}`, () => {
    run(name, 'AddSeconds_Invalid_ThrowsArgumentException', 2);
  });
  test(`CalendarTestBase.AddMilliseconds_Invalid_ThrowsArgumentException/${name}`, () => {
    run(name, 'AddMilliseconds_Invalid_ThrowsArgumentException', 2);
  });
}
