import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTimeFormatInfo, CultureInfo, DateTime, DateTimeKind } from '@xobin/globalization';
const fixture = JSON.parse(readFileSync(new URL('./date-time-format-patterns-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
for (const name of ['en-US','fr-FR','ru-RU','fa-IR','ar-SA','th-TH','ja-JP','zh-CN','ko-KR','he-IL','fi-FI','fr']) {
  const { cultureData } = await import('@xobin/globalization/locales/' + name);
  CultureInfo.loadCultureInfo(name, cultureData);
}
const key = name => name === 'RFC1123Pattern' ? 'rfc1123Pattern' : name[0].toLowerCase() + name.slice(1);
function run(row) {
  const info = row.culture === 'invariant' ? DateTimeFormatInfo.invariantInfo : row.culture === 'new' ? new DateTimeFormatInfo() : new CultureInfo(row.culture).dateTimeFormat;
  const invoke = () => {
    if (row.action === 'set') info[key(row.property)] = row.value;
    return info[key(row.property)];
  };
  if (row.error) assert.throws(invoke, error => {
    assert.equal(error.constructor.name,row.error); assert.equal(error.message,row.message);
    assert.equal(error.paramName ?? null,row.paramName);

    return true;
  });
  else assert.deepEqual(invoke(),row.result);
  assert.equal(info.fullDateTimePattern,row.full);
  assert.deepEqual(info.getAllDateTimePatterns(),row.patterns);
}

test('DateTimeFormatInfoShortDatePattern.ShortDatePattern_InvariantInfo', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoShortDatePattern.ShortDatePattern_InvariantInfo')));

test('DateTimeFormatInfoShortDatePattern.ShortDatePattern_SetNullValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoShortDatePattern.ShortDatePattern_SetNullValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoShortDatePattern.ShortDatePattern_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoShortDatePattern.ShortDatePattern_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoLongDatePattern.LongDatePattern_InvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoLongDatePattern.LongDatePattern_InvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoLongDatePattern.LongDatePattern_SetNullValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoLongDatePattern.LongDatePattern_SetNullValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoLongDatePattern.LongDatePattern_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoLongDatePattern.LongDatePattern_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoShortTimePattern.ShortTimePattern_GetInvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoShortTimePattern.ShortTimePattern_GetInvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoShortTimePattern.ShortTimePattern_SetNull_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoShortTimePattern.ShortTimePattern_SetNull_ThrowsArgumentNullException')));

test('DateTimeFormatInfoShortTimePattern.ShortTimePattern_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoShortTimePattern.ShortTimePattern_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoLongTimePattern.LongTimePattern_GetInvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoLongTimePattern.LongTimePattern_GetInvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoLongTimePattern.LongTimePattern_SetNullValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoLongTimePattern.LongTimePattern_SetNullValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoLongTimePattern.LongTimePattern_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoLongTimePattern.LongTimePattern_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoFullDateTimePattern.FullDateTimePattern_GetInvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoFullDateTimePattern.FullDateTimePattern_GetInvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoFullDateTimePattern.FullDateTimePattern_SetNullValue_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoFullDateTimePattern.FullDateTimePattern_SetNullValue_ThrowsArgumentNullException')));

test('DateTimeFormatInfoFullDateTimePattern.FullDateTimePattern_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoFullDateTimePattern.FullDateTimePattern_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoMonthDayPattern.MonthDayPattern_GetInvariantInfo_ReturnsExpected', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoMonthDayPattern.MonthDayPattern_GetInvariantInfo_ReturnsExpected')));

test('DateTimeFormatInfoMonthDayPattern.MonthDayPattern_SetNull_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoMonthDayPattern.MonthDayPattern_SetNull_ThrowsArgumentNullException')));

test('DateTimeFormatInfoMonthDayPattern.MonthDayPattern_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoMonthDayPattern.MonthDayPattern_SetReadOnly_ThrowsInvalidOperationException')));

test('DateTimeFormatInfoYearMonthPattern.YearMonthPattern_SetNull_ThrowsArgumentNullException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoYearMonthPattern.YearMonthPattern_SetNull_ThrowsArgumentNullException')));

test('DateTimeFormatInfoYearMonthPattern.YearMonthPattern_SetReadOnly_ThrowsInvalidOperationException', () => run(fixture.rows.find(row => row.source === 'DateTimeFormatInfoYearMonthPattern.YearMonthPattern_SetReadOnly_ThrowsInvalidOperationException')));

for (const [index,row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => row.property ? run(row) : officialPatterns(row));
}

