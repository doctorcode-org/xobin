import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTimeStyles } from '@xobin/globalization/date-time-styles';
import { validateDateTimeStyles } from '../../packages/globalization/dist/internal/date_time_styles_validation.mjs';

const fixture = JSON.parse(readFileSync(new URL('./date-time-styles-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');

test('DateTimeStyles values match the reference runtime', () => {
  assert.deepEqual(Object.fromEntries(Object.entries(DateTimeStyles).filter(([name]) => Number.isNaN(Number(name)))), fixture.values);
});

for (const row of fixture.rows) {
  test(`Supplementary ValidateStyles/${row.value}/${row.styles}`, () => {
    const invoke = () => validateDateTimeStyles(row.value, row.styles);
    if (row.error) {
      assert.throws(invoke, error => {
        assert.equal(error.constructor.name, row.error);
        assert.equal(error.paramName, row.paramName);
        assert.equal(error.message, row.message);
        return true;
      });
    } else assert.equal(invoke(), undefined);
  });
}
