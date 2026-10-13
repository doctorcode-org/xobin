import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
const [runtime, mode = '--check'] = process.argv.slice(2);
if (!runtime || !['--write', '--check'].includes(mode)) throw new Error('Pass runtime path and mode.');
const git = (...args) => execFileSync('git', ['-C', runtime, ...args], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 }).replaceAll('\r\n', '\n');
if (git('rev-parse', 'v10.0.7^{commit}').trim() !== '7706f546bac1a99b3d891afe3591dc88c67f0cc4') throw new Error('Reference changed.');
const inventory = JSON.parse(readFileSync('tests/dotnet10-test-inventory.json'));
let output = '// Derived from official .NET 10.0.7 tests.\n// Licensed to the .NET Foundation under the MIT license.\nusing System.Globalization;\nusing System.Text;\n';
for (const type of ['DateOnly', 'TimeOnly', 'TimeSpan']) {
    const source = git('show', `v10.0.7:src/libraries/System.Runtime/tests/System.Runtime.Tests/System/${type}Tests.cs`);
    const selected = type === 'TimeSpan' ? ['ToString_TestData', 'ToString_Valid', 'ToString_InvalidFormat_TestData', 'ToString_InvalidFormat_ThrowsFormatException', 'TryFormat_Valid', 'TryFormat_InvalidFormat_ThrowsFormatException'] : ['TryFormatTest'];
    output += `internal static class ${type}FormatReferenceTests {\n`;
    if (type === 'TimeSpan') output += 'private static class PlatformDetection { internal static bool IsInvariantGlobalization => false; internal static bool IsNotInvariantGlobalization => true; }\n';
    for (const name of selected) {
        const match = new RegExp('public (?:static )?(?:void|IEnumerable<object\\[\\]>) ' + name + '\\(').exec(source);
        if (!match) throw new Error(name);
        let end = source.indexOf('{', match.index) + 1, depth = 1;
        while (depth) { if (source[end] === '{') depth++; if (source[end] === '}') depth--; end++; }
        const method = inventory.methods.find(m => m.class === type + 'Tests' && m.method === name);
        if (method) output += method.annotations.join('\n') + '\n';
        // Adapt instance test entry points to static reflection dispatch; fix wall-clock inputs only.
        output += source.slice(match.index, end).replace('public void ', 'public static void ').replaceAll('DateTime.Now', 'TemporalFormatOracle.Now').replaceAll('DateTime.Today', 'TemporalFormatOracle.Now.Date').replaceAll(type, 'FormatObserved' + type) + '\n';
    }
    if (type !== 'TimeSpan') {
        for (const name of ['OAndRFormatsTest', 'CustomFormattingTest']) {
            const match = new RegExp('public static void ' + name + '\\(').exec(source);
            let end = source.indexOf('{', match.index) + 1, depth = 1;
            while (depth) { if (source[end] === '{') depth++; if (source[end] === '}') depth--; end++; }
            // These methods mix formatting and parsing. Keep only formatting statements and assertions,
            // and do not map the whole official method until its parsing assertions are implemented.
            const portion = source.slice(match.index, end).split('\n').filter(line => !/parsed|Parse/.test(line)).join('\n');
            output += '// Formatting portion only; parsing remains deferred.\n' + portion.replace(name, name + '_FormattingPortion').replaceAll('DateTime.Now', 'TemporalFormatOracle.Now').replaceAll('DateTime.Today', 'TemporalFormatOracle.Now.Date').replaceAll(type, 'FormatObserved' + type) + '\n';
        }
    }
    output += '}\n';
}
const path = 'tools/dotnet10-calendar-oracle/TemporalFormatReferenceTests.g.cs';
if (mode === '--write') writeFileSync(path, output); else if (readFileSync(path, 'utf8') !== output) throw new Error('Formatting reference source differs.');
