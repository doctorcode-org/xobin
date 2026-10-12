import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, JulianCalendar, JapaneseCalendar, HijriCalendar, HebrewCalendar,
    GregorianCalendar, PersianCalendar, ThaiBuddhistCalendar, KoreanCalendar, TaiwanCalendar, UmAlQuraCalendar } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./calendar-math-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
const constructors = { JulianCalendar, JapaneseCalendar, HijriCalendar, HebrewCalendar,
    GregorianCalendar, PersianCalendar, ThaiBuddhistCalendar, KoreanCalendar, TaiwanCalendar, UmAlQuraCalendar };
for (const [index, row] of fixture.rows.entries()) {
    test(`CalendarMath.NET10/${row.calendar}/${row.operation}/${index}`, () => {
        const calendar = new constructors[row.calendar]();
        const args = row.arguments;
        const invoke = () => {
            if (row.operation === 'dateParts' || row.operation === 'roundTrip') {
                const date = new DateTime(BigInt(args[0]));
                const year = calendar.getYear(date), month = calendar.getMonth(date), day = calendar.getDayOfMonth(date);
                if (row.operation === 'dateParts') return [year, month, day, calendar.getDayOfYear(date), calendar.getDayOfWeek(date), calendar.getEra(date)];
                return calendar.toDateTime(year, month, day, date.hour, date.minute, date.second, date.millisecond, calendar.getEra(date)).ticks.toString();
            }
            if (row.operation === 'yearInfo') return [calendar.getDaysInYear(...args), calendar.getMonthsInYear(...args), calendar.isLeapYear(...args), calendar.getLeapMonth(...args)];
            if (row.operation === 'monthInfo') return [calendar.getDaysInMonth(...args), calendar.isLeapMonth(...args)];
            if (row.operation === 'adjustedDate') {
                calendar.hijriAdjustment = args[0];
                return calendar.toDateTime(...args.slice(1), 0, 0, 0, 0).ticks.toString();
            }
            const values = row.operation.startsWith('add') ? [new DateTime(BigInt(args[0])), args[1]] : args;
            const result = calendar[row.operation](...values);
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
}
