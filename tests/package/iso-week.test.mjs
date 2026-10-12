import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import { ISOWeek, DateTime, DateOnly } from '@xobin/globalization';
import { ISOWeek as DirectISOWeek } from '@xobin/globalization/iso-week';
const require = createRequire(import.meta.url);
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
test('ISOWeek resolves from ESM and CommonJS subpaths', () => {
    assert.equal(ISOWeek, DirectISOWeek);
    assert.equal(require('@xobin/globalization/iso-week').ISOWeek.getWeekOfYear(new DateTime(2021,1,1)), 53);
    assert.equal(DirectISOWeek.getYear(new DateOnly(2021,1,1)), 2020);
    assert.equal(DirectISOWeek.toDateTime(2020,53,7).ticks, new DateTime(2021,1,3).ticks);
    assert.equal(DirectISOWeek.toDateOnly(2020,53,0).dayNumber, new DateOnly(2021,1,3).dayNumber);
    assert.equal(require('@xobin/globalization/iso-week').ISOWeek.toDateTime(2020,53,0).ticks, new DateTime(2021,1,3).ticks);
    assert.equal(require('@xobin/globalization/iso-week').ISOWeek.toDateOnly(2020,53,7).dayNumber, new DateOnly(2021,1,3).dayNumber);
});
for (const entry of ['@xobin/globalization', '@xobin/globalization/iso-week']) test(`ISOWeek browser excludes calendar and culture tables/${entry}`, async () => {
    const result = await build({ stdin: { contents: `import { ISOWeek } from '${entry}'; console.log(ISOWeek.getWeeksInYear(2020));`, resolveDir: repositoryRoot, loader: 'js' }, bundle: true, format: 'esm', platform: 'browser', treeShaking: true, write: false, metafile: true, logLevel: 'silent' });
    const retained = Object.entries(result.metafile.outputs).flatMap(([, output]) => Object.entries(output.inputs).filter(([, info]) => info.bytesInOutput > 0).map(([input]) => input));
    for (const input of retained) {
        if (input === '<stdin>') continue;
        const map = JSON.parse(await readFile(path.resolve(repositoryRoot, input + '.map'), 'utf8'));
        assert.ok(!map.sources.some(source => /lunisolar_calendar_data\.ts$|\/locales\//.test(source)), input);
    }
    const output = result.outputFiles[0].text;
    for (const name of ['ChineseLunisolarCalendar','JapaneseLunisolarCalendar','KoreanLunisolarCalendar','TaiwanLunisolarCalendar','UmAlQuraCalendar','HebrewCalendar','PersianCalendar','JapaneseCalendar','CultureInfo']) assert.ok(!output.includes('class ' + name), name);
});
