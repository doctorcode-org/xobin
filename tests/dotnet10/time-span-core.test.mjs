import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { TimeSpan } from '@xobin/globalization';
const fixture=JSON.parse(readFileSync(new URL('./time-span-core-cases.json',import.meta.url),'utf8'));
assert.equal(fixture.runtime,'10.0.7');
function run(row) {
    const invoke=()=>row.operation==='ticks'?new TimeSpan(BigInt(row.arguments[0])):new TimeSpan(...row.arguments);
    if(row.error)assert.throws(invoke,error=>{
        assert.equal(error.constructor.name,row.error);
        assert.equal(error.message,row.message);
        assert.equal(error.paramName??null,row.paramName);
        assert.equal(error.actualValue??null,row.actualValue);
        return true;
    });
    else {
        const value=invoke();
        assert.equal(value.ticks.toString(),row.result.ticks);
        assert.equal(value.valueOf(),value.ticks);
        assert.deepEqual([value.days,value.hours,value.minutes,value.seconds,value.milliseconds,value.microseconds,value.nanoseconds],row.result.parts);
        assert.deepEqual([value.totalDays,value.totalHours,value.totalMinutes,value.totalSeconds,value.totalMilliseconds,value.totalMicroseconds,value.totalNanoseconds],row.result.totals);
    }
}
for(const [index,row] of fixture.rows.entries())test(`${row.source}/${index}`,()=>run(row));
function official(source){const rows=fixture.rows.filter(row=>row.source===source);assert.ok(rows.length>0);for(const row of rows)run(row);}

test('TimeSpanTests.MaxValue',()=>official('TimeSpanTests.MaxValue'));

test('TimeSpanTests.MinValue',()=>official('TimeSpanTests.MinValue'));

test('TimeSpanTests.Zero',()=>official('TimeSpanTests.Zero'));

test('TimeSpanTests.Ctor_Empty',()=>official('TimeSpanTests.Ctor_Empty'));

test('TimeSpanTests.Ctor_Long',()=>official('TimeSpanTests.Ctor_Long'));

test('TimeSpanTests.Ctor_Int_Int_Int',()=>official('TimeSpanTests.Ctor_Int_Int_Int'));

test('TimeSpanTests.Ctor_Int_Int_Int_Invalid',()=>official('TimeSpanTests.Ctor_Int_Int_Int_Invalid'));

test('TimeSpanTests.Ctor_Int_Int_Int_Int_Int',()=>official('TimeSpanTests.Ctor_Int_Int_Int_Int_Int'));

test('TimeSpanTests.Ctor_Int_Int_Int_Int_Int_Invalid',()=>official('TimeSpanTests.Ctor_Int_Int_Int_Int_Int_Invalid'));

test('TimeSpanTests.Ctor_Int_Int_Int_Int_Int_Int',()=>official('TimeSpanTests.Ctor_Int_Int_Int_Int_Int_Int'));

test('TimeSpanTests.Ctor_Int_Int_Int_Int_Int_Int_Invalid',()=>official('TimeSpanTests.Ctor_Int_Int_Int_Int_Int_Int_Invalid'));

test('TimeSpanTests.TotalMilliseconds_Invalid',()=>official('TimeSpanTests.TotalMilliseconds_Invalid'));
