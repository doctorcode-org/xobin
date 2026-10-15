import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { build } from 'esbuild';
import * as root from '@xobin/globalization';
import { DateOnly } from '@xobin/globalization/date-only';
import { TimeOnly } from '@xobin/globalization/time-only';
import { TimeSpan } from '@xobin/globalization/time-span';

const require = createRequire(import.meta.url);
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
for (const [name, subpath, Direct, create, expected] of [
    ['DateOnly', 'date-only', DateOnly, Type => new Type(2024, 2, 29), '2024-02-29'],
    ['TimeOnly', 'time-only', TimeOnly, Type => new Type(123456789n), '00:00:12.3456789'],
    ['TimeSpan', 'time-span', TimeSpan, Type => new Type(-123456789n), '-00:00:12.3456789'],
]) {
    test(`${name} formatting resolves from ESM and CommonJS root and subpath`, () => {
        assert.equal(root[name], Direct);
        for (const Type of [Direct, root[name], require('@xobin/globalization')[name], require(`@xobin/globalization/${subpath}`)[name]]) {
            const value = create(Type), format = name === 'TimeSpan' ? 'c' : 'O';
            assert.equal(value.toString(format), expected);
            for (const buffer of [new Uint16Array(50), new Uint8Array(50), Array(50).fill('~')]) {
                const written = { result: -1 };
                assert.equal(value.tryFormat(buffer, written, format), true);
                assert.equal(written.result, expected.length);
                const text = Array.isArray(buffer) ? buffer.slice(0, written.result).join('')
                    : buffer instanceof Uint8Array ? new TextDecoder().decode(buffer.slice(0, written.result))
                    : String.fromCharCode(...buffer.slice(0, written.result));
                assert.equal(text, expected);
            }
        }
    });
    for (const entry of ['@xobin/globalization', `@xobin/globalization/${subpath}`]) {
        test(`${name} browser formatting excludes unrelated cultures and calendars/${entry}`, async () => {
            const expression = name === 'DateOnly' ? 'new DateOnly(2024, 2, 29)' : `new ${name}(123456789n)`;
            const result = await build({ stdin: { contents: `import {${name}} from '${entry}'; console.log(${expression}.toString('${name === 'TimeSpan' ? 'g' : 'O'}'));`, resolveDir: repositoryRoot }, bundle: true, format: 'esm', platform: 'browser', treeShaking: true, write: false, metafile: true, logLevel: 'silent' });
            for (const output of Object.values(result.metafile.outputs)) for (const [input, info] of Object.entries(output.inputs)) {
                if (input === '<stdin>' || info.bytesInOutput === 0) continue;
                const map = JSON.parse(await readFile(path.resolve(repositoryRoot, input + '.map'), 'utf8'));
                assert.ok(!map.sources.some(source => /calendar_data\.ts$|\/locales\//.test(source)), input);
            }
            if (name === 'TimeSpan') assert.ok(!result.outputFiles[0].text.includes('abbreviatedDayNames'), 'invariant date tables remained in the interval bundle');
            for (const excluded of ['CultureInfo', 'HebrewCalendar', 'ChineseLunisolarCalendar', 'UmAlQuraCalendar', ...(name === 'TimeSpan' ? ['DateTime', 'DateOnly', 'TimeOnly'] : [])]) {
                assert.ok(!new RegExp('class\\s+_?' + excluded + '\\b').test(result.outputFiles[0].text), excluded);
            }
        });
    }
}

test('Selected culture formatting keeps only the imported locale', async () => {
    const result = await build({ stdin: { contents: `import {CultureInfo, DateOnly, TimeOnly, TimeSpan} from '@xobin/globalization'; import {cultureData} from '@xobin/globalization/locales/fr-FR'; const culture = CultureInfo.loadCultureInfo('fr-FR', cultureData); console.log(new DateOnly(2024, 2, 29).toString('D', culture), new TimeOnly(123456789n).toString('T', culture), new TimeSpan(123456789n).toString('g', culture));`, resolveDir: repositoryRoot }, bundle: true, format: 'esm', platform: 'browser', treeShaking: true, write: false, metafile: true, logLevel: 'silent' });
    const sources = [];
    for (const output of Object.values(result.metafile.outputs)) for (const [input, info] of Object.entries(output.inputs)) {
        if (input === '<stdin>' || info.bytesInOutput === 0) continue;
        if (/[/\\]locales[/\\]/.test(input)) sources.push(input.replaceAll('\\', '/').replace(/\.mjs$/, '.ts'));
        else sources.push(...JSON.parse(await readFile(path.resolve(repositoryRoot, input + '.map'), 'utf8')).sources);
    }
    const locales = sources.filter(source => /\/locales\//.test(source));
    assert.ok(locales.some(source => source.endsWith('/fr-FR.ts')));
    assert.ok(locales.every(source => source.endsWith('/fr-FR.ts')), locales.join(', '));
    assert.ok(!sources.some(source => /calendar_data\.ts$/.test(source)));
});
