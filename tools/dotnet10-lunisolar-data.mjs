import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const runtime = process.argv[2], mode = process.argv[3] ?? '--check';
if (!runtime || !['--write', '--check'].includes(mode)) throw new Error('Pass runtime path and --write or --check.');
const git = (...args) => execFileSync('git', ['-C', runtime, ...args], { encoding: 'utf8' });
if (git('rev-parse', 'v10.0.7^{commit}').trim() !== '7706f546bac1a99b3d891afe3591dc88c67f0cc4') throw new Error('Reference commit changed.');
for (const [name, file] of [['Chinese', 'chinese'], ['Japanese', 'japanese'], ['Korean', 'korean'], ['Taiwan', 'taiwan']]) {
    const source = git('show', 'v10.0.7:src/libraries/System.Private.CoreLib/src/System/Globalization/' + name + 'LunisolarCalendar.cs');
    const min = Number(source.match(/MinLunisolarYear = (\d+)/)[1]);
    const max = Number(source.match(/MaxLunisolarYear = (\d+)/)[1]);
    const table = source.slice(source.indexOf('s_yinfo ='), source.indexOf('internal override int MinCalendarYear'));
    const rows = [...table.matchAll(/\{\s*(\d+),\s*(\d+),\s*(\d+),\s*(0b[01]+|\d+)\s*\}/g)].map(match => match.slice(1).map(Number));
    if (rows.length !== max - min + 1) throw new Error('Unexpected year table length: ' + name);
    const text = '// Licensed to the .NET Foundation under one or more agreements.\n// The .NET Foundation licenses this file to you under the MIT license.\n\n// Generated from .NET 10.0.7 ' + name + 'LunisolarCalendar.cs.\nexport const yearInfo: ReadonlyArray<readonly number[]> = [\n'
        + rows.map((row, index) => '    [' + row.join(', ') + '], // ' + (min + index)).join('\n') + '\n];\n';
    const path = 'packages/globalization/src/lib/' + file + '_lunisolar_calendar_data.ts';
    if (mode === '--write') writeFileSync(path, text);
    else if (readFileSync(path, 'utf8') !== text) throw new Error('Generated lunisolar data differs: ' + name);
}
