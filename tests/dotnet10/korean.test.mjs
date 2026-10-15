import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, KoreanCalendar, GregorianCalendar } from '@xobin/globalization';
const fixture=JSON.parse(readFileSync(new URL('./korean-cases.json',import.meta.url),'utf8'));
assert.equal(fixture.runtime,'10.0.7');
function run(row) {
    const calendar=new KoreanCalendar();
    const args=row.arguments.map(value=>typeof value==='string'?new DateTime(BigInt(value)):value);
    const name=row.source.split('.')[1];
    const operation=name[0].toLowerCase()+name.slice(1);
    const normalize=value=>value instanceof DateTime?value.ticks.toString():value;
    const invoke=()=>{
        if(name==='TwoDigitYearMax_Get') return [calendar.twoDigitYearMax];
        if(name==='TwoDigitYearMax_Set') {calendar.twoDigitYearMax=args[0];return [calendar.twoDigitYearMax];}
        if(name==='ToFourDigitYear_InvalidYear_ThrowsArgumentOutOfRangeException') return [calendar.toFourDigitYear(...args)];
        if(['GetDaysInMonth','GetDaysInYear','GetMonthsInYear','IsLeapDay','IsLeapMonth','IsLeapYear','ToDateTime'].includes(name)) {
            const koreanArgs=[args[0]+2333,...args.slice(1)];
            const values=[undefined,0,1].map(era=>normalize(calendar[operation](...koreanArgs,...(era===undefined?[]:[era]))));
            const gregorian=new GregorianCalendar();
            assert.deepEqual(values,[0,1,2].map(()=>normalize(gregorian[operation](...args))));
            return values;
        }
        const result=normalize(calendar[operation](...args));
        if(name==='AddMonths'||name==='AddYears') assert.equal(result,normalize(args[0][operation](args[1])));
        if(name==='GetYear') assert.equal(result,args[0].year+2333);
        if(name==='ToFourDigitYear') {
            const lower=calendar.twoDigitYearMax-99;
            const expected=args[0]<lower%100?(Math.trunc(lower/100)+1)*100+args[0]:Math.trunc(lower/100)*100+args[0];
            assert.equal(result,expected);
        }
        return [result];
    };
    if(row.error) assert.throws(invoke,error=>{
        assert.equal(error.constructor.name,row.error);
        assert.equal(error.message,row.message);
        assert.equal(error.paramName??null,row.paramName);
        assert.equal(error.actualValue??null,row.actualValue);
        return true;
    });
    else assert.deepEqual(invoke(),row.result);
}
for(const [index,row] of fixture.rows.entries()) {
    test(`${row.source}/${index}`,()=>run(row));
}
test('KoreanCalendarTwoDigitYearMax.TwoDigitYearMax_Get',()=>{
    const row=fixture.rows.find(row=>row.source==='KoreanCalendarTwoDigitYearMax.TwoDigitYearMax_Get');
    run(row);
    assert.ok([4362,4382].includes(new KoreanCalendar().twoDigitYearMax));
});
test('KoreanCalendarToFourDigitYear.ToFourDigitYear_InvalidYear_ThrowsArgumentOutOfRangeException',()=>{
    run(fixture.rows.find(row=>row.source==='KoreanCalendarToFourDigitYear.ToFourDigitYear_InvalidYear_ThrowsArgumentOutOfRangeException'));
});
