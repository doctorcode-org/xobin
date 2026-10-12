import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import test from 'node:test';
import {TimeSpan} from '@xobin/globalization';
const fixture=JSON.parse(readFileSync(new URL('./time-span-arithmetic-cases.json',import.meta.url),'utf8'));
assert.equal(fixture.runtime,'10.0.7');
function decode(arg){if(arg.kind==='span')return new TimeSpan(BigInt(arg.value));if(arg.kind==='int64')return BigInt(arg.value);if(arg.kind==='double'&&typeof arg.value==='string')return arg.value==='NaN'?NaN:arg.value==='Infinity'?Infinity:-Infinity;return arg.value;}
function run(row){assert.ok(row.checks.length>0);for(const check of row.checks){const args=check.arguments.map(decode);
    const invoke=()=>{
        const [operation,mode]=check.operation.split(':');const name=operation[0].toLowerCase()+operation.slice(1);
        if(operation==='ctor')return new TimeSpan(...args);
        if(['MaxValue','MinValue','Zero'].includes(operation))return TimeSpan[name];
        if(operation.startsWith('From')){if(mode==='I'&&args.length===1&&typeof args[0]==='number')args[0]=BigInt(args[0]);return TimeSpan[name](...args);}
        if(operation==='Compare')return TimeSpan.compare(...args);
        if(operation==='StaticEquals')return TimeSpan.equals(...args);
        if(operation==='UnaryPlus')return new TimeSpan(args[0].valueOf());
        if(operation.startsWith('Operator')){const op=operation.slice(8);if(op==='==')return TimeSpan.equals(...args);if(op==='!=')return !TimeSpan.equals(...args);if(op==='<')return args[0]<args[1];if(op==='>')return args[0]>args[1];if(op==='<=')return args[0]<=args[1];if(op==='>=')return args[0]>=args[1];}
        if(['Ticks','Days','Hours','Minutes','Seconds','Milliseconds','Microseconds','Nanoseconds'].includes(operation)||operation.startsWith('Total'))return args[0][name];
        return args[0][name](...args.slice(1));
    };
    if(check.error)assert.throws(invoke,error=>{assert.equal(error.constructor.name,check.error);assert.equal(error.message,check.message);assert.equal(error.paramName??null,check.paramName);assert.equal(error.actualValue??null,check.actualValue);return true;});
    else {const actual=invoke(),expected=decode(check.result);if(actual instanceof TimeSpan)assert.equal(actual.ticks,expected.ticks);else assert.equal(actual,expected);}
}}
for(const [index,row] of fixture.rows.entries())test(`${row.source}/${index}`,()=>run(row));
function official(source){const rows=fixture.rows.filter(row=>row.source===source);assert.ok(rows.length>0);for(const row of rows)run(row);}

test('TimeSpanTests.Add_Invalid',()=>official('TimeSpanTests.Add_Invalid'));

test('TimeSpanTests.FromMinMaxValue_DoesNotThrow',()=>official('TimeSpanTests.FromMinMaxValue_DoesNotThrow'));

test('TimeSpanTests.CompareTo_ObjectNotTimeSpan_ThrowsArgumentException',()=>official('TimeSpanTests.CompareTo_ObjectNotTimeSpan_ThrowsArgumentException'));

test('TimeSpanTests.Duration_Invalid',()=>official('TimeSpanTests.Duration_Invalid'));

test('TimeSpanTests.FromDays_Int_Positive',()=>official('TimeSpanTests.FromDays_Int_Positive'));

test('TimeSpanTests.FromDays_Int_Negative',()=>official('TimeSpanTests.FromDays_Int_Negative'));

test('TimeSpanTests.FromDays_Int_Zero',()=>official('TimeSpanTests.FromDays_Int_Zero'));

test('TimeSpanTests.FromSeconds_Int_ShouldGiveResultWithPrecision',()=>official('TimeSpanTests.FromSeconds_Int_ShouldGiveResultWithPrecision'));

test('TimeSpanTests.FromDays_Int_ShouldOverflow_WhenIntermediateCalculationCouldOverflowBackIntoValidRange',()=>official('TimeSpanTests.FromDays_Int_ShouldOverflow_WhenIntermediateCalculationCouldOverflowBackIntoValidRange'));

test('TimeSpanTests.FromDays_Int_ShouldConstructMaxValueAproximation',()=>official('TimeSpanTests.FromDays_Int_ShouldConstructMaxValueAproximation'));

test('TimeSpanTests.FromDays_Int_ShouldConstructMinValueAproximation',()=>official('TimeSpanTests.FromDays_Int_ShouldConstructMinValueAproximation'));

test('TimeSpanTests.FromDays_Invalid',()=>official('TimeSpanTests.FromDays_Invalid'));

test('TimeSpanTests.FromHours_Invalid',()=>official('TimeSpanTests.FromHours_Invalid'));

test('TimeSpanTests.FromMinutes_Invalid',()=>official('TimeSpanTests.FromMinutes_Invalid'));

test('TimeSpanTests.FromSeconds_Invalid',()=>official('TimeSpanTests.FromSeconds_Invalid'));

test('TimeSpanTests.FromMilliseconds_Invalid',()=>official('TimeSpanTests.FromMilliseconds_Invalid'));

test('TimeSpanTests.Negate_Invalid',()=>official('TimeSpanTests.Negate_Invalid'));

test('TimeSpanTests.Subtract_Invalid',()=>official('TimeSpanTests.Subtract_Invalid'));

test('TimeSpanTests.OverflowingMultiplication',()=>official('TimeSpanTests.OverflowingMultiplication'));

test('TimeSpanTests.NaNMultiplication',()=>official('TimeSpanTests.NaNMultiplication'));

test('TimeSpanTests.DivideByZero',()=>official('TimeSpanTests.DivideByZero'));

test('TimeSpanTests.NaNDivision',()=>official('TimeSpanTests.NaNDivision'));

test('TimeSpanTests.NamedOverflowingMultiplication',()=>official('TimeSpanTests.NamedOverflowingMultiplication'));

test('TimeSpanTests.NamedNaNMultiplication',()=>official('TimeSpanTests.NamedNaNMultiplication'));

test('TimeSpanTests.NamedDivideByZero',()=>official('TimeSpanTests.NamedDivideByZero'));

test('TimeSpanTests.NamedNaNDivision',()=>official('TimeSpanTests.NamedNaNDivision'));

test('TimeSpanTests.ConvertToTimeSpanPrecisionTest',()=>official('TimeSpanTests.ConvertToTimeSpanPrecisionTest'));

test('Supplemental.TimeSpan.NET10.constants',()=>{
    for(const [name,result]of Object.entries(fixture.constants))assert.equal(TimeSpan[name[0].toLowerCase()+name.slice(1)],decode(result));
});
test('Supplemental.TimeSpan.JavaScriptInt64Limits',()=>{
    for(const ticks of [-9223372036854775809n,9223372036854775808n])assert.throws(()=>new TimeSpan(ticks),error=>error.constructor.name==='OverflowException'&&error.message==='TimeSpan overflowed because the duration is too long.');
});
