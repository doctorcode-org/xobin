import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { CultureInfo, DateTime, DateTimeFormatInfo, GregorianCalendar } from '@xobin/globalization';
import { cultureData as enUS } from '@xobin/globalization/locales/en-US';
import { cultureData as frFR } from '@xobin/globalization/locales/fr-FR';

CultureInfo.loadCultureInfo('en-US', enUS);
CultureInfo.loadCultureInfo('fr-FR', frFR);
const fixture = JSON.parse(readFileSync(new URL('./date-time-format-info-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');

function create(input) {
  if (input === 'new') return new DateTimeFormatInfo();
  if (input === 'invariant') return DateTimeFormatInfo.invariantInfo;
  if (input === 'readOnly') return DateTimeFormatInfo.readOnly(new DateTimeFormatInfo());
  return new CultureInfo(input).dateTimeFormat;
}

function snapshot(info) {
  return Object.fromEntries(Object.keys(fixture.defaultInfo).map(key => [key,
    key === 'calendar' ? (info.calendar instanceof GregorianCalendar ? 'GregorianCalendar' : 'unsupported calendar')
      : key === 'calendarIsReadOnly' ? info.calendar.isReadOnly : info[key]]));
}

test('Supplementary DateTimeFormatInfo default construction matches .NET', () => {
  const first = new DateTimeFormatInfo();
  const second = new DateTimeFormatInfo();
  assert.deepEqual(snapshot(first), fixture.defaultInfo);
  assert.notEqual(first, second);
  assert.notEqual(first.calendar, second.calendar);
});

for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => {
    if (row.source.startsWith('DateTimeFormatInfoGetInstance.')) {
      const provider = row.input === 'provider' ? { getFormat: () => new DateTimeFormatInfo() }
        : row.input === 'en-US' ? new CultureInfo('en-US') : new DateTimeFormatInfo();
      const result = DateTimeFormatInfo.getInstance(provider);
      assert.ok(result instanceof DateTimeFormatInfo);
      assert.deepEqual(snapshot(result), row.result);
      return;
    }
    const original = create(row.input);
    const result = row.source.startsWith('DateTimeFormatInfoClone.') ? original.clone() : DateTimeFormatInfo.readOnly(original);
    assert.deepEqual(snapshot(original), row.original);
    assert.deepEqual(snapshot(result), row.result);
    assert.equal(result === original, row.same);
    assert.equal(result.calendar === original.calendar, row.sameCalendar);
  });
}

test('DateTimeFormatInfoGetFormat.GetFormat_Invoke_ReturnsExpected', () => {
  const expected = new DateTimeFormatInfo();
  assert.equal(expected.getFormat(DateTimeFormatInfo), expected);
});

test('DateTimeFormatInfoGetFormat.GetFormat_UnsupportedFormatType_ReturnsNull', () => {
  assert.equal(new DateTimeFormatInfo().getFormat(Object), null);
});

test('DateTimeFormatInfoGetInstance.GetInstance_ExpectedCurrent_ReturnsExpected', () => {
  const provider = { getFormat() { return this; } };
  assert.equal(DateTimeFormatInfo.getInstance(null), DateTimeFormatInfo.currentInfo);
  assert.equal(DateTimeFormatInfo.getInstance(provider), DateTimeFormatInfo.currentInfo);
});

function matchesError(action, row) {
  assert.throws(action, error => {
    assert.equal(error.constructor.name, row.error);
    assert.equal(error.paramName ?? null, row.paramName);
    assert.equal(error.message, row.message);
    return true;
  });
}

test('DateTimeFormatInfoReadOnly.ReadOnly_NullDtfi_ThrowsArgumentNullException', () => {
  matchesError(() => DateTimeFormatInfo.readOnly(null), fixture.errors.find(row => row.property === 'null'));
});

for (const row of fixture.errors.filter(row => row.property !== 'null')) {
  test(`Supplementary read-only mutation/${row.property}`, () => {
    const info = DateTimeFormatInfo.readOnly(new DateTimeFormatInfo());
    const key = row.property === 'AMDesignator' ? 'amDesignator'
      : row.property === 'PMDesignator' ? 'pmDesignator'
      : row.property[0].toLowerCase() + row.property.slice(1);
    matchesError(() => { info[key] = info[key]; }, row);
  });
}

