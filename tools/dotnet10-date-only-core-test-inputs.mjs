import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const [runtime, mode = '--check'] = process.argv.slice(2);
if (!runtime || !['--write', '--check'].includes(mode)) throw new Error('Pass runtime path and mode.');
const git = (...args) => execFileSync('git', ['-C', runtime, ...args], { encoding: 'utf8' }).replaceAll('\r\n', '\n');
if (git('rev-parse', 'v10.0.7^{commit}').trim() !== '7706f546bac1a99b3d891afe3591dc88c67f0cc4') throw new Error('Reference changed.');
const source = git('show', 'v10.0.7:src/libraries/System.Runtime/tests/System.Runtime.Tests/System/DateOnlyTests.cs');
const names = ['FromDayNumberTest', 'DayOfWeekAndDayOfYearTest', 'AddDaysTest', 'AddMonthsTest', 'AddYearsTest', 'OperatorsTest', 'DateTimeConversionTest', 'ComparisonsTest', 'GetHashCodeTest', 'DeconstructionTest'];
let output = '// Derived from official .NET 10.0.7 tests.\n// Licensed to the .NET Foundation under the MIT license.\nusing DateOnly = ObservedDateOnly;\ninternal static class DateOnlyCoreTests {\n';
for (const name of names) {
  const match = new RegExp('public static void ' + name + '\\(').exec(source);
  if (!match) throw new Error(name);
  let end = source.indexOf('{', match.index) + 1, depth = 1;
  while (depth) { if (source[end] === '{') depth++; if (source[end] === '}') depth--; end++; }
  const attributes = source.slice(source.lastIndexOf(name === 'DeconstructionTest' ? '[Theory]' : '[Fact]', match.index), match.index).trim();
  output += attributes + '\n' + source.slice(match.index, end).replaceAll('DateTime.Today', 'DateOnlyCoreOracle.Today') + '\n';
}
output += '}\n';
const path = 'tools/dotnet10-calendar-oracle/DateOnlyCoreReferenceTests.g.cs';
if (mode === '--write') writeFileSync(path, output); else if (readFileSync(path, 'utf8') !== output) throw new Error('DateOnly core source differs.');
