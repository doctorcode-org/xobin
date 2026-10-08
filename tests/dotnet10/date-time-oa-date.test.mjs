import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-oa-date-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');

for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => {
    const invoke = () => row.operation === 'toOADate'
      ? new DateTime(BigInt(row.input)).toOADate()
      : DateTime.fromOADate(row.input === 'NaN' ? Number.NaN : Number(row.input));

    if (row.error) {
      assert.throws(invoke, error => {
        assert.equal(error.constructor.name, row.error);
        assert.equal(error.paramName ?? null, row.paramName);
        assert.equal(error.message, row.message);
        return true;
      });
      return;
    }

    const actual = invoke();
    if (row.operation === 'toOADate') {
      assert.equal(actual, row.result);
    } else {
      assert.equal(actual.ticks, BigInt(row.result.ticks));
      assert.equal(actual.kind.value, row.result.kind);
    }
  });
}
