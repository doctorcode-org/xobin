import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as core from '@xobin/core';
import { CultureInfo, CultureNotFoundException } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./exception-contracts-cases.json', import.meta.url), 'utf8'));
const sources = JSON.parse(readFileSync(new URL('./exception-constructor-sources.json', import.meta.url), 'utf8'));
const types = { ...core, CultureNotFoundException };

// The reference fixture retains CLR-only operations; JavaScript deliberately omits them.
function isSupportedContract(row) {
    return row.hResultOverride == null && !row.readMessageBeforeOverride
        && !(row.type === 'InvalidCastException' && row.signature.includes('Int32'));
}

function decode(value) {
    if (value?.kind === 'Int64') return BigInt(value.value);
    if (value?.kind === 'Double') return Number(value.value);
    if (value?.kind === 'Exception') {
        return new types[value.type](value.message);
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
        assert.ok(error instanceof core.Exception);
        assert.equal(error.constructor.name, row.type);
        assert.equal(error.message, row.message);
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
    const rows = fixture.rows.filter(row => row.source === source.id && isSupportedContract(row));
    if (rows.length === 0) continue;
    test(source.id + '/constructor-contract', () => {
        assert.ok(rows.length >= source.inputCount, 'Every supported constructor input must execute.');
        rows.forEach(check);
    });
}
for (const [index, row] of fixture.rows.entries()) {
    if (!row.source.startsWith('Supplemental.') || !isSupportedContract(row)) continue;
    test(`${row.source}/${row.type}/${index}`, () => check(row));
}
test('Exception inheritance follows the reference hierarchy without CLR HRESULT state', () => {
    assert.ok(new core.OverflowException() instanceof core.ArithmeticException);
    assert.ok(new core.ArgumentException() instanceof core.SystemException);
    assert.ok(new CultureNotFoundException() instanceof core.ArgumentException);
    const error = new core.Exception();
    assert.equal('hResult' in error, false);
});
