import assert from 'node:assert/strict';
import test from 'node:test';
import { DateTime, DateTimeKind } from '@xobin/globalization';

const epoch = 621355968000000000n;
const previousZone = process.env.TZ;

function inZone(zone, action) {
  process.env.TZ = zone;
  try { action(); }
  finally {
    if (previousZone === undefined) delete process.env.TZ;
    else process.env.TZ = previousZone;
  }
}

test('DateTime.NativeTimezone.UtcConversionsMatchHostComponents', () => {
  const zones = Intl.supportedValuesOf('timeZone');
  for (const zone of zones) inZone(zone, () => {
    for (const iso of ['1900-01-15T12:30:00Z', '2018-01-15T12:30:00Z', '2024-07-15T12:30:00Z']) {
      const native = new Date(iso);
      const ticks = BigInt(native.getTime()) * 10000n + epoch + 9999n;
      const utc = new DateTime(ticks, DateTimeKind.utc);
      const local = utc.toLocalTime();
      assert.deepEqual([local.year, local.month, local.day, local.hour, local.minute, local.second],
        [native.getFullYear(), native.getMonth() + 1, native.getDate(), native.getHours(), native.getMinutes(), native.getSeconds()], zone);
      assert.equal(local.ticks % 10000n, 9999n, zone);
      assert.equal(local.toUniversalTime().ticks, ticks, zone);
    }
  });
});

test('DateTime.NativeTimezone.OverlapsPreserveBothInstants', () => {
  for (const [zone, instants] of [
    ['America/New_York', ['2024-11-03T05:30:00Z', '2024-11-03T06:30:00Z']],
    ['Europe/Berlin', ['2024-10-27T00:30:00Z', '2024-10-27T01:30:00Z']],
    ['Australia/Lord_Howe', ['2024-04-06T14:45:00Z', '2024-04-06T15:15:00Z']],
  ]) inZone(zone, () => {
    const locals = instants.map(iso => {
      const ticks = BigInt(Date.parse(iso)) * 10000n + epoch + 1n;
      const local = new DateTime(ticks, DateTimeKind.utc).toLocalTime();
      assert.equal(local.toUniversalTime().ticks, ticks);
      assert.equal(local.addTicks(0n).toUniversalTime().ticks, ticks);
      return local;
    });
    assert.equal(locals[0].ticks, locals[1].ticks);
    const constructed = new DateTime(locals[0].ticks, DateTimeKind.local);
    assert.equal(constructed.toUniversalTime().ticks, locals[1].toUniversalTime().ticks);
  });
});

test('DateTime.NativeTimezone.GapUsesNativeDateResolution', () => inZone('America/New_York', () => {
  const local = new DateTime(2024, 3, 10, 2, 30, 0, DateTimeKind.local).addTicks(1234n);
  const native = new Date(2024, 2, 10, 2, 30, 0);
  assert.equal(local.toUniversalTime().ticks, BigInt(native.getTime()) * 10000n + epoch + 1234n);
}));

test('DateTime.NativeTimezone.SeasonalDaylightEstimate', () => {
  for (const [zone, winter, summer] of [['America/New_York', false, true], ['Australia/Sydney', true, false], ['UTC', false, false]]) {
    inZone(zone, () => {
      assert.equal(new DateTime(2024, 1, 15, 12, 0, 0, DateTimeKind.local).isDaylightSavingTime(), winter);
      assert.equal(new DateTime(2024, 7, 15, 12, 0, 0, DateTimeKind.local).isDaylightSavingTime(), summer);
    });
  }
});

test('DateTime.NativeTimezone.RangeBoundariesAreClamped', () => {
  for (const zone of ['America/New_York', 'Asia/Tehran', 'UTC']) inZone(zone, () => {
    for (const ticks of [0n, DateTime.maxValue.ticks]) {
      const local = new DateTime(ticks, DateTimeKind.utc).toLocalTime();
      assert.ok(local.ticks >= 0n && local.ticks <= DateTime.maxValue.ticks);
    }
  });
});
