import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  DateTime, GregorianCalendar, GregorianCalendarTypes, PersianCalendar,
  ThaiBuddhistCalendar, KoreanCalendar, UmAlQuraCalendar,
} from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./calendar-range-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.cases.length, 66);

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
const operations = ['GetEra', 'GetYear', 'GetMonth', 'GetDayOfYear', 'GetDayOfMonth', 'GetDayOfWeek'];
assert.deepEqual(fixture.cases.map(({ calendarName, operation }) => `${calendarName}/${operation}`),
  Object.keys(createCalendar).flatMap(name => operations.map(operation => `${name}/${operation}`)));

function run(calendarName, operation) {
  const rows = fixture.cases.find(item => item.calendarName === calendarName && item.operation === operation).rows;
  const calendar = createCalendar[calendarName]();
  const expectedDates = [];
  if (calendar.minSupportedDateTime.ticks !== DateTime.minValue.ticks) {
    expectedDates.push({ kind: 'beforeMin', ticks: calendar.minSupportedDateTime.ticks - 864000000000n });
  }
  if (calendar.maxSupportedDateTime.ticks !== DateTime.maxValue.ticks) {
    expectedDates.push({ kind: 'afterMax', ticks: calendar.maxSupportedDateTime.ticks + 864000000000n });
  }
  assert.deepEqual(rows.map(({ kind, ticks }) => ({ kind, ticks: BigInt(ticks) })), expectedDates);

  const method = operation[0].toLowerCase() + operation.slice(1);
  for (const row of rows) {
    const invoke = () => calendar[method](new DateTime(BigInt(row.ticks)));
    if (row.error === null) {
      assert.equal(invoke(), row.result, `${calendarName}/${operation}/${row.kind}`);
    } else {
      assert.throws(invoke, error => {
        assert.equal(error.constructor.name, row.error);
        assert.equal(error.paramName ?? null, row.paramName);
        assert.equal(error.message, row.message);
        assert.equal(error.actualValue?.toString() ?? null, row.actualValue);
        return true;
      }, `${calendarName}/${operation}/${row.kind}`);
    }
  }
}

for (const name of Object.keys(createCalendar)) {
  test(`CalendarTestBase.GetEra_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'GetEra');
  });
  test(`CalendarTestBase.GetYear_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'GetYear');
  });
  test(`CalendarTestBase.GetMonth_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'GetMonth');
  });
  test(`CalendarTestBase.GetDayOfYear_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'GetDayOfYear');
  });
  test(`CalendarTestBase.GetDayOfMonth_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'GetDayOfMonth');
  });
  test(`CalendarTestBase.GetDayOfWeek_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    run(name, 'GetDayOfWeek');
  });
}
