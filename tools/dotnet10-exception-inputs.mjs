import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';

const [runtime, mode = '--check'] = process.argv.slice(2);
if (!runtime || !['--write', '--check'].includes(mode)) throw new Error('Pass runtime path and --write or --check.');
const tag = 'v10.0.7';
const git = (...args) => execFileSync('git', ['-C', runtime, ...args], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }).replaceAll('\r\n', '\n');
if (git('rev-parse', `${tag}^{commit}`).trim() !== '7706f546bac1a99b3d891afe3591dc88c67f0cc4') throw new Error('Reference changed.');
const names = ['Exception', 'SystemException', 'ArithmeticException', 'NullReferenceException', 'InvalidCastException', 'FormatException',
    'SerializationException', 'NotImplementedException', 'AmbiguousMatchException', 'InvalidOperationException', 'IndexOutOfRangeException',
    'InvalidProgramException', 'NotSupportedException', 'OverflowException', 'ArgumentException', 'ArgumentNullException', 'ArgumentOutOfRangeException', 'CultureNotFoundException'];
const tree = git('ls-tree', '-r', '--name-only', tag).split('\n');
const manifest = [];
const helperFile = 'src/libraries/System.Runtime/tests/System.Runtime.Tests/System/Exception.Helpers.cs';
const helperSource = git('show', `${tag}:${helperFile}`);
let output = '// Derived from official .NET 10.0.7 constructor tests.\n// Licensed to the .NET Foundation under the MIT license.\nusing System.Globalization;\nusing System.Reflection;\nusing System.Runtime.Serialization;\n';
let run = 'internal static class AllExceptionConstructorReference { internal static void Run() {\n';
for (const name of names) {
    const candidates = tree.filter(path => path.startsWith('src/libraries/') && path.includes('/tests/') && path.endsWith(`/${name}Tests.cs`));
    const file = name === 'AmbiguousMatchException' ? 'src/libraries/System.Runtime/tests/System.Reflection.Tests/ExceptionTests.cs'
        : candidates.find(path => path.includes('/System.Runtime.Tests/')) ?? candidates[0];
    if (!file) throw new Error(`Missing ${name} constructor tests.`);
    const source = git('show', `${tag}:${file}`);
    output += `internal static class ${name}ConstructorReference {\n`;
    for (const constant of source.matchAll(/private const (?:int|uint|string) \w+ = [^;]+;/g)) output += constant[0] + '\n';
    const pattern = name === 'AmbiguousMatchException' ? /public (?:static )?void (AmbiguousMatchException(?:_\w+)?)\(([^)]*)\)/g
        : /public (?:static )?void ((?:\w+_)?Ctor_\w+)\(([^)]*)\)/g;
    for (const match of source.matchAll(pattern)) {
        if (match[1].includes('SerializationInfo')) continue; // Obsolete BinaryFormatter constructors have no JS counterpart.
        let end = source.indexOf('{', match.index) + 1, depth = 1;
        while (depth) { if (source[end] === '{') depth++; if (source[end] === '}') depth--; end++; }
        const sourceClass = /public (?:static )?class (\w+)/.exec(source)[1];
        const method = `${sourceClass}.${match[1]}`;
        const id = `${file}::${method}@${source.slice(0, match.index).split('\n').length}`;
        const previous = source.slice(source.lastIndexOf('}', match.index) + 1, match.index);
        const inputs = match[2].trim() ? [...previous.matchAll(/\[InlineData\(([^\n]*)\)\]/g)].map(m => m[1]) : [''];
        if (!inputs.length) throw new Error(`Unexpanded ${method}.`);
        let body = source.slice(match.index, end).replace('public void ', 'public static void ')
            .replaceAll('ExceptionHelpers.', 'ExceptionConstructorHelpers.').replaceAll('Assert.', 'ExceptionConstructorAssert.')
            .replace(/new (Exception|\w+Exception)\(/g, 'ExceptionContractsOracle.Create<$1>(');
        output += body + '\n';
        inputs.forEach(input => { run += `ExceptionContractsOracle.Source = ${JSON.stringify(id)}; ${name}ConstructorReference.${match[1]}(${input});\n`; });
        manifest.push({ id, sourceFile: file, method, sourceSha256: createHash('sha256').update(source).digest('hex'), inputCount: inputs.length });
    }
    output += '}\n';
}
const helperStart = helperSource.indexOf('public static class ExceptionHelpers');
let helperEnd = helperSource.indexOf('{', helperStart) + 1, helperDepth = 1;
while (helperDepth) { if (helperSource[helperEnd] === '{') helperDepth++; if (helperSource[helperEnd] === '}') helperDepth--; helperEnd++; }
output += helperSource.slice(helperStart, helperEnd).replaceAll('ExceptionHelpers', 'ExceptionConstructorHelpers').replaceAll('Assert.', 'ExceptionConstructorAssert.') + '\n';
output += run + '} }\n';
for (const [path, text] of [
    ['tools/dotnet10-calendar-oracle/ExceptionConstructorReference.g.cs', output],
    ['tests/dotnet10/exception-constructor-sources.json', JSON.stringify({ sourceTag: tag,
        javascriptScope: 'Constructor message, parameter, actual value, inner exception, culture identifier and HRESULT contracts; shared helper Data/HelpLink/Source/StackTrace checks are outside this scope.',
        supportSource: { sourceFile: helperFile, sourceSha256: createHash('sha256').update(helperSource).digest('hex') }, constructors: manifest }, null, 2) + '\n'],
]) {
    if (mode === '--write') writeFileSync(path, text);
    else if (readFileSync(path, 'utf8') !== text) throw new Error(`${path} differs from the pinned constructor source.`);
}
