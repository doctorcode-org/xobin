import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-precision-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => {
    const value = new DateTime(BigInt(row.inputTicks));
    const invoke = () => value[row.operation](row.value);
    if (row.error) {
      assert.throws(invoke, error => {
        assert.equal(error.constructor.name, row.error);
        assert.equal(error.paramName, row.paramName);
        assert.equal(error.message, row.message);
        return true;
      });
    } else assert.equal(invoke().ticks, BigInt(row.result));
  });
}

test('DateTimeTests.TestRoundTrippingDateTimeAndFileTime', () => {
  const utc = DateTime.utcNow;
  assert.equal(DateTime.fromFileTimeUtc(utc.toFileTimeUtc()).ticks, utc.ticks);
  const local = DateTime.now;
  assert.equal(DateTime.fromFileTime(local.toFileTime()).ticks, local.ticks);
});

test('DateTimeTests.UnixEpoch', () => {
  const epoch = DateTime.unixEpoch;
  assert.deepEqual([epoch.year, epoch.month, epoch.day, epoch.hour, epoch.minute, epoch.second, epoch.millisecond, epoch.kind.value],
    [1970, 1, 1, 0, 0, 0, 0, 1]);
  assert.equal(epoch.ticks, 621355968000000000n);
});
