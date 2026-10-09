import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test, { before, after } from 'node:test';
import { DateTime, DateTimeKind } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-binary-cases.json', import.meta.url), 'utf8'));
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
    if (row.operation === 'fromBinary') {
      assert.throws(() => DateTime.fromBinary(BigInt(row.input)), error => {
        assert.equal(error.constructor.name, row.error);
        assert.equal(error.paramName ?? null, row.paramName);
        assert.equal(error.message, row.message);
        return true;
      });
      return;
    }

    const [ticksText, kindText] = row.input === 'today'
      ? [DateTime.today.ticks.toString(), DateTimeKind.local.value.toString()]
      : row.input.split(':');
    const value = new DateTime(BigInt(ticksText), kinds[Number(kindText)]);
    const binary = value.toBinary();

    if (row.operation === 'toBinary') {
      assert.equal(binary, BigInt(row.result));
    }

    const roundtrip = DateTime.fromBinary(binary);
    assert.equal(roundtrip.ticks, value.ticks);
    assert.equal(roundtrip.kind.value, value.kind.value);

    if (row.operation === 'roundtrip' && row.input !== 'today') {
      assert.equal(binary, BigInt(row.result.binary));
      assert.equal(roundtrip.ticks, BigInt(row.result.ticks));
      assert.equal(roundtrip.kind.value, row.result.kind);
    }
  });
}
