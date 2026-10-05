import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, UmAlQuraCalendar } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./um-al-qura-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
const metadata = fixture.rows.find(row => row.operation === 'metadata').result;

test('CalendarTestBase.MinSupportedDateTime_Get_ReturnsExpected/UmAlQuraCalendarTests', () => {
  assert.equal(new UmAlQuraCalendar().minSupportedDateTime.ticks.toString(), metadata.min);
});
test('CalendarTestBase.MaxSupportedDateTime_Get_ReturnsExpected/UmAlQuraCalendarTests', () => {
  assert.equal(new UmAlQuraCalendar().maxSupportedDateTime.ticks.toString(), metadata.max);
});
test('CalendarTestBase.Eras_Get_ReturnsExpected/UmAlQuraCalendarTests', () => {
  assert.deepEqual(new UmAlQuraCalendar().eras, metadata.eras);
});
test('CalendarTestBase.Eras_Get_ReturnsDifferentInstance/UmAlQuraCalendarTests', () => {
  const calendar = new UmAlQuraCalendar();
  assert.notStrictEqual(calendar.eras, calendar.eras);
});
test('CalendarTestBase.AlgorithmType_Get_ReturnsExpected/UmAlQuraCalendarTests', () => {
  assert.equal(new UmAlQuraCalendar().algorithmType, metadata.algorithmType);
});

const dateOperations = new Set([
  'getYear', 'getMonth', 'getDayOfMonth', 'getDayOfYear', 'getEra', 'getDayOfWeek',
  'addMonths', 'addYears',
]);

function execute(row) {
  const calendar = new UmAlQuraCalendar();
  const args = [...row.arguments];
  if (dateOperations.has(row.operation)) args[0] = new DateTime(BigInt(args[0]));
  switch (row.operation) {
    case 'metadata': return {
      min: calendar.minSupportedDateTime.ticks.toString(),
      max: calendar.maxSupportedDateTime.ticks.toString(),
      algorithmType: calendar.algorithmType, eras: calendar.eras,
      twoDigitYearMax: calendar.twoDigitYearMax,
    };
    case 'year': {
      const [year] = args;
      return {
        days: calendar.getDaysInYear(year), months: calendar.getMonthsInYear(year),
        leap: calendar.isLeapYear(year), leapMonth: calendar.getLeapMonth(year),
      };
    }
    case 'month': {
      const [year, month] = args;
      const days = calendar.getDaysInMonth(year, month);
      const first = calendar.toDateTime(year, month, 1, 0, 0, 0, 0);
      const last = new DateTime(calendar.toDateTime(year, month, days, 23, 59, 59, 999).ticks + 9999n);
      return {
        days, first: first.ticks.toString(), last: last.ticks.toString(),
        firstDayOfYear: calendar.getDayOfYear(first), lastDayOfYear: calendar.getDayOfYear(last),
        firstDayOfWeek: calendar.getDayOfWeek(first), lastDayOfWeek: calendar.getDayOfWeek(last),
        firstEra: calendar.getEra(first), lastEra: calendar.getEra(last),
        isLeapMonth: calendar.isLeapMonth(year, month), isLeapDay: calendar.isLeapDay(year, month, days),
      };
    }
    case 'setTwoDigitYearMax': calendar.twoDigitYearMax = args[0]; return calendar.twoDigitYearMax;
    case 'toFourDigitYear': calendar.twoDigitYearMax = 1451; return calendar.toFourDigitYear(args[0]);
    default: {
      const result = calendar[row.operation](...args);
      return result instanceof DateTime ? result.ticks.toString() : result;
    }
  }
}

for (const [index, row] of fixture.rows.entries()) {
  test(`UmAlQuraCalendar.NET10/${row.operation}/${index}`, () => {
    let result;
    let thrown;
    try { result = execute(row); } catch (error) { thrown = error; }
    if (row.error === null) {
      if (thrown) throw thrown;
      assert.deepEqual(result, row.result);
      if (row.operation === 'month') {
        const [year, month] = row.arguments;
        const calendar = new UmAlQuraCalendar();
        const first = new DateTime(BigInt(row.result.first));
        for (let day = 1; day <= row.result.days; day++) {
          const date = first.addDays(day - 1);
          assert.deepEqual([calendar.getYear(date), calendar.getMonth(date), calendar.getDayOfMonth(date)],
            [year, month, day], `${year}/${month}/${day}`);
        }
      }
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
