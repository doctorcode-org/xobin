import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { ISOWeek, DateTime, DateOnly, DateTimeKind } from '@xobin/globalization';
const fixture = JSON.parse(readFileSync(new URL('./iso-week-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
function run(row) {
    const invoke = () => {
        const dateOnly = row.operation.endsWith('DateOnly');
        const operation = dateOnly ? row.operation.slice(0, -8) : row.operation;
        const args = operation === 'getWeekOfYear' || operation === 'getYear'
            ? [dateOnly ? DateOnly.fromDayNumber(row.arguments[0]) : new DateTime(BigInt(row.arguments[0]))] : row.arguments;
        const result = ISOWeek[operation](...args);
        if (result instanceof DateTime) {
            assert.equal(result.kind, DateTimeKind.unspecified);
            return result.ticks.toString();
        }
        return result;
    };
    if (row.error) assert.throws(invoke, error => {
        assert.equal(error.constructor.name, row.error);
        assert.equal(error.message, row.message);
        assert.equal(error.paramName ?? null, row.paramName);
        assert.equal(error.actualValue ?? null, row.actualValue);
        return true;
    });
    else assert.equal(invoke(), row.result);
}
for (const [index, row] of fixture.rows.entries()) test(`${row.source}/${index}`, () => run(row));
function official(source) {
    const rows = fixture.rows.filter(row => row.source === source);
    assert.ok(rows.length > 0);
    for (const row of rows) run(row);
}
test('ISOWeekTests.GetWeeksInYear', () => {
    assert.equal(fixture.rows.filter(row => row.source === 'ISOWeekTests.GetWeeksInYear').length, 401);
    official('ISOWeekTests.GetWeeksInYear');
});
test('ISOWeekTests.GetWeeksInYear_WithInvalidYear_Throws', () => official('ISOWeekTests.GetWeeksInYear_WithInvalidYear_Throws'));
test('ISOWeekTests.GetYearEnd_ForYear9999_Throws', () => official('ISOWeekTests.GetYearEnd_ForYear9999_Throws'));
function errorText(error) { return [error.constructor.name, error.paramName ?? '', error.message, error.actualValue ?? ''].join('|'); }
test('Supplemental.ISOWeek/all-supported-years', () => {
    const hash = createHash('sha256');
    for (let year = 1; year <= 9999; year++) {
        let end;
        try { end = ISOWeek.getYearEnd(year).ticks.toString(); }
        catch (error) { end = errorText(error); }
        hash.update([year, ISOWeek.getWeeksInYear(year), ISOWeek.getYearStart(year).ticks, end].join('|') + '\n');
    }
    assert.equal(fixture.allYears.count, 9999);
    assert.equal(hash.digest('hex'), fixture.allYears.sha256);
});
for (const row of fixture.days) test(`Supplemental.ISOWeek/every-day/${row.year}`, () => {
    const hash = createHash('sha256');
    let count = 0;
    for (let date = new DateTime(row.year, 1, 1); date.year === row.year; date = date.addTicks(864000000000n)) {
        const dateOnly = DateOnly.fromDateTime(date);
        hash.update([date.ticks, ISOWeek.getWeekOfYear(date), ISOWeek.getYear(date), ISOWeek.getWeekOfYear(dateOnly), ISOWeek.getYear(dateOnly)].join('|') + '\n');
        count++;
    }
    assert.equal(count, row.count);
    assert.equal(hash.digest('hex'), row.sha256);
});
