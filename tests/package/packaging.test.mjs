import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const require = createRequire(import.meta.url);
const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

async function bundle(source) {
  const result = await build({
    stdin: {
      contents: source,
      resolveDir: repositoryRoot,
      sourcefile: 'consumer.mjs',
      loader: 'js',
    },
    bundle: true,
    format: 'esm',
    platform: 'browser',
    treeShaking: true,
    write: false,
    logLevel: 'silent',
  });
  return result.outputFiles[0].text;
}

test('CommonJS and ESM resolve the public package entry', async () => {
  const commonjs = require('@xobin/globalization');
  const esm = await import('@xobin/globalization');
  const commonjsTimeSpan = require('@xobin/globalization/time-span');
  const esmTimeSpan = await import('@xobin/globalization/time-span');
  for (const api of [commonjs, esm]) {
    assert.equal(typeof api.TimeSpan, 'function');
    assert.equal(typeof api.DateTime, 'function');
    assert.equal(typeof api.PersianCalendar, 'function');
  }
  assert.equal(commonjs.TimeSpan, commonjsTimeSpan.TimeSpan);
  assert.equal(esm.TimeSpan, esmTimeSpan.TimeSpan);
  for (const [name, path] of [['DateOnly', 'date-only'], ['TimeOnly', 'time-only']]) {
    const direct = await import(`@xobin/globalization/${path}`);
    assert.equal(esm[name], direct[name]);
    assert.equal(commonjs[name], require(`@xobin/globalization/${path}`)[name]);
  }
});

test('the existing locale path still resolves', () => {
  const { cultureData } = require('@xobin/globalization/locales/fa-IR');
  assert.equal(cultureData.name, 'fa-IR');
});

test('an ESM consumer can import a locale', async () => {
  const { cultureData } = await import('@xobin/globalization/locales/fa-IR');
  assert.equal(cultureData.name, 'fa-IR');
});

test('the application locale import resolves to the same module in both formats', async () => {
  const canonical = await import('@xobin/globalization/locales/fa-IR');
  const application = await import('@xobin/globalization/dist/locales/fa-IR');
  assert.equal(application.cultureData, canonical.cultureData);
  assert.equal(require('@xobin/globalization/dist/locales/fa-IR').cultureData,
    require('@xobin/globalization/locales/fa-IR').cultureData);
});

test('both packages publish declarations for CommonJS and ESM', async () => {
  for (const packageName of ['core', 'globalization']) {
    const dist = path.join(repositoryRoot, 'packages', packageName, 'dist');
    for (const file of ['index.d.ts', 'index.d.mts']) {
      assert.ok((await stat(path.join(dist, file))).size > 0);
    }
  }
  const declarations = await readFile(
    path.join(repositoryRoot, 'packages/globalization/dist/index.d.ts'),
    'utf8',
  );
  assert.match(declarations, /TimeSpan/);
  assert.match(declarations, /PersianCalendar/);
});

test('a TimeSpan-only consumer bundle excludes DateTime and calendars', async () => {
  const output = await bundle(
    "import { TimeSpan } from '@xobin/globalization'; globalThis.value = new TimeSpan(1n);",
  );
  assert.match(output, /TimeSpan/);
  for (const unused of ['DateTime', 'DateOnly', 'TimeOnly', 'PersianCalendar', 'GregorianCalendar', 'ThaiBuddhistCalendar', 'UmAlQuraCalendar', 'CultureInfo', 'Iran Standard Time', 'Pacific Standard Time']) {
    if (unused === 'DateTime') assert.doesNotMatch(output, /\b(?:class|function|var|let|const)\s+_?DateTime\b/, `${unused} remained in the TimeSpan bundle`);
    else assert.equal(output.includes(unused), false, `${unused} remained in the TimeSpan bundle`);
  }
  assert.equal(output.includes('var require_dist = __commonJS'), false, 'the CommonJS core bundle remained in the ESM output');
});

test('a PersianCalendar-only consumer bundle excludes other calendars', async () => {
  const output = await bundle(
    "import { PersianCalendar } from '@xobin/globalization'; globalThis.value = new PersianCalendar();",
  );
  assert.match(output, /PersianCalendar/);
  for (const unused of ['ThaiBuddhistCalendar', 'UmAlQuraCalendar']) {
    assert.equal(output.includes(unused), false, `${unused} remained in the PersianCalendar bundle`);
  }
});

test('a DateTime-only consumer bundle excludes culture classes and calendar implementations', async () => {
  const output = await bundle("import { DateTime } from '@xobin/globalization'; globalThis.value = new DateTime(1n).toString('O');");
  for (const unused of ['CultureInfo', 'GregorianCalendar', 'PersianCalendar', 'ThaiBuddhistCalendar', 'UmAlQuraCalendar']) {
    assert.equal(output.includes(unused), false, `${unused} remained in the DateTime bundle`);
  }
  for (const unused of ['Iran Standard Time', 'Pacific Standard Time', 'windowsTimeZones', 'windowsTimeZoneAliases']) {
    assert.equal(output.includes(unused), false, `${unused} remained in the DateTime bundle`);
  }
});

