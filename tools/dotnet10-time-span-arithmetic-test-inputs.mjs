import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
const runtime=process.argv[2],mode=process.argv[3]??'--check';if(!runtime||!['--write','--check'].includes(mode))throw new Error('Pass runtime path and mode.');
const git=(...a)=>execFileSync('git',['-C',runtime,...a],{encoding:'utf8'}).replaceAll('\r\n','\n');if(git('rev-parse','v10.0.7^{commit}').trim()!=='7706f546bac1a99b3d891afe3591dc88c67f0cc4')throw new Error('Reference changed.');
const source=git('show','v10.0.7:src/libraries/System.Runtime/tests/System.Runtime.Tests/System/TimeSpanTests.cs');
const inventory=JSON.parse(readFileSync('tests/dotnet10-test-inventory.json'));
const excluded=new Set(['MaxValue','MinValue','Zero','Ctor_Empty','Ctor_Long','TotalMilliseconds_Invalid','Total_Days_Hours_Minutes_Seconds_Milliseconds']);
const methods=inventory.methods.filter(m=>m.class==='TimeSpanTests'&&!excluded.has(m.method)&&!/^Ctor_|Parse|ToString|TryFormat/.test(m.method));
let output='// Derived from official .NET 10.0.7 TimeSpan tests.\n// Licensed to the .NET Foundation under the MIT license.\nusing System;\nusing System.Collections.Generic;\nusing System.Globalization;\nusing System.Linq.Expressions;\nusing TimeSpan = ObservedTimeSpan;\ninternal static class TimeSpanArithmeticTests {\n';
output+=source.slice(source.indexOf('        private const long maxMicroseconds'),source.indexOf('        public static IEnumerable<object[]> FromDays_Int_ShouldOverflowOrUnderflow_Data'));
function extract(name,provider=false){const rx=new RegExp('public static '+(provider?'IEnumerable<object\\[\\]>':'void')+' '+name+'\\(');const match=rx.exec(source);if(!match)throw new Error(name);let start=match.index,end=source.indexOf('{',start)+1,depth=1;while(depth){if(source[end]==='{')depth++;if(source[end]==='}')depth--;end++;}return source.slice(start,end);}
const providers=new Set();
for(const method of methods){for(const a of method.annotations)if(a.includes('MemberData'))providers.add(a.match(/nameof\((\w+)\)/)[1]);output+=method.annotations.join('\n')+'\n'+extract(method.method)+'\n';}
for(const provider of providers)output+=extract(provider,true)+'\n';
output+='}\n';const path='tools/dotnet10-calendar-oracle/TimeSpanArithmeticReferenceTests.g.cs';if(mode==='--write')writeFileSync(path,output);else if(readFileSync(path,'utf8')!==output)throw new Error('Generated TimeSpan arithmetic source differs.');
