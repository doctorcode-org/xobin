import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { CultureInfo, DateTimeFormatInfo, DateTime, DateTimeKind, GregorianCalendar, ThaiBuddhistCalendar, PersianCalendar, UmAlQuraCalendar } from '@xobin/globalization';
import { cultureData as locale0 } from '@xobin/globalization/locales/en-US';
import { cultureData as locale1 } from '@xobin/globalization/locales/fr-FR';
import { cultureData as locale2 } from '@xobin/globalization/locales/ru-RU';
import { cultureData as locale3 } from '@xobin/globalization/locales/fa-IR';
import { cultureData as locale4 } from '@xobin/globalization/locales/ar-SA';
import { cultureData as locale5 } from '@xobin/globalization/locales/th-TH';
import { cultureData as locale6 } from '@xobin/globalization/locales/br-FR';
CultureInfo.loadCultureInfo('en-US', locale0);
CultureInfo.loadCultureInfo('fr-FR', locale1);
CultureInfo.loadCultureInfo('ru-RU', locale2);
CultureInfo.loadCultureInfo('fa-IR', locale3);
CultureInfo.loadCultureInfo('ar-SA', locale4);
CultureInfo.loadCultureInfo('th-TH', locale5);
CultureInfo.loadCultureInfo('br-FR', locale6);

const fixture = JSON.parse(readFileSync(new URL('./date-time-format-properties-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
const facts = new Set([
  "DateTimeFormatInfoAMDesignator.AMDesignator_GetInvariantInfo_ReturnsExpected",
  "DateTimeFormatInfoAMDesignator.AMDesignator_SetNullValue_ThrowsArgumentNullException",
  "DateTimeFormatInfoAMDesignator.AMDesignator_SetReadOnly_ThrowsInvalidOperationException",
  "DateTimeFormatInfoPMDesignator.PMDesignator_GetInvariantInfo_ReturnsExpected",
  "DateTimeFormatInfoPMDesignator.PMDesignator_SetNullValue_ThrowsArgumentNullException",
  "DateTimeFormatInfoPMDesignator.PMDesignator_SetReadOnly_ThrowsInvalidOperationException",
  "DateTimeFormatInfoFirstDayOfWeek.FirstDayOfWeek_SetReadOnly_ThrowsInvalidOperationException",
  "DateTimeFormatInfoCalendarWeekRule.CalendarWeekRule_SetReadOnly_ThrowsInvalidOperationException",
  "DateTimeFormatInfoCalendar.Calendar_GetInvariantInfo_ReturnsExpected",
  "DateTimeFormatInfoCalendar.Calendar_Set_GetReturnsExpected",
  "DateTimeFormatInfoCalendar.Calendar_SetNullValue_ThrowsArgumentNullException",
  "DateTimeFormatInfoCalendar.Calendar_SetInvalidValue_ThrowsArgumentOutOfRangeException",
  "DateTimeFormatInfoCalendar.Calendar_SetReadOnly_ThrowsInvalidOperationException"
]);
function property(name) {
  return name === 'AMDesignator' ? 'amDesignator' : name === 'PMDesignator' ? 'pmDesignator' : name[0].toLowerCase() + name.slice(1);
}
function calendar(id) {
  if (id === 7) return new ThaiBuddhistCalendar();
  if (id === 22) return new PersianCalendar();
  if (id === 23) return new UmAlQuraCalendar();
  return new GregorianCalendar(id);
}
function create(culture) {
  return culture === 'invariant' ? DateTimeFormatInfo.invariantInfo
    : culture === 'new' ? new DateTimeFormatInfo() : new CultureInfo(culture).dateTimeFormat;
}
function checkError(invoke, row, actual) {
  assert.throws(invoke, error => {
    assert.equal(error.constructor.name, row.error);
    assert.equal(error.paramName ?? null, row.paramName);
    assert.equal(error.message, row.message);
    if (row.actualValue != null) {
      assert.equal(error.actualValue, actual);
      assert.equal(typeof actual === 'object' ? String(error.actualValue) : error.actualValue, row.actualValue);
    }
    return true;
  });
}
function run(row) {
  assert.ok(row);
  const info = create(row.culture);
  const key = property(row.property);
  const assigned = row.property === 'Calendar' && row.value != null ? calendar(row.value) : row.value;
  const invoke = () => {
    if (row.action !== 'get') info[key] = assigned;
    if (row.action === 'setTwice') info[key] = assigned;
    if (key === 'calendar') return {
      type: info.calendar.toString().split('.').at(-1),
      isReadOnly: info.calendar.isReadOnly,
      same: info.calendar === assigned,
    };
    return info[key];
  };
  if (row.error) checkError(invoke, row, assigned);
  else assert.deepEqual(invoke(), row.result);
}

test('DateTimeFormatInfoAMDesignator.AMDesignator_GetInvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAMDesignator.AMDesignator_GetInvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoAMDesignator.AMDesignator_SetNullValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAMDesignator.AMDesignator_SetNullValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoAMDesignator.AMDesignator_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAMDesignator.AMDesignator_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoPMDesignator.PMDesignator_GetInvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoPMDesignator.PMDesignator_GetInvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoPMDesignator.PMDesignator_SetNullValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoPMDesignator.PMDesignator_SetNullValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoPMDesignator.PMDesignator_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoPMDesignator.PMDesignator_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoFirstDayOfWeek.FirstDayOfWeek_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoFirstDayOfWeek.FirstDayOfWeek_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoCalendarWeekRule.CalendarWeekRule_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoCalendarWeekRule.CalendarWeekRule_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoCalendar.Calendar_GetInvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoCalendar.Calendar_GetInvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoCalendar.Calendar_Set_GetReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoCalendar.Calendar_Set_GetReturnsExpected')));

test('DateTimeFormatInfoCalendar.Calendar_SetNullValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoCalendar.Calendar_SetNullValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoCalendar.Calendar_SetInvalidValue_ThrowsArgumentOutOfRangeException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoCalendar.Calendar_SetInvalidValue_ThrowsArgumentOutOfRangeException')));

