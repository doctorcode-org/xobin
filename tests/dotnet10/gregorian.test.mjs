import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, GregorianCalendar } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./gregorian-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');

const dateOperations = new Set([
  'addMonths', 'addYears', 'getDayOfMonth', 'getDayOfWeek', 'getDayOfYear',
  'getEra', 'getMonth', 'getWeekOfYear', 'getYear',
]);

function execute(row) {
  const calendar = new GregorianCalendar(row.calendarType);
  if (row.max !== null) calendar.twoDigitYearMax = row.max;
  const args = [...row.arguments];
  if (dateOperations.has(row.operation)) args[0] = new DateTime(BigInt(args[0]));

  switch (row.operation) {
    case 'constructor': return calendar.calendarType;
    case 'getTwoDigitYearMax': return calendar.twoDigitYearMax;
    case 'setTwoDigitYearMax': calendar.twoDigitYearMax = args[0]; return calendar.twoDigitYearMax;
    case 'setCalendarType': calendar.calendarType = args[0]; return calendar.calendarType;
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
      assert.equal(thrown.actualValue ?? null, row.actualValue);
    }
  });
}
