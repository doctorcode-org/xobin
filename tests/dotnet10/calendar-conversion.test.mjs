import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  GregorianCalendar, GregorianCalendarTypes, PersianCalendar,
  ThaiBuddhistCalendar, KoreanCalendar, UmAlQuraCalendar,
} from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./calendar-conversion-cases.json', import.meta.url), 'utf8'));
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
  'KoreanCalendarTests': () => new KoreanCalendar(),
  'UmAlQuraCalendarTests': () => new UmAlQuraCalendar(),
};

function run(name, operation, expectedCount) {
  const rows = fixture.rows.filter(row => row.calendarName === name && row.operation === operation);
  assert.equal(rows.length, expectedCount, `${name}/${operation} case count`);
  for (const row of rows) {
    const calendar = createCalendar[name]();
    const invoke = () => {
      switch (operation) {
        case 'ToDateTime_Invalid_ThrowsArgumentOutOfRangeException':
          return calendar.toDateTime(...row.arguments);
        case 'ToFourDigitYear_Invalid_ThrowsArgumentOutOfRangeException':
          return calendar.toFourDigitYear(row.arguments[0]);
        case 'TwoDigitYearMax_Invalid_ThrowsArgumentOutOfRangeException':
          calendar.twoDigitYearMax = row.arguments[0]; return calendar.twoDigitYearMax;
        default: throw new Error(`Unknown operation ${operation}`);
      }
    };
    assert.throws(invoke, error => {
      assert.equal(error.constructor.name, row.error);
      assert.equal(error.paramName ?? null, row.paramName);
      assert.equal(error.message, row.message);
      assert.equal(error.actualValue ?? null, row.actualValue);
      return true;
    }, `${name}/${operation}/${row.arguments.join(',')}`);
  }
}

for (const name of Object.keys(createCalendar)) {
  test(`CalendarTestBase.ToDateTime_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'ToDateTime_Invalid_ThrowsArgumentOutOfRangeException', 22);
  });
  test(`CalendarTestBase.ToFourDigitYear_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'ToFourDigitYear_Invalid_ThrowsArgumentOutOfRangeException', 3);
  });
  test(`CalendarTestBase.TwoDigitYearMax_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'TwoDigitYearMax_Invalid_ThrowsArgumentOutOfRangeException', 2);
  });
}