test('DateTimeFormatInfoCalendar.Calendar_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoCalendar.Calendar_SetReadOnly_ThrowsInvalidOperationException')));

for (const [index, row] of fixture.rows.entries()) {
  if (!facts.has(row.source)) test(`${row.source}/${index}`, () => run(row));
}
function customize(info) {
  info.amDesignator = 'custom AM'; info.pmDesignator = 'custom PM';
  info.firstDayOfWeek = 3; info.calendarWeekRule = 1;
  info.dateSeparator = 'custom date'; info.timeSeparator = 'custom time';
  info.longDatePattern = "'custom long date' yyyy"; info.shortDatePattern = "'custom short date' yyyy";
  info.monthDayPattern = "'custom month day' MM dd"; info.yearMonthPattern = "'custom year month' yyyy MM";
  info.longTimePattern = "'custom long time' HH:mm:ss"; info.shortTimePattern = "'custom short time' HH:mm";
  info.fullDateTimePattern = "'custom full' yyyy";
  for (const name of ['DayNames', 'AbbreviatedDayNames', 'ShortestDayNames', 'MonthNames', 'MonthGenitiveNames', 'AbbreviatedMonthNames', 'AbbreviatedMonthGenitiveNames']) {
    const key = property(name);
    const names = info[key];
    names[0] = 'custom ' + name;
    info[key] = names;
  }
}
function snapshot(info, expected) {
  const date = new DateTime(2024, 3, 20, 13, 14, 15, DateTimeKind.utc);
  return Object.fromEntries(Object.keys(expected).map(key => [key,
    key === 'calendar' ? info.calendar.toString().split('.').at(-1)
      : key === 'formats' ? Object.fromEntries(Object.keys(expected.formats).map(format => [format, date.toString(format, info)]))
      : info[key],
  ]));
}
for (const row of fixture.transitions) {
  test(`Supplementary calendar transition/${row.culture}/${row.calendarId}`, () => {
    const info = create(row.culture).clone();
    customize(info);
    const assigned = calendar(row.calendarId);
    const invoke = () => { info.calendar = assigned; };
    if (row.error) checkError(invoke, row, assigned);
    else invoke();
    assert.equal(info.calendar === assigned, row.sameCalendar);
    assert.deepEqual(snapshot(info, row.result), row.result);
  });
}
test('Supplementary same calendar instance preserves customized information', () => {
  const info = new DateTimeFormatInfo();
  customize(info);
  const original = info.calendar;
  info.calendar = original;
  assert.equal(info.calendar, original);
  assert.deepEqual(snapshot(info, fixture.sameObject), fixture.sameObject);
});
test('Supplementary failed calendar assignment leaves the writable instance unchanged', () => {
  const info = new DateTimeFormatInfo();
  const original = info.calendar;
  info.shortDatePattern = 'yyyy';
  assert.throws(() => { info.calendar = new PersianCalendar(); });
  assert.equal(info.calendar, original);
  assert.equal(info.shortDatePattern, 'yyyy');
  info.calendar = new GregorianCalendar();
  assert.equal(info.shortDatePattern, 'MM/dd/yyyy');
});
test('Supplementary cloned calendar data remains available after read-only wrapping', () => {
  const original = new CultureInfo('fa-IR').dateTimeFormat;
  const clone = DateTimeFormatInfo.readOnly(original).clone();
  clone.calendar = new GregorianCalendar();
  assert.equal(original.calendar.toString(), 'System.Globalization.PersianCalendar');
  assert.equal(clone.calendar.toString(), 'System.Globalization.GregorianCalendar');
  assert.equal(clone.isReadOnly, false);
});
