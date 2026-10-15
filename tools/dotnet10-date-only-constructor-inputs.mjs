import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const [runtime, mode = '--check'] = process.argv.slice(2);
if (!runtime || !['--write', '--check'].includes(mode)) throw new Error('Pass runtime path and --write or --check.');
const git = (...args) => execFileSync('git', ['-C', runtime, ...args], { encoding: 'utf8' }).replaceAll('\r\n', '\n');
if (git('rev-parse', 'v10.0.7^{commit}').trim() !== '7706f546bac1a99b3d891afe3591dc88c67f0cc4') throw new Error('Reference commit changed.');
const source = git('show', 'v10.0.7:src/libraries/System.Runtime/tests/System.Runtime.Tests/System/DateOnlyTests.cs');
function extract(name) {
  const match = new RegExp('public static [^\\n]+ ' + name + '\\(').exec(source);
  if (!match) throw new Error(name);
  let end = source.indexOf('{', match.index) + 1, depth = 1;
  while (depth) { if (source[end] === '{') depth++; if (source[end] === '}') depth--; end++; }
  return source.slice(match.index, end);
}
let output = '// Derived from official .NET 10.0.7 tests.\n// Licensed to the .NET Foundation under the MIT license.\nusing System.Globalization;\ninternal static partial class DateOnlyConstructorOracle {\n';
for (const name of ['MinMaxValuesTest', 'Constructor_TestData', 'ConstructorsTest', 'ConstructorsNegativeCasesTest']) {
  output += extract(name).replaceAll('new DateOnly(', 'Create(').replaceAll('DateOnly.MinValue', 'Record("min", [], () => DateOnly.MinValue)').replaceAll('DateOnly.MaxValue', 'Record("max", [], () => DateOnly.MaxValue)') + '\n';
}
output += '}\n';
const path = 'tools/dotnet10-calendar-oracle/DateOnlyConstructorReferenceInputs.g.cs';
if (mode === '--write') writeFileSync(path, output); else if (readFileSync(path, 'utf8') !== output) throw new Error('DateOnly constructor inputs differ.');
