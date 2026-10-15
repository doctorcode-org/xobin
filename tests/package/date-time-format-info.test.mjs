import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { build } from 'esbuild';
import * as entry from '@xobin/globalization/date-time-format-info';
import { DateTimeFormatInfo } from '@xobin/globalization';

const require = createRequire(import.meta.url);

test('DateTimeFormatInfo public entry exports only the class and shares instance identity', () => {
  assert.deepEqual(Object.keys(entry), ['DateTimeFormatInfo']);
  assert.equal(entry.DateTimeFormatInfo, DateTimeFormatInfo);
  const root = require('@xobin/globalization');
  const direct = require('@xobin/globalization/date-time-format-info');
  assert.deepEqual(Object.keys(direct), ['DateTimeFormatInfo']);
  assert.equal(direct.DateTimeFormatInfo, root.DateTimeFormatInfo);
  assert.equal(direct.DateTimeFormatInfo.invariantInfo, root.CultureInfo.invariantCulture.dateTimeFormat);
  assert.equal(direct.DateTimeFormatInfo.getInstance(root.CultureInfo.invariantCulture), root.DateTimeFormatInfo.invariantInfo);
  assert.equal(new root.DateTime(2024, 1, 2).toString('d', new direct.DateTimeFormatInfo()), '01/02/2024');
});

test('DateTimeFormatInfo browser entry excludes culture locale data and unrelated calendars', async () => {
  const result = await build({
    stdin: { contents: 'import { DateTimeFormatInfo } from "@xobin/globalization/date-time-format-info"; export const info = new DateTimeFormatInfo();', resolveDir: process.cwd() },
    bundle: true, platform: 'browser', format: 'esm', write: false, treeShaking: true,
  });
  const output = result.outputFiles[0].text;
  assert.doesNotMatch(output, /PersianCalendar|ThaiBuddhistCalendar|UmAlQuraCalendar|CULTURES_DATA|windows_time_zones/);
  assert.doesNotMatch(output, /fa-IR|en-US|fr-FR/);
});

test('DateTimeFormatInfo declarations hide locale metadata and the internal factory', () => {
  for (const extension of ['d.mts', 'd.ts']) {
    const declaration = readFileSync(new URL(`../../packages/globalization/dist/date_time_format_info.${extension}`, import.meta.url), 'utf8');
    assert.doesNotMatch(declaration, /export\s*\{[^}]*createDateTimeFormatInfo/);
  }
  assert.equal('eraNames' in new DateTimeFormatInfo(), false);
  assert.equal('allDateTimePatterns' in new DateTimeFormatInfo(), false);
  assert.equal('rfC1123Pattern' in new DateTimeFormatInfo(), false);
});

test('browser bundling preserves provider type resolution before an instance is constructed', async () => {
  const result = await build({
    stdin: {
      contents: `
        import { DateTime } from '@xobin/globalization/date-time';
        import { DateTimeFormatInfo } from '@xobin/globalization/date-time-format-info';
        const provider = { getFormat(type) {
          if (type !== DateTimeFormatInfo) throw new Error('Incorrect provider type token');
          const info = new DateTimeFormatInfo();
          info.shortDatePattern = "'provider' yyyy";
          return info;
        } };
        export const value = new DateTime(2024, 1, 2).toString('d', provider);
      `,
      resolveDir: process.cwd(),
    },
    bundle: true, platform: 'browser', format: 'esm', write: false, minify: true,
  });
  const module = await import('data:text/javascript;base64,' + Buffer.from(result.outputFiles[0].contents).toString('base64'));
  assert.equal(module.value, 'provider 2024');
});
