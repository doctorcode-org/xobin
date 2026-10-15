import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test, { before, after } from 'node:test';
import { DateTime, DateTimeKind, CultureInfo, GregorianCalendar, ThaiBuddhistCalendar, PersianCalendar, UmAlQuraCalendar } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-format-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.timeZone, 'UTC');
const previousZone = process.env.TZ;
before(() => { process.env.TZ = 'UTC'; });
after(() => {
  if (previousZone === undefined) delete process.env.TZ;
  else process.env.TZ = previousZone;
});
const calendars = { GregorianCalendar, ThaiBuddhistCalendar, PersianCalendar, UmAlQuraCalendar };
const cultures = {};
for (const [name, data] of Object.entries(fixture.cultures)) {
  if (!name) cultures[name] = CultureInfo.invariantCulture;
  else cultures[name] = CultureInfo.loadCultureInfo(name, {
    ...CultureInfo.invariantCulture, parent: '', name,
    calendar: data.calendar === 'GregorianCalendar' ? new GregorianCalendar(data.calendarId) : new calendars[data.calendar](),
    dateTimeFormat: data.formatInfo,
    // Ordinary formatting needs the default calendar and Gregorian data for 'U'.
    calendarFormats: Object.fromEntries(Object.entries(data.calendarFormats)
      .filter(([id]) => Number(id) === data.calendarId || Number(id) === 1)),
  });
}

test('DateTimeFormat.SupplementalReferenceMatrix', () => {
  const failures = [];
  for (const row of fixture.supplemental) {
    try {
      const date = new DateTime(BigInt(row.ticks), kinds[row.kind]);
      const invoke = () => date.toString(row.format, cultures[row.culture]);
      if (row.error) assert.throws(invoke, error => {
        assert.equal(error.constructor.name, row.error);
        assert.equal(error.paramName ?? null, row.paramName);
        assert.equal(error.message, row.message);
        return true;
      });
      else assert.equal(invoke(), row.result);
    } catch (error) { failures.push(`${row.culture}/${row.ticks}/${row.kind}/${JSON.stringify(row.format)}: ${error.message}`); }
  }
  assert.equal(failures.length, 0, failures.slice(0, 20).join('\n'));
});
const kinds = [DateTimeKind.unspecified, DateTimeKind.utc, DateTimeKind.local];
for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => {
    const date = new DateTime(BigInt(row.ticks), kinds[row.kind]);
    if (row.source.includes('TryFormat')) verifyTryFormat(date, row.format, cultures[row.culture], row.result);
    else assert.equal(date.toString(row.format, cultures[row.culture]), row.result);
  });
}

test('DateTimeTests.ToLongDateString_Invoke_ReturnsExpected', () => {
  const date = DateTime.now;
  assert.equal(date.toLongDateString(), date.toString('D'));
});

function verifyTryFormat(date, format, culture, expected) {
  for (const Buffer of [Array, Uint16Array, Uint8Array]) {
    const length = Buffer === Uint8Array ? new TextEncoder().encode(expected).length : expected.length;
    for (const extra of [-1, 0, 1]) {
      const destination = Buffer === Array ? new Array(length + extra).fill('\0') : new Buffer(length + extra);
      const written = { result: -1 };
      assert.equal(date.tryFormat(destination, written, format, culture), extra >= 0);
      assert.equal(written.result, extra < 0 ? 0 : length);
      if (extra < 0) continue;
      const output = Buffer === Uint8Array ? new TextDecoder().decode(destination.subarray(0, length))
        : Buffer === Array ? destination.slice(0, length).join('') : String.fromCharCode(...destination.subarray(0, length));
      assert.equal(output, expected);
      if (extra === 1) assert.equal(destination[length], Buffer === Array ? '\0' : 0);
    }
  }
}

