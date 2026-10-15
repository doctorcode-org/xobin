import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync, brotliCompressSync, constants } from 'node:zlib';
import { runInNewContext } from 'node:vm';
import { build, version } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(root, 'dist/bundle-size');
await mkdir(outputDirectory, { recursive: true });
const scenarios = [
  { name: 'time-span', types: ['TimeSpan'], expression: "TimeSpan.fromHours(2).add(TimeSpan.fromMinutes(30)).toString('c')", expected: '02:30:00' },
  { name: 'date-time', types: ['DateTime'], expression: "new DateTime(2024, 2, 29).addDays(1).toString('yyyy-MM-dd')", expected: '2024-03-01' },
  { name: 'date-time-time-span', types: ['DateTime', 'TimeSpan'], expression: "new DateTime(2024, 3, 20, 13, 45, 0).add(TimeSpan.fromMinutes(30)).toString('s')", expected: '2024-03-20T14:15:00' },
  { name: 'date-only-time-only', types: ['DateOnly', 'TimeOnly'], expression: "new DateOnly(2024, 2, 29).toString('O') + ' ' + new TimeOnly(13, 45).toString('HH:mm')", expected: '2024-02-29 13:45' },
  { name: 'persian-calendar', types: ['PersianCalendar', 'DateTime'], expression: 'new PersianCalendar().getYear(new DateTime(2024, 3, 20))', expected: 1403 },
  { name: 'format-fa-IR', types: ['DateTime', 'CultureInfo'], locale: 'fa-IR', expression: "new DateTime(2024, 3, 20, 13, 45, 0).toString('yyyy/MM/dd HH:mm', culture)" },
  { name: 'format-en-US', types: ['DateTime', 'CultureInfo'], locale: 'en-US', expression: "new DateTime(2024, 3, 20, 13, 45, 0).toString('yyyy/MM/dd HH:mm', culture)", expected: '2024/03/20 13:45' },
  { name: 'typical-fa-IR', types: ['DateTime', 'DateOnly', 'TimeOnly', 'TimeSpan', 'CultureInfo'], locale: 'fa-IR', expression: "[new DateTime(2024, 3, 20, 13, 45, 0).toString('G', culture), new DateOnly(2024, 3, 20).toString('D', culture), new TimeOnly(13, 45).toString('T', culture), TimeSpan.fromHours(2).toString('g', culture)]" },
  { name: 'typical-fa-IR-full', types: ['DateTime', 'DateOnly', 'TimeOnly', 'TimeSpan', 'CultureInfo'], locale: 'fa-IR', full: true, expression: "[new DateTime(2024, 3, 20, 13, 45, 0).toString('G', culture), new DateOnly(2024, 3, 20).toString('D', culture), new TimeOnly(13, 45).toString('T', culture), TimeSpan.fromHours(2).toString('g', culture)]" },
];
const subpaths = { TimeSpan: 'time-span', DateTime: 'date-time', DateOnly: 'date-only', TimeOnly: 'time-only', CultureInfo: 'culture-info', PersianCalendar: 'persian-calendar' };
const rows = [];
for (const scenario of scenarios) {
  let reference;
  for (const entry of ['root', 'subpath']) {
    for (const mode of ['browser-esm', 'server-esm', 'server-cjs']) {
      const commonjs = mode === 'server-cjs';
      const imports = entry === 'root'
        ? commonjs ? `const {${scenario.types}} = require('@xobin/globalization');` : `import {${scenario.types}} from '@xobin/globalization';`
        : scenario.types.map(type => commonjs ? `const {${type}} = require('@xobin/globalization/${subpaths[type]}');` : `import {${type}} from '@xobin/globalization/${subpaths[type]}';`).join('\n');
      const localePath = `@xobin/globalization/locales/${scenario.locale}${scenario.full ? '/full' : ''}`;
      const locale = scenario.locale ? `${commonjs ? `const {cultureData} = require('${localePath}');` : `import {cultureData} from '${localePath}';`}\nconst culture = CultureInfo.loadCultureInfo('${scenario.locale}', cultureData);` : '';
      const result = await build({ stdin: { contents: `${imports}\n${locale}\nglobalThis.bundleSizeResult = ${scenario.expression};`, resolveDir: root, sourcefile: 'size-consumer.mjs' }, bundle: true, minify: true, treeShaking: true, platform: mode.startsWith('browser') ? 'browser' : 'node', format: commonjs ? 'cjs' : 'esm', target: 'es2020', write: false, metafile: true, legalComments: 'none', logLevel: 'silent' });
      const bytes = result.outputFiles[0].contents;
      const context = { Intl, Date, TextEncoder, TextDecoder };
      runInNewContext(result.outputFiles[0].text, context, { timeout: 5000 });
      const actual = JSON.parse(JSON.stringify(context.bundleSizeResult));
      if (scenario.expected !== undefined) assert.deepEqual(actual, scenario.expected);
      if (reference === undefined) reference = actual;
      else assert.deepEqual(actual, reference, `${scenario.name}/${entry}/${mode}`);
      const inputs = Object.entries(Object.values(result.metafile.outputs)[0].inputs).filter(([, info]) => info.bytesInOutput > 0).map(([input, info]) => ({ input, bytesInOutput: info.bytesInOutput }));
      const localeInputs = inputs.filter(({ input }) => /[/\\]locales[/\\]/.test(input)).map(({ input }) => input.replaceAll('\\', '/'));
      const extension = commonjs ? 'js' : 'mjs';
      assert.ok(localeInputs.every(input => input.endsWith(`/locales/${scenario.locale}.${extension}`)
        || scenario.full && input.endsWith(`/locales/${scenario.locale}/full.${extension}`)), `unrelated locale: ${localeInputs}`);
      const locales = localeInputs.map(input => path.basename(input));
      const filename = `${scenario.name}-${entry}-${mode}`;
      await writeFile(path.join(outputDirectory, `${filename}.${commonjs ? 'cjs' : 'mjs'}`), bytes);
      rows.push({ scenario: scenario.name, entry, mode, bytes: bytes.length, gzip: gzipSync(bytes, { level: 9 }).length, brotli: brotliCompressSync(bytes, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length, result: actual, locales, inputs });
    }
  }
}
const report = { generatedAt: new Date().toISOString(), esbuild: version, node: process.version, target: 'es2020', units: 'bytes (divide by 1024 for KiB)', notes: ['Minified self-contained consumer bundles, no source maps, no parsing calls.', 'Server CJS uses require, server ESM uses import. Both are bundled; native unbundled Node loading is not measured.', 'Compression is gzip level 9 and Brotli quality 11; HTTP transfer depends on server configuration.', 'Browser bundles execute in a JS VM without require/process/Buffer, not an actual browser engine.'], rows };
await writeFile(path.join(outputDirectory, 'report.json'), JSON.stringify(report, null, 2) + '\n');
await writeFile(path.join(outputDirectory, 'report.md'), `# Consumer bundle sizes\n\nGenerated: ${report.generatedAt}. esbuild ${version}, target es2020. Sizes in KiB (1024 bytes).\n\n| Scenario | Entry | Mode | Minified | gzip | Brotli |\n|---|---|---|---:|---:|---:|\n` + rows.map(row => `| ${row.scenario} | ${row.entry} | ${row.mode} | ${(row.bytes / 1024).toFixed(2)} | ${(row.gzip / 1024).toFixed(2)} | ${(row.brotli / 1024).toFixed(2)} |`).join('\n') + '\n\n' + report.notes.join('\n\n') + '\n');
console.log(rows.filter(row => row.entry === 'root').map(({ inputs, ...row }) => row));
console.log(`Report: ${path.join(outputDirectory, 'report.md')}`);
