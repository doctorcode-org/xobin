import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { build } from 'esbuild';
import * as core from '@xobin/core';

const require = createRequire(import.meta.url);
for (const name of ['FormatException', 'InvalidCastException', 'SerializationException']) {
    test(`${name} resolves in ESM and CommonJS`, () => {
        for (const api of [core, require('@xobin/core')]) {
            const inner = new api.Exception('cause');
            const error = new api[name](null, inner);
            assert.equal(error.innerException, inner);
            assert.ok(error instanceof api.Exception);
        }
    });
    test(`${name} browser bundle excludes unrelated exception classes`, async () => {
        const result = await build({ stdin: { contents: `import {${name}} from '@xobin/core'; console.log(new ${name}().message);`,
            resolveDir: process.cwd() }, bundle: true, platform: 'browser', format: 'esm', treeShaking: true,
            write: false, logLevel: 'silent' });
        const output = result.outputFiles[0].text;
        for (const excluded of ['FormatException', 'InvalidCastException', 'SerializationException', 'ArgumentOutOfRangeException', 'OverflowException'].filter(value => value !== name)) {
            assert.ok(!new RegExp('(?:class|var)\\s+_?' + excluded + '\\b').test(output), excluded);
        }
    });
}
