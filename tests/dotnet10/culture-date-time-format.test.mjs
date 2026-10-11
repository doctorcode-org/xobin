import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { CultureInfo, DateTimeFormatInfo, DateTime, GregorianCalendar } from '@xobin/globalization';
const fixture=JSON.parse(readFileSync(new URL('./culture-date-time-format-cases.json',import.meta.url),'utf8'));
assert.equal(fixture.runtime,'10.0.7');
for(const name of ['en-US','fi-FI','fr','ja-JP']) {
  const {cultureData}=await import('@xobin/globalization/locales/'+name);
  CultureInfo.loadCultureInfo(name,cultureData);
}
function run(row) {
  const culture=new CultureInfo(row.name),info=new DateTimeFormatInfo();
  if(row.name==='en-US') {info.amDesignator='a.m.';info.monthDayPattern='MMMM-dd';info.shortTimePattern='HH|mm';}
  else info.longTimePattern='H:mm:ss';
  culture.dateTimeFormat=info;
  assert.strictEqual(culture.dateTimeFormat,info);
  assert.equal(info.amDesignator,row.am);assert.equal(info.monthDayPattern,row.monthDay);
  assert.equal(info.shortTimePattern,row.shortTime);assert.equal(info.longTimePattern,row.longTime);
}
for(const [index,row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`,()=>run(row));
}
test('CultureInfoDateTimeFormat.TestSettingThreadCultures',()=>{
  const previous=CultureInfo.currentCulture;
  try {
    const culture=new CultureInfo('ja-JP');CultureInfo.currentCulture=culture;
    const date=new DateTime(2014,3,14,3,14,0);
    assert.equal(date.toString(),fixture.current);
    assert.equal(date.toString(),date.toString(culture));
    assert.equal(date.toString(),date.toString(culture.dateTimeFormat));
    assert.strictEqual(DateTimeFormatInfo.currentInfo,culture.dateTimeFormat);
  }finally{CultureInfo.currentCulture=previous;}
});
test('CultureInfoDateTimeFormat.DateTimeFormatInfo_Set_Properties',()=>{
  const culture=new CultureInfo('fr');
  culture.dateTimeFormat.amDesignator='a.m.';culture.dateTimeFormat.monthDayPattern='MMMM-dd';culture.dateTimeFormat.shortTimePattern='HH|mm';
  assert.equal(culture.dateTimeFormat.amDesignator,fixture.french.am);
  assert.equal(culture.dateTimeFormat.monthDayPattern,fixture.french.monthDay);
  assert.equal(culture.dateTimeFormat.shortTimePattern,fixture.french.shortTime);
});
test('CultureInfoDateTimeFormat.DateTimeFormat_Set_Invalid',()=>{
  for(const row of fixture.errors) assert.throws(()=>{
    if(row.readOnly) CultureInfo.invariantCulture.dateTimeFormat=new DateTimeFormatInfo();
    else new CultureInfo('en-US').dateTimeFormat=null;
  },error=>{
    assert.equal(error.constructor.name,row.error);assert.equal(error.message,row.message);
    assert.equal(error.paramName??null,row.paramName);return true;
  });
});
test('CultureInfoCalendar.Calendar_Get_InvariantInfo',()=>{
  assert.equal(CultureInfo.invariantCulture.calendar.toString().split('.').at(-1),fixture.invariantCalendar);
  assert.ok(CultureInfo.invariantCulture.calendar instanceof GregorianCalendar);
  assert.strictEqual(CultureInfo.invariantCulture.calendar,CultureInfo.invariantCulture.calendar);
});
