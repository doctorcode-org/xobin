import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { build } from 'esbuild';
import * as core from '@xobin/core';

const require = createRequire(import.meta.url);
test('Exception resources and formatting helpers are absent from the public root API', () => {
    for (const api of [core, require('@xobin/core')]) {
        assert.equal('Arg_FormatException' in api, false);
        assert.equal('formatExceptionResource' in api, false);
        assert.equal('setExceptionNumberFormat' in api, false);
    }
});
for (const name of ['FormatException', 'InvalidCastException', 'SerializationException', 'ArgumentException', 'ArgumentNullException',
    'ArgumentOutOfRangeException', 'OverflowException', 'NullReferenceException', 'NotImplementedException', 'AmbiguousMatchException',
    'InvalidOperationException', 'IndexOutOfRangeException', 'InvalidProgramException', 'NotSupportedException', 'SystemException', 'ArithmeticException']) {
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

test('Only the selected exception resource messages remain in the browser bundle', async () => {
    const result = await build({ stdin: { contents: "import {ArgumentOutOfRangeException} from '@xobin/core'; console.log(new ArgumentOutOfRangeException('value', 42, null).message);",
        resolveDir: process.cwd() }, bundle: true, platform: 'browser', format: 'esm', treeShaking: true, write: false, logLevel: 'silent' });
    const output = result.outputFiles[0].text;
    assert.ok(output.includes('Actual value was'));
    for (const unused of ['Serialization error.', 'Input string was not in a correct format.', 'Month must be between one and twelve.',
        'Day number must be between 0 and DateOnly.MaxValue.DayNumber.', 'Negating the minimum value of a twos complement number is invalid.']) {
        assert.ok(!output.includes(unused), unused);
    }
    assert.ok(!output.includes('setExceptionNumberFormat'), 'a culture setter was retained by an exception-only consumer');
});

test('CommonJS and ESM current cultures share numeric symbols with exception constructors', async () => {
    const esm = await import('@xobin/globalization');
    for (const [globalization, api] of [[esm, core], [require('@xobin/globalization'), require('@xobin/core')]]) {
        const previous = globalization.CultureInfo.currentCulture;
        const culture = new globalization.CultureInfo('');
        culture.numberFormat.numberDecimalSeparator = ':';
        culture.numberFormat.negativeSign = 'NEG';
        globalization.CultureInfo.currentCulture = culture;
        try {
            assert.equal(new api.ArgumentOutOfRangeException('value', -1.5, null).message,
                "Specified argument was out of the range of valid values. (Parameter 'value')\r\nActual value was NEG1:5.");
            culture.numberFormat.negativeSign = 'minus';
            assert.ok(new api.ArgumentOutOfRangeException(null, -1.5, '').message.endsWith('minus1:5.'));
            const error = new globalization.CultureNotFoundException('name', 1033, null);
            assert.equal(error.invalidCultureId, 1033);
            assert.equal(error.message, "Culture is not supported. (Parameter 'name')\r\n1033 (0x0409) is an invalid culture identifier.");
        } finally { globalization.CultureInfo.currentCulture = previous; }
    }
});
