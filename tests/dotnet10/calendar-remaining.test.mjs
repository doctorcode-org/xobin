import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { Calendar, DateTime, DateOnly, GregorianCalendar, JapaneseCalendar, JulianCalendar, HijriCalendar, HebrewCalendar,
    KoreanCalendar, TaiwanCalendar, PersianCalendar, ThaiBuddhistCalendar, UmAlQuraCalendar, ChineseLunisolarCalendar, JapaneseLunisolarCalendar, KoreanLunisolarCalendar, TaiwanLunisolarCalendar } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./calendar-remaining-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(new HijriCalendar().hijriAdjustment, fixture.hijriAdjustment);
const constructors = { GregorianCalendar, JapaneseCalendar, JulianCalendar, HijriCalendar, HebrewCalendar,
    KoreanCalendar, TaiwanCalendar, PersianCalendar, ThaiBuddhistCalendar, UmAlQuraCalendar, ChineseLunisolarCalendar, JapaneseLunisolarCalendar, KoreanLunisolarCalendar, TaiwanLunisolarCalendar };

test('JapaneseCalendar pinned era definitions match the reference environment', () => {
    const calendar = new JapaneseCalendar();
    assert.deepEqual(calendar.eras, fixture.japaneseEraData.map(info => info.era));
    for (const info of fixture.japaneseEraData) {
        const date = new DateTime(BigInt(info.ticks));
        assert.equal(calendar.getEra(date), info.era);
        assert.equal(calendar.getYear(date), date.year - info.yearOffset);
        assert.equal(calendar.toDateTime(info.minEraYear, date.month, date.day, 0, 0, 0, 0, info.era).ticks, date.ticks);
        assert.equal(calendar.getYear(calendar.toDateTime(info.maxEraYear, 1, 1, 0, 0, 0, 0, info.era)), info.maxEraYear);
    }
});

