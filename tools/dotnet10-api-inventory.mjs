import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const sourceTag = 'v10.0.7';
const runtime = process.argv[2];
const localReference = runtime === '--local';
const mode = process.argv[3] ?? '--check';
if (!runtime || !['--check', '--write'].includes(mode)) {
  throw new Error('Usage: node tools/dotnet10-api-inventory.mjs <dotnet/runtime directory> [--check|--write]');
}

const repository = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const referencePath = resolve(repository, 'tests/dotnet10-api-reference.json');
const outputPath = resolve(repository, 'tests/dotnet10-api-inventory.json');
const packageRoot = resolve(repository, 'packages/globalization');
const indexSource = readFileSync(resolve(packageRoot, 'src/index.ts'), 'utf8');
const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8'));
const reference = JSON.parse(readFileSync(referencePath, 'utf8'));
if (reference.runtime !== '10.0.7') throw new Error(`Expected .NET 10.0.7 reference, got ${reference.runtime}.`);

function git(...args) {
  const trustedPath = resolve(runtime).replace(/\\/g, '/');
  return execFileSync('git', ['-c', `safe.directory=${trustedPath}`, '-C', runtime, ...args], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  }).trimEnd();
}

const sourceCommit = localReference ? '7706f546bac1a99b3d891afe3591dc88c67f0cc4' : git('rev-parse', `${sourceTag}^{commit}`);
if (sourceCommit !== '7706f546bac1a99b3d891afe3591dc88c67f0cc4') {
  throw new Error(`Unexpected ${sourceTag} commit: ${sourceCommit}`);
}

const localTypes = new Map(Object.entries({
  'System.DateTime': ['src/lib/date_time.ts', 'DateTime', './date-time'],
  'System.TimeSpan': ['src/lib/time_span.ts', 'TimeSpan', './time-span'],
  'System.DateOnly': ['src/lib/date_only.ts', 'DateOnly', './date-only'],
  'System.TimeOnly': ['src/lib/time_only.ts', 'TimeOnly', './time-only'],
  'System.Globalization.Calendar': ['src/lib/calendar.ts', 'Calendar', './calendar'],
  'System.Globalization.GregorianCalendar': ['src/lib/gregorian_calendar.ts', 'GregorianCalendar', './gregorian-calendar'],
  'System.Globalization.PersianCalendar': ['src/lib/persian_calendar.ts', 'PersianCalendar', './persian-calendar'],
  'System.Globalization.ThaiBuddhistCalendar': ['src/lib/thaibuddhist_calendar.ts', 'ThaiBuddhistCalendar', './thai-buddhist-calendar'],
  'System.Globalization.UmAlQuraCalendar': ['src/lib/umalqura_calendar.ts', 'UmAlQuraCalendar', './um-al-qura-calendar'],
  'System.Globalization.JapaneseCalendar': ['src/lib/japanese_calendar.ts', 'JapaneseCalendar', './japanese-calendar'],
  'System.Globalization.KoreanCalendar': ['src/lib/korean_calendar.ts', 'KoreanCalendar', './korean-calendar'],
  'System.Globalization.TaiwanCalendar': ['src/lib/taiwan_calendar.ts', 'TaiwanCalendar', './taiwan-calendar'],
  'System.Globalization.HijriCalendar': ['src/lib/hijri_calendar.ts', 'HijriCalendar', './hijri-calendar'],
  'System.Globalization.HebrewCalendar': ['src/lib/hebrew_calendar.ts', 'HebrewCalendar', './hebrew-calendar'],
  'System.Globalization.JulianCalendar': ['src/lib/julian_calendar.ts', 'JulianCalendar', './julian-calendar'],
  'System.Globalization.EastAsianLunisolarCalendar': ['src/lib/east_asian_lunisolar_calendar.ts', 'EastAsianLunisolarCalendar', './east-asian-lunisolar-calendar'],
  'System.Globalization.ChineseLunisolarCalendar': ['src/lib/chinese_lunisolar_calendar.ts', 'ChineseLunisolarCalendar', './chinese-lunisolar-calendar'],
  'System.Globalization.JapaneseLunisolarCalendar': ['src/lib/japanese_lunisolar_calendar.ts', 'JapaneseLunisolarCalendar', './japanese-lunisolar-calendar'],
  'System.Globalization.KoreanLunisolarCalendar': ['src/lib/korean_lunisolar_calendar.ts', 'KoreanLunisolarCalendar', './korean-lunisolar-calendar'],
  'System.Globalization.TaiwanLunisolarCalendar': ['src/lib/taiwan_lunisolar_calendar.ts', 'TaiwanLunisolarCalendar', './taiwan-lunisolar-calendar'],
  'System.Globalization.ISOWeek': ['src/lib/iso_week.ts', 'ISOWeek', './iso-week'],
  'System.Globalization.DateTimeFormatInfo': ['src/lib/date_time_format_info.ts', 'DateTimeFormatInfo', './date-time-format-info'],
  'System.Globalization.CultureInfo': ['src/lib/culture_info.ts', 'CultureInfo', './culture-info'],
  'System.DateTimeKind': ['src/lib/date_time_kind.ts', 'DateTimeKind', './date-time-kind'],
  'System.DayOfWeek': ['src/lib/day_of_week.ts', 'DayOfWeek', './day-of-week'],
  'System.Globalization.DateTimeStyles': ['src/lib/date_time_styles.ts', 'DateTimeStyles', './date-time-styles'],
  'System.Globalization.CalendarAlgorithmType': ['src/lib/calendar_algorithm_type.ts', 'CalendarAlgorithmType', './calendar-algorithm-type'],
  'System.Globalization.CalendarWeekRule': ['src/lib/calendar_week_rule.ts', 'CalendarWeekRule', './calendar-week-rule'],
  'System.Globalization.GregorianCalendarTypes': ['src/lib/gregorian_calendar_types.ts', 'GregorianCalendarTypes', './gregorian-calendar-types'],
}));