test('DateTimeFormat.BuiltLocaleDataAndCurrentCulture', async () => {
  const previous = CultureInfo.currentCulture;
  try {
    for (const name of Object.keys(fixture.cultures).filter(Boolean)) {
      const { cultureData } = await import(`@xobin/globalization/locales/${name}`);
      const culture = CultureInfo.loadCultureInfo(name, cultureData);
      assert.equal('gregorianDateTimeFormat' in culture, false);
      CultureInfo.currentCulture = culture;
      for (const row of fixture.supplemental.filter(row => row.culture === name && !row.error && BigInt(row.ticks) > 0n)) {
        const date = new DateTime(BigInt(row.ticks), kinds[row.kind]);
        assert.equal(date.toString(row.format), row.result, `${name}/${row.format}`);
      }
    }
  } finally { CultureInfo.currentCulture = previous; }
});
test('DateTimeTests.ToLongTimeString_Invoke_ReturnsExpected', () => {
  const date = DateTime.now;
  assert.equal(date.toLongTimeString(), date.toString('T'));
});

test('DateTimeFormat.CustomFullDateTimePatternsReference', () => {
  for (const row of fixture.customFormats) {
    const culture = new CultureInfo(row.culture);
    culture.dateTimeFormat.fullDateTimePattern = row.pattern;
    const date = new DateTime(BigInt(row.ticks), kinds[row.kind]);
    assert.equal(date.toString(row.format, culture), row.result, `${row.culture}/${row.format}/${row.pattern}`);
  }
});

test('CultureInfo.LoadedInstancesHaveIndependentFormatAndCalendarState', async () => {
  const { cultureData } = await import('@xobin/globalization/locales/fa-IR');
  const first = CultureInfo.loadCultureInfo('fa-IR', cultureData);
  const second = new CultureInfo('fa-IR');
  const original = cultureData.dateTimeFormat.shortDatePattern;
  first.dateTimeFormat.shortDatePattern = 'yyyy';
  first.dateTimeFormat.monthNames[0] = 'changed';
  first.numberFormat.numberGroupSizes[0] = 1;
  first.calendar.twoDigitYearMax = 1400;
  assert.equal(second.dateTimeFormat.shortDatePattern, original);
  assert.equal(cultureData.dateTimeFormat.shortDatePattern, original);
  assert.equal(second.dateTimeFormat.monthNames[0], cultureData.dateTimeFormat.monthNames[0]);
  assert.equal(second.numberFormat.numberGroupSizes[0], cultureData.numberFormat.numberGroupSizes[0]);
  assert.equal(second.calendar.twoDigitYearMax, cultureData.calendar.twoDigitYearMax);
  assert.notEqual(first.calendar, second.calendar);
});
test('DateTimeTests.ToShortDateString_Invoke_ReturnsExpected', () => {
  const date = DateTime.now;
  assert.equal(date.toShortDateString(), date.toString('d'));
});
test('DateTimeTests.ToShortTimeString_Invoke_ReturnsExpected', () => {
  const date = DateTime.now;
  assert.equal(date.toShortTimeString(), date.toString('t'));
});

test('DateTimeFormat.GetAllFormatsReferenceMatrix', () => {
  for (const row of fixture.allFormats) {
    const date = new DateTime(BigInt(row.ticks), kinds[row.kind]);
    const invoke = () => row.format == null ? date.getDateTimeFormats(cultures[row.culture])
      : date.getDateTimeFormats(row.format, cultures[row.culture]);
    if (row.error) assert.throws(invoke, error => {
      assert.equal(error.constructor.name, row.error);
      assert.equal(error.message, row.message);
      return true;
    });
    else assert.deepEqual(invoke(), row.result, `${row.culture}/${row.kind}/${row.format}`);
  }
});

test('DateTimeTests.GetDateTimeFormats_FormatSpecifier_InvalidFormat', () => {
  const date = new DateTime(2009, 7, 28, 5, 23, 15);
  assert.throws(() => date.getDateTimeFormats('x'), error => error.constructor.name === 'FormatException');
});
