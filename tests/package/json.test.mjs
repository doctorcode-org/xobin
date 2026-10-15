import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import test from 'node:test';
import * as esm from '@xobin/globalization';
import { cultureData as persianData } from '@xobin/globalization/locales/fa-IR';
import { cultureData as englishData } from '@xobin/globalization/locales/en-US';

const require = createRequire(import.meta.url);

function values(api) {
    return {
        dateTime: new api.DateTime(2024, 3, 20, 13, 45, 6, 123, api.DateTimeKind.utc).addTicks(4567n),
        dateOnly: new api.DateOnly(2024, 3, 20),
        timeOnly: new api.TimeOnly(13, 45, 6, 123).add(new api.TimeSpan(4567n)),
        timeSpan: new api.TimeSpan(-123456789n),
    };
}

const expected = {
    dateTime: '2024-03-20T13:45:06.1234567Z',
    dateOnly: '2024-03-20',
    timeOnly: '13:45:06.1234567',
    timeSpan: '-00:00:12.3456789',
};

for (const [format, api] of [['ESM', esm], ['CommonJS', require('@xobin/globalization')]]) {
    test(`JSON.stringify serializes temporal values in nested objects and arrays/${format}`, () => {
        const payload = values(api);
        assert.deepEqual(JSON.parse(JSON.stringify(payload)), expected);
        assert.deepEqual(JSON.parse(JSON.stringify({ nested: payload, array: Object.values(payload) })), {
            nested: expected, array: Object.values(expected),
        });
        for (const [name, value] of Object.entries(payload)) {
            assert.equal(value.toJSON(), expected[name]);
            assert.equal(JSON.stringify(value), JSON.stringify(expected[name]));
        }
        const seen = [];
        JSON.stringify(payload, (key, value) => {
            if (key) seen.push([key, typeof value]);
            return value;
        });
        assert.deepEqual(seen, Object.keys(payload).map(key => [key, 'string']));
    });

    test(`JSON preserves temporal boundaries, the sign and single ticks/${format}`, () => {
        const { DateTime, DateTimeKind, DateOnly, TimeOnly, TimeSpan } = api;
        const cases = [
            [DateTime.minValue, '0001-01-01T00:00:00.0000000'],
            [new DateTime(1n, DateTimeKind.utc), '0001-01-01T00:00:00.0000001Z'],
            [DateTime.maxValue, '9999-12-31T23:59:59.9999999'],
            [DateOnly.minValue, '0001-01-01'],
            [DateOnly.maxValue, '9999-12-31'],
            [TimeOnly.minValue, '00:00:00.0000000'],
            [new TimeOnly(1n), '00:00:00.0000001'],
            [TimeOnly.maxValue, '23:59:59.9999999'],
            [TimeSpan.zero, '00:00:00'],
            [new TimeSpan(1n), '00:00:00.0000001'],
            [new TimeSpan(-1n), '-00:00:00.0000001'],
            [TimeSpan.minValue, '-10675199.02:48:05.4775808'],
            [TimeSpan.maxValue, '10675199.02:48:05.4775807'],
        ];
        for (const [value, text] of cases) assert.equal(JSON.parse(JSON.stringify(value)), text);
    });

    test(`JSON strings ignore current culture, patterns and separators/${format}`, () => {
        const { CultureInfo, DateTime } = api;
        // Resolve locale data in the matching module graph.
        const cultures = format === 'ESM'
            ? [persianData, englishData]
            : [require('@xobin/globalization/locales/fa-IR').cultureData, require('@xobin/globalization/locales/en-US').cultureData];
        const previous = CultureInfo.currentCulture;
        try {
            for (const data of cultures) {
                const culture = CultureInfo.loadCultureInfo(data.name, data);
                culture.dateTimeFormat.shortDatePattern = "'changed'";
                culture.dateTimeFormat.dateSeparator = '!';
                culture.dateTimeFormat.timeSeparator = '!';
                CultureInfo.currentCulture = culture;
                assert.deepEqual(JSON.parse(JSON.stringify(values(api))), expected);
                assert.equal(JSON.parse(JSON.stringify(DateTime.minValue)), '0001-01-01T00:00:00.0000000');
            }
        } finally { CultureInfo.currentCulture = previous; }
    });
}

for (const [name, subpath, text] of [
    ['DateTime', 'date-time', '0001-01-01T00:00:00.0000000'],
    ['DateOnly', 'date-only', '0001-01-01'],
    ['TimeOnly', 'time-only', '00:00:00.0000000'],
    ['TimeSpan', 'time-span', '00:00:00'],
]) {
    test(`JSON works through both direct entry module formats/${name}`, async () => {
        const entry = '@xobin/globalization/' + subpath;
        for (const Type of [(await import(entry))[name], require(entry)[name]]) {
            assert.equal(JSON.parse(JSON.stringify(new Type())), text);
        }
    });
}

test('DateTime JSON retains UTC and unspecified suffixes independently of the host timezone', () => {
    const source = `
        const { DateTime, DateTimeKind } = require('@xobin/globalization');
        const date = new DateTime(2024, 3, 20, 13, 45, 6);
        console.log(JSON.stringify([date, DateTime.specifyKind(date, DateTimeKind.utc)]));
    `;
    for (const zone of ['UTC', 'Asia/Tehran', 'America/New_York']) {
        const result = spawnSync(process.execPath, ['-e', source], {
            encoding: 'utf8', env: { ...process.env, TZ: zone },
        });
        assert.equal(result.status, 0, result.stderr);
        assert.deepEqual(JSON.parse(result.stdout), [
            '2024-03-20T13:45:06.0000000', '2024-03-20T13:45:06.0000000Z',
        ]);
    }
});

test('DateTime JSON preserves both occurrences of a local DST overlap and fractional ticks', () => {
    const result = spawnSync(process.execPath, ['-e', `
        const { DateTime, DateTimeKind } = require('@xobin/globalization');
        const first = new DateTime(2024, 11, 3, 5, 30, 0, DateTimeKind.utc).addTicks(1n);
        const second = first.addHours(1);
        console.log(JSON.stringify([first.toLocalTime(), second.toLocalTime()]));
    `], { encoding: 'utf8', env: { ...process.env, TZ: 'America/New_York' } });
    assert.equal(result.status, 0, result.stderr);
    assert.deepEqual(JSON.parse(result.stdout), [
        '2024-11-03T01:30:00.0000001-04:00', '2024-11-03T01:30:00.0000001-05:00',
    ]);
});