const typeTasks = new Map(Object.entries({
  'System.Globalization.Calendar': 'CAL-01',
  'System.Globalization.GregorianCalendar': 'CAL-02/CAL-03',
  'System.Globalization.PersianCalendar': 'CAL-04',
  'System.Globalization.ThaiBuddhistCalendar': 'CAL-05',
  'System.Globalization.UmAlQuraCalendar': 'CAL-06',
  'System.Globalization.KoreanCalendar': 'CAL-07',
  'System.Globalization.TaiwanCalendar': 'CAL-08',
  'System.Globalization.JapaneseCalendar': 'CAL-09',
  'System.Globalization.JulianCalendar': 'CAL-10',
  'System.Globalization.HijriCalendar': 'CAL-11',
  'System.Globalization.HebrewCalendar': 'CAL-12',
  'System.Globalization.EastAsianLunisolarCalendar': 'LUNI-01',
  'System.Globalization.ChineseLunisolarCalendar': 'LUNI-02',
  'System.Globalization.JapaneseLunisolarCalendar': 'LUNI-03',
  'System.Globalization.KoreanLunisolarCalendar': 'LUNI-04',
  'System.Globalization.TaiwanLunisolarCalendar': 'LUNI-05',
}));

const memberAliases = new Map([
  ['System.DateTimeKind::Unspecified', 'unspecified'],
  ['System.DateTimeKind::Utc', 'utc'],
  ['System.DateTimeKind::Local', 'local'],
  ['System.Globalization.DateTimeFormatInfo::RFC1123Pattern', 'rfc1123Pattern'],
  ['System.Globalization.DateTimeFormatInfo::AMDesignator', 'amDesignator'],
  ['System.Globalization.DateTimeFormatInfo::PMDesignator', 'pmDesignator'],
]);

function lowerFirst(value) {
  return value.length === 0 ? value : value[0].toLowerCase() + value.slice(1);
}

function hasModifier(node, kind) {
  return Boolean(node.modifiers?.some(modifier => modifier.kind === kind));
}

