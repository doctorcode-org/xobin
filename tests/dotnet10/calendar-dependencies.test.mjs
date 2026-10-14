import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { KoreanCalendar, TaiwanCalendar, JapaneseCalendar, HijriCalendar, HebrewCalendar, DateTime, CultureInfo, Calendar } from '@xobin/globalization';
const fixture = JSON.parse(readFileSync(new URL('./calendar-dependencies-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
for (const name of ['ja-JP', 'zh-TW', 'ko-KR', 'ar-SA', 'he-IL']) {
    const { cultureData } = await import('@xobin/globalization/locales/' + name + '/full');
    CultureInfo.loadCultureInfo(name, cultureData);
}
const constructors = { KoreanCalendar, TaiwanCalendar, JapaneseCalendar, HijriCalendar, HebrewCalendar };
for (const [index, row] of fixture.rows.entries()) {
    test('Supplemental calendar dependency: ' + row.name + '.' + row.method + '/' + index, () => {
        const calendar = new constructors[row.name]();
        const args = row.args.map(value => typeof value === 'string' && /^\d+$/.test(value) ? new DateTime(BigInt(value)) : value);
        const invoke = () => {
            if (row.method === 'format') {
                const culture = new CultureInfo(args[1]);
                culture.dateTimeFormat.calendar = calendar;
                return args[0].toString(args[2], culture);
            }
            if (row.method.endsWith('Set')) {
                const target = args[1] ? Calendar.readOnly(calendar) : calendar;
                const property = row.method.slice(0, -3);
                target[property] = args[0];
                return target[property];
            }
            const member = calendar[row.method];
            const result = typeof member === 'function' ? member.apply(calendar, args) : member;
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
