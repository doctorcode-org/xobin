import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTimeFormatInfo, CultureInfo, DateTime } from '@xobin/globalization';
import { cultureData as en } from '@xobin/globalization/locales/en-US';
import { cultureData as fr } from '@xobin/globalization/locales/fr-FR';
import { cultureData as ru } from '@xobin/globalization/locales/ru-RU';
CultureInfo.loadCultureInfo('ru-RU', ru);
CultureInfo.loadCultureInfo('en-US', en);
CultureInfo.loadCultureInfo('fr-FR', fr);
const fixture = JSON.parse(readFileSync(new URL('./date-time-format-month-names-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
function run(row) {
  const info = row.culture === 'new' ? new DateTimeFormatInfo() : row.culture === 'invariant' ? DateTimeFormatInfo.invariantInfo : new CultureInfo(row.culture).dateTimeFormat;
  const key = row.property[0].toLowerCase() + row.property.slice(1);
  const value = row.value?.slice() ?? null;
  const before = info[key];
  if (row.error) {
    assert.throws(() => { info[key] = value; }, error => {
      assert.equal(error.constructor.name, row.error);
      assert.equal(error.message, row.message);
      assert.equal(error.paramName ?? null, row.paramName);
      return true;
    });
    assert.deepEqual(info[key], before);
  } else {
    if (row.set) info[key] = value;
    assert.deepEqual(info[key], row.result);
    assert.notStrictEqual(info[key], info[key]);
    const obtained = info[key]; obtained[0] = 'changed';
    assert.deepEqual(info[key], row.result);
    if (row.set) {
      assert.notStrictEqual(info[key], value);
      value[0] = null;
      assert.deepEqual(info[key], row.afterMutation);
    }
  }
}

function format(row) {
  const info = new DateTimeFormatInfo();
  const key = row.property[0].toLowerCase() + row.property.slice(1);
  const value = row.value.map(name => name ?? 'before mutation');
  info[key] = value;
  row.value.forEach((name,index) => { if (name == null) value[index] = null; });
  const invoke = () => new DateTime(...row.date).toString(row.pattern,info);
  if (row.error) assert.throws(invoke,error => {
    assert.equal(error.constructor.name,row.error);
    assert.equal(error.message,row.message); return true;
  });
  else assert.equal(invoke(),row.result);
}

test('DateTimeFormatInfoMonthNames.MonthNames_GetInvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoMonthNames.MonthNames_GetInvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoMonthNames.MonthNames_Get_ReturnsClone', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoMonthNames.MonthNames_Get_ReturnsClone')));

test('DateTimeFormatInfoMonthNames.MonthNames_SetNullValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoMonthNames.MonthNames_SetNullValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoMonthNames.MonthNames_SetNullValueInValues_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoMonthNames.MonthNames_SetNullValueInValues_ThrowsArgumentNullException')));

test('DateTimeFormatInfoMonthNames.MonthNames_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoMonthNames.MonthNames_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_GetInvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_GetInvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_Get_ReturnsClone', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_Get_ReturnsClone')));

test('DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_SetNullValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_SetNullValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_SetNullValueInValues_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_SetNullValueInValues_ThrowsArgumentNullException')));

test('DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoMonthGenitiveNames.MonthGenitiveNames_Get_ReturnsClone', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoMonthGenitiveNames.MonthGenitiveNames_Get_ReturnsClone')));

test('DateTimeFormatInfoMonthGenitiveNames.MonthGenitiveNames_SetNullValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoMonthGenitiveNames.MonthGenitiveNames_SetNullValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoMonthGenitiveNames.MonthGenitiveNames_SetNullValueInValues_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoMonthGenitiveNames.MonthGenitiveNames_SetNullValueInValues_ThrowsArgumentNullException')));

test('DateTimeFormatInfoMonthGenitiveNames.MonthGenitiveNames_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoMonthGenitiveNames.MonthGenitiveNames_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoAbbreviatedMonthGenitiveNames.AbbreviatedMonthGenitiveNames_GetInvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthGenitiveNames.AbbreviatedMonthGenitiveNames_GetInvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoAbbreviatedMonthGenitiveNames.AbbreviatedMonthGenitiveNames_Get_ReturnsClone', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthGenitiveNames.AbbreviatedMonthGenitiveNames_Get_ReturnsClone')));

test('DateTimeFormatInfoAbbreviatedMonthGenitiveNames.AbbreviatedMonthGenitiveNames_SetNullValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthGenitiveNames.AbbreviatedMonthGenitiveNames_SetNullValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoAbbreviatedMonthGenitiveNames.AbbreviatedMonthGenitiveNames_SetNullValueInValues_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthGenitiveNames.AbbreviatedMonthGenitiveNames_SetNullValueInValues_ThrowsArgumentNullException')));

test('DateTimeFormatInfoAbbreviatedMonthGenitiveNames.AbbreviatedMonthGenitiveNames_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthGenitiveNames.AbbreviatedMonthGenitiveNames_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoMonthNames.MonthNames_Format_ReturnsExpected', () => format(fixture.formats.find(row => row.source === 'DateTimeFormatInfoMonthNames.MonthNames_Format_ReturnsExpected')));

test('DateTimeFormatInfoMonthNames.MonthNames_FormatWithNull_ThrowsNullReferenceException', () => format(fixture.formats.find(row => row.source === 'DateTimeFormatInfoMonthNames.MonthNames_FormatWithNull_ThrowsNullReferenceException')));

test('DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_Format_ReturnsExpected', () => format(fixture.formats.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_Format_ReturnsExpected')));

test('DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_FormatWithNull_ThrowsNullReferenceException', () => format(fixture.formats.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthNames.AbbreviatedMonthNames_FormatWithNull_ThrowsNullReferenceException')));

test('DateTimeFormatInfoMonthGenitiveNames.MonthGenitiveNames_Format_ReturnsExpected', () => format(fixture.formats.find(row => row.source === 'DateTimeFormatInfoMonthGenitiveNames.MonthGenitiveNames_Format_ReturnsExpected')));

test('DateTimeFormatInfoMonthGenitiveNames.MonthGenitiveNames_FormatWithNull_ThrowsNullReferenceException', () => format(fixture.formats.find(row => row.source === 'DateTimeFormatInfoMonthGenitiveNames.MonthGenitiveNames_FormatWithNull_ThrowsNullReferenceException')));

test('DateTimeFormatInfoAbbreviatedMonthGenitiveNames.AbbreviatedMonthGenitiveNames_FormatWithNull_ThrowsNullReferenceException', () => format(fixture.formats.find(row => row.source === 'DateTimeFormatInfoAbbreviatedMonthGenitiveNames.AbbreviatedMonthGenitiveNames_FormatWithNull_ThrowsNullReferenceException')));

for (const [index,row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => run(row));
}
for (const [index,row] of fixture.formats.entries()) {
  test(`format/${row.source}/${index}`, () => format(row));
}
