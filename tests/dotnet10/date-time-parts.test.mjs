import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, DateTimeKind } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-parts-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.rows.length, 1023);

function makeDate(row) {
  return new DateTime(BigInt(row.ticks), new DateTimeKind(row.kind));
}

function assertParts(row) {
  const date = makeDate(row);
  assert.equal(date.dayOfWeek, row.dayOfWeek);
  assert.equal(date.dayOfYear, row.dayOfYear);
  assert.equal(date.timeOfDay.ticks.toString(), row.timeOfDayTicks);
  assert.equal(date.ticks.toString(), row.ticks);
  assert.equal(date.kind.value, row.kind);
}

function rowsFor(source) {
  return fixture.rows.filter(row => row.source === source);
}

test('DateTimeTests.DayOfWeek_Get_ReturnsExpected', () => {
  const rows = rowsFor('DateTimeTests.DayOfWeek_Get_ReturnsExpected');
  assert.equal(rows.length, 1);
  assertParts(rows[0]);
});

test('DateTimeTests.DayOfYear_Get_ReturnsExpected', () => {
  const rows = rowsFor('DateTimeTests.DayOfYear_Get_ReturnsExpected');
  assert.equal(rows.length, 1);
  assertParts(rows[0]);
});

test('DateTimeTests.DayOfYear_Random', () => {
  const rows = rowsFor('DateTimeTests.DayOfYear_Random');
  assert.equal(rows.length, 1000);
  for (const row of rows) assertParts(row);
});

test('DateTimeTests.TimeOfDay_Get_ReturnsExpected', () => {
  const rows = rowsFor('DateTimeTests.TimeOfDay_Get_ReturnsExpected');
  assert.equal(rows.length, 1);
  const row = rows[0];
  const date = makeDate(row);
  const timeOfDay = date.timeOfDay;
  assert.equal(timeOfDay.ticks.toString(), row.timeOfDayTicks);
  const midnight = date.subtract(timeOfDay);
  assert.equal(midnight.ticks, date.ticks - timeOfDay.ticks);
  assert.equal(midnight.add(timeOfDay).ticks, date.ticks);
});

test('DateTimePartsOracle.BoundariesAndKinds', () => {
  const rows = fixture.rows.filter(row => row.source.startsWith('DateTimePartsOracle.'));
  assert.equal(rows.length, 20);
  for (const row of rows) assertParts(row);
});
