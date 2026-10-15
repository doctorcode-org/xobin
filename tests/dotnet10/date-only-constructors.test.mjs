import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import * as globalization from '@xobin/globalization';

const { DateOnly } = globalization;
const fixture = JSON.parse(readFileSync(new URL('./date-only-constructors-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.sourceTag, 'v10.0.7');
function verify(row) {
  const invoke = () => {
    if (row.operation === 'min') return DateOnly.minValue;
    if (row.operation === 'max') return DateOnly.maxValue;
    if (row.operation === 'default') return new DateOnly();
    const [year, month, day, calendar] = row.arguments;
    return row.operation === 'calendar'
      ? new DateOnly(year, month, day, calendar === null ? null : new globalization[calendar]())
      : new DateOnly(year, month, day);
  };
  if (row.error) {
    assert.throws(invoke, error => {
      assert.equal(error.constructor.name, row.error);
      assert.equal(error.message, row.message);
      assert.equal(error.paramName ?? null, row.paramName);
      assert.equal(error.actualValue ?? null, row.actualValue);
      return true;
    });
  } else {
    const date = invoke();
    assert.deepEqual({ dayNumber: date.dayNumber, year: date.year, month: date.month, day: date.day }, row.result);
  }
}
for (const [index, row] of fixture.rows.entries()) test(`${row.source}/${index}`, () => verify(row));
test('DateOnlyTests.MinMaxValuesTest', () => {
  for (const row of fixture.rows.filter(row => row.source === 'DateOnlyTests.MinMaxValuesTest')) verify(row);
});
test('DateOnlyTests.ConstructorsNegativeCasesTest', () => {
  for (const row of fixture.rows.filter(row => row.source === 'DateOnlyTests.ConstructorsNegativeCasesTest')) verify(row);
});
