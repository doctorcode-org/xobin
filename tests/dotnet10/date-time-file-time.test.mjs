import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test, { before, after } from 'node:test';
import { DateTime, DateTimeKind } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-file-time-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.timeZone, 'UTC');
const previousZone = process.env.TZ;
before(() => { process.env.TZ = 'UTC'; });
after(() => {
  if (previousZone === undefined) delete process.env.TZ;
  else process.env.TZ = previousZone;
});
const kinds = [DateTimeKind.unspecified, DateTimeKind.utc, DateTimeKind.local];
for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => {
    const date = row.inputTicks === null ? null : new DateTime(BigInt(row.inputTicks), kinds[row.inputKind]);
    const invoke = () => date ? date[row.operation]() : DateTime[row.operation](BigInt(row.fileTime));
    if (row.error) {
      assert.throws(invoke, error => {
        assert.equal(error.constructor.name, row.error);
        assert.equal(error.paramName ?? null, row.paramName);
        assert.equal(error.message, row.message);
        assert.equal(error.actualValue ?? null, row.actualValue);
        return true;
      });
      return;
    }
    const actual = invoke();
    if (date) {
      assert.equal(actual, BigInt(row.result));
      if (row.operation === 'toFileTime') {
        const restored = date.kind.value === DateTimeKind.utc.value
          ? DateTime.fromFileTimeUtc(actual) : DateTime.fromFileTime(actual);
        assert.equal(restored.ticks, date.ticks);
      }
    }
    else {
      assert.equal(actual.ticks, BigInt(row.result.ticks));
      assert.equal(actual.kind.value, row.result.kind);
    }
  });
}
