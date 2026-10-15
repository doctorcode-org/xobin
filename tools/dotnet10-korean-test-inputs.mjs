import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
const runtime=process.argv[2], mode=process.argv[3]??'--check';
if(!runtime || !['--write','--check'].includes(mode)) throw new Error('Pass runtime path and --write or --check.');
const tag='v10.0.7';
const git=(...args)=>execFileSync('git',['-C',runtime,...args],{encoding:'utf8'}).replaceAll('\r\n','\n');
if(git('rev-parse',tag+'^{commit}').trim()!=='7706f546bac1a99b3d891afe3591dc88c67f0cc4') throw new Error('Reference commit changed.');
const root='src/libraries/System.Runtime/tests/System.Globalization.Calendars.Tests/KoreanCalendar/';
const files=git('ls-tree','-r','--name-only',tag,root).trim().split('\n');
const header='// Generated from the official .NET 10.0.7 test input providers.\n// Licensed to the .NET Foundation under one or more agreements.\n// The .NET Foundation licenses this file to you under the MIT license.\n';
let code=header+'using System.Globalization;\nnamespace KoreanReferenceData {\n';
const providers=[];
for(const file of files) {
 const source=git('show',tag+':'+file), cls=source.match(/public class (\w+)/)[1];
 code+='internal static class '+cls+' {\nprivate static readonly RandomDataGenerator s_randomDataGenerator = new();\n';
 for(const match of source.matchAll(/public static IEnumerable<object\[\]> (\w+)\(\)\s*\{/g)) {
  let end=match.index+match[0].length, depth=1;
  while(depth) {if(source[end]==='{')depth++;if(source[end]==='}')depth--;end++;}
  code+=source.slice(match.index,end)+'\n';
  const method=source.match(new RegExp('\\[MemberData\\(nameof\\('+match[1]+'\\)\\)\\]\\s*public void (\\w+)'))[1];
  providers.push('foreach (var input in '+cls+'.'+match[1]+'()) yield return ("'+cls+'.'+method+'", input);');
 }
 for(const match of source.matchAll(/((?:\s*\[InlineData\([^\n]+\)\])+)[\s\r\n]*public void (\w+)/g)) {
  for(const row of match[1].matchAll(/InlineData\(([^)]+)\)/g))providers.push('yield return ("'+cls+'.'+match[2]+'", new object[] { '+row[1]+' });');
 }
 code+='}\n';
}
code+='internal static class Inputs { internal static IEnumerable<(string Source, object[] Input)> Get() {\n'+providers.join('\n')+'\n} }\n}\n';
const random=header+git('show',tag+':src/libraries/Common/tests/System/RandomDataGenerator.cs');
for(const [name,text] of [['KoreanCalendarReferenceData.g.cs',code],['ReferenceRandomDataGenerator.g.cs',random]]) {
 const path='tools/dotnet10-calendar-oracle/'+name;
 if(mode==='--write')writeFileSync(path,text);else if(readFileSync(path,'utf8')!==text)throw new Error('Generated reference provider differs: '+name);
}
