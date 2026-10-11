import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {CultureInfo,DateTimeFormatInfo,DateTime} from '@xobin/globalization';
const fixture=JSON.parse(readFileSync(new URL('./date-time-format-cases.json',import.meta.url),'utf8'));
const native=JSON.parse(readFileSync(new URL('./culture-date-time-format-cases.json',import.meta.url),'utf8'));
const cultures={ '':CultureInfo.invariantCulture };
for(const name of native.allCultureNames.filter(Boolean)) {
  const {cultureData}=await import('@xobin/globalization/locales/'+name);
  cultures[name]=CultureInfo.loadCultureInfo(name,cultureData);
}
function verifyTime(property) {
  for(const name of native.allCultureNames) {
    const pattern=cultures[name].dateTimeFormat[property];
    assert.equal(pattern,fixture.cultures[name].formatInfo[property],name);
    let use24=false,use12=false,useAmPm=false;
    for(let i=0;i<pattern.length;i++) {
      const c=pattern[i];
      if(c==='H')use24=true;else if(c==='h')use12=true;else if(c==='t')useAmPm=true;
      else if(c==='\\')i++;
      else if(c==="'") {
        for(i++;i<pattern.length;i++) {if(pattern[i]==="'")break;if(pattern[i]==='\\')i++;}
      }
    }
    assert.ok((use24||useAmPm)&&(use12!==use24),name+'/'+pattern);
  }
}
test('DateTimeFormatInfoLongTimePattern.LongTimePattern_VerifyTimePatterns',()=>verifyTime('longTimePattern'));
test('DateTimeFormatInfoShortTimePattern.ShortTimePattern_VerifyTimePatterns',()=>verifyTime('shortTimePattern'));
function spaces() {assert.match(new DateTime(2024,3,20,15,15,0).toString('t',cultures['en-US']),/[ \u00a0\u202f]/);}
test('DateTimeFormatInfoLongTimePattern.LongTimePattern_CheckTimeFormatWithSpaces',spaces);
test('DateTimeFormatInfoShortTimePattern.ShortTimePattern_CheckTimeFormatWithSpaces',spaces);
test('DateTimeFormatInfoLongTimePattern.LongTimePattern_CheckReadingTimeFormatWithSingleQuotes_ICU',()=>{
  const pattern=cultures['fr-CA'].dateTimeFormat.longTimePattern;
  assert.equal(pattern,fixture.cultures['fr-CA'].formatInfo.longTimePattern);
  for(let i=0;i<pattern.length;i++)if(pattern[i]==="'") {
    const end=pattern.indexOf("'",i+1);if(end<0)break;
    if(end+1<pattern.length)assert.equal(pattern[end+1],' ');i=end;
  }
});
test('DateTimeFormatInfoMiscTests.DateSeparatorTimeSeparator_Get_ReturnsExpected',()=>{
  const info=DateTimeFormatInfo.invariantInfo.clone();
  assert.equal(info.isReadOnly,false);
  assert.ok(info.shortDatePattern.indexOf(info.dateSeparator)>0);
  assert.ok(info.shortTimePattern.indexOf(info.timeSeparator)>0);
  const date=new DateTime(2024,3,20,15,15,0);
  assert.equal(date.toString('MM/dd/yyyy',info),'03/20/2024');
  info.dateSeparator='-';assert.equal(date.toString('MM/dd/yyyy',info),'03-20-2024');
  assert.equal(date.toString('HH:mm:ss',info),'15:15:00');
  info.timeSeparator='.';assert.equal(date.toString('HH:mm:ss',info),'15.15.00');
});
test('era names and lookups match every reference culture default calendar',()=>{
  for(const name of native.allCultureNames) {
    const info=cultures[name].dateTimeFormat,data=fixture.cultures[name].formatInfo;
    assert.equal(info.getEraName(0),data.eraNames.at(-1),name);
    assert.equal(info.getEraName(1),data.eraNames[0],name);
    assert.equal(info.getAbbreviatedEraName(0),data.abbreviatedEraNames.at(-1),name);
    for(const value of [...data.eraNames,...data.abbreviatedEraNames,...data.abbreviatedEnglishEraNames]) {
      assert.equal(info.getEra(value),value.length?1:-1,name+'/'+value);
    }
  }
});
