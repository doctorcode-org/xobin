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
});

test('the existing locale path still resolves', () => {
  const { cultureData } = require('@xobin/globalization/locales/fa-IR');
  assert.equal(cultureData.name, 'fa-IR');
});

test('an ESM consumer can import a locale', async () => {
  const { cultureData } = await import('@xobin/globalization/locales/fa-IR');
  assert.equal(cultureData.name, 'fa-IR');
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
  for (const unused of ['DateTime', 'PersianCalendar', 'GregorianCalendar', 'ThaiBuddhistCalendar', 'UmAlQuraCalendar', 'CultureInfo']) {
    assert.equal(output.includes(unused), false, `${unused} remained in the TimeSpan bundle`);
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

test('a ThaiBuddhistCalendar-only consumer bundle excludes unrelated calendars', async () => {
  const output = await bundle(
    "import { ThaiBuddhistCalendar } from '@xobin/globalization'; globalThis.value = new ThaiBuddhistCalendar();",
  );
  assert.match(output, /ThaiBuddhistCalendar/);
  for (const unused of ['PersianCalendar', 'UmAlQuraCalendar']) {
    assert.equal(output.includes(unused), false, `${unused} remained in the ThaiBuddhistCalendar bundle`);
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
