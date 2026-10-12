import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const [runtime, mode = '--check'] = process.argv.slice(2);
if (!runtime || !['--write', '--check'].includes(mode)) throw new Error('Pass runtime path and mode.');
const git = (...args) => execFileSync('git', ['-C', runtime, ...args], { encoding: 'utf8' }).replaceAll('\r\n', '\n');
if (git('rev-parse', 'v10.0.7^{commit}').trim() !== '7706f546bac1a99b3d891afe3591dc88c67f0cc4') throw new Error('Reference changed.');
const source = git('show', 'v10.0.7:src/libraries/System.Runtime/tests/System.Runtime.Tests/System/TimeOnlyTests.cs');
const methods = JSON.parse(readFileSync('tests/dotnet10-test-inventory.json')).methods.filter(method => method.class === 'TimeOnlyTests' && !/Format|Parse|Cultures/.test(method.method));
let output = '// Derived from official .NET 10.0.7 tests.\n// Licensed to the .NET Foundation under the MIT license.\nusing TimeOnly = ObservedTimeOnly;\ninternal static class TimeOnlyCoreTests {\n';
for (const method of methods) {
  const match = new RegExp('public static void ' + method.method + '\\(').exec(source);
  if (!match) throw new Error(method.method);
  let end = source.indexOf('{', match.index) + 1, depth = 1;
  while (depth) { if (source[end] === '{') depth++; if (source[end] === '}') depth--; end++; }
  output += method.annotations.join('\n') + '\n' + source.slice(match.index, end).replaceAll('DateTime.Now', 'TimeOnlyCoreOracle.Now').replaceAll('DateTime.Today', 'TimeOnlyCoreOracle.Today') + '\n';
}
output += '}\n';
const path = 'tools/dotnet10-calendar-oracle/TimeOnlyCoreReferenceTests.g.cs';
if (mode === '--write') writeFileSync(path, output); else if (readFileSync(path, 'utf8') !== output) throw new Error('TimeOnly core source differs.');