test('Supplementary invariant/current identity and culture format replacement', () => {
  assert.equal(DateTimeFormatInfo.invariantInfo, DateTimeFormatInfo.invariantInfo);
  assert.equal(CultureInfo.invariantCulture.dateTimeFormat, DateTimeFormatInfo.invariantInfo);
  assert.equal(DateTimeFormatInfo.invariantInfo.calendar.isReadOnly, true);
  assert.throws(() => { CultureInfo.invariantCulture.dateTimeFormat = new DateTimeFormatInfo(); }, /Instance is read-only/);
  const previous = CultureInfo.currentCulture;
  try {
    const culture = new CultureInfo('fr-FR');
    CultureInfo.currentCulture = culture;
    assert.equal(DateTimeFormatInfo.currentInfo, culture.dateTimeFormat);
    assert.equal(DateTimeFormatInfo.getInstance(culture), culture.dateTimeFormat);
    const replacement = new DateTimeFormatInfo();
    culture.dateTimeFormat = replacement;
    assert.equal(DateTimeFormatInfo.currentInfo, replacement);
    assert.equal(DateTimeFormatInfo.getInstance(), replacement);
  } finally { CultureInfo.currentCulture = previous; }
});

test('Supplementary clone is writable and independent while array setters retain .NET reference semantics', () => {
  const original = new DateTimeFormatInfo();
  const names = original.dayNames;
  original.dayNames = names;
  const clone = original.clone();
  clone.amDesignator = 'before';
  clone.calendar.twoDigitYearMax = 2050;
  assert.equal(original.amDesignator, 'AM');
  assert.notEqual(original.calendar.twoDigitYearMax, clone.calendar.twoDigitYearMax);
  names[0] = 'custom Sunday';
  assert.equal(original.dayNames[0], 'custom Sunday');
  assert.equal(clone.dayNames[0], 'custom Sunday');
  clone.dayNames[0] = 'ignored';
  assert.equal(clone.dayNames[0], 'custom Sunday');
  const writable = DateTimeFormatInfo.invariantInfo.clone();
  assert.equal(writable.isReadOnly, false);
  assert.equal(writable.calendar.isReadOnly, false);
  writable.amDesignator = 'custom';
});

test('Supplementary providers use the type token and formatting honors the supplied instance', () => {
  const info = new DateTimeFormatInfo();
  info.shortDatePattern = "'provider' yyyy";
  const provider = { getFormat(type) { assert.equal(type, DateTimeFormatInfo); return info; } };
  assert.equal(DateTimeFormatInfo.getInstance(info), info);
  assert.equal(DateTimeFormatInfo.getInstance(provider), info);
  assert.equal(new DateTime(2024, 1, 2).toString('d', provider), 'provider 2024');
  const broken = { getFormat() { throw new Error('provider failure'); } };
  assert.throws(() => DateTimeFormatInfo.getInstance(broken), /provider failure/);
  info.getFormat = () => { throw new Error('direct instance must not query getFormat'); };
  assert.equal(DateTimeFormatInfo.getInstance(info), info);
});

test('Supplementary read-only copy protects its calendar and preserves the writable original', () => {
  const original = new DateTimeFormatInfo();
  const copy = DateTimeFormatInfo.readOnly(original);
  assert.ok(copy.calendar instanceof GregorianCalendar);
  assert.equal(original.calendar.isReadOnly, false);
  assert.throws(() => { copy.calendar.twoDigitYearMax = 2050; }, /Instance is read-only/);
  original.amDesignator = 'custom';
  assert.equal(copy.amDesignator, 'AM');
});

test('Supplementary derived format-info instances preserve their type and fields when copied', () => {
  class DerivedFormatInfo extends DateTimeFormatInfo { marker = 123; }
  const original = new DerivedFormatInfo();
  for (const copy of [original.clone(), DateTimeFormatInfo.readOnly(original)]) {
    assert.ok(copy instanceof DerivedFormatInfo);
    assert.equal(copy.marker, 123);
    assert.notEqual(copy, original);
  }
});

test('Supplementary CurrentInfo honors an inherited culture provider', () => {
  const supplied = new DateTimeFormatInfo();
  class DerivedCulture extends CultureInfo {
    getFormat(type) { return type === DateTimeFormatInfo ? supplied : super.getFormat(type); }
  }
  const previous = CultureInfo.currentCulture;
  try {
    CultureInfo.currentCulture = new DerivedCulture('en-US');
    assert.equal(DateTimeFormatInfo.currentInfo, supplied);
  } finally { CultureInfo.currentCulture = previous; }
});
