import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, ThaiBuddhistCalendar } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./thai-buddhist-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');

const dateOperations = new Set([
  'addMonths', 'addYears', 'getDayOfMonth', 'getDayOfWeek', 'getDayOfYear',
  'getEra', 'getMonth', 'getWeekOfYear', 'getYear',
]);

function execute(row) {
  const calendar = new ThaiBuddhistCalendar();
  if (row.max !== null) calendar.twoDigitYearMax = row.max;
  const args = [...row.arguments];
  if (dateOperations.has(row.operation)) args[0] = new DateTime(BigInt(args[0]));

  switch (row.operation) {
    case 'getTwoDigitYearMax': return calendar.twoDigitYearMax;
    case 'setTwoDigitYearMax': calendar.twoDigitYearMax = args[0]; return calendar.twoDigitYearMax;
    case 'getEras': return calendar.eras;
    default: {
      const result = calendar[row.operation](...args);
      return result instanceof DateTime ? result.ticks.toString() : result;
    }
  }
}

function assertRow(row) {
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
}

for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => assertRow(row));
}

test('ThaiBuddhistCalendarGetWeekOfYear.GetWeekOfYear_LastDayOfYear', () => {
  const row = fixture.rows.find(item => item.source === 'ThaiBuddhistCalendarGetWeekOfYear.GetWeekOfYear_LastDayOfYear');
  assert.ok(row);
  assert.equal(row.result, 53);
  assertRow(row);
});

test('ThaiBuddhistCalendarTwoDigitYearMax.TwoDigitYearMax_Get', () => {
  const row = fixture.rows.find(item => item.source === 'ThaiBuddhistCalendarTwoDigitYearMax.TwoDigitYearMax_Get');
  assert.ok(row);
  assert.ok(row.result === 2572 || row.result === 2592);
  assertRow(row);
});
