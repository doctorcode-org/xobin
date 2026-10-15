import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { ArgumentOutOfRangeException } from '@xobin/core';
import { CultureInfo } from '@xobin/globalization';

const reference = JSON.parse(readFileSync(new URL('./date-time-format-cases.json', import.meta.url), 'utf8'));
const contracts = JSON.parse(readFileSync(new URL('./exception-contracts-cases.json', import.meta.url), 'utf8'));
const symbols = ['numberDecimalSeparator', 'negativeSign', 'positiveSign', 'naNSymbol', 'negativeInfinitySymbol', 'positiveInfinitySymbol'];
const invariantSymbols = Object.fromEntries(Object.entries(contracts.rows.find(row => row.source === 'Supplemental.ExceptionActualValue/').numberFormat)
    .map(([key, value]) => [key[0].toLowerCase() + key.slice(1), value]));
for (const [name, data] of Object.entries(reference.cultures)) {
    test(`Supplemental.ExceptionCultureSymbols/${name || 'invariant'}`, async () => {
        const culture = name ? CultureInfo.loadCultureInfo(name, (await import(`@xobin/globalization/locales/${name}`)).cultureData)
            : CultureInfo.invariantCulture;
        for (const symbol of symbols) assert.equal(culture.numberFormat[symbol], (data.localeInfo?.numberFormat ?? invariantSymbols)[symbol], symbol);
        const previous = CultureInfo.currentCulture;
        CultureInfo.currentCulture = culture;
        try {
            for (const row of contracts.rows.filter(value => value.source === 'Supplemental.ExceptionActualValue/' + name)) {
                const value = row.actualValue?.kind === 'Int64' ? BigInt(row.actualValue.value)
                    : row.actualValue?.kind === 'Double' ? Number(row.actualValue.value) : row.actualValue;
                assert.equal(new ArgumentOutOfRangeException('value', value, 'custom message').message, row.message);
            }
        } finally { CultureInfo.currentCulture = previous; }
    });
}
