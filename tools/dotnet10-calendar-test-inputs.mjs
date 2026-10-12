import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const runtime = process.argv[2], mode = process.argv[3] ?? '--check';
if (!runtime || !['--write', '--check'].includes(mode)) throw new Error('Pass runtime path and --write or --check.');
const git = (...args) => execFileSync('git', ['-C', runtime, ...args], { encoding: 'utf8' }).replaceAll('\r\n', '\n');
const tag = 'v10.0.7';
if (git('rev-parse', tag + '^{commit}').trim() !== '7706f546bac1a99b3d891afe3591dc88c67f0cc4') throw new Error('Reference commit changed.');
const root = 'src/libraries/System.Runtime/tests/System.Globalization.Calendars.Tests/';
const header = '// Derived from the official .NET 10.0.7 calendar test input providers.\n// Licensed to the .NET Foundation under the MIT license.\n';
const source = git('show', tag + ':' + root + 'System/Globalization/CalendarTestBase.cs');
let helpers = source.slice(source.indexOf('        public enum DataType'), source.indexOf('        [Fact]', source.indexOf('public static IEnumerable<DateTime> DateTime_TestData')));
helpers = helpers.replaceAll('PlatformDetection.IsIcuGlobalization', '(!System.AppContext.TryGetSwitch("System.Globalization.UseNls", out bool useNls) || !useNls)');
helpers = helpers.replaceAll('Assert.InRange(era, 0, eras[0]);', 'if (era < 0 || era > eras[0]) throw new InvalidOperationException("Invalid reference era.");');
helpers = helpers.replaceAll('private static', 'internal static').replace('public IEnumerable<', 'public static IEnumerable<');
const outputs = [['CalendarReferenceInputs.g.cs', header + 'using System.Globalization;\nusing System.Reflection;\ninternal static class CalendarReferenceInputs {\n' + helpers + '}\n']];
let providers = header + 'using System.Globalization;\ninternal static class CalendarDirectInputs {\n';
for (const [file, method] of [['JapaneseCalendar/JapaneseCalendarAddMonths.cs', 'AddMonths_TestData'], ['Misc/Calendars.cs', 'Calendars_TestData']]) {
    const text = git('show', tag + ':' + root + file);
    const start = text.indexOf('public static IEnumerable<object[]> ' + method);
    let end = text.indexOf('{', start) + 1, depth = 1;
    while (depth) { if (text[end] === '{') depth++; if (text[end] === '}') depth--; end++; }
    providers += text.slice(start, end) + '\n';
}
outputs.push(['CalendarDirectInputs.g.cs', providers + '}\n']);
for (const [name, text] of outputs) {
    const path = 'tools/dotnet10-calendar-oracle/' + name;
    if (mode === '--write') writeFileSync(path, text);
    else if (readFileSync(path, 'utf8') !== text) throw new Error('Generated provider differs: ' + name);
}
