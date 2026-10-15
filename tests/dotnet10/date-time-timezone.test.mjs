import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, DateTimeKind } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-timezone-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');

const kinds = [DateTimeKind.unspecified, DateTimeKind.utc, DateTimeKind.local];

for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => {
    const value = new DateTime(BigInt(row.ticks), kinds[row.kind]);
    assert.equal(value.isDaylightSavingTime(), row.expected);
  });
}

test('DateTimeTimezone.SpecifyKind', () => {
  const value = new DateTime(638448068967891234n);
  for (const kind of kinds) {
    const actual = DateTime.specifyKind(value, kind);
    assert.equal(actual.ticks, value.ticks);
    assert.equal(actual.kind.value, kind.value);
  }
});

test('DateTimeTimezone.UtcLocalRoundtrip', () => {
  for (const ticks of [
    621355968001234567n,
    630873810450067890n,
    638448068967891234n,
    640763655001234567n,
  ]) {
    const utc = new DateTime(ticks, DateTimeKind.utc);
    const local = utc.toLocalTime();
    assert.equal(local.kind.value, DateTimeKind.local.value);
    assert.equal(local.toUniversalTime().ticks, ticks);
    assert.equal(local.toUniversalTime().kind.value, DateTimeKind.utc.value);
  }
});

test('DateTimeTimezone.PreservesSubMillisecondTicks', () => {
  const utc = new DateTime(638448068967891234n, DateTimeKind.utc);
  const local = utc.toLocalTime();
  assert.equal(local.ticks % 10000n, 1234n);
  assert.equal(local.toUniversalTime().ticks, utc.ticks);
});
