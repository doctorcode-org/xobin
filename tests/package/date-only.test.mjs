import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { build } from 'esbuild';
import { DateOnly } from '@xobin/globalization';
import { DateOnly as DirectDateOnly } from '@xobin/globalization/date-only';

const require = createRequire(import.meta.url);
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
test('DateOnly constructors resolve from ESM and CommonJS subpaths', () => {
  assert.equal(DateOnly, DirectDateOnly);
  const CommonDateOnly = require('@xobin/globalization/date-only').DateOnly;
  assert.equal(new CommonDateOnly().dayNumber, 0);
  assert.equal(new DirectDateOnly(2000, 2, 29).dayNumber, new CommonDateOnly(2000, 2, 29).dayNumber);
  assert.equal(CommonDateOnly.maxValue.dayNumber, 3652058);
});
for (const entry of ['@xobin/globalization', '@xobin/globalization/date-only']) {
  test(`DateOnly constructors exclude culture and calendar data/${entry}`, async () => {
    const result = await build({ stdin: { contents: `import { DateOnly } from '${entry}'; console.log(new DateOnly(2024, 2, 29).dayNumber);`, resolveDir: repositoryRoot }, bundle: true, format: 'esm', platform: 'browser', treeShaking: true, write: false, metafile: true, logLevel: 'silent' });
    for (const output of Object.values(result.metafile.outputs)) for (const [input, info] of Object.entries(output.inputs)) {
      if (input === '<stdin>' || info.bytesInOutput === 0) continue;
      const map = JSON.parse(await readFile(path.resolve(repositoryRoot, input + '.map'), 'utf8'));
      assert.ok(!map.sources.some(source => /calendar_data\.ts$|\/locales\//.test(source)), input);
    }
    for (const name of ['CultureInfo', 'UmAlQuraCalendar', 'HebrewCalendar', 'ChineseLunisolarCalendar', 'JapaneseCalendar']) assert.ok(!result.outputFiles[0].text.includes('class ' + name), name);
  });
}
