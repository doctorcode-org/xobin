import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createRequire } from 'node:module';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { build } from 'esbuild';

const require = createRequire(import.meta.url);
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const entries = [
    ['TimeSpan', 'time-span'],
    ['DateTime', 'date-time'],
    ['DateOnly', 'date-only'],
    ['TimeOnly', 'time-only'],
    ['DateTimeStyles', 'date-time-styles'],
    ['DateTimeFormatInfo', 'date-time-format-info'],
    ['DateTimeFormat', 'date-time-format'],
    ['CultureInfo', 'culture-info'],
    ['ISOWeek', 'iso-week'],
    ['Calendar', 'calendar'],
    ['GregorianCalendar', 'gregorian-calendar'],
    ['PersianCalendar', 'persian-calendar'],
    ['ThaiBuddhistCalendar', 'thai-buddhist-calendar'],
    ['UmAlQuraCalendar', 'um-al-qura-calendar'],
    ['KoreanCalendar', 'korean-calendar'],
    ['TaiwanCalendar', 'taiwan-calendar'],
    ['JapaneseCalendar', 'japanese-calendar'],
    ['HijriCalendar', 'hijri-calendar'],
    ['HebrewCalendar', 'hebrew-calendar'],
    ['JulianCalendar', 'julian-calendar'],
    ['EastAsianLunisolarCalendar', 'east-asian-lunisolar-calendar'],
    ['ChineseLunisolarCalendar', 'chinese-lunisolar-calendar'],
    ['JapaneseLunisolarCalendar', 'japanese-lunisolar-calendar'],
    ['KoreanLunisolarCalendar', 'korean-lunisolar-calendar'],
    ['TaiwanLunisolarCalendar', 'taiwan-lunisolar-calendar'],
    ['DateTimeKind', 'date-time-kind'],
    ['DayOfWeek', 'day-of-week'],
    ['CalendarAlgorithmType', 'calendar-algorithm-type'],
    ['CalendarWeekRule', 'calendar-week-rule'],
    ['GregorianCalendarTypes', 'gregorian-calendar-types'],
];

for (const [name, subpath] of entries) {
    test(`${name} can be loaded first through its CommonJS entry`, () => {
        const result = spawnSync(process.execPath, ['-e', `
            const direct = require('@xobin/globalization/${subpath}');
            const root = require('@xobin/globalization');
            require('node:assert/strict').strictEqual(direct.${name}, root.${name});
        `], { cwd: repositoryRoot, encoding: 'utf8' });
        assert.equal(result.status, 0, result.stderr || result.stdout);
    });

    test(`${name} has the same root and direct identity in each module format`, async () => {
        const specifier = '@xobin/globalization/' + subpath;
        const commonjs = require('@xobin/globalization');
        const esm = await import('@xobin/globalization');
        assert.notEqual(commonjs[name], undefined);
        assert.notEqual(esm[name], undefined);
        assert.strictEqual(require(specifier)[name], commonjs[name]);
        assert.strictEqual((await import(specifier))[name], esm[name]);
        assert.notEqual(require.resolve(specifier), require.resolve('@xobin/globalization'));
    });
}

const calendarNames = entries.filter(([name]) => name.endsWith('Calendar') && name !== 'Calendar').map(([name]) => name);

for (const [name, subpath] of entries.filter(([name]) =>
    ['DateTime', 'TimeSpan', 'Calendar', 'GregorianCalendar', 'DateTimeFormat', 'DateTimeFormatInfo'].includes(name))) {
    test(`${name} direct entries expose no internal helpers`, async () => {
        const specifier = '@xobin/globalization/' + subpath;
        assert.deepEqual(Object.keys(require(specifier)), [name]);
        assert.deepEqual(Object.keys(await import(specifier)), [name]);
    });
}

const declaration = name => new RegExp('\\b(?:class|function|var|let|const)\\s+_?' + name + '\\b');
const calendarTable = /\b(?:var|let|const)\s+(?:hebrewTable|lunarMonthLengths|HijriYearInfo|yearInfo\d*)\s*=/;

function freshCommonJS(source) {
    const snapshot = `
        const fs = require('node:fs');
        const path = require('node:path');
        function loadedGlobalization() {
            const directory = path.dirname(require.resolve('@xobin/globalization/time-span'));
            const files = Object.keys(require.cache).filter(file => file.startsWith(directory + path.sep));
            return {
                files: files.map(file => path.relative(directory, file).replaceAll('\\\\', '/')),
                source: files.map(file => fs.readFileSync(file, 'utf8')).join('\\n'),
            };
        }
    `;
    const result = spawnSync(process.execPath, ['-e', snapshot + source], {
        cwd: repositoryRoot,
        encoding: 'utf8',
    });
    assert.equal(result.error, undefined);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    return JSON.parse(result.stdout);
}

