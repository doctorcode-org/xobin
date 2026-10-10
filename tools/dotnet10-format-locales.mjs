import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixture = JSON.parse(readFileSync(path.join(root, 'tests/dotnet10/date-time-format-cases.json'), 'utf8'));
if (fixture.runtime !== '10.0.7') throw new Error('Expected .NET 10.0.7 locale reference.');
const mode = process.argv[2];
if (!['--write', '--check'].includes(mode)) throw new Error('Pass --write or --check.');
const header = '// Date format data generated from the pinned .NET 10.0.7 formatting oracle.\n';
for (const [name, data] of Object.entries(fixture.cultures)) {
  if (!name) {
    const file = path.join(root, 'packages/globalization/src/lib/date_time_format_context.ts');
    const source = readFileSync(file, 'utf8').replaceAll('\r\n', '\n');
    const pattern = /export const invariantDateTimeFormat: DateTimeFormatData = \{[\s\S]*?\n\s*\};(?=\s*\n\s*export const gregorianFormatCalendar)/;
    if (!pattern.test(source)) throw new Error('Invariant format block not found.');
    const output = source.replace(pattern, `export const invariantDateTimeFormat: DateTimeFormatData = ${JSON.stringify(data.formatInfo, null, 2)};`);
    if (mode === '--write') writeFileSync(file, output);
    else if (source !== output) throw new Error('Invariant format data differs from the reference.');
    continue;
  }
  if (!/^[a-zA-Z0-9-]+$/.test(name)) throw new Error('Invalid locale ID.');
  const file = path.join(root, 'packages/globalization/locales', `${name}.ts`);
  const previous = readFileSync(file, 'utf8');
  const source = previous.replaceAll('\r\n', '\n');
  const pattern = /^    dateTimeFormat: \{[\s\S]*?^    calendar:/m;
  if (!pattern.test(source)) throw new Error(`Locale format block not found: ${name}`);
  const render = (value) => JSON.stringify(value, null, 2).replaceAll('\n', '\n    ');
  const gregorian = data.calendar === 'GregorianCalendar' ? ''
    : `    gregorianDateTimeFormat: ${render(data.gregorianDateTimeFormat)},\n`;
  let output = source.replace(pattern, `    dateTimeFormat: ${render(data.formatInfo)},\n${gregorian}    calendar:`);
  // This extra field is generator metadata, not a member of CultureData or CultureInfo.
  const declaration = gregorian
    ? 'export const cultureData: CultureData & { gregorianDateTimeFormat?: CultureData["dateTimeFormat"] } = {'
    : 'export const cultureData: CultureData = {';
  output = output.replace(/^export const cultureData: .* = \{$/m, declaration);
  if (!output.startsWith(header)) output = header + output;
  if (mode === '--write') writeFileSync(file, output);
  else if (output !== source) throw new Error(`Locale differs from reference format data: ${name}`);
}
