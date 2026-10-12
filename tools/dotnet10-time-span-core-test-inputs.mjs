import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
const runtime=process.argv[2],mode=process.argv[3]??'--check';
if(!runtime||!['--write','--check'].includes(mode))throw new Error('Pass runtime path and --write or --check.');
const git=(...a)=>execFileSync('git',['-C',runtime,...a],{encoding:'utf8'}).replaceAll('\r\n','\n');
if(git('rev-parse','v10.0.7^{commit}').trim()!=='7706f546bac1a99b3d891afe3591dc88c67f0cc4')throw new Error('Reference commit changed.');
const source=git('show','v10.0.7:src/libraries/System.Runtime/tests/System.Runtime.Tests/System/TimeSpanTests.cs');
const names=['MaxValue','MinValue','Zero','Ctor_Empty','Ctor_Long','Ctor_Int_Int_Int','Ctor_Int_Int_Int_Invalid','Ctor_Int_Int_Int_Int_Int','Ctor_Int_Int_Int_Int_Int_Invalid','Ctor_Int_Int_Int_Int_Int_Int','Ctor_Int_Int_Int_Int_Int_Int_Invalid','Ctor_Int_Int_Int_Int_Int_Int_WithNanosecond','TotalMilliseconds_Invalid'];
function extract(name){const start=source.indexOf('public static '+(name.includes('TestData')?'IEnumerable<object[]>':'void')+' '+name+'(');let end=source.indexOf('{',start)+1,depth=1;if(start<0)throw new Error(name);while(depth){if(source[end]==='{')depth++;if(source[end]==='}')depth--;end++;}return source.slice(start,end);}
let output='// Derived from official .NET 10.0.7 TimeSpan tests.\n// Licensed to the .NET Foundation under the MIT license.\ninternal static partial class TimeSpanCoreOracle {\n';
for(const name of names)output+=extract(name).replaceAll('new TimeSpan(', 'Create(')+'\n';
const nanoStart=source.indexOf('public static void Ctor_Int_Int_Int_Int_Int_Int_WithNanosecond(');
const nanoAttributes=source.slice(source.lastIndexOf('[Theory]',nanoStart),nanoStart);
const nanoValues=[...nanoAttributes.matchAll(/InlineData\((\d+)\)/g)].map(match=>Number(match[1]));
if(nanoValues.length!==3)throw new Error('Nanosecond inputs changed.');
output+='internal static readonly int[] Nanoseconds_TestData = { '+nanoValues.join(', ')+' };\n';
output+=extract('Total_Days_Hours_Minutes_Seconds_Milliseconds_TestData')+'\n}\n';
const path='tools/dotnet10-calendar-oracle/TimeSpanCoreReferenceInputs.g.cs';
if(mode==='--write')writeFileSync(path,output);else if(readFileSync(path,'utf8')!==output)throw new Error('Generated TimeSpan inputs differ.');
