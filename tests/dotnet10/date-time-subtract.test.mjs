import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { ArgumentOutOfRangeException } from '@xobin/core';
import { DateTime, DateTimeKind, TimeSpan } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-subtract-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.rows.length, 23);

function targetFor(row) {
  switch (row.target) {
    case 'fixed': return new DateTime(BigInt(row.inputTicks), new DateTimeKind(row.inputKind));
    case 'min': return DateTime.minValue;
    case 'max': return DateTime.maxValue;
    case 'now': return DateTime.now;
    default: throw new Error(`Unknown DateTime target: ${row.target}`);
  }
}

function operandFor(row) {
  return row.operation === 'subtractDateTime'
    ? new DateTime(BigInt(row.valueTicks), new DateTimeKind(row.valueKind))
    : new TimeSpan(BigInt(row.valueTicks));
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
    const operand = operandFor(row);
    const originalDateTicks = date.ticks;
    const originalDateKind = date.kind.value;
    const originalOperandTicks = operand.ticks;
    if (row.error) {
      assert.throws(() => date.subtract(operand), error => matches(error, row));
    } else {
      const result = date.subtract(operand);
      assert.equal(result.ticks.toString(), row.resultTicks);
      if (row.operation === 'subtractTimeSpan')
        assert.equal(result.kind.value, row.resultKind);
      else
        assert.ok(result instanceof TimeSpan);
    }
    assert.equal(date.ticks, originalDateTicks);
    assert.equal(date.kind.value, originalDateKind);
    assert.equal(operand.ticks, originalOperandTicks);
  });
}