function run(row) {
    const calendar = row.calendar === 'GregorianCalendar' && ['calendarType', 'setCalendarType'].includes(row.operation)
        ? new GregorianCalendar(row.arguments[0]) : new constructors[row.calendar]();
    const invoke = () => {
        switch (row.operation) {
            case 'dateOnly': return new DateOnly(...row.arguments, calendar).dayNumber;
            case 'eraCount': assert.equal(calendar.eras.length, 1); return calendar.eras.length;
            case 'ctor': return new GregorianCalendar(row.arguments[0]);
            case 'addMonths': {
                const result = calendar.addMonths(new DateTime(BigInt(row.arguments[0])), row.arguments[1]).ticks.toString();
                assert.equal(result, row.arguments[2]);
                return result;
            }
            case 'setCalendarType': calendar.calendarType = row.arguments[1]; return calendar.calendarType;
            case 'setTwoDigitYearMax': calendar.twoDigitYearMax = row.arguments[0]; return calendar.twoDigitYearMax;
            case 'calendarType': return calendar.calendarType;
            case 'twoDigitYearMax': assert.equal(calendar.twoDigitYearMax, 99); return calendar.twoDigitYearMax;
            case 'hijriAdjustment': assert.ok(calendar.hijriAdjustment >= -2 && calendar.hijriAdjustment <= 2); return calendar.hijriAdjustment;
            case 'eras': {
                const eras = calendar.eras;
                assert.ok(eras.length >= (row.calendar === 'JapaneseLunisolarCalendar' ? 2 : 4));
                assert.deepEqual(eras, Array.from({ length: eras.length }, (_, i) => eras[0] - i));
                return eras;
            }
            case 'cloneType': return calendar.clone().constructor === calendar.constructor;
            case 'readOnly': {
                const readOnly = Calendar.readOnly(calendar);
                return [calendar.isReadOnly, readOnly.isReadOnly, readOnly.clone().isReadOnly];
            }
            case 'algorithmType': return calendar.algorithmType;
            default: {
                const result = calendar[row.operation](...row.arguments);
                return result instanceof DateTime ? result.ticks.toString() : result;
            }
        }
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
    if (row.calendar in constructors) test(`${row.source}/${index}`, () => run(row));
}

function official(source) {
    const rows = fixture.rows.filter(row => row.source === source);
    assert.ok(rows.length > 0);
    for (const row of rows) run(row);
}

test('JapaneseCalendarTwoDigitYearMax.TwoDigitYearMax_Get', () => official('JapaneseCalendarTwoDigitYearMax.TwoDigitYearMax_Get'));
test('JapaneseCalendarTests.Eras_Get_ReturnsAtLeastFour', () => official('JapaneseCalendarTests.Eras_Get_ReturnsAtLeastFour'));
test('CalendarsTests.HijriTest', () => official('CalendarsTests.HijriTest'));
test('CalendarsTests.UmAlQuraTest', () => official('CalendarsTests.UmAlQuraTest'));
test('CalendarsTests.HebrewTest', () => official('CalendarsTests.HebrewTest'));
test('CalendarsTests.JapaneseTest', () => official('CalendarsTests.JapaneseTest'));
test('CalendarsTests.JulianTest', () => official('CalendarsTests.JulianTest'));
test('MiscCalendarsTests.HebrewTest', () => {
    official('MiscCalendarsTests.HebrewTest');
    assert.equal(new HebrewCalendar().toDateTime(5360, 4, 14, 0, 0, 0, 0).ticks, new DateTime(1600, 1, 1).ticks);
});
test('MiscCalendarsTests.HijriTest', () => {
    official('MiscCalendarsTests.HijriTest');
    const calendar = new HijriCalendar();
    assert.equal(calendar.toDateTime(1008, 6, 15, 0, 0, 0, 0).ticks, new DateTime(1600, 1, 1).addDays(calendar.hijriAdjustment).ticks);
});
test('MiscCalendarsTests.JapaneseTest', () => {
    official('MiscCalendarsTests.JapaneseTest');
    assert.equal(new JapaneseCalendar().toDateTime(1, 1, 8, 0, 0, 0, 0, 4).ticks, new DateTime(1989, 1, 8).ticks);
});

for (const name of ['GregorianCalendarDefaultTests', 'GregorianCalendarArabicTests', 'GregorianCalendarLocalizedTests', 'GregorianCalendarMiddleEastFrenchTests', 'GregorianCalendarTransliteratedEnglishTests', 'GregorianCalendarTransliteratedFrenchTests', 'GregorianCalendarUSEnglishTests']) {
    test(`GregorianCalendarTestBase.CalendarType_Get_ReturnsExpected/${name}`, () => official('GregorianCalendarTestBase.CalendarType_Get_ReturnsExpected@' + name));
    test(`GregorianCalendarTestBase.CalendarType_Set/${name}`, () => official('GregorianCalendarTestBase.CalendarType_Set'));
    test(`GregorianCalendarTestBase.CalendarType_SetInvalidValue_ThrowsArgumentOutOfRangeException/${name}`, () => official('GregorianCalendarTestBase.CalendarType_SetInvalidValue_ThrowsArgumentOutOfRangeException'));
}

test('JapaneseLunisolarTests.Eras_Get_ReturnsAtLeastTwo', () => official('JapaneseLunisolarTests.Eras_Get_ReturnsAtLeastTwo'));

test('ChineseLunisolarCalendarTests.OffByOneDay', () => official('ChineseLunisolarCalendarTests.OffByOneDay'));

test('CalendarsTests.ChineseLunisolarTest', () => official('CalendarsTests.ChineseLunisolarTest'));

test('CalendarsTests.KoreanLunisolarTest', () => official('CalendarsTests.KoreanLunisolarTest'));

test('CalendarsTests.TaiwanLunisolarTest', () => official('CalendarsTests.TaiwanLunisolarTest'));

test('CalendarsTests.CalendarErasTest', () => {
    assert.deepEqual([ChineseLunisolarCalendar.ChineseEra, GregorianCalendar.ADEra, JapaneseLunisolarCalendar.JapaneseEra, HebrewCalendar.HebrewEra, HijriCalendar.HijriEra, JulianCalendar.JulianEra, KoreanCalendar.KoreanEra, KoreanLunisolarCalendar.GregorianEra, PersianCalendar.PersianEra, ThaiBuddhistCalendar.ThaiBuddhistEra, UmAlQuraCalendar.UmAlQuraEra], Array(11).fill(1));
});

