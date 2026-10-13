import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as core from '@xobin/core';
import { CultureInfo, CultureNotFoundException } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./exception-contracts-cases.json', import.meta.url), 'utf8'));
const sources = JSON.parse(readFileSync(new URL('./exception-constructor-sources.json', import.meta.url), 'utf8'));
const types = { ...core, CultureNotFoundException };
function decode(value) {
    if (value?.kind === 'Int64') return BigInt(value.value);
    if (value?.kind === 'Double') return Number(value.value);
    if (value?.kind === 'Exception') {
        const error = new types[value.type](value.message);
        error.hResult = value.hResult;
        return error;
    }
    return value;
}
function check(row) {
    const previous = CultureInfo.currentCulture;
    const culture = new CultureInfo('');
    for (const [key, value] of Object.entries(row.numberFormat)) {
        culture.numberFormat[key[0].toLowerCase() + key.slice(1)] = value;
    }
    CultureInfo.currentCulture = culture;
    try {
        const args = row.args.map(decode);
        const error = new types[row.type](...args);
        if (row.readMessageBeforeOverride) void error.message;
        if (row.hResultOverride != null) error.hResult = row.hResultOverride;
        assert.ok(error instanceof core.Exception);
        assert.equal(error.constructor.name, row.type);
        assert.equal(error.message, row.message);
        assert.equal(error.hResult, row.hResult);
        assert.equal(error.paramName ?? null, row.paramName);
        assert.equal(error.actualValue ?? null, decode(row.actualValue));
        assert.equal(error.invalidCultureName ?? null, row.invalidCultureName);
        assert.equal(error.invalidCultureId ?? null, row.invalidCultureId);
        assert.equal(error.innerException?.message ?? null, row.innerMessage);
        const innerIndex = row.signature.indexOf('Exception');
        assert.equal(error.innerException, innerIndex < 0 ? null : args[innerIndex]);
    } finally { CultureInfo.currentCulture = previous; }
}
for (const source of sources.constructors) {
    test(source.id + '/constructor-contract', () => {
        const rows = fixture.rows.filter(row => row.source === source.id);
        assert.ok(rows.length >= source.inputCount, 'Every official constructor input must execute.');
        rows.forEach(check);
    });
}
for (const [index, row] of fixture.rows.entries()) {
    if (!row.source.startsWith('Supplemental.')) continue;
    test(`${row.source}/${row.type}/${index}`, () => check(row));
}
test('Exception inheritance and writable HRESULT follow the reference hierarchy', () => {
    assert.ok(new core.OverflowException() instanceof core.ArithmeticException);
    assert.ok(new core.ArgumentException() instanceof core.SystemException);
    assert.ok(new CultureNotFoundException() instanceof core.ArgumentException);
    const error = new core.Exception();
    error.hResult = -42;
    assert.equal(error.hResult, -42);
});
