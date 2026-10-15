import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, PersianCalendar } from '@xobin/globalization';

const sourceData = JSON.parse(readFileSync(new URL('./persian-source-data.json', import.meta.url), 'utf8'));
const fixture = JSON.parse(readFileSync(new URL('./persian-cases.json', import.meta.url), 'utf8'));
assert.equal(sourceData.sourceTag, 'v10.0.7');
assert.equal(fixture.runtime, '10.0.7');

test('PersianCalendarTests.CalendarConversion', () => {
  const calendar = new PersianCalendar();
  for (const [persianYear, persianMonth, persianDay, year, month, day] of sourceData.dates) {
    const date = new DateTime(year, month, day);
    assert.deepEqual([calendar.getYear(date), calendar.getMonth(date), calendar.getDayOfMonth(date)],
      [persianYear, persianMonth, persianDay], `${year}/${month}/${day}`);
    const result = calendar.toDateTime(persianYear, persianMonth, persianDay, 0, 0, 0, 0);
    assert.deepEqual([result.year, result.month, result.day], [year, month, day],
      `${persianYear}/${persianMonth}/${persianDay}`);
  }
});

test('PersianCalendarTests.IsLeapYear', () => {
  const calendar = new PersianCalendar();
  let lastNonLeap = 1;
  for (const year of sourceData.leapYears) {
    assert.equal(calendar.isLeapYear(year), true, `Leap year ${year}`);
    assert.equal(calendar.isLeapYear(lastNonLeap), false, `Non-leap year ${lastNonLeap}`);
    lastNonLeap = year - 1;
  }
  assert.equal(calendar.isLeapYear(9378), false);
});

const dateOperations = new Set([
  'addMonths', 'getDayOfMonth', 'getDayOfWeek', 'getDayOfYear',
  'getEra', 'getMonth', 'getWeekOfYear', 'getYear',
]);

function execute(row) {
  const calendar = new PersianCalendar();
  if (row.max !== null) calendar.twoDigitYearMax = row.max;
  const args = [...row.arguments];
  if (dateOperations.has(row.operation)) args[0] = new DateTime(BigInt(args[0]));

  switch (row.operation) {
    case 'getTwoDigitYearMax': return calendar.twoDigitYearMax;
    case 'setTwoDigitYearMax': calendar.twoDigitYearMax = args[0]; return calendar.twoDigitYearMax;
    case 'getEras': return calendar.eras;
    case 'isLeapMonthAllEras': return [calendar.isLeapMonth(...args),
      calendar.isLeapMonth(...args, 0), calendar.isLeapMonth(...args, 1)];
    case 'isLeapDayAllEras': return [calendar.isLeapDay(...args),
      calendar.isLeapDay(...args, 0), calendar.isLeapDay(...args, 1)];
    case 'getLeapMonthAllEras': return [calendar.getLeapMonth(args[0], 0), calendar.getLeapMonth(args[0], 1)];
    case 'getDaysInYearAllEras': return [calendar.getDaysInYear(args[0]),
      calendar.getDaysInYear(args[0], 0), calendar.getDaysInYear(args[0], 1)];
    case 'getMonthsInYearAllEras': return [calendar.getMonthsInYear(args[0]),
      calendar.getMonthsInYear(args[0], 0), calendar.getMonthsInYear(args[0], 1)];
    default: {
      const result = calendar[row.operation](...args);
      return result instanceof DateTime ? result.ticks.toString() : result;
    }
  }
}

for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => {
    let result;
    let thrown;
    try {
      result = execute(row);
    } catch (error) {
      thrown = error;
    }
    if (row.error === null) {
      if (thrown) throw thrown;
      assert.deepEqual(result, row.result);
    } else {
      assert.ok(thrown, `Expected ${row.error}`);
      assert.equal(thrown.constructor.name, row.error);
      assert.equal(thrown.paramName ?? null, row.paramName);
      assert.equal(thrown.message, row.message);
      assert.equal(typeof row.actualValue === 'string'
        ? String(thrown.actualValue) : thrown.actualValue ?? null, row.actualValue);
    }
  });
}
