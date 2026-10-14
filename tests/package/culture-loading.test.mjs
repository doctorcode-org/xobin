import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import { build } from 'esbuild';
import * as esm from '@xobin/globalization';

const require = createRequire(import.meta.url);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const fixture = JSON.parse(readFileSync(new URL('../dotnet10/date-time-format-cases.json', import.meta.url), 'utf8'));

test('all default cultures load only their default calendar and preserve universal formatting', async () => {
  for (const [name, data] of Object.entries(fixture.cultures)) {
    if (!name) continue;
    const { cultureData } = await import(`@xobin/globalization/locales/${name}`);
    assert.equal(Object.hasOwn(cultureData, 'calendarFactories'), false, name);
    assert.deepEqual(Object.keys(cultureData.calendarFormats), data.calendarId === 1 ? [] : ['1'], name);
    const culture = esm.CultureInfo.loadCultureInfo(name, cultureData);
    assert.equal(culture.optionalCalendars.length, 1, name);
    assert.ok(culture.optionalCalendars[0] instanceof esm[data.calendar], name);
  }
  for (const row of fixture.supplemental.filter(row => row.format === 'U' && row.kind === 1)) {
    const date = new esm.DateTime(BigInt(row.ticks), esm.DateTimeKind.utc);
    const culture = row.culture ? new esm.CultureInfo(row.culture) : esm.CultureInfo.invariantCulture;
    if (row.error) assert.throws(() => date.toString('U', culture), error => error.constructor.name === row.error && error.message === row.message);
    else assert.equal(date.toString('U', culture), row.result, `${row.culture}/${row.ticks}`);
  }
});

test('CommonJS resolves every default and full culture without an extra helper runtime', () => {
  const api = require('@xobin/globalization');
  for (const [name, data] of Object.entries(fixture.cultures)) {
    if (!name) continue;
    const normal = require(`@xobin/globalization/locales/${name}`);
    const culture = api.CultureInfo.loadCultureInfo(name, normal.cultureData);
    assert.equal(culture.optionalCalendars.length, 1, name);
    const fullPath = `@xobin/globalization/locales/${name}/full`;
    const full = require(fullPath);
    const expanded = api.CultureInfo.loadCultureInfo(name, full.cultureData);
    const calendars = expanded.optionalCalendars;
    assert.equal(calendars.length, data.optionalCalendarIds.length, name);
    for (const calendar of calendars) {
      expanded.dateTimeFormat.calendar = calendar;
      assert.strictEqual(expanded.dateTimeFormat.calendar, calendar);
    }
    assert.equal(readFileSync(require.resolve(fullPath), 'utf8').includes('require("tslib")'), false, name);
  }
});

for (const [format, api, load] of [
  ['ESM', esm, path => import(path)],
  ['CommonJS', require('@xobin/globalization'), async path => require(path)],
]) {
  test(`${format} loads alternate calendars explicitly without changing the loader`, async () => {
    const canonical = await load('@xobin/globalization/locales/ca-ES-VALENCIA');
    const existing = await load('@xobin/globalization/locales/ca-ES-valencia');
    assert.strictEqual(canonical.cultureData, existing.cultureData);
    const canonicalFull = await load('@xobin/globalization/locales/ca-ES-VALENCIA/full');
    const existingFull = await load('@xobin/globalization/locales/ca-ES-valencia/full');
    assert.strictEqual(canonicalFull.cultureData, existingFull.cultureData);
    const normal = await load('@xobin/globalization/locales/fa-IR');
    const full = await load('@xobin/globalization/locales/fa-IR/full');
    const previous = api.CultureInfo.currentCulture;
    const culture = api.CultureInfo.loadCultureInfo('fa-IR', normal.cultureData);
    api.CultureInfo.currentCulture = culture;
    try {
      assert.deepEqual(culture.optionalCalendars.map(calendar => calendar.constructor), [api.PersianCalendar]);
      for (const info of [culture.dateTimeFormat, culture.dateTimeFormat.clone()]) {
        assert.throws(() => { info.calendar = new api.GregorianCalendar(); }, error => error.constructor.name === 'ArgumentOutOfRangeException' && error.paramName === 'value');
        assert.throws(() => { info.calendar = new api.HijriCalendar(); }, error => error.constructor.name === 'ArgumentOutOfRangeException');
      }
      const expanded = api.CultureInfo.loadCultureInfo('fa-IR', full.cultureData);
      assert.deepEqual(expanded.optionalCalendars.map(calendar => calendar.constructor), [api.PersianCalendar, api.GregorianCalendar, api.HijriCalendar]);
      assert.deepEqual(culture.optionalCalendars.map(calendar => calendar.constructor), [api.PersianCalendar]);
      assert.strictEqual(api.CultureInfo.currentCulture, culture);
      assert.deepEqual(new api.CultureInfo('fa-IR').optionalCalendars.map(calendar => calendar.constructor), [api.PersianCalendar, api.GregorianCalendar, api.HijriCalendar]);
      for (const info of [expanded.dateTimeFormat, expanded.dateTimeFormat.clone()]) {
        info.calendar = new api.HijriCalendar();
        assert.ok(info.calendar instanceof api.HijriCalendar);
        info.calendar = new api.GregorianCalendar();
        assert.ok(info.calendar instanceof api.GregorianCalendar);
      }
      assert.throws(() => { api.DateTimeFormatInfo.readOnly(expanded.dateTimeFormat).calendar = new api.HijriCalendar(); }, error => error.constructor.name === 'InvalidOperationException');
    } finally {
      api.CultureInfo.currentCulture = previous;
      api.CultureInfo.loadCultureInfo('fa-IR', normal.cultureData);
    }
  });
}

