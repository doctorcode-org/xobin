import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixture = JSON.parse(readFileSync(path.join(root, 'tests/dotnet10/date-time-format-cases.json'), 'utf8'));
if (fixture.runtime !== '10.0.7') throw new Error('Expected .NET 10.0.7 locale reference.');
const mode = process.argv[2];
if (!['--write', '--check'].includes(mode)) throw new Error('Pass --write or --check.');
const header = '// Date format data generated from the pinned .NET 10.0.7 formatting oracle.\n';
const calendarTypes = { 1: 'GregorianCalendar', 3: 'JapaneseCalendar', 4: 'TaiwanCalendar', 5: 'KoreanCalendar', 6: 'HijriCalendar', 7: 'ThaiBuddhistCalendar', 8: 'HebrewCalendar', 22: 'PersianCalendar', 23: 'UmAlQuraCalendar' };
const calendarImport = name => `import { ${name} } from '@xobin/globalization/${name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}';\n`;
const declaration = 'export const cultureData: CultureData & { calendarFormats?: Readonly<Record<number, Partial<CultureData["dateTimeFormat"]>>>; calendarFactories?: ReadonlyArray<() => CultureData["calendar"]> } = {';
const existingLocaleFiles = new Map(readdirSync(path.join(root, 'packages/globalization/locales'))
  .filter(file => file.endsWith('.ts')).map(file => [file.slice(0, -3).toLowerCase(), file.slice(0, -3)]));
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
  const ids = data.optionalCalendarIds;
  if (!ids || ids.some(id => !calendarTypes[id])) throw new Error('Missing optional calendar: ' + name);
  const moduleName = existingLocaleFiles.get(name.toLowerCase()) ?? name;
  const file = path.join(root, 'packages/globalization/locales', `${moduleName}.ts`);
  const previous = existsSync(file) ? readFileSync(file, 'utf8')
    : `import { CultureData, ${data.calendar} } from '@xobin/globalization';\nexport const cultureData: CultureData = ${JSON.stringify(data.localeInfo, null, 4).slice(0, -2)},\n    dateTimeFormat: {},\n    calendar: new ${data.calendar}()\n};\n`;
  if (mode === '--check' && !existsSync(file)) throw new Error('Locale module is missing: ' + name);
  const source = previous.replaceAll('\r\n', '\n');
  const pattern = /^    dateTimeFormat: \{[\s\S]*?^    calendar:/m;
  if (!pattern.test(source)) throw new Error(`Locale format block not found: ${name}`);
  const render = (value) => JSON.stringify(value, null, 2).replaceAll('\n', '\n    ');
  // Gregorian overrides serve the standard U format without loading another calendar.
  const defaultFormats = data.calendarId === 1 ? {} : { 1: data.calendarFormats[1] };
  if (data.calendarId !== 1 && !defaultFormats[1]) throw new Error('Missing Gregorian U format: ' + name);
  const calendarFormats = `    calendarFormats: ${render(defaultFormats)},\n`;
  let output = source.replace(pattern, `    dateTimeFormat: ${render(data.formatInfo)},\n${calendarFormats}    calendar:`);
  if (!['GregorianCalendar', 'ThaiBuddhistCalendar', 'PersianCalendar', 'UmAlQuraCalendar'].includes(data.calendar)) {
    throw new Error('Default calendar implementation is missing: ' + name + '/' + data.calendar);
  }
  output = output.replace(/^(?:import[^\n]*\n)+/m,
    "import type { CultureData } from '@xobin/globalization';\n" + calendarImport(data.calendar));
  output = output.replace(/^    calendar: .*$/m,
    `    calendar: new ${data.calendar}(${data.calendar === 'GregorianCalendar' ? data.calendarId : ''})`);
  // This extra field is generator metadata, not a member of CultureData or CultureInfo.
  output = output.replace(/^export const cultureData: .* = \{$/m, declaration);
  // Interval formatting and exception messages use these existing numeric symbols.
  for (const property of ['numberDecimalSeparator', 'negativeSign', 'positiveSign', 'naNSymbol', 'negativeInfinitySymbol', 'positiveInfinitySymbol']) {
    const expected = JSON.stringify(data.localeInfo.numberFormat[property]);
    const pattern = new RegExp('^(\\s*(?:' + property + '|"' + property + '"):\\s*)("(?:[^"\\\\]|\\\\.)*"),[ \\t]*$', 'm');
    if (!pattern.test(output)) throw new Error('Missing number symbol: ' + name + '/' + property);
    output = output.replace(pattern, (line, prefix, value) => value === expected ? line : prefix + expected + ',');
  }
  if (!output.startsWith(header)) output = header + output;
  if (mode === '--write') writeFileSync(file, output);
  else if (output !== source) throw new Error(`Locale differs from reference format data: ${name}`);

  // An explicit module restores alternate calendars with the unchanged cultureData loader.
  const fullFile = path.join(root, 'packages/globalization/locales', name, 'full.ts');
  const extraFormats = Object.fromEntries(Object.entries(data.calendarFormats)
    .filter(([id]) => Number(id) !== data.calendarId && !Object.hasOwn(defaultFormats, id)));
  const extraFields = Object.entries(extraFormats).map(([id, value]) => `        ${JSON.stringify(id)}: ${render(value).replaceAll('\n', '\n    ')}`);
  const factories = ids.map(id => '() => new ' + calendarTypes[id] + '(' + (id === 1 ? id : '') + ')').join(', ');
  const fullOutput = header
    + "import type { CultureData } from '@xobin/globalization';\n"
    + [...new Set(ids.map(id => calendarTypes[id]))].map(calendarImport).join('')
    + `import { cultureData as defaultCultureData } from '@xobin/globalization/locales/${moduleName}';\n`
    + declaration + '\n'
    + '    ...defaultCultureData,\n'
    + '    calendarFormats: {\n        ...defaultCultureData.calendarFormats' + (extraFields.length ? ',\n' + extraFields.join(',\n') : '') + '\n    },\n'
    + `    calendarFactories: [${factories}]\n};\n`;
  if (mode === '--write') {
    mkdirSync(path.dirname(fullFile), { recursive: true });
    writeFileSync(fullFile, fullOutput);
  } else if (!existsSync(fullFile) || readFileSync(fullFile, 'utf8').replaceAll('\r\n', '\n') !== fullOutput) {
    throw new Error('Full calendar locale differs from reference: ' + name);
  }
}


// Keep the existing CultureName union aligned with the independently generated modules.
const cultureFile = path.join(root, 'packages/globalization/src/lib/culture_info.ts');
const cultureSource = readFileSync(cultureFile, 'utf8').replaceAll('\r\n', '\n');
const collection = 'interface CultureCollection {\n' + Object.keys(fixture.cultures).sort()
  .map(name => '    ' + JSON.stringify(name) + ': CultureInfo;').join('\n') + '\n}';
const cultureOutput = cultureSource.replace(/interface CultureCollection \{[\s\S]*?\n\}/, collection);
if (mode === '--write') writeFileSync(cultureFile, cultureOutput);
else if (cultureSource !== cultureOutput) throw new Error('CultureName union differs from the locale catalog.');
