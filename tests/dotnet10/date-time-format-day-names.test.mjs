import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTimeFormatInfo, CultureInfo, DateTime } from '@xobin/globalization';
import { cultureData as en } from '@xobin/globalization/locales/en-US';
import { cultureData as fr } from '@xobin/globalization/locales/fr-FR';
CultureInfo.loadCultureInfo('en-US', en);
CultureInfo.loadCultureInfo('fr-FR', fr);
const fixture = JSON.parse(readFileSync(new URL('./date-time-format-day-names-cases.json', import.meta.url), 'utf8'));
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

test('DateTimeFormatInfoDayNames.DayNames_GetInvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoDayNames.DayNames_GetInvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoDayNames.DayNames_Get_ReturnsClone', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoDayNames.DayNames_Get_ReturnsClone')));

test('DateTimeFormatInfoDayNames.DayNames_SetNulValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoDayNames.DayNames_SetNulValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoDayNames.DayNames_SetNulValueInValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoDayNames.DayNames_SetNulValueInValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoDayNames.DayNames_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoDayNames.DayNames_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoAbbreviatedDayNames.AbbreviatedDayNames_GetInvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedDayNames.AbbreviatedDayNames_GetInvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoAbbreviatedDayNames.AbbreviatedDayNames_Get_ReturnsClone', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedDayNames.AbbreviatedDayNames_Get_ReturnsClone')));

test('DateTimeFormatInfoAbbreviatedDayNames.AbbreviatedDayNames_SetNulValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedDayNames.AbbreviatedDayNames_SetNulValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoAbbreviatedDayNames.AbbreviatedDayNames_SetNulValueInValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedDayNames.AbbreviatedDayNames_SetNulValueInValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoAbbreviatedDayNames.AbbreviatedDayNames_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoAbbreviatedDayNames.AbbreviatedDayNames_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoShortestDayNames.ShortestDayNames_InvariantInfo', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoShortestDayNames.ShortestDayNames_InvariantInfo')));

test('DateTimeFormatInfoShortestDayNames.ShortestDayNames_Get_ReturnsClone', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoShortestDayNames.ShortestDayNames_Get_ReturnsClone')));

test('DateTimeFormatInfoShortestDayNames.ShortestDayNames_SetNulValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoShortestDayNames.ShortestDayNames_SetNulValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoShortestDayNames.ShortestDayNames_SetNulValueInValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoShortestDayNames.ShortestDayNames_SetNulValueInValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoShortestDayNames.ShortestDayNames_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoShortestDayNames.ShortestDayNames_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoDayNames.DayNames_FormatWithNull_ThrowsNullReferenceException', () => {
  const info = new DateTimeFormatInfo();
  const value = ['1','2','3','4','5','6','7']; info.dayNames = value; value[0] = null;
  assert.throws(() => new DateTime(2014,5,28).toString('dddd MMM yy', info), error => {
    assert.equal(error.constructor.name, fixture.formatError);
    assert.equal(error.message, fixture.formatMessage); return true;
  });
});
for (const [index,row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => run(row));
}
