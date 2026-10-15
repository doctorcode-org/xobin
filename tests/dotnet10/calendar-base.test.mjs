import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import {
  CalendarWeekRule,
  DateTime,
  DayOfWeek,
  GregorianCalendar,
  GregorianCalendarTypes,
  PersianCalendar,
  ThaiBuddhistCalendar,
  KoreanCalendar, TaiwanCalendar, JapaneseCalendar, JulianCalendar, HijriCalendar, HebrewCalendar, ChineseLunisolarCalendar, JapaneseLunisolarCalendar, KoreanLunisolarCalendar, TaiwanLunisolarCalendar,
  UmAlQuraCalendar,
} from '@xobin/globalization';
import { ArgumentOutOfRangeException } from '@xobin/core';

const fixture = JSON.parse(readFileSync(new URL('./calendar-base-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');

const createCalendar = {
  Gregorian: () => new GregorianCalendar(),
  Persian: () => new PersianCalendar(),
  ThaiBuddhist: () => new ThaiBuddhistCalendar(),
  Korean: () => new KoreanCalendar(),
  Taiwan: () => new TaiwanCalendar(),
  Japanese: () => new JapaneseCalendar(),
  Julian: () => new JulianCalendar(),
  Hijri: () => new HijriCalendar(),
  Hebrew: () => new HebrewCalendar(),
  ChineseLunisolar: () => new ChineseLunisolarCalendar(),
  JapaneseLunisolar: () => new JapaneseLunisolarCalendar(),
  KoreanLunisolar: () => new KoreanLunisolarCalendar(),
  TaiwanLunisolar: () => new TaiwanLunisolarCalendar(),
  UmAlQura: () => new UmAlQuraCalendar(),
};

const exceptionConstructors = {
  empty: () => new ArgumentOutOfRangeException(),
  parameter: () => new ArgumentOutOfRangeException('year'),
  message: () => new ArgumentOutOfRangeException('year', 'Invalid year.'),
  actualValue: () => new ArgumentOutOfRangeException('year', -1, 'Invalid year.'),
  large15: () => new ArgumentOutOfRangeException('value', 1e15, 'Invalid value.'),
  large16: () => new ArgumentOutOfRangeException('value', 1e16, 'Invalid value.'),
  large17: () => new ArgumentOutOfRangeException('value', 1e17, 'Invalid value.'),
  small4: () => new ArgumentOutOfRangeException('value', 1e-4, 'Invalid value.'),
  small5: () => new ArgumentOutOfRangeException('value', 1e-5, 'Invalid value.'),
  small6: () => new ArgumentOutOfRangeException('value', 1e-6, 'Invalid value.'),
};

for (const row of fixture.exceptionConstructors) {
  test(`ArgumentOutOfRangeException/${row.name}`, () => {
    const error = exceptionConstructors[row.name]();
    assert.equal(error.paramName, row.paramName);
    assert.equal(error.message, row.message);
    assert.equal(error.actualValue, row.actualValue);
  });
}

// Each row was executed by tools/dotnet10-calendar-oracle against Microsoft.NETCore.App 10.0.7.
for (const row of fixture.weeks) {
  test(`Calendar.GetWeekOfYear/${row.calendar}/${row.ticks}/${row.rule}/${row.firstDay}`, () => {
    const calendar = createCalendar[row.calendar]();
    const actual = calendar.getWeekOfYear(new DateTime(BigInt(row.ticks)), row.rule, row.firstDay);
    assert.equal(actual, row.week);
  });
}

function matchesDotNetError(error, row) {
  return error.constructor.name === row.error
    && error.paramName === row.paramName
    && error.message === row.message
    && (error.actualValue ?? null) === row.actualValue;
}

for (const row of fixture.invalidWeeks) {
  test(`Calendar.GetWeekOfYear/invalid/${row.calendar}/${row.rule}/${row.firstDay}`, () => {
    const calendar = createCalendar[row.calendar]();
    assert.throws(() => calendar.getWeekOfYear(calendar.maxSupportedDateTime, row.rule, row.firstDay),
      (error) => matchesDotNetError(error, row));
  });
}

for (const row of fixture.invalidTimes) {
  test(`Calendar.ToDateTime/invalidTime/${row.calendar}/${row.hour}/${row.minute}/${row.second}/${row.millisecond}`, () => {
    const calendar = createCalendar[row.calendar]();
    assert.throws(() => calendar.toDateTime(row.year, 1, 1, row.hour, row.minute, row.second, row.millisecond),
      (error) => matchesDotNetError(error, row));
  });
}

for (const row of fixture.years) {
  test(`Calendar.ToFourDigitYear/${row.calendar}/${row.max}/${row.year}`, () => {
    const calendar = createCalendar[row.calendar]();
    calendar.twoDigitYearMax = row.max;
    if (row.error) {
      assert.throws(() => calendar.toFourDigitYear(row.year),
        (error) => matchesDotNetError(error, row));
    } else {
      assert.equal(calendar.toFourDigitYear(row.year), row.result);
    }
  });
}

for (const row of fixture.adds) {
  test(`Calendar.${row.operation}/${row.calendar}/${row.ticks}/${row.value}`, () => {
    const calendar = createCalendar[row.calendar]();
    const time = new DateTime(BigInt(row.ticks));
    if (row.error) {
      assert.throws(() => calendar[row.operation](time, row.value),
        (error) => matchesDotNetError(error, row));
    } else {
      assert.equal(calendar[row.operation](time, row.value).ticks, BigInt(row.result));
    }
  });
}

// CalendarTestBase.GetWeekOfYear_Invalid_ThrowsArgumentOutOfRangeException.
const supportedCalendarTests = [
  ['GregorianCalendarDefaultTests', () => new GregorianCalendar()],
  ['GregorianCalendarLocalizedTests', () => new GregorianCalendar(GregorianCalendarTypes.Localized)],
  ['GregorianCalendarUSEnglishTests', () => new GregorianCalendar(GregorianCalendarTypes.USEnglish)],
  ['GregorianCalendarMiddleEastFrenchTests', () => new GregorianCalendar(GregorianCalendarTypes.MiddleEastFrench)],
  ['GregorianCalendarArabicTests', () => new GregorianCalendar(GregorianCalendarTypes.Arabic)],
  ['GregorianCalendarTransliteratedEnglishTests', () => new GregorianCalendar(GregorianCalendarTypes.TransliteratedEnglish)],
  ['GregorianCalendarTransliteratedFrenchTests', () => new GregorianCalendar(GregorianCalendarTypes.TransliteratedFrench)],
  ['PersianCalendarTests', () => new PersianCalendar()],
  ['ThaiBuddhistCalendarTests', () => new ThaiBuddhistCalendar()],
  ['KoreanCalendarTests', () => new KoreanCalendar()],
  ['TaiwanCalendarTests', () => new TaiwanCalendar()],
  ['JapaneseCalendarTests', () => new JapaneseCalendar()],
  ['JulianCalendarTests', () => new JulianCalendar()],
  ['HijriCalendarTests', () => new HijriCalendar()],
  ['HebrewCalendarTests', () => new HebrewCalendar()],
  ['ChineseLunisolarCalendarTests', () => new ChineseLunisolarCalendar()],
  ['JapaneseLunisolarTests', () => new JapaneseLunisolarCalendar()],
  ['KoreanLunisolarCalendarTests', () => new KoreanLunisolarCalendar()],
  ['TaiwanLunisolarTests', () => new TaiwanLunisolarCalendar()],
  ['UmAlQuraCalendarTests', () => new UmAlQuraCalendar()],
];

for (const [name, make] of supportedCalendarTests) {
  test(`CalendarTestBase.GetWeekOfYear_Invalid_ThrowsArgumentOutOfRangeException/${name}`, () => {
    const calendar = make();
    const date = calendar.maxSupportedDateTime;
    for (const [rule, day, paramName] of [
      [-1, DayOfWeek.Saturday, 'rule'],
      [CalendarWeekRule.FirstFourDayWeek + 1, DayOfWeek.Saturday, 'rule'],
      [CalendarWeekRule.FirstDay, DayOfWeek.Sunday - 1, 'firstDayOfWeek'],
      [CalendarWeekRule.FirstDay, DayOfWeek.Saturday + 1, 'firstDayOfWeek'],
    ]) {
      const calendarName = name.includes('Lunisolar') ? name.slice(0, name.indexOf('Lunisolar') + 'Lunisolar'.length) : name.slice(0, name.indexOf('Calendar'));
      const expected = fixture.invalidWeeks.find((row) => row.calendar === calendarName
        && row.rule === rule && row.firstDay === day);
      assert.ok(expected);
      assert.throws(() => calendar.getWeekOfYear(date, rule, day),
        (error) => error instanceof ArgumentOutOfRangeException && error.paramName === paramName
          && matchesDotNetError(error, expected));
    }
  });
}
