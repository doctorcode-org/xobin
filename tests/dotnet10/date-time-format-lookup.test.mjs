import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTimeFormatInfo, CultureInfo } from '@xobin/globalization';
const fixture = JSON.parse(readFileSync(new URL('./date-time-format-lookup-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
for (const name of ['en-US','fr-FR','ru-RU','fa-IR','ar-SA','th-TH','ja-JP','zh-CN','ko-KR','he-IL','fi-FI','fr']) {
  const { cultureData } = await import('@xobin/globalization/locales/' + name);
  CultureInfo.loadCultureInfo(name, cultureData);
}
const key = name => name === 'RFC1123Pattern' ? 'rfc1123Pattern' : name[0].toLowerCase() + name.slice(1);
function run(row) {
  const info = row.culture === 'invariant' ? DateTimeFormatInfo.invariantInfo : row.culture === 'new' ? new DateTimeFormatInfo() : new CultureInfo(row.culture).dateTimeFormat;
  for(const value of row.values) {
    const invoke = () => info[key(row.method)](value.value);
    if(value.error) assert.throws(invoke,error => {
      assert.equal(error.constructor.name,value.error); assert.equal(error.message,value.message);
      assert.equal(error.paramName,value.paramName); assert.equal(error.actualValue,value.actualValue); return true;
    }); else assert.equal(invoke(),value.result);
  }
}
for (const [index,row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => run(row));
}
