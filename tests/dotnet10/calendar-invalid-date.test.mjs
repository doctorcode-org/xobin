import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  GregorianCalendar, GregorianCalendarTypes, PersianCalendar,
  ThaiBuddhistCalendar, KoreanCalendar, UmAlQuraCalendar,
} from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./calendar-invalid-date-cases.json', import.meta.url), 'utf8'));
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

function run(name, operation) {
  const rows = fixture.rows.filter(row => row.calendarName === name && row.operation === operation);
  assert.ok(rows.length > 0, `${name}/${operation} has no oracle cases`);
  for (const row of rows) {
    const calendar = createCalendar[name]();
    const [year, month, day, era] = row.arguments;
    const invoke = () => {
      switch (operation) {
        case 'GetDaysInYear_Invalid_ThrowsArgumentOutOfRangeException': return calendar.getDaysInYear(year, era);
        case 'GetMonthsInYear_Invalid_ThrowsArgumentOutOfRangeException': return calendar.getMonthsInYear(year, era);
        case 'GetDaysInMonth_Invalid_ThrowsArgumentOutOfRangeException': return calendar.getDaysInMonth(year, month, era);
        case 'IsLeapDay_Invalid_ThrowsArgumentOutOfRangeException': return calendar.isLeapDay(year, month, day, era);
        case 'IsLeapMonth_Invalid_ThrowsArgumentOutOfRangeException': return calendar.isLeapMonth(year, month, era);
        case 'IsLeapYear_Invalid_ThrowsArgumentOutOfRangeException': return calendar.isLeapYear(year, era);
        case 'GetLeapMonth_Invalid_ThrowsArgumentOutOfRangeException': return calendar.getLeapMonth(year, era);
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
  test(`CalendarTestBase.GetDaysInYear_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'GetDaysInYear_Invalid_ThrowsArgumentOutOfRangeException');
  });
  test(`CalendarTestBase.GetMonthsInYear_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'GetMonthsInYear_Invalid_ThrowsArgumentOutOfRangeException');
  });
  test(`CalendarTestBase.GetDaysInMonth_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'GetDaysInMonth_Invalid_ThrowsArgumentOutOfRangeException');
  });
  test(`CalendarTestBase.IsLeapDay_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'IsLeapDay_Invalid_ThrowsArgumentOutOfRangeException');
  });
  test(`CalendarTestBase.IsLeapMonth_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'IsLeapMonth_Invalid_ThrowsArgumentOutOfRangeException');
  });
  test(`CalendarTestBase.IsLeapYear_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'IsLeapYear_Invalid_ThrowsArgumentOutOfRangeException');
  });
  test(`CalendarTestBase.GetLeapMonth_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'GetLeapMonth_Invalid_ThrowsArgumentOutOfRangeException');
  });
}
