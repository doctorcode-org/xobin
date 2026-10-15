import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, TaiwanCalendar, GregorianCalendar, CultureInfo } from '@xobin/globalization';
import { cultureData } from '@xobin/globalization/locales/zh-TW/full';

CultureInfo.loadCultureInfo('zh-TW', cultureData);
const fixture = JSON.parse(readFileSync(new URL('./taiwan-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');

function run(row) {
    const calendar = new TaiwanCalendar();
    const args = row.arguments.map(value => typeof value === 'string' ? new DateTime(BigInt(value)) : value);
    const name = row.source.split('.')[1];
    const operation = name[0].toLowerCase() + name.slice(1);
    const normalize = value => value instanceof DateTime ? value.ticks.toString() : value;
    const invoke = () => {
        if (name === 'TwoDigitYearMax_Get') return [calendar.twoDigitYearMax];
        if (name === 'TwoDigitYearMax_Set') { calendar.twoDigitYearMax = args[0]; return [calendar.twoDigitYearMax]; }
        if (name === 'DayNames_MonthNames') {
            const format = new CultureInfo('zh-TW').dateTimeFormat;
            format.calendar = calendar;
            assert.deepEqual(format.dayNames, ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']);
            return [format.dayNames, format.monthNames];
        }
        if (name === 'IsLeapMonth_ReturnsFalse') {
            const values = [calendar.isLeapMonth(args[0], args[1]), calendar.isLeapMonth(args[2], args[3], 0), calendar.isLeapMonth(args[4], args[5], 1)];
            assert.deepEqual(values, [false, false, false]);
            return values;
        }
        if (name === 'GetWeekOfYear_LastDayOfYear') {
            const date = args[0];
            const expected = new DateTime(date.year, 1, 1).dayOfWeek === 6 && DateTime.isLeapYear(date.year) ? 54 : 53;
            const result = calendar.getWeekOfYear(date, 0, 0);
            assert.equal(result, expected);
            return [result];
        }
        if (['GetDaysInMonth', 'GetDaysInYear', 'GetMonthsInYear', 'IsLeapDay', 'IsLeapYear', 'ToDateTime'].includes(name)) {
            const inputs = name === 'IsLeapDay' ? args.slice(0, 3) : args;
            const values = [undefined, 0, 1].map(era => normalize(calendar[operation](...inputs, ...(era === undefined ? [] : [era]))));
            const gregorian = new GregorianCalendar();
            assert.deepEqual(values, [0, 1, 2].map(() => normalize(gregorian[operation](inputs[0] + 1911, ...inputs.slice(1)))));
            if (name === 'IsLeapDay') assert.deepEqual(values, [args[3], args[3], args[3]]);
            return values;
        }
        const result = normalize(calendar[operation](...args));
        if (name === 'AddMonths' || name === 'AddYears') assert.equal(result, normalize(args[0][operation](args[1])));
        if (name === 'GetYear') assert.equal(result, args[0].year - 1911);
        if (name === 'GetEra') assert.equal(result, 1);
        if (name === 'ToFourDigitYear') assert.equal(result, args[0]);
        const dateProperties = { GetDayOfMonth: 'day', GetDayOfWeek: 'dayOfWeek', GetDayOfYear: 'dayOfYear', GetMonth: 'month' };
        if (name in dateProperties) assert.equal(result, args[0][dateProperties[name]]);
        if (name === 'GetWeekOfYear') assert.equal(result, new GregorianCalendar().getWeekOfYear(...args));
        return [result];
    };
    if (row.error) assert.throws(invoke, error => {
        assert.equal(error.constructor.name, row.error);
        assert.equal(error.message, row.message);
        assert.equal(error.paramName ?? null, row.paramName);
        assert.equal(error.actualValue ?? null, row.actualValue);
        return true;
    });
    else assert.deepEqual(invoke(), row.result);
}

for (const [index, row] of fixture.rows.entries()) {
    test(`${row.source}/${index}`, () => run(row));
}

test('TaiwanCalendarDaysAndMonths.DayNames_MonthNames', () => run(fixture.rows.find(row => row.source === 'TaiwanCalendarDaysAndMonths.DayNames_MonthNames')));
test('TaiwanCalendarIsLeapMonth.IsLeapMonth_ReturnsFalse', () => run(fixture.rows.find(row => row.source === 'TaiwanCalendarIsLeapMonth.IsLeapMonth_ReturnsFalse')));
test('TaiwanCalendarGetWeekOfYear.GetWeekOfYear_LastDayOfYear', () => run(fixture.rows.find(row => row.source === 'TaiwanCalendarGetWeekOfYear.GetWeekOfYear_LastDayOfYear')));
test('TaiwanCalendarTwoDigitYearMax.TwoDigitYearMax_Get', () => run(fixture.rows.find(row => row.source === 'TaiwanCalendarTwoDigitYearMax.TwoDigitYearMax_Get')));
test('TaiwanCalendarTwoDigitYearMax.TwoDigitYearMax_Set', () => run(fixture.rows.find(row => row.source === 'TaiwanCalendarTwoDigitYearMax.TwoDigitYearMax_Set')));
