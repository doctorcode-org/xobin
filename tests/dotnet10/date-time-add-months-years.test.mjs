import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { ArgumentOutOfRangeException } from '@xobin/core';
import { DateTime, DateTimeKind } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-add-months-years-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.rows.length, 33);

function targetFor(row) {
  switch (row.target) {
    case 'fixed': return new DateTime(BigInt(row.inputTicks), new DateTimeKind(row.inputKind));
    case 'min': return DateTime.minValue;
    case 'max': return DateTime.maxValue;
    case 'now': return DateTime.now;
    default: throw new Error(`Unknown DateTime target: ${row.target}`);
  }
}

function invoke(row, date) {
  return row.operation === 'addYears' ? date.addYears(row.value) : date.addMonths(row.value);
}

function matches(error, row) {
  assert.ok(error instanceof ArgumentOutOfRangeException);
  assert.equal(error.constructor.name, row.error);
  assert.equal(error.paramName ?? null, row.paramName);
  assert.equal(error.message, row.message);
  assert.equal(error.actualValue?.toString() ?? null, row.actualValue);
  return true;
}

for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => {
    const date = targetFor(row);
    const originalTicks = date.ticks;
    const originalKind = date.kind.value;
    if (row.error) {
      assert.throws(() => invoke(row, date), error => matches(error, row));
    } else {
      const result = invoke(row, date);
      assert.equal(result.ticks.toString(), row.resultTicks);
      assert.equal(result.kind.value, row.resultKind);
    }
    assert.equal(date.ticks, originalTicks);
    assert.equal(date.kind.value, originalKind);
  });
}
