import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateOnly, TimeOnly, TimeSpan, CultureInfo, DateTimeFormatInfo } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./temporal-format-cases.json', import.meta.url), 'utf8'));
function snapshot(text, encoding) {
    const [length, tail, encoded] = text.split(':');
    const bytes = Buffer.from(encoded, 'base64');
    const prefix = encoding === 'utf8' ? Array.from(bytes) : Array.from({ length: bytes.length / 2 }, (_, i) => bytes.readUInt16LE(i * 2));
    return prefix.concat(Array(Number(length) - prefix.length).fill(Number(tail)));
}

const cultures = { '': CultureInfo.invariantCulture, current: null, fallback: { getFormat: () => null } };
for (const row of fixture.rows) for (const check of row.checks) {
    const name = check.provider;
    if (cultures[name] !== undefined || name.includes(':')) continue;
    const { cultureData } = await import(`@xobin/globalization/locales/${name}`);
    cultures[name] = CultureInfo.loadCultureInfo(name, cultureData);
}
cultures['fr-FR:dtfi'] = cultures['fr-FR'].dateTimeFormat.clone();
cultures['fr-FR:dtfi'].timeSeparator = 'changed';

function verify(row) {
    const previousCulture = CultureInfo.currentCulture;
    try {
    if (row.currentCulture) CultureInfo.currentCulture = cultures[row.currentCulture];
    assert.ok(row.checks.length > 0, row.source);
    for (const [index, check] of row.checks.entries()) {
        const context = `${row.source}/${index}/${check.type}/${check.format}`;
        const value = check.type === 'DateOnly' ? DateOnly.fromDayNumber(Number(check.value))
            : check.type === 'TimeOnly' ? new TimeOnly(BigInt(check.value)) : new TimeSpan(BigInt(check.value));
        const provider = cultures[check.provider];
        let buffer, written;
        if (check.operation === 'tryFormat') {
            buffer = check.encoding === 'utf8' ? Uint8Array.from(snapshot(check.initial, 'utf8')) : Uint16Array.from(snapshot(check.initial, 'utf16'));
            written = { result: -999 };
        }
        const invoke = () => {
            switch (check.operation) {
                case 'tryFormat': return value.tryFormat(buffer, written, check.format, provider);
                case 'default': return value.toString();
                case 'format': return value.toString(check.format);
                case 'provider': return value.toString(provider);
                case 'long': return value[check.type === 'DateOnly' ? 'toLongDateString' : 'toLongTimeString']();
                case 'short': return value[check.type === 'DateOnly' ? 'toShortDateString' : 'toShortTimeString']();
                default: return value.toString(check.format, provider);
            }
        };
        if (check.error) {
            assert.throws(invoke, error => {
                assert.equal(error.constructor.name, check.error.type, context);
                assert.equal(error.message, check.error.message, context);
                assert.equal(error.paramName ?? null, check.error.paramName, context);
                assert.equal(error.actualValue ?? null, check.error.actualValue, context);
                return true;
            });
        } else {
            assert.equal(invoke(), check.result, context);
            if (buffer) {
                assert.equal(written.result, check.written, context);
                assert.deepEqual(Array.from(buffer), snapshot(check.buffer, check.encoding), context);
                // The character-array adaptation uses the same UTF-16 code units as Span<char>.
                if (check.encoding === 'utf16') {
                    const chars = snapshot(check.initial, 'utf16').map(code => String.fromCharCode(code));
                    const count = { result: -999 };
                    assert.equal(value.tryFormat(chars, count, check.format, provider), check.result, context);
                    assert.equal(count.result, check.written, context);
                    assert.deepEqual(chars.map(char => char.charCodeAt(0)), snapshot(check.buffer, 'utf16'), context);
                }
            }
        }
    }
    } finally { CultureInfo.currentCulture = previousCulture; }
}
for (const [index, row] of fixture.rows.entries()) test(`${row.source}/${index}`, () => verify(row));

test('DateOnlyTests.TryFormatTest', () => verify(fixture.rows.find(row => row.source === 'DateOnlyTests.TryFormatTest')));
test('TimeOnlyTests.TryFormatTest', () => verify(fixture.rows.find(row => row.source === 'TimeOnlyTests.TryFormatTest')));
test('TimeSpanTests.ToString_Valid', () => fixture.rows.filter(row => row.source === 'TimeSpanTests.ToString_Valid').forEach(verify));
test('TimeSpanTests.ToString_InvalidFormat_ThrowsFormatException', () => fixture.rows.filter(row => row.source === 'TimeSpanTests.ToString_InvalidFormat_ThrowsFormatException').forEach(verify));
test('TimeSpanTests.TryFormat_Valid', () => fixture.rows.filter(row => row.source === 'TimeSpanTests.TryFormat_Valid').forEach(verify));
test('TimeSpanTests.TryFormat_InvalidFormat_ThrowsFormatException', () => fixture.rows.filter(row => row.source === 'TimeSpanTests.TryFormat_InvalidFormat_ThrowsFormatException').forEach(verify));

test('TimeSpan general formats retain culture decimal separator after NumberFormat mutation', () => {
    for (const name of ['fr-FR', 'fa-IR', 'en-US']) {
        const culture = new CultureInfo(name);
        const span = new TimeSpan(-123456789101112n);
        const expected = span.toString('g', culture);
        culture.numberFormat.numberDecimalSeparator = 'invented';
        culture.numberFormat.negativeSign = 'invented';
        culture.dateTimeFormat.timeSeparator = 'invented';
        assert.equal(span.toString('g', culture), expected);
        assert.equal(span.toString('g', culture.dateTimeFormat.clone()), expected);
        assert.equal(span.toString('g', DateTimeFormatInfo.readOnly(culture.dateTimeFormat)), expected);
    }
});


test('Invariant standard formats ignore providers while culture and custom formats resolve DateTimeFormatInfo', () => {
    let calls = 0;
    const provider = { getFormat(type) { calls++; assert.equal(type, DateTimeFormatInfo); return cultures['fr-FR'].dateTimeFormat; } };
    const date = new DateOnly(2024, 2, 29), time = new TimeOnly(123456789n), span = new TimeSpan(123456789n);
    for (const value of [date, time]) for (const format of ['O', 'R']) {
        value.toString(format, provider);
        value.tryFormat(new Uint8Array(30), { result: 0 }, format, provider);
    }
    span.toString('c', provider);
    span.tryFormat(new Uint8Array(30), { result: 0 }, 'c', provider);
    assert.equal(calls, 0);
    for (const [value, format] of [[date, 'D'], [time, 'T'], [span, 'g'], [span, 'hh\\:mm']]) {
        const previous = calls;
        value.toString(format, provider);
        assert.equal(calls, previous + 1);
    }
});
