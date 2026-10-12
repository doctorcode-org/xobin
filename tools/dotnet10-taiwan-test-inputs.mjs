import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const runtime = process.argv[2], mode = process.argv[3] ?? '--check';
if (!runtime || !['--write', '--check'].includes(mode)) throw new Error('Pass runtime path and --write or --check.');
const tag = 'v10.0.7';
const git = (...args) => execFileSync('git', ['-C', runtime, ...args], { encoding: 'utf8' }).replaceAll('\r\n', '\n');
if (git('rev-parse', tag + '^{commit}').trim() !== '7706f546bac1a99b3d891afe3591dc88c67f0cc4') throw new Error('Reference commit changed.');
const root = 'src/libraries/System.Runtime/tests/System.Globalization.Calendars.Tests/TaiwanCalendar/';
const header = '// Generated from the official .NET 10.0.7 test input providers.\n// Licensed to the .NET Foundation under one or more agreements.\n// The .NET Foundation licenses this file to you under the MIT license.\n';
let code = header + 'using System.Globalization;\nnamespace TaiwanReferenceData {\n';
const providers = [];
for (const file of git('ls-tree', '-r', '--name-only', tag, root).trim().split('\n')) {
    const source = git('show', tag + ':' + file);
    if (file.endsWith('/TaiwanCalendarUtilities.cs')) {
        code += source.slice(source.indexOf('    public static class'));
        continue;
    }
    const cls = source.match(/public class (\w+)/)[1];
    code += 'internal static class ' + cls + ' {\n';
    for (const match of source.matchAll(/public static IEnumerable<object\[\]> (\w+)\(\)\s*\{/g)) {
        let end = match.index + match[0].length, depth = 1;
        while (depth) { if (source[end] === '{') depth++; if (source[end] === '}') depth--; end++; }
        code += source.slice(match.index, end) + '\n';
        const method = source.match(new RegExp('\\[MemberData\\(nameof\\(' + match[1] + '\\)\\)\\]\\s*public (?:static )?void (\\w+)'))[1];
        providers.push('foreach (var input in ' + cls + '.' + match[1] + '()) yield return ("' + cls + '.' + method + '", input);');
    }
    code += '}\n';
}
// The utility's original namespace closing brace also closes our generated namespace.
code += 'namespace TaiwanReferenceData { internal static class Inputs { internal static IEnumerable<(string Source, object[] Input)> Get() {\n' + providers.join('\n') + '\n} } }\n';
const path = 'tools/dotnet10-calendar-oracle/TaiwanCalendarReferenceData.g.cs';
if (mode === '--write') writeFileSync(path, code);
else if (readFileSync(path, 'utf8') !== code) throw new Error('Generated reference provider differs.');
