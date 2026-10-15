import assert from 'node:assert/strict';
import test from 'node:test';
import { DateTime, DateTimeKind, DateOnly, TimeOnly, TimeSpan, CultureInfo } from '@xobin/globalization';
import { cultureData as persianData } from '@xobin/globalization/locales/fa-IR';
import { cultureData as englishData } from '@xobin/globalization/locales/en-US';

test('documented wire representations retain full ticks and Kind', () => {
    for (const kind of [DateTimeKind.unspecified, DateTimeKind.utc, DateTimeKind.local]) {
        for (const ticks of [0n, 1n, DateTime.maxValue.ticks]) {
            const value = new DateTime(ticks, kind);
            const wire = JSON.parse(JSON.stringify({ ticks: value.ticks.toString(), kind: value.kind.value }));
            const restored = new DateTime(BigInt(wire.ticks), new DateTimeKind(wire.kind));
            assert.equal(restored.ticks, value.ticks);
            assert.equal(restored.kind.value, value.kind.value);
        }
    }
    for (const value of [TimeSpan.minValue, new TimeSpan(1n), TimeSpan.maxValue]) {
        const ticks = JSON.parse(JSON.stringify({ ticks: value.ticks.toString() })).ticks;
        assert.equal(new TimeSpan(BigInt(ticks)).ticks, value.ticks);
    }
    const time = TimeOnly.maxValue;
    assert.equal(new TimeOnly(BigInt(JSON.parse(JSON.stringify({ ticks: time.ticks.toString() })).ticks)).ticks, time.ticks);
    const date = DateOnly.maxValue;
    assert.equal(DateOnly.fromDayNumber(JSON.parse(JSON.stringify({ dayNumber: date.dayNumber })).dayNumber).dayNumber, date.dayNumber);
});

test('explicit request cultures remain correct across asynchronous interleaving', async () => {
    const persian = CultureInfo.loadCultureInfo('fa-IR', persianData);
    const english = CultureInfo.loadCultureInfo('en-US', englishData);
    const date = new DateTime(2024, 3, 20);
    const previous = CultureInfo.currentCulture;
    try {
        CultureInfo.currentCulture = english;
        const render = async culture => {
            await new Promise(resolve => setTimeout(resolve, 1));
            return date.toString('yyyy/MM/dd', culture);
        };
        assert.deepEqual(await Promise.all([render(persian), render(english), render(persian)]),
            ['1403/01/01', '2024/03/20', '1403/01/01']);
    } finally { CultureInfo.currentCulture = previous; }
});