for (const platform of ['browser', 'node']) {
  for (const name of ['fa-IR', 'ja-JP']) {
    test(`${platform} default ${name} bundle excludes alternate calendars and locales`, async () => {
      const result = await build({ stdin: { contents: `import {CultureInfo, DateTime, DateTimeKind} from '@xobin/globalization'; import {cultureData} from '@xobin/globalization/locales/${name}'; const culture = CultureInfo.loadCultureInfo('${name}',cultureData); globalThis.result = { count: culture.optionalCalendars.length, text: new DateTime(2024,3,20,0,0,0,DateTimeKind.utc).toString('U',culture) };`, resolveDir: root }, bundle: true, platform, format: 'esm', charset: 'utf8', treeShaking: true, metafile: true, write: false, logLevel: 'silent' });
      const code = result.outputFiles[0].text;
      for (const unwanted of ['HijriCalendar', 'JapaneseCalendar', 'TaiwanCalendar', 'KoreanCalendar', 'HebrewCalendar', 'UmAlQuraCalendar']) assert.equal(code.includes(unwanted), false, unwanted);
      assert.equal(code.includes('محرم'), false, 'Hijri month data remained in the default bundle');
      const locales = Object.entries(Object.values(result.metafile.outputs)[0].inputs).filter(([file, info]) => /[/\\]locales[/\\]/.test(file) && info.bytesInOutput > 0).map(([file]) => file.replaceAll('\\', '/'));
      assert.deepEqual(locales, [`packages/globalization/dist/locales/${name}.mjs`]);
      const context = { Intl, Date, TextEncoder, TextDecoder };
      runInNewContext(code, context, { timeout: 5000 });
      assert.equal(context.result.count, 1);
      assert.ok(context.result.text.length > 0);
    });
  }
}

test('the full Persian browser module includes its selected calendars and no unrelated locale', async () => {
  const result = await build({ stdin: { contents: "import {CultureInfo} from '@xobin/globalization'; import {cultureData} from '@xobin/globalization/locales/fa-IR/full'; globalThis.result = CultureInfo.loadCultureInfo('fa-IR',cultureData).optionalCalendars.length;", resolveDir: root }, bundle: true, platform: 'browser', format: 'esm', charset: 'utf8', treeShaking: true, metafile: true, write: false, logLevel: 'silent' });
  const code = result.outputFiles[0].text;
  assert.ok(code.includes('HijriCalendar'));
  assert.ok(code.includes('محرم'));
  for (const unwanted of ['JapaneseCalendar', 'TaiwanCalendar', 'KoreanCalendar', 'HebrewCalendar', 'UmAlQuraCalendar']) assert.equal(code.includes(unwanted), false, unwanted);
  const locales = Object.entries(Object.values(result.metafile.outputs)[0].inputs).filter(([file, info]) => /[/\\]locales[/\\]/.test(file) && info.bytesInOutput > 0).map(([file]) => file.replaceAll('\\', '/')).sort();
  assert.deepEqual(locales, ['packages/globalization/dist/locales/fa-IR.mjs', 'packages/globalization/dist/locales/fa-IR/full.mjs']);
  const context = { Intl, Date };
  runInNewContext(code, context, { timeout: 5000 });
  assert.equal(context.result, 3);
});