test('a ThaiBuddhistCalendar-only consumer bundle excludes unrelated calendars', async () => {
  const output = await bundle(
    "import { ThaiBuddhistCalendar } from '@xobin/globalization'; globalThis.value = new ThaiBuddhistCalendar();",
  );
  assert.match(output, /ThaiBuddhistCalendar/);
  for (const unused of ['PersianCalendar', 'UmAlQuraCalendar']) {
    assert.equal(output.includes(unused), false, `${unused} remained in the ThaiBuddhistCalendar bundle`);
  }
});

test('an UmAlQuraCalendar-only consumer bundle excludes unrelated calendars', async () => {
  const output = await bundle(
    "import { UmAlQuraCalendar } from '@xobin/globalization'; globalThis.value = new UmAlQuraCalendar();",
  );
  assert.match(output, /UmAlQuraCalendar/);
  for (const unused of ['PersianCalendar', 'ThaiBuddhistCalendar']) {
    assert.equal(output.includes(unused), false, `${unused} remained in the UmAlQuraCalendar bundle`);
  }
});

test('an ESM locale bundle excludes CommonJS and unrelated calendars', async () => {
  const output = await bundle(
    "import { cultureData } from '@xobin/globalization/locales/fa-IR'; globalThis.value = cultureData;",
  );
  assert.match(output, /PersianCalendar/);
  for (const unused of ['ThaiBuddhistCalendar', 'UmAlQuraCalendar', 'var require_dist = __commonJS']) {
    assert.equal(output.includes(unused), false, `${unused} remained in the locale bundle`);
  }
});

test('loading one browser culture includes only its locale module', async () => {
  const result = await build({
    stdin: {
      contents: "import { CultureInfo } from '@xobin/globalization'; import { cultureData } from '@xobin/globalization/locales/fa-IR'; globalThis.culture = CultureInfo.loadCultureInfo('fa-IR', cultureData);",
      resolveDir: repositoryRoot,
      loader: 'js',
    },
    bundle: true,
    format: 'esm',
    platform: 'browser',
    treeShaking: true,
    write: false,
    metafile: true,
    logLevel: 'silent',
  });
  const locales = Object.keys(result.metafile.inputs).filter(file => file.includes('/dist/locales/'));
  assert.deepEqual(locales, ['packages/globalization/dist/locales/fa-IR.mjs']);
  const output = result.outputFiles[0].text;
  for (const unused of ['ThaiBuddhistCalendar', 'UmAlQuraCalendar']) {
    assert.equal(output.includes(unused), false, `${unused} remained in the culture loader bundle`);
  }
});

test('a literal dynamic locale import creates a separate browser chunk', async () => {
  const result = await build({
    stdin: {
      contents: "import { CultureInfo } from '@xobin/globalization'; globalThis.loadCulture = async () => { const { cultureData } = await import('@xobin/globalization/locales/fa-IR'); return CultureInfo.loadCultureInfo('fa-IR', cultureData); };",
      resolveDir: repositoryRoot,
      loader: 'js',
    },
    bundle: true,
    format: 'esm',
    platform: 'browser',
    treeShaking: true,
    splitting: true,
    outdir: 'browser-culture-analysis',
    write: false,
    metafile: true,
    logLevel: 'silent',
  });
  const localeChunk = Object.values(result.metafile.outputs).find(output =>
    output.entryPoint === 'packages/globalization/dist/locales/fa-IR.mjs');
  assert.ok(localeChunk, 'the requested culture must have its own dynamic entry');
  const locales = Object.keys(result.metafile.inputs).filter(file => file.includes('/dist/locales/'));
  assert.deepEqual(locales, ['packages/globalization/dist/locales/fa-IR.mjs']);
});

for (const [name, subpath] of [['JulianCalendar', 'julian-calendar'], ['JapaneseCalendar', 'japanese-calendar'], ['TaiwanCalendar', 'taiwan-calendar'], ['KoreanCalendar', 'korean-calendar'], ['HijriCalendar', 'hijri-calendar'], ['HebrewCalendar', 'hebrew-calendar']]) {
  test(name + ' resolves from ESM and CommonJS subpaths and excludes unrelated calendars', async () => {
    const root = await import('@xobin/globalization');
    const direct = await import('@xobin/globalization/' + subpath);
    assert.strictEqual(root[name], direct[name]);
    assert.strictEqual(require('@xobin/globalization')[name], require('@xobin/globalization/' + subpath)[name]);
    const output = await bundle("import { " + name + " } from '@xobin/globalization/" + subpath + "'; globalThis.value = new " + name + "();");
    for (const other of ['JulianCalendar', 'JapaneseCalendar', 'TaiwanCalendar', 'KoreanCalendar', 'HijriCalendar', 'HebrewCalendar', 'PersianCalendar', 'ThaiBuddhistCalendar', 'UmAlQuraCalendar']) {
      if (other !== name) assert.equal(output.includes(other), false, other + ' remained in the ' + name + ' bundle');
    }
  });
}

test('a full Japanese culture includes its optional calendar and excludes other calendar data', async () => {
  const output = await bundle("import { CultureInfo } from '@xobin/globalization'; import { cultureData } from '@xobin/globalization/locales/ja-JP/full'; CultureInfo.loadCultureInfo('ja-JP', cultureData); globalThis.value = new CultureInfo('ja-JP').optionalCalendars;");
  assert.match(output, /JapaneseCalendar/);
  for (const other of ['HebrewCalendar', 'HijriCalendar', 'KoreanCalendar', 'TaiwanCalendar', 'PersianCalendar', 'UmAlQuraCalendar']) assert.equal(output.includes(other), false);
});
