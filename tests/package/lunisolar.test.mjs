import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import * as globalization from '@xobin/globalization';
const require = createRequire(import.meta.url);
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const entries = [
    ['EastAsianLunisolarCalendar', 'east-asian-lunisolar-calendar', null],
    ['ChineseLunisolarCalendar', 'chinese-lunisolar-calendar', 'chinese'],
    ['JapaneseLunisolarCalendar', 'japanese-lunisolar-calendar', 'japanese'],
    ['KoreanLunisolarCalendar', 'korean-lunisolar-calendar', 'korean'],
    ['TaiwanLunisolarCalendar', 'taiwan-lunisolar-calendar', 'taiwan'],
];
for (const [name, entry, dataName] of entries) {
    test(`Lunisolar package entry/${entry}`, async () => {
        const esm = await import('@xobin/globalization/' + entry);
        assert.equal(esm[name], globalization[name]);
        assert.equal(typeof require('@xobin/globalization/' + entry)[name], 'function');
    });
    test(`Lunisolar browser retains only selected table/${entry}`, async () => {
        const result = await build({ stdin: { contents: `import { ${name} } from '@xobin/globalization/${entry}'; console.log(${name});`, resolveDir: repositoryRoot, loader: 'js' }, bundle: true, format: 'esm', platform: 'browser', treeShaking: true, write: false, metafile: true, logLevel: 'silent' });
        const tables = new Set();
        for (const input of Object.keys(result.metafile.inputs)) {
            if (input === '<stdin>') continue;
            const map = JSON.parse(await readFile(path.resolve(repositoryRoot, input + '.map'), 'utf8'));
            for (const source of map.sources) {
                const match = source.match(/(chinese|japanese|korean|taiwan)_lunisolar_calendar_data\.ts$/);
                if (match) tables.add(match[1]);
            }
        }
        assert.deepEqual([...tables].sort(), dataName ? [dataName] : []);
        for (const [other] of entries) if (other !== name && other !== 'EastAsianLunisolarCalendar') assert.ok(!result.outputFiles[0].text.includes('class ' + other));
    });
}
