import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import * as globalization from '@xobin/globalization';
const { CultureInfo, GregorianCalendar, DateTime, JapaneseCalendar } = globalization;
const fixture = JSON.parse(readFileSync(new URL('./format-calendar-dependencies-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
for (const row of fixture.optional) {
    if (row.name) {
        const { cultureData } = await import('@xobin/globalization/locales/' + row.name);
        CultureInfo.loadCultureInfo(row.name, cultureData);
    }
}
test('CultureInfoCalendar.OptionalCalendars_Get_InvariantInfo', () => {
    const calendars = CultureInfo.invariantCulture.optionalCalendars;
    assert.equal(calendars.length, 1);
    assert.ok(calendars[0] instanceof GregorianCalendar);
});
test('DateTimeFormatInfoMiscTests.JapaneseAbbreviatedEnglishEraNamesTest', () => {
    const culture = new CultureInfo('ja-JP');
    culture.dateTimeFormat.calendar = new JapaneseCalendar();
    for (const row of fixture.japaneseEraNumbers) assert.equal(culture.dateTimeFormat.getEra(row.name), row.result);
});
for (const [index, row] of fixture.rows.entries()) {
    test(`${row.source}/${index}`, () => {
        const info = new CultureInfo(row.name).dateTimeFormat.clone();
        const invoke = () => { info.calendar = new globalization[row.calendar](); return info.nativeCalendarName; };
        if (row.error) assert.throws(invoke, error => {
            assert.equal(error.constructor.name, row.error);
            assert.equal(error.message, row.message);
            assert.equal(error.paramName, row.paramName);
            return true;
        });
        else assert.equal(invoke(), row.result);
    });
}
for (const [index, row] of fixture.formats.entries()) {
    test('Supplemental Hebrew month formatting/' + index, () => {
        const culture = new CultureInfo(row.name);
        culture.dateTimeFormat.calendar = new globalization[row.calendar]();
        assert.equal(new DateTime(BigInt(row.ticks)).toString(row.format, culture), row.result);
    });
}
for (const row of fixture.optional) {
    test('Supplemental optional calendars: ' + (row.name || 'invariant'), () => {
        const culture = new CultureInfo(row.name);
        const calendars = culture.optionalCalendars;
        assert.equal(calendars.length, row.calendars.length);
        for (const [index, value] of calendars.entries()) assert.ok(value instanceof globalization[row.calendars[index]]);
        assert.notStrictEqual(calendars, culture.optionalCalendars);
        for (const [index, value] of calendars.entries()) assert.notStrictEqual(value, culture.optionalCalendars[index]);
        assert.equal(Object.hasOwn(culture, 'calendarFactories'), false);
    });
}
