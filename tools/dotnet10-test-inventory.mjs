import { execFileSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const sourceTag = 'v10.0.7';
const runtime = process.argv[2];
const mode = process.argv[3] ?? '--check';
const output = resolve(dirname(fileURLToPath(import.meta.url)), '../tests/dotnet10-test-inventory.json');
const mappedFacts = new Map(Object.entries(JSON.parse(readFileSync(resolve(dirname(output), 'dotnet10/mapped-facts.json'), 'utf8'))));
const mappedTheories = new Map(Object.entries(JSON.parse(readFileSync(resolve(dirname(output), 'dotnet10/mapped-theories.json'), 'utf8'))));
const usedMappings = new Set();
const usedTheoryMappings = new Set();
const root = 'src/libraries/System.Runtime/tests/';

if (!runtime || !['--check', '--write'].includes(mode)) {
    throw new Error('Usage: node tools/dotnet10-test-inventory.mjs <dotnet/runtime directory> [--check|--write]');
}

function git(...args) {
    const trustedPath = resolve(runtime).replace(/\\/g, '/');
    return execFileSync('git', ['-c', `safe.directory=${trustedPath}`, '-C', runtime, ...args], {
        encoding: 'utf8',
        maxBuffer: 32 * 1024 * 1024
    }).trimEnd();
}

const sourceCommit = git('rev-parse', `${sourceTag}^{commit}`);
const allFiles = git('ls-tree', '-r', '--name-only', sourceTag, root).split(/\r?\n/);
const core = new Map([
    [`${root}System.Runtime.Tests/System/DateTimeTests.cs`, 'DateTime'],
    [`${root}System.Runtime.Tests/System/TimeSpanTests.cs`, 'TimeSpan'],
    [`${root}System.Globalization.Tests/CultureInfo/CultureInfoCalendar.cs`, 'CultureInfo'],
    [`${root}System.Globalization.Tests/CultureInfo/CultureInfoDateTimeFormat.cs`, 'CultureInfo']
]);
const calendarPrefix = `${root}System.Globalization.Calendars.Tests/`;
const formatPrefix = `${root}System.Globalization.Tests/DateTimeFormatInfo/`;
const selected = allFiles.filter(file => file.endsWith('.cs')
    && (core.has(file) || file.startsWith(calendarPrefix) || file.startsWith(formatPrefix)));
for (const file of core.keys()) {
    if (!selected.includes(file)) throw new Error(`Missing source file: ${file}`);
}

const previous = existsSync(output) ? JSON.parse(readFileSync(output, 'utf8')) : null;
if (previous && previous.sourceCommit !== sourceCommit) {
    throw new Error('Pinned source commit changed; review the inventory and mappings before regenerating.');
}
const previousCases = new Map((previous?.methods ?? []).flatMap(method =>
    method.cases.map(testCase => [testCase.id, testCase])));
const sourceLines = new Map(selected.map(file =>
    [file, git('show', `${sourceTag}:${file}`).split(/\r?\n/)]));
const calendarClasses = new Map();
for (const [file, lines] of sourceLines) {
    if (!file.startsWith(calendarPrefix)) continue;
    for (const line of lines) {
        const declaration = line.match(/\b(abstract\s+)?class\s+(\w+)(?:\s*:\s*(\w+))?/);
        if (!declaration) continue;
        const [, abstract, name, base] = declaration;
        if (calendarClasses.has(name)) throw new Error(`Duplicate Calendar class: ${name}`);
        calendarClasses.set(name, { abstract: Boolean(abstract), base: base ?? null });
    }
}
const marker = /^\s*\[\s*(Fact|Theory|ConditionalFact|ConditionalTheory)\b/;
const dataAttribute = /(?:\[|,)\s*(InlineData|MemberData|ClassData)\b/g;
const methods = [];
const supportFiles = [];

function groupFor(file) {
    if (core.has(file)) return core.get(file);
    if (file.startsWith(`${calendarPrefix}ISOWeek/`)) return 'AdjacentISOWeek';
    return file.startsWith(calendarPrefix) ? 'Calendar' : 'DateTimeFormatInfo';
}

function executionsFor(group, cls) {
    if (group !== 'Calendar') return [cls];
    if (!calendarClasses.has(cls)) throw new Error(`Unknown Calendar test class: ${cls}`);
    const inherits = candidate => {
        const seen = new Set();
        for (let name = candidate; name && !seen.has(name); name = calendarClasses.get(name)?.base) {
            if (name === cls) return true;
            seen.add(name);
        }
        return false;
    };
    const concrete = [...calendarClasses].filter(([name, info]) => !info.abstract && inherits(name))
        .map(([name]) => name).sort();
    if (concrete.length === 0) throw new Error(`No concrete execution for ${cls}`);
    return concrete;
}

function classBefore(lines, index) {
    const attributeIndent = lines[index].match(/^\s*/)[0].length;
    for (let i = index; i >= 0; i--) {
        const match = lines[i].match(/^\s*(?:(?:public|internal|private|protected|abstract|sealed|partial|static)\s+)*class\s+(\w+)/);
        if (match && lines[i].match(/^\s*/)[0].length < attributeIndent) return match[1];
    }
    throw new Error('Test method has no enclosing class');
}

function methodAfter(lines, index, file) {
    for (let i = index + 1; i < Math.min(lines.length, index + 50); i++) {
        if (!/^\s*(?:public|internal|protected|private)\s+/.test(lines[i])) continue;
        const declaration = lines.slice(i, Math.min(i + 8, lines.length)).join(' ');
        const beforeArguments = declaration.split('(')[0];
        const name = beforeArguments.match(/(\w+)(?:<[^>]+>)?\s*$/)?.[1];
        if (name) return { name, line: i + 1, index: i };
    }
    throw new Error(`Could not locate method after ${file}:${index + 1}`);
}

function attributesBeforeMethod(lines, markerIndex, methodIndex) {
    let first = markerIndex;
    for (let i = markerIndex - 1; i >= 0; i--) {
        if (/^\s*\[/.test(lines[i]) || /^\s*$/.test(lines[i])) {
            first = i;
        } else {
            break;
        }
    }
    return { first, text: lines.slice(first, methodIndex).join('\n') };
}

function dataSources(text, firstLine) {
    const sources = [];
    for (const match of text.matchAll(dataAttribute)) {
        const line = firstLine + text.slice(0, match.index).split('\n').length - 1;
        const raw = text.split('\n')[line - firstLine]?.trim() ?? '';
        sources.push({ kind: match[1], line, raw });
    }
    return sources;
}

for (const file of selected) {
    const lines = sourceLines.get(file);
    let markers = 0;
    for (let i = 0; i < lines.length; i++) {
        const test = lines[i].match(marker);
        if (!test) continue;
        markers++;
        const declaration = methodAfter(lines, i, file);
        const cls = classBefore(lines, i);
        const group = groupFor(file);
        const executedBy = executionsFor(group, cls);
        const attributes = attributesBeforeMethod(lines, i, declaration.index);
        const methodId = `${file}::${cls}.${declaration.name}@${declaration.line}`;
        const sources = dataSources(attributes.text, attributes.first + 1);
        const cases = [];
        if (test[1].endsWith('Theory')) {
            const mappingKey = `${cls}.${declaration.name}`;
            const mappedFile = mappedTheories.get(mappingKey);
            if (mappedFile) {
                const testSource = readFileSync(resolve(dirname(output), 'dotnet10', mappedFile), 'utf8');
                const fixtureFile = mappedFile.replace(/\.test\.mjs$/, '-cases.json');
                const fixture = JSON.parse(readFileSync(resolve(dirname(output), 'dotnet10', fixtureFile), 'utf8'));
                if (!testSource.includes('test(`${row.source}/${index}`')
                    || !fixture.rows?.some(row => row.source === mappingKey)) {
                    throw new Error(`Mapped JS theory is missing: ${mappingKey}`);
                }
                usedTheoryMappings.add(mappingKey);
            }
            const theorySources = sources.length ? sources : [{ kind: 'UnresolvedData', line: i + 1, raw: '' }];
            for (const testClass of executedBy) {
                for (let index = 0; index < theorySources.length; index++) {
                    const source = theorySources[index];
                    const id = `${methodId}#${source.kind}:${source.line}:${index + 1}@${testClass}`;
                    const old = previousCases.get(id);
                    cases.push({
                        id,
                        testClass,
                        dataKind: source.kind,
                        dataLine: source.line,
                        dataAttribute: source.raw,
                        expansion: source.kind === 'InlineData' ? 'one-row' : 'unexpanded',
                        status: mappedFile ? (source.kind === 'InlineData' ? 'mapped' : 'mapped-source') : (old?.status ?? 'unmapped'),
                        jsTest: mappedFile ? `tests/dotnet10/${mappedFile}#${mappingKey}` : (old?.jsTest ?? null)
                    });
                }
            }
        } else {
            for (const testClass of executedBy) {
                const id = `${methodId}#Fact@${testClass}`;
                const old = previousCases.get(id);
                const mappingKey = `${cls}.${declaration.name}`;
                const scopedKey = `${mappingKey}@${testClass}`;
                const scopedMapping = mappedFacts.has(scopedKey);
                const mappedFile = mappedFacts.get(scopedKey) ?? mappedFacts.get(mappingKey);
                const mappedTitle = scopedMapping ? `${mappingKey}/${testClass}` : mappingKey;
                if (mappedFile) {
                    if (test[1] !== 'Fact') throw new Error(`Only Fact methods may use mapped-facts.json: ${mappingKey}`);
                    const testSource = readFileSync(resolve(dirname(output), 'dotnet10', mappedFile), 'utf8');
                    const directTest = testSource.includes(`test('${mappedTitle}'`);
                    const parameterizedTest = scopedMapping
                        && testSource.includes('test(`' + mappingKey + '/${name}`')
                        && testSource.includes(`'${testClass}'`);
                    if (!directTest && !parameterizedTest) throw new Error(`Mapped JS test is missing: ${mappedTitle}`);
                    usedMappings.add(scopedMapping ? scopedKey : mappingKey);
                }
                cases.push({
                    id,
                    testClass,
                    dataKind: 'Fact',
                    dataLine: null,
                    dataAttribute: null,
                    expansion: 'one-row',
                    status: mappedFile ? 'mapped' : (old?.status ?? 'unmapped'),
                    jsTest: mappedFile ? `tests/dotnet10/${mappedFile}#${mappedTitle}` : (old?.jsTest ?? null)
                });
            }
        }
        methods.push({
            id: methodId,
            group,
            file,
            class: cls,
            method: declaration.name,
            line: declaration.line,
            attribute: test[1],
            executedBy,
            annotations: attributes.text.trim().split('\n').map(line => line.trim()).filter(Boolean),
            cases
        });
    }
    if (markers === 0) supportFiles.push(file);
}

const methodIds = methods.map(method => method.id);
for (const key of mappedFacts.keys()) if (!usedMappings.has(key)) throw new Error(`Unused mapped Fact: ${key}`);
for (const key of mappedTheories.keys()) if (!usedTheoryMappings.has(key)) throw new Error(`Unused mapped Theory: ${key}`);
const caseIds = methods.flatMap(method => method.cases.map(testCase => testCase.id));
if (new Set(methodIds).size !== methodIds.length) throw new Error('Duplicate method IDs');
if (new Set(caseIds).size !== caseIds.length) throw new Error('Duplicate case IDs');
const caseCount = caseIds.length;
const unexpanded = methods.flatMap(method => method.cases)
    .filter(testCase => testCase.expansion === 'unexpanded').length;
const byGroup = Object.fromEntries([...new Set(methods.map(method => method.group))].sort().map(group => {
    const groupMethods = methods.filter(method => method.group === group);
    const groupCases = groupMethods.flatMap(method => method.cases);
    return [group, {
        methods: groupMethods.length,
        caseRecords: groupCases.length,
        unexpandedDataSources: groupCases.filter(testCase => testCase.expansion === 'unexpanded').length,
        mappedCases: groupCases.filter(testCase => testCase.status === 'mapped' && testCase.jsTest).length,
        mappedDataSources: groupCases.filter(testCase => testCase.status === 'mapped-source' && testCase.jsTest).length
    }];
}));
const summary = {
    sourceFiles: selected.length,
    supportFiles: supportFiles.length,
    methods: methods.length,
    caseRecords: caseCount,
    unexpandedDataSources: unexpanded,
    mappedCases: methods.flatMap(method => method.cases)
        .filter(testCase => testCase.status === 'mapped' && testCase.jsTest).length,
    mappedDataSources: methods.flatMap(method => method.cases)
        .filter(testCase => testCase.status === 'mapped-source' && testCase.jsTest).length,
    byGroup
};
const inventory = {
    sourceTag,
    sourceCommit,
    selection: 'DateTimeTests, TimeSpanTests, full Calendars suite (ISOWeek flagged as adjacent), full DateTimeFormatInfo suite, CultureInfoCalendar and CultureInfoDateTimeFormat',
    interpretation: 'Cases are expanded for concrete Calendar test subclasses. A Fact or InlineData record is one case. mapped-source means a MemberData or ClassData method has a JS equivalent, while its original runtime rows remain unexpanded.',
    summary,
    supportFiles,
    methods
};
// One line per method keeps later mapping changes reviewable.
const header = JSON.stringify({ ...inventory, methods: undefined }, null, 2);
const serialized = header.slice(0, -2)
    + ',\n  "methods": [\n'
    + methods.map(method => `    ${JSON.stringify(method)}`).join(',\n')
    + '\n  ]\n}\n';
if (mode === '--write') {
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, serialized, 'utf8');
} else if (!existsSync(output) || readFileSync(output, 'utf8') !== serialized) {
    throw new Error('Inventory is missing or differs from the pinned source. Run with --write and review the diff.');
}
console.log(JSON.stringify(summary));
