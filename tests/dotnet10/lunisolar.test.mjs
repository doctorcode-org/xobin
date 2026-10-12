import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import test from 'node:test';
import { DateTime, ChineseLunisolarCalendar, JapaneseLunisolarCalendar, KoreanLunisolarCalendar, TaiwanLunisolarCalendar } from '@xobin/globalization';
const fixture = JSON.parse(readFileSync(new URL('./lunisolar-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
const constructors = { ChineseLunisolarCalendar, JapaneseLunisolarCalendar, KoreanLunisolarCalendar, TaiwanLunisolarCalendar };
for (const row of fixture.properties) test(`Lunisolar.NET10/properties/${row.name}`, () => {
    const calendar = new constructors[row.name]();
    assert.equal(calendar.twoDigitYearMax, row.twoDigitYearMax);
    assert.deepEqual(calendar.eras, row.eras);
});
for (const [index, row] of fixture.rows.entries()) test(`Lunisolar.NET10/${row.name}/${row.operation}/${index}`, () => {
    const calendar = new constructors[row.name]();
    const invoke = () => {
        if (row.operation === 'setTwoDigitYearMax') { calendar.twoDigitYearMax = row.arguments[0]; return calendar.twoDigitYearMax; }
        const args = row.operation.startsWith('add') || row.operation === 'getSexagenaryYear'
            ? [new DateTime(BigInt(row.arguments[0])), ...row.arguments.slice(1)] : row.arguments;
        const result = calendar[row.operation](...args);
        return result instanceof DateTime ? result.ticks.toString() : result;
    };
    if (row.error) assert.throws(invoke, error => {
        assert.equal(error.constructor.name, row.error);
        assert.equal(error.message, row.message);
        assert.equal(error.paramName ?? null, row.paramName);
        assert.equal(typeof error.actualValue === 'bigint' ? error.actualValue.toString() : error.actualValue ?? null, row.actualValue);
        return true;
    });
    else assert.deepEqual(invoke(), row.result);
});
for (const row of fixture.years) test(`Lunisolar.NET10/every-day/${row.name}/${row.year}`, () => {
    const calendar = new constructors[row.name](), hash = createHash('sha256');
    let count = 0;
    for (let ticks = BigInt(row.firstTicks); ticks <= BigInt(row.lastTicks); ticks += 864000000000n) {
        const date = new DateTime(ticks), year = calendar.getYear(date), month = calendar.getMonth(date), day = calendar.getDayOfMonth(date), era = calendar.getEra(date);
        const cycle = calendar.getSexagenaryYear(date);
        let roundTrip;
        try { roundTrip = calendar.toDateTime(year, month, day, 0, 0, 0, 0, era).ticks.toString(); }
        catch (error) { roundTrip = [error.constructor.name, error.paramName ?? '', error.message, error.actualValue ?? ''].join('|'); }
        hash.update([ticks, year, month, day, calendar.getDayOfYear(date), calendar.getDayOfWeek(date), era, cycle, calendar.getCelestialStem(cycle), calendar.getTerrestrialBranch(cycle), roundTrip].join('|') + '\n');
        count++;
    }
    assert.equal(count, row.count);
    assert.equal(hash.digest('hex'), row.sha256);
});
