import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  Calendar, GregorianCalendar, GregorianCalendarTypes, PersianCalendar,
  ThaiBuddhistCalendar, KoreanCalendar, UmAlQuraCalendar,
} from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./calendar-state-cases.json', import.meta.url), 'utf8'));
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

function properties(calendar) {
  return {
    min: calendar.minSupportedDateTime.ticks.toString(),
    max: calendar.maxSupportedDateTime.ticks.toString(),
    eras: calendar.eras, distinctEras: calendar.eras !== calendar.eras,
    algorithmType: calendar.algorithmType, isReadOnly: calendar.isReadOnly,
  };
}

function cloneAndReadOnly(calendar) {
  calendar.twoDigitYearMax = 99;
  const clone = calendar.clone();
  const readOnly = Calendar.readOnly(calendar);
  const cloneOfReadOnly = readOnly.clone();
  clone.twoDigitYearMax = 100;
  cloneOfReadOnly.twoDigitYearMax = 101;
  const calendarType = value => value instanceof GregorianCalendar ? value.calendarType : null;
  return {
    cloneSameType: calendar.constructor === clone.constructor,
    readOnlySameType: calendar.constructor === readOnly.constructor,
    cloneOfReadOnlySameType: calendar.constructor === cloneOfReadOnly.constructor,
    cloneDistinct: calendar !== clone,
    readOnlyDistinct: calendar !== readOnly,
    readOnlyIdempotent: readOnly === Calendar.readOnly(readOnly),
    originalIsReadOnly: calendar.isReadOnly, cloneIsReadOnly: clone.isReadOnly,
    readOnlyIsReadOnly: readOnly.isReadOnly,
    cloneOfReadOnlyIsReadOnly: cloneOfReadOnly.isReadOnly,
    originalTwoDigitYearMax: calendar.twoDigitYearMax,
    cloneTwoDigitYearMax: clone.twoDigitYearMax,
    readOnlyTwoDigitYearMax: readOnly.twoDigitYearMax,
    cloneOfReadOnlyTwoDigitYearMax: cloneOfReadOnly.twoDigitYearMax,
    originalCalendarType: calendarType(calendar),
    cloneCalendarType: calendarType(clone),
    readOnlyCalendarType: calendarType(readOnly),
  };
}

function execute(row) {
  const calendar = createCalendar[row.name]?.();
  switch (row.operation) {
    case 'properties': return properties(calendar);
    case 'cloneAndReadOnly': return cloneAndReadOnly(calendar);
    case 'setReadOnlyTwoDigitYearMax':
      Calendar.readOnly(calendar).twoDigitYearMax = 99; return null;
    case 'setReadOnlyInvalidTwoDigitYearMax':
      Calendar.readOnly(calendar).twoDigitYearMax = 98; return null;
    case 'setReadOnlyCalendarType':
      Calendar.readOnly(calendar).calendarType = GregorianCalendarTypes.Arabic; return null;
    case 'setReadOnlyInvalidCalendarType':
      Calendar.readOnly(calendar).calendarType = 0; return null;
    case 'readOnlyNull': return Calendar.readOnly(null);
    default: throw new Error(`Unknown operation ${row.operation}`);
  }
}

for (const row of fixture.rows) {
  test(`CalendarState.NET10/${row.name}/${row.operation}`, () => {
    let result;
    let thrown;
    try { result = execute(row); } catch (error) { thrown = error; }
    if (row.error === null) {
      if (thrown) throw thrown;
      assert.deepEqual(result, row.result);
    } else {
      assert.ok(thrown, `Expected ${row.error}`);
      assert.equal(thrown.constructor.name, row.error);
      assert.equal(thrown.paramName ?? null, row.paramName);
      assert.equal(thrown.message, row.message);
      assert.equal(thrown.actualValue ?? null, row.actualValue);
    }
  });
}

for (const row of fixture.rows.filter(row => row.operation === 'properties')) {
  const name = row.name;
  if (name !== 'UmAlQuraCalendarTests') {
    test(`CalendarTestBase.MinSupportedDateTime_Get_ReturnsExpected/${name}`, () => {
      assert.equal(createCalendar[name]().minSupportedDateTime.ticks.toString(), row.result.min);
    });
    test(`CalendarTestBase.MaxSupportedDateTime_Get_ReturnsExpected/${name}`, () => {
      assert.equal(createCalendar[name]().maxSupportedDateTime.ticks.toString(), row.result.max);
    });
    test(`CalendarTestBase.Eras_Get_ReturnsExpected/${name}`, () => {
      assert.deepEqual(createCalendar[name]().eras, row.result.eras);
    });
    test(`CalendarTestBase.Eras_Get_ReturnsDifferentInstance/${name}`, () => {
      const calendar = createCalendar[name]();
      assert.notStrictEqual(calendar.eras, calendar.eras);
    });
    test(`CalendarTestBase.AlgorithmType_Get_ReturnsExpected/${name}`, () => {
      assert.equal(createCalendar[name]().algorithmType, row.result.algorithmType);
    });
  }
  test(`CalendarTestBase.IsReadOnly_Get_ReturnsExpected/${name}`, () => {
    assert.equal(createCalendar[name]().isReadOnly, row.result.isReadOnly);
  });
}
