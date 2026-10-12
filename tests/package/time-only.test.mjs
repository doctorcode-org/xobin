import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { build } from 'esbuild';
import { TimeOnly, TimeSpan, DateTime, DateTimeKind } from '@xobin/globalization';
import { TimeOnly as DirectTimeOnly } from '@xobin/globalization/time-only';

const require = createRequire(import.meta.url);
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
test('TimeOnly core resolves from ESM and CommonJS subpaths', () => {
  assert.equal(TimeOnly, DirectTimeOnly);
  const common = require('@xobin/globalization/time-only').TimeOnly;
  for (const TimeType of [TimeOnly, DirectTimeOnly, common]) {
    const wrappedDays = { result: 0 };
    const time = new TimeType().addHours(-0.5, wrappedDays);
    assert.equal(time.hour, 23);
    assert.equal(time.minute, 30);
    assert.equal(wrappedDays.result, -1);
    assert.equal(new TimeType(1n) > new TimeType(), true);
    assert.equal(time.subtract(new TimeType(23, 0)).ticks, 18000000000n);
    assert.equal(time.isBetween(new TimeType(23, 0), new TimeType(1, 0)), true);
    const hour = { result: 0 }, minute = { result: 0 }, second = { result: 0 }, millisecond = { result: 0 }, microsecond = { result: 0 };
    time.deconstruct(hour, minute, second, millisecond, microsecond);
    assert.deepEqual([hour.result, minute.result, second.result, millisecond.result, microsecond.result], [23, 30, 0, 0, 0]);
  }
  const time = new TimeOnly(123456789101n);
  assert.equal(TimeOnly.fromTimeSpan(time.toTimeSpan()).ticks, time.ticks);
  assert.equal(time.add(new TimeSpan(1n)).ticks, time.ticks + 1n);
  assert.equal(TimeOnly.fromDateTime(new DateTime(time.ticks, DateTimeKind.utc)).ticks, time.ticks);
});
for (const entry of ['@xobin/globalization', '@xobin/globalization/time-only']) {
  test(`TimeOnly browser excludes culture and calendar data/${entry}`, async () => {
    const result = await build({ stdin: { contents: `import { TimeOnly } from '${entry}'; const days = { result: 0 }; console.log(new TimeOnly(23, 30).addHours(1, days).ticks, days.result);`, resolveDir: repositoryRoot }, bundle: true, format: 'esm', platform: 'browser', treeShaking: true, write: false, metafile: true, logLevel: 'silent' });
    for (const output of Object.values(result.metafile.outputs)) for (const [input, info] of Object.entries(output.inputs)) {
      if (input === '<stdin>' || info.bytesInOutput === 0) continue;
      const map = JSON.parse(await readFile(path.resolve(repositoryRoot, input + '.map'), 'utf8'));
      assert.ok(!map.sources.some(source => /calendar_data\.ts$|\/locales\//.test(source)), input);
    }
    for (const name of ['CultureInfo', 'UmAlQuraCalendar', 'HebrewCalendar', 'ChineseLunisolarCalendar', 'JapaneseCalendar']) assert.ok(!result.outputFiles[0].text.includes('class ' + name), name);
  });
}
