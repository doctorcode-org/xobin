import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';

const runtime = process.argv[2];
const output = process.argv[3];
const mode = process.argv[4] ?? '--check';
if (!runtime || !output || !['--check', '--write'].includes(mode)) {
  throw new Error('Usage: node tools/dotnet10-persian-data.mjs <dotnet/runtime> <output> [--check|--write]');
}

const source = 'src/libraries/System.Runtime/tests/System.Globalization.Calendars.Tests/System/Globalization/PersianCalendarTests.cs';
const trustedPath = runtime.replaceAll('\\', '/');
const content = execFileSync('git', ['-c', `safe.directory=${trustedPath}`, '-C', runtime,
  'show', `v10.0.7:${source}`], { encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });

function values(name) {
  const match = content.match(new RegExp(`private static int\\[\\] ${name}\\s*=\\s*new int\\[\\]\\s*\\{([^}]+)\\}`, 's'));
  if (!match) throw new Error(`Missing ${name} in ${source}`);
  return [...match[1].replace(/\/\/[^\n]*/g, '').matchAll(/\b\d+\b/g)].map(item => Number(item[0]));
}

const rawDates = values('s_dates');
const leapYears = values('s_leapYears');
if (rawDates.length % 6 !== 0 || leapYears.length === 0) throw new Error('Invalid Persian reference data');
const dates = [];
for (let index = 0; index < rawDates.length; index += 6) dates.push(rawDates.slice(index, index + 6));
if (dates[0].join(',') !== '1,1,1,622,3,22'
  || dates.at(-1).join(',') !== '9378,10,13,9999,12,31') {
  throw new Error('Unexpected Persian conversion boundaries');
}

const serialized = `${JSON.stringify({ sourceTag: 'v10.0.7', source, dates, leapYears }, null, 2)}\n`;
if (mode === '--write') {
  writeFileSync(output, serialized, 'utf8');
} else if (readFileSync(output, 'utf8') !== serialized) {
  throw new Error('Persian source data differs from the pinned .NET test source');
}
process.stdout.write(`${dates.length} conversion rows; ${leapYears.length} leap years\n`);