test('a fresh native CommonJS TimeSpan import loads no globalization root or unrelated temporal types', () => {
    const result = freshCommonJS(`
        const { TimeSpan } = require('@xobin/globalization/time-span');
        console.log(JSON.stringify({ value: new TimeSpan(1n).ticks.toString(), cache: loadedGlobalization() }));
    `);
    assert.equal(result.value, '1');
    assert.ok(result.cache.files.includes('time_span.js'));
    assert.equal(result.cache.files.includes('index.js'), false);
    assert.equal(result.cache.files.some(file => file.startsWith('locales/')), false);
    for (const name of ['DateTime', 'DateOnly', 'TimeOnly', 'DateTimeFormatInfo', 'CultureInfo', ...calendarNames]) {
        assert.doesNotMatch(result.cache.source, declaration(name), name + ' was loaded by TimeSpan');
    }
    assert.doesNotMatch(result.cache.source, calendarTable);
});

for (const full of [false, true]) {
    test(`native CommonJS Persian ${full ? 'full' : 'default'} locale retains only its selected calendar contract`, () => {
        const result = freshCommonJS(`
            const { CultureInfo } = require('@xobin/globalization/culture-info');
            const { DateTime } = require('@xobin/globalization/date-time');
            const { cultureData } = require('@xobin/globalization/locales/fa-IR${full ? '/full' : ''}');
            const culture = CultureInfo.loadCultureInfo('fa-IR', cultureData);
            console.log(JSON.stringify({
                name: culture.name,
                calendars: culture.optionalCalendars.map(calendar => calendar.toString().split('.').at(-1)),
                formatted: new DateTime(2024, 3, 20).toString('yyyy/MM/dd', culture),
                cache: loadedGlobalization(),
            }));
        `);
        assert.equal(result.name, 'fa-IR');
        assert.equal(result.formatted, '1403/01/01');
        assert.deepEqual(result.calendars, full ? ['PersianCalendar', 'GregorianCalendar', 'HijriCalendar'] : ['PersianCalendar']);
        assert.equal(result.cache.files.includes('index.js'), false);
        assert.equal(declaration('HijriCalendar').test(result.cache.source), full);
        for (const name of ['HebrewCalendar', 'ChineseLunisolarCalendar', 'JapaneseLunisolarCalendar', 'KoreanLunisolarCalendar', 'TaiwanLunisolarCalendar']) {
            assert.doesNotMatch(result.cache.source, declaration(name));
        }
        assert.doesNotMatch(result.cache.source, calendarTable);
    });
}

for (const scenario of [
    {
        subpath: 'time-span', file: 'time_span.js', expected: '1', allowedCalendars: [],
        source: "const { TimeSpan } = require('@xobin/globalization/time-span'); globalThis.result = new TimeSpan(1n).ticks.toString();",
    },
    {
        subpath: 'persian-calendar', file: 'persian_calendar.js', expected: 31, allowedCalendars: ['PersianCalendar'],
        source: "const { PersianCalendar } = require('@xobin/globalization/persian-calendar'); globalThis.result = new PersianCalendar().getDaysInMonth(1403, 1);",
    },
    {
        subpath: 'locales/fa-IR', file: 'locales/fa-IR.js', expected: 'fa-IR', allowedCalendars: ['PersianCalendar'],
        source: "const { cultureData } = require('@xobin/globalization/locales/fa-IR'); globalThis.result = cultureData.name;",
    },
]) {
    test(`a browser bundle of CommonJS ${scenario.subpath} uses its direct entry without Node dependencies`, async () => {
        const result = await build({
            stdin: { contents: scenario.source, resolveDir: repositoryRoot, loader: 'js' },
            bundle: true,
            platform: 'browser',
            format: 'iife',
            target: 'es2022',
            treeShaking: true,
            metafile: true,
            write: false,
            logLevel: 'silent',
        });
        const inputs = Object.keys(result.metafile.inputs).map(file => file.replaceAll('\\', '/'));
        const entrySuffix = '/globalization/dist/' + scenario.file;
        assert.ok(inputs.some(file => file.endsWith(entrySuffix)), 'the CommonJS direct entry was not selected');
        assert.equal(inputs.some(file => file.endsWith('/globalization/dist/index.js')), false);
        const external = Object.values(result.metafile.inputs).flatMap(input => input.imports.filter(item => item.external));
        assert.deepEqual(external, [], 'the browser bundle retained an external runtime dependency');
        const usedEntryBytes = Object.values(result.metafile.outputs).reduce((total, output) => total
            + Object.entries(output.inputs).filter(([file]) => file.replaceAll('\\', '/').endsWith(entrySuffix))
                .reduce((bytes, [, input]) => bytes + input.bytesInOutput, 0), 0);
        assert.ok(usedEntryBytes > 0);
        const output = result.outputFiles[0].text;
        for (const name of calendarNames.filter(name => !scenario.allowedCalendars.includes(name))) {
            assert.doesNotMatch(output, declaration(name), name + ' remained in the direct consumer');
        }
        assert.doesNotMatch(output, calendarTable);
        const context = { TextEncoder, TextDecoder };
        runInNewContext(output, context);
        assert.equal(context.result, scenario.expected);
    });
}
