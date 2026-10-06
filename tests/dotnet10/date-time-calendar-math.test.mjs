import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-calendar-math-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.rows.length, 34);

function execute(row) {
  switch (row.source) {
    case 'DateTimeTests.DaysInMonth_Invoke_ReturnsExpected':
    case 'DateTimeTests.DaysInMonth_InvalidMonth_ThrowsArgumentOutOfRangeException':
    case 'DateTimeTests.DaysInMonth_InvalidYear_ThrowsArgumentOutOfRangeException':
      return DateTime.daysInMonth(...row.arguments);
    case 'DateTimeTests.IsLeapYear_Invoke_ReturnsExpected':
    case 'DateTimeTests.IsLeapYear_InvalidYear_ThrowsArgumentOutOfRangeException':
      return DateTime.isLeapYear(...row.arguments);
    default:
      throw new Error(`Unknown DateTime operation: ${row.source}`);
  }
}

for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => {
    if (row.error === null) {
      assert.equal(execute(row), row.result);
      return;
    }
    assert.throws(() => execute(row), error => {
      assert.equal(error.constructor.name, row.error);
      assert.equal(error.paramName ?? null, row.paramName);
      assert.equal(error.message, row.message);
      assert.equal(error.actualValue ?? null, row.actualValue);
      return true;
    });
  });
}