for (const row of fixture.operations) {
  test('Pattern collections/' + row.culture, () => {
    const info = new CultureInfo(row.culture).dateTimeFormat;
    assert.deepEqual(info.getAllDateTimePatterns(),row.all);
    for (const [format,patterns] of Object.entries(row.byFormat)) assert.deepEqual(info.getAllDateTimePatterns(format),patterns);
    for (let day=0; day<7; day++) assert.equal(info.getShortestDayName(day),row.shortest[day]);
    const copy = info.getAllDateTimePatterns('d'); copy[0] = 'changed';
    assert.deepEqual(info.getAllDateTimePatterns('d'),row.byFormat.d);
  });
}
for (const [index,row] of fixture.setters.entries()) {
  test('Pattern setters/' + index, () => {
    const info = new DateTimeFormatInfo();
    const invoke = () => info.setAllDateTimePatterns(row.values,row.format);
    if(row.error) assert.throws(invoke,error => {
      assert.equal(error.constructor.name,row.error); assert.equal(error.message,row.message);
      assert.equal(error.paramName,row.paramName); return true;
    }); else invoke();
    assert.deepEqual(info.getAllDateTimePatterns(),row.result);
  });
}
for (const row of fixture.mutations) {
  test('Pattern shared arrays and default merge/' + row.format, () => {
    const info = new DateTimeFormatInfo(); const values = ['first','second','third','second'];
    info.setAllDateTimePatterns(values,row.format); values[1] = 'changed';
    assert.deepEqual(info.getAllDateTimePatterns(row.format),row.shared);
    info[key(row.property)] = 'third'; assert.deepEqual(info.getAllDateTimePatterns(row.format),row.reordered);
    info[key(row.property)] = 'new'; assert.deepEqual(info.getAllDateTimePatterns(row.format),row.inserted);
  });
}
test('pattern setters reject writes before checking inputs', () => {
  assert.throws(() => DateTimeFormatInfo.invariantInfo.setAllDateTimePatterns(null,'x'),error => error.constructor.name === 'InvalidOperationException');
});

function officialPatterns(row) {
  const info = new CultureInfo(row.culture).dateTimeFormat.clone();
  assert.deepEqual(info.getAllDateTimePatterns(),row.all);
  const all = new Set(Object.values(row.byFormat).flat());
  for(const pattern of info.getAllDateTimePatterns()) assert.ok(all.has(pattern));
  for(const format of 'dDtTyY') {
    const values = info.getAllDateTimePatterns(format); const replacement = [values.at(-1)];
    info.setAllDateTimePatterns(replacement,format);
    assert.deepEqual(info.getAllDateTimePatterns(format),replacement);
  }
}

// The target is format-info cache invalidation. The .NET oracle uses an offset-zero DateTimeOffset;
// JS exercises the shared date formatter with an explicit offset pattern for its default format.
function invalidate(source) {
  const row = fixture.invalidations.find(row => row.source === source);
  const info = new DateTimeFormatInfo();
  const date = new DateTime(2024,3,20,13,14,15,DateTimeKind.utc);
  for(const format of row.formats) date.toString(format || 'G',info);
  info[key(row.property)] = '#$';
  for(const [index,format] of row.formats.entries()) {
    const selected = format || info.shortDatePattern + ' ' + info.longTimePattern + ' zzz';
    assert.equal(date.toString(selected,info),row.results[index]);
    assert.ok(row.results[index].includes('#$'));
  }
}

test('DateTimeFormatInfoLongDatePattern.LongDatePattern_Set_InvalidatesDerivedPattern', () => invalidate('DateTimeFormatInfoLongDatePattern.LongDatePattern_Set_InvalidatesDerivedPattern'));

test('DateTimeFormatInfoLongTimePattern.LongTimePattern_Set_InvalidatesDerivedPatterns', () => invalidate('DateTimeFormatInfoLongTimePattern.LongTimePattern_Set_InvalidatesDerivedPatterns'));

test('DateTimeFormatInfoShortDatePattern.ShortDatePattern_Set_InvalidatesDerivedPatterns', () => invalidate('DateTimeFormatInfoShortDatePattern.ShortDatePattern_Set_InvalidatesDerivedPatterns'));

test('DateTimeFormatInfoShortTimePattern.ShortTimePattern_Set_InvalidatesDerivedPattern', () => invalidate('DateTimeFormatInfoShortTimePattern.ShortTimePattern_Set_InvalidatesDerivedPattern'));
for(const [index,row] of fixture.cacheCases.entries()) {
  test('month format-flag cache and memberwise copies/' + index,()=>{
    const info=new DateTimeFormatInfo(),values=row.initial.slice();
    info[key(row.property)]=values;
    const date=new DateTime(2024,6,19);
    date.toString(row.pattern,info);
    values[row.nullMutation?0:5]=row.nullMutation?null:'changed';
    const clone=info.clone(),readOnly=DateTimeFormatInfo.readOnly(info);
    const check=(selected,format,expected)=>{
      const invoke=()=>selected.toString(row.pattern,format);
      if(expected.error)assert.throws(invoke,error=>{
        assert.equal(error.constructor.name,expected.error);assert.equal(error.message,expected.message);return true;
      });else assert.equal(invoke(),expected.result);
    };
    check(date,info,row.before);
    check(new DateTime(2024,1,19),info,row.january);
    info.firstDayOfWeek=1;check(date,info,row.afterWeekday);
    info.amDesignator='changed';check(date,info,row.afterReset);
    check(date,clone,row.cloned);check(date,readOnly,row.readOnly);
  });
}
