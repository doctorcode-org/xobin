import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { CultureInfo, DateTime, DateTimeKind, GregorianCalendar } from '@xobin/globalization';
import * as core from '@xobin/core';
import { CultureNotFoundException } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./exception-consumers-cases.json', import.meta.url), 'utf8'));
class ObservedCalendar extends GregorianCalendar {
    millisecond = null;
    toDateTime(year, month, day, hour, minute, second, millisecond) {
        this.millisecond = millisecond;
        return DateTime.maxValue;
    }
}
for (const [index, row] of fixture.rows.entries()) {
    test(`${row.source}/${row.operation}/${index}`, () => {
        const observed = new ObservedCalendar();
        const calendar = row.calendarMode === 'null' ? null : row.calendarMode === 'observed' ? observed : new GregorianCalendar();
        let result, error;
        try {
            if (row.operation === 'culture') result = new CultureInfo(row.name);
            else {
                const values = row.values.slice(0, 7), microsecond = row.values[7], kind = new DateTimeKind(row.values[8]);
                switch (row.operation) {
                    case 'millisecond': result = new DateTime(...values); break;
                    case 'calendar': result = new DateTime(...values, calendar); break;
                    case 'kind': result = new DateTime(...values, kind); break;
                    case 'microsecond': result = new DateTime(...values, microsecond); break;
                    case 'microsecond-kind': result = new DateTime(...values, microsecond, kind); break;
                    case 'calendar-kind': result = new DateTime(...values, calendar, kind); break;
                    case 'microsecond-calendar': result = new DateTime(...values, microsecond, calendar); break;
                    default: result = new DateTime(...values, microsecond, calendar, kind);
                }
            }
        } catch (value) { error = value; }
        if (row.type) {
            const Type = row.type === 'CultureNotFoundException' ? CultureNotFoundException : core[row.type];
            assert.ok(error instanceof Type, error?.message);
            assert.equal(error.message, row.message);
            assert.equal(error.paramName ?? null, row.paramName);
            assert.equal(error.actualValue ?? null, row.actualValue ?? null);
            if (row.operation === 'culture') assert.equal(error.invalidCultureName ?? null, row.invalidCultureName);
        } else {
            assert.equal(error, undefined);
            assert.equal(result.ticks.toString(), row.ticks);
            assert.equal(result.kind.value, row.kind);
        }
        if (row.operation !== 'culture') assert.equal(observed.millisecond, row.delegatedMillisecond);
    });
}