function nodeName(node, source) {
  if (!node.name) return null;
  if (ts.isIdentifier(node.name) || ts.isPrivateIdentifier(node.name)) return node.name.text;
  if (ts.isStringLiteral(node.name) || ts.isNumericLiteral(node.name)) return node.name.text;
  return node.name.getText(source);
}

function parameterRange(parameters) {
  let minimum = 0;
  let maximum = parameters.length;
  for (const parameter of parameters) {
    if (!parameter.questionToken && !parameter.initializer && !parameter.dotDotDotToken) minimum++;
    if (parameter.dotDotDotToken) maximum = Number.POSITIVE_INFINITY;
  }
  return { minimum, maximum };
}

function readLocalType(file, symbol) {
  const absolute = resolve(packageRoot, file);
  if (!existsSync(absolute)) return null;
  const text = readFileSync(absolute, 'utf8');
  const source = ts.createSourceFile(absolute, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const declaration = source.statements.find(statement =>
    (ts.isClassDeclaration(statement) || ts.isInterfaceDeclaration(statement) || ts.isEnumDeclaration(statement))
    && statement.name?.text === symbol);
  if (!declaration) return { file, symbol, declarationKind: 'missing-declaration', members: [], stubNames: [] };

  if (ts.isEnumDeclaration(declaration)) {
    return {
      file,
      symbol,
      declarationKind: 'enum',
      members: declaration.members.map(member => ({
        name: nodeName(member, source),
        kind: 'enum-value',
        static: true,
        minimum: 0,
        maximum: 0,
      })),
      stubNames: [],
    };
  }

  const declarationKind = ts.isInterfaceDeclaration(declaration) ? 'interface' : 'class';
  const members = [];
  const stubNames = new Set();
  for (const member of declaration.members) {
    let name = nodeName(member, source);
    let kind = 'property';
    if (ts.isConstructorDeclaration(member)) {
      name = 'constructor';
      kind = 'constructor';
    } else if (ts.isMethodDeclaration(member) || ts.isMethodSignature(member)) {
      kind = 'method';
    } else if (ts.isGetAccessorDeclaration(member) || ts.isSetAccessorDeclaration(member)) {
      kind = 'property';
    }
    if (!name || hasModifier(member, ts.SyntaxKind.PrivateKeyword) || hasModifier(member, ts.SyntaxKind.ProtectedKeyword)) continue;
    const parameters = 'parameters' in member ? member.parameters : [];
    const range = parameterRange(parameters);
    members.push({
      name,
      kind,
      static: hasModifier(member, ts.SyntaxKind.StaticKeyword),
      minimum: range.minimum,
      maximum: Number.isFinite(range.maximum) ? range.maximum : null,
      tupleReturnLength: member.type && ts.isTupleTypeNode(member.type) ? member.type.elements.length : null,
    });
    if ('body' in member && member.body) {
      const body = member.body.getText(source);
      if (/return\s+["']{2};/.test(body)
          || /throw\s+new\s+NotImplementedException/.test(body)) stubNames.add(name);
    }
  }
  const parentName = declaration.heritageClauses?.find(clause => clause.token === ts.SyntaxKind.ExtendsKeyword)?.types[0]?.expression.getText(source);
  const parentConfig = [...localTypes.values()].find(([, name]) => name === parentName);
  if (parentConfig) {
    const parent = readLocalType(parentConfig[0], parentConfig[1]);
    for (const member of parent?.members ?? []) {
      if (member.name !== 'constructor' && !members.some(own => own.name === member.name && own.static === member.static)) members.push(member);
    }
  }
  // A class without an explicit constructor exposes a default zero-argument constructor.
  if (declarationKind === 'class' && !hasModifier(declaration, ts.SyntaxKind.AbstractKeyword)
      && !members.some(member => member.name === 'constructor')) {
    members.push({ name: 'constructor', kind: 'constructor', static: false, minimum: 0, maximum: 0, tupleReturnLength: null });
  }
  return { file, symbol, declarationKind, members, stubNames: [...stubNames].sort() };
}

function operatorAdapter(name) {
  return ({
    op_Addition: 'add',
    op_Subtraction: 'subtract',
    op_Equality: 'equals',
    op_Inequality: 'equals',
    op_GreaterThan: 'valueOf',
    op_GreaterThanOrEqual: 'valueOf',
    op_LessThan: 'valueOf',
    op_LessThanOrEqual: 'valueOf',
    op_UnaryNegation: 'negate',
    op_UnaryPlus: 'valueOf',
    op_Multiply: 'multiply',
    op_Division: 'divide',
  })[name] ?? null;
}

function roadmapTask(type, member) {
  if (typeTasks.has(type.fullName)) return typeTasks.get(type.fullName);
  const name = member.name;
  if (type.fullName === 'System.DateTime') {
    if (name.includes('ParseExact')) return 'PARSE-03';
    if (name.includes('Parse')) return 'PARSE-02';
    if (['ToString', 'TryFormat', 'GetDateTimeFormats', 'ToLongDateString', 'ToLongTimeString', 'ToShortDateString', 'ToShortTimeString'].includes(name)) return 'FORMAT-01..FORMAT-04';
    if (name === 'Add' || name === 'AddTicks') return 'DT-01';
    if (name === 'AddYears' || name === 'AddMonths') return 'DT-02';
    if (name.startsWith('Add')) return 'DT-03';
    if (name === 'Subtract' || name === 'op_Subtraction') return 'DT-04';
    if (['DayOfWeek', 'DayOfYear', 'TimeOfDay'].includes(name)) return 'DT-05';
    if (['Now', 'UtcNow', 'Today'].includes(name)) return 'DT-06';
    if (name.includes('LocalTime') || name.includes('UniversalTime') || name === 'IsDaylightSavingTime' || name === 'SpecifyKind') return 'DT-07';
    if (name.includes('OADate')) return 'DT-08';
    if (name.includes('Binary')) return 'DT-09';
    if (name.includes('FileTime')) return 'DT-10';
    return 'DT-11';
  }
  if (type.fullName === 'System.TimeSpan') {
    if (name.includes('Parse')) return 'PARSE-06';
    if (['ToString', 'TryFormat'].includes(name)) return 'FORMAT-07';
    if (['Add', 'Subtract', 'Duration', 'Negate', 'op_Addition', 'op_Subtraction', 'op_UnaryNegation'].includes(name)) return 'TS-02';
    if (name.includes('Compare') || name.includes('Equals') || name === 'GetHashCode' || name.startsWith('op_Greater') || name.startsWith('op_Less')) return 'TS-03';
    if (name.startsWith('From')) return 'TS-04';
    if (name.includes('Multiply') || name.includes('Divide') || name === 'op_Multiply' || name === 'op_Division') return 'TS-05';
    if (name.includes('Microseconds') || name.includes('Nanoseconds')) return 'TS-06';
    return 'TS-01';
  }
  if (type.fullName === 'System.DateOnly') {
    if (name.includes('Parse')) return 'PARSE-04';
    if (['ToString', 'TryFormat', 'ToLongDateString', 'ToShortDateString'].includes(name)) return 'FORMAT-05';
    if (name.startsWith('Add')) return 'DO-03';
    if (name.includes('Compare') || name.includes('Equals') || name === 'GetHashCode' || name.startsWith('op_')) return 'DO-04';
    if (name.includes('DateTime')) return 'DO-05';
    return name === '.ctor' || ['MinValue', 'MaxValue', 'FromDayNumber', 'DayNumber', 'Year', 'Month', 'Day', 'DayOfWeek', 'DayOfYear'].includes(name) ? 'DO-01/DO-02' : 'DO-04';
  }
  if (type.fullName === 'System.TimeOnly') {
    if (name.includes('Parse')) return 'PARSE-05';
    if (['ToString', 'TryFormat', 'ToLongTimeString', 'ToShortTimeString'].includes(name)) return 'FORMAT-06';
    if (name.startsWith('Add')) return 'TO-03';
    if (name === 'IsBetween' || name === 'op_Subtraction') return 'TO-04';
    if (name.includes('Compare') || name.includes('Equals') || name === 'GetHashCode' || name.startsWith('op_')) return 'TO-05';
    if (name.includes('TimeSpan') || name.includes('DateTime')) return 'TO-06';
    return 'TO-01/TO-02';
  }
  if (type.fullName === 'System.Globalization.ISOWeek') return name.startsWith('To') ? 'ISO-02' : 'ISO-01';
  if (type.fullName === 'System.Globalization.DateTimeFormatInfo') {
    if (name.includes('DayName')) return 'FMT-04';
    if (name.includes('MonthName')) return 'FMT-05';
    if (name.includes('Era')) return 'FMT-06';
    if (name.includes('Pattern') || name.includes('Separator')) return 'FMT-07';
    if (['AMDesignator', 'PMDesignator', 'FirstDayOfWeek', 'CalendarWeekRule', 'Calendar'].includes(name)) return 'FMT-03';
    return 'FMT-02';
  }
  if (type.fullName === 'System.Globalization.CultureInfo') return 'FMT-08';
  if (type.fullName === 'System.Globalization.DateTimeStyles') return 'FMT-01';
  if (type.group === 'Enum') return 'CAL-01/PKG-01';
  throw new Error(`No roadmap task for ${type.fullName}.${name}`);
}

const excludedScope = JSON.parse(readFileSync(resolve(repository, 'tests/dotnet10/excluded-members.json'), 'utf8'));
const excludedMembers = new Set(excludedScope.apiMembers);

function matchMember(type, member, local) {
  if (excludedMembers.has(`${type.fullName}::${member.name}`)) {
    return { status: 'excluded', jsMember: lowerFirst(member.name), adaptation: null, reason: excludedScope.reason };
  }
  if (!local) return { status: 'missing', jsMember: null, adaptation: null, reason: 'local type is missing' };
  const alias = memberAliases.get(`${type.fullName}::${member.name}`);
  const adapter = member.kind === 'method' ? operatorAdapter(member.name) : null;
  const tupleDeconstruction = type.fullName === 'System.DateOnly' && member.name === 'Deconstruct'
    && member.parameters.every(parameter => parameter.modifier === 'out');
  const jsName = member.name === '.ctor' ? 'constructor'
    : alias ?? adapter ?? (type.kind === 'enum' || (member.kind === 'field' && member.static
      && local.members.some(candidate => candidate.name === member.name && candidate.static)) ? member.name : lowerFirst(member.name));
  const expectedArguments = adapter === 'valueOf' || tupleDeconstruction ? 0
    : adapter ? Math.max(0, member.parameters.length - 1) : member.parameters.length;
  const sameName = local.members.filter(candidate => candidate.name === jsName);
  const candidates = adapter ? sameName : sameName.filter(candidate => candidate.static === member.static);
  const exact = candidates.find(candidate => candidate.minimum <= expectedArguments
    && (candidate.maximum === null || candidate.maximum >= expectedArguments)
    && (!tupleDeconstruction || candidate.tupleReturnLength === member.parameters.length));
  if (!exact) {
    return {
      status: sameName.length > 0 ? 'incomplete' : 'missing',
      jsMember: jsName,
      adaptation: adapter ? `operator via ${jsName}` : null,
      reason: sameName.length > 0 ? 'member exists but static/instance shape or arity differs' : 'member is missing',
    };
  }
  if (local.stubNames.includes(jsName)) {
    return { status: 'incomplete', jsMember: jsName, adaptation: null, reason: 'member body is a known stub' };
  }
  if (type.fullName === 'System.Globalization.DateTimeFormatInfo' && local.declarationKind === 'interface') {
    return { status: 'incomplete', jsMember: jsName, adaptation: null, reason: 'shape exists only as an interface; .NET behavior is absent' };
  }
  return {
    status: 'present',
    jsMember: jsName,
    adaptation: tupleDeconstruction ? 'out parameters returned as a tuple' : adapter ? `operator via ${jsName}` : null,
    reason: 'matching TypeScript surface exists; behavioral parity is tracked separately',
  };
}

const types = [];
for (const type of reference.types) {
  const config = localTypes.get(type.fullName);
  if (!config) throw new Error(`Missing local type configuration: ${type.fullName}`);
  const [file, symbol, expectedSubpath] = config;
  const local = readLocalType(file, symbol);
  const usedLocalNames = new Set();
  const members = type.members.map(member => {
    const match = matchMember(type, member, local);
    if (match.jsMember) usedLocalNames.add(match.jsMember);
    return {
      id: `${type.fullName}::${member.id}`,
      dotnet: member,
      jsMember: match.jsMember,
      status: match.status,
      adaptation: match.adaptation,
      reason: match.reason,
      roadmapTask: roadmapTask(type, member),
      verification: 'tracked by tests/dotnet10-test-inventory.json',
    };
  });
  const counts = Object.fromEntries(['present', 'incomplete', 'missing', 'excluded'].map(status =>
    [status, members.filter(member => member.status === status).length]));
  const uniqueLocalNames = [...new Set(local?.members.map(member => member.name) ?? [])].sort();
  const typeShape = !local ? { status: 'missing', reason: 'local type is missing' }
    : type.kind === 'class' && local.declarationKind === 'interface'
      ? { status: 'incomplete', reason: 'the .NET class exists only as a TypeScript interface' }
      : type.kind === 'enum' && local.declarationKind === 'class'
        ? { status: 'adapted', reason: 'the .NET enum is represented by a value-wrapper class' }
        : { status: 'present', reason: 'a matching local declaration exists' };
  types.push({
    dotnetType: type.fullName,
    dotnetKind: type.kind,
    group: type.group,
    roadmapTask: typeTasks.get(type.fullName) ?? null,
    local: {
      file,
      symbol,
      declarationKind: local?.declarationKind ?? null,
      typeShape,
      rootExported: indexSource.includes(`export { ${symbol}`) || indexSource.includes(`export type { ${symbol}`),
      expectedSubpath,
      subpathExported: Object.hasOwn(packageJson.exports, expectedSubpath),
    },
    counts,
    extraLocalMembers: uniqueLocalNames.filter(name => !usedLocalNames.has(name)),
    members,
  });
}

const allMembers = types.flatMap(type => type.members);
const memberIds = allMembers.map(member => member.id);
if (new Set(memberIds).size !== memberIds.length) throw new Error('Duplicate API member IDs.');
if (allMembers.some(member => !member.roadmapTask)) throw new Error('An API member has no roadmap task.');
const summary = {
  types: types.length,
  members: allMembers.length,
  present: allMembers.filter(member => member.status === 'present').length,
  incomplete: allMembers.filter(member => member.status === 'incomplete').length,
  missing: allMembers.filter(member => member.status === 'missing').length,
  excluded: allMembers.filter(member => member.status === 'excluded').length,
  missingTypes: types.filter(type => type.local.declarationKind === null).length,
  missingRootExports: types.filter(type => !type.local.rootExported).length,
  missingSubpathExports: types.filter(type => !type.local.subpathExported).length,
};
const inventory = {
  sourceTag,
  sourceCommit,
  runtime: reference.runtime,
  statusDefinitions: {
    present: 'A matching TypeScript surface or documented JavaScript operator adapter exists. This does not claim behavioral parity.',
    incomplete: 'A related TypeScript surface exists, but its shape, arity, static form, class behavior, or implementation is incomplete.',
    missing: 'No matching TypeScript surface exists.',
    excluded: 'Intentionally omitted from the approved JavaScript API scope.',
  },
  summary,
  types,
};
const serialized = JSON.stringify(inventory, null, 2) + '\n';
if (mode === '--write') {
  writeFileSync(outputPath, serialized, 'utf8');
} else if (!existsSync(outputPath) || readFileSync(outputPath, 'utf8').replaceAll('\r\n', '\n') !== serialized) {
  throw new Error('API inventory is missing or differs. Run with --write and review the diff.');
}
console.log(JSON.stringify(summary));
