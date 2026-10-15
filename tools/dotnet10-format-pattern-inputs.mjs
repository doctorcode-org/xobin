import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
const runtime = process.argv[2];
const mode = process.argv[3] ?? '--check';
if (!runtime || !['--write','--check'].includes(mode)) throw new Error('Pass the .NET runtime source directory and --write or --check.');
const prefix='src/libraries/System.Runtime/tests/System.Globalization.Tests/DateTimeFormatInfo/';
const properties=['ShortDatePattern','LongDatePattern','ShortTimePattern','LongTimePattern','FullDateTimePattern','MonthDayPattern','YearMonthPattern','RFC1123Pattern','SortableDateTimePattern','UniversalSortableDateTimePattern'];
const rows=[];
for(const property of properties) {
 const group='DateTimeFormatInfo'+property;
 const source=execFileSync('git',['-C',runtime,'show','v10.0.7:'+prefix+group+'.cs'],{encoding:'utf8'});
 const names=[...source.matchAll(/public void (\w+)\(/g)].map(m=>m[1]);
 for(const name of names) {
  const key=group+'.'+name;
  if(/InvariantInfo/.test(name)) rows.push({source:key,property,culture:'invariant',action:'get',value:null});
  else if (['_Get_ReturnsExpected'].some(suffix => name === property + suffix) && ['RFC1123Pattern','SortableDateTimePattern','UniversalSortableDateTimePattern'].includes(property)) {
   for(const culture of property === 'UniversalSortableDateTimePattern' ? ['invariant','en-US','ja-JP','fr-FR'] : ['invariant','en-US','ja-JP']) rows.push({source:key,property,culture,action:'get',value:null});
  }
  else if(/SetNull/.test(name)) rows.push({source:key,property,culture:'new',action:'set',value:null});
  else if(/SetReadOnly/.test(name)) rows.push({source:key,property,culture:'invariant',action:'set',value:'custom'});
  else if(/_Set_GetReturnsExpected/.test(name)) {
   const match=source.match(new RegExp('public static IEnumerable<object\\[\\]> '+property+'_Set_TestData\\(\\)[\\s\\S]*?\\n        }'));
   if(!match) throw new Error('Setter data missing '+property);
   const values=[...match[0].matchAll(/yield return new object\[\] \{ (string.Empty|"(?:[^"\\]|\\.)*") \}/g)].map(m=>m[1]==='string.Empty'?'':JSON.parse(m[1]));
   if(!values.length) throw new Error('No values '+property);
   for(const value of values) rows.push({source:key,property,culture:'new',action:'set',value});
  } else if(/_Get_ReturnsExpected_ICU/.test(name)) for(const culture of ['en-US','fr-FR']) rows.push({source:key,property,culture,action:'get',value:null});
  else if(name==='YearMonthPattern') for(const culture of ['invariant','fr-FR']) rows.push({source:key,property,culture,action:'get',value:null});
 }
 if(/public void.*SetNull/.test(source)) rows.push({source:'Supplementary.ReadOnlyOrder',property,culture:'invariant',action:'set',value:null});
}
const output = JSON.stringify(rows,null,2) + '\n';
const file = 'tests/dotnet10/date-time-format-pattern-inputs.json';
if (mode === '--write') writeFileSync(file, output);
else if (readFileSync(file,'utf8') !== output) throw new Error('Pattern inputs differ from the pinned .NET test sources.');
