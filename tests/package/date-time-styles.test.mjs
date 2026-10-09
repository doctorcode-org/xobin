import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import { build } from 'esbuild';
import { DateTimeStyles } from '@xobin/globalization';
import * as styles from '@xobin/globalization/date-time-styles';

const require = createRequire(import.meta.url);

test('DateTimeStyles is available through ESM and CommonJS with a dedicated public entry', () => {
  assert.deepEqual(Object.keys(styles), ['DateTimeStyles']);
  assert.equal(styles.DateTimeStyles, DateTimeStyles);
  const commonJS = require('@xobin/globalization/date-time-styles');
  assert.deepEqual(Object.keys(commonJS), ['DateTimeStyles']);
  assert.deepEqual(commonJS.DateTimeStyles, DateTimeStyles);
});

test('DateTimeStyles private validation cannot be imported as package API', async () => {
  await assert.rejects(import('@xobin/globalization/internal/date_time_styles_validation'), { code: 'ERR_PACKAGE_PATH_NOT_EXPORTED' });
});

test('DateTimeStyles browser import loads no date, calendar, or culture implementation', async () => {
  const result = await build({
    stdin: { contents: 'export { DateTimeStyles } from "@xobin/globalization/date-time-styles";', resolveDir: process.cwd() },
    bundle: true, platform: 'browser', format: 'esm', write: false, metafile: true,
  });
  const inputs = Object.keys(result.metafile.inputs).filter(path => path !== '<stdin>');
  assert.ok(inputs.length > 0);
  assert.ok(inputs.every(path => /date_time_styles\.mjs$|chunk-[^/]+\.mjs$/.test(path)), inputs.join('\n'));
  assert.doesNotMatch(result.outputFiles[0].text, /DateTimeFormat|CultureInfo|GregorianCalendar|validateDateTimeStyles/);
});
