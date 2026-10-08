import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, DateTimeKind } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-time-zone-matrix-cases.json', import.meta.url), 'utf8'));
test('DateTimeTimezone.WindowsReferenceMatrix', () => {
  const previous = process.env.TZ;
  const failures = [];
  try {
    for (const row of fixture.rows) {
      process.env.TZ = row.zone;
      try {
      const ticks = BigInt(row.ticks);
      const utc = new DateTime(ticks, DateTimeKind.utc);
      const converted = utc.toLocalTime();
      assert.equal(converted.ticks, BigInt(row.localTicks), `${row.zone}/${ticks}/toLocalTime`);
      assert.equal(converted.addTicks(0n).toUniversalTime().ticks, converted.toUniversalTime().ticks,
        `${row.zone}/${ticks}/preserveKind`);
      assert.equal(converted.toUniversalTime().ticks, BigInt(row.roundtripTicks), `${row.zone}/${ticks}/roundtrip`);
      assert.equal(converted.toBinary(), BigInt(row.binary), `${row.zone}/${ticks}/binary`);
      assert.equal(DateTime.fromBinary(converted.toBinary()).toUniversalTime().ticks, BigInt(row.binaryRoundtripTicks),
        `${row.zone}/${ticks}/binaryRoundtrip`);
      const constructed = new DateTime(ticks, DateTimeKind.local);
      assert.equal(constructed.toUniversalTime().ticks, BigInt(row.constructedUtcTicks), `${row.zone}/${ticks}/constructed`);
      assert.equal(constructed.isDaylightSavingTime(), row.constructedDaylight, `${row.zone}/${ticks}/constructedDaylight`);
      const local = new DateTime(ticks, DateTimeKind.unspecified);
      const expectedUtc = ticks - BigInt(row.offsetLocal);
      assert.equal(local.toUniversalTime().ticks,
        expectedUtc < 0n ? 0n : expectedUtc > DateTime.maxValue.ticks ? DateTime.maxValue.ticks : expectedUtc,
        `${row.zone}/${ticks}/toUniversalTime`);
      assert.equal(local.isDaylightSavingTime(), row.daylightLocal, `${row.zone}/${ticks}/daylight`);
      } catch (error) { failures.push(error.message); }
    }
  } finally {
    if (previous === undefined) delete process.env.TZ;
    else process.env.TZ = previous;
  }
  assert.equal(failures.length, 0, failures.slice(0, 20).join('\n'));
});
