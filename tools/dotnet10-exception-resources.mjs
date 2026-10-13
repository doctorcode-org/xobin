import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import ts from 'typescript';

const [runtime, mode = '--check'] = process.argv.slice(2);
if (!runtime || !['--check', '--write'].includes(mode)) throw new Error('Pass runtime path and --check or --write.');
const git = (...args) => execFileSync('git', ['-C', runtime, ...args], { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }).replaceAll('\r\n', '\n');
if (git('rev-parse', 'v10.0.7^{commit}').trim() !== '7706f546bac1a99b3d891afe3591dc88c67f0cc4') throw new Error('Reference changed.');
const xml = git('show', 'v10.0.7:src/libraries/System.Private.CoreLib/src/Resources/Strings.resx');
const decode = text => text.replaceAll('&quot;', '"').replaceAll('&apos;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>').replaceAll('&amp;', '&');
const values = new Map([...xml.matchAll(/<data name="([^"]+)"[^>]*>[\s\S]*?<value>([\s\S]*?)<\/value>/g)].map(match => [match[1], decode(match[2])]));
const resourceText = new Set(values.values());
const used = new Set();
for (const directory of ['packages/core/src/lib', 'packages/globalization/src/lib']) {
    for (const file of readdirSync(directory).filter(value => value.endsWith('.ts') && value !== 'exception_resources.ts')) {
        const source = readFileSync(`${directory}/${file}`, 'utf8');
        for (const match of source.matchAll(/\bSR\.(\w+)/g)) used.add(match[1]);
        const syntax = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true);
        function check(node) {
            if (ts.isStringLiteral(node) && node.text.length > 18 && resourceText.has(node.text)) {
                throw new Error(`${directory}/${file} contains an inline .NET message instead of a resource reference.`);
            }
            ts.forEachChild(node, check);
        }
        check(syntax);
    }
}
let output = '// .NET 10.0.7 resources, generated from System.Private.CoreLib/src/Resources/Strings.resx.\n';
output += '// Licensed to the .NET Foundation under the MIT license.\n';
output += '// Independent named exports allow bundlers to retain only the messages in use.\n\n';
for (const key of [...used].sort()) {
    if (!values.has(key)) throw new Error(`Unknown reference resource ${key}.`);
    // This resource has the same name as a public exception class. Keep a distinct
    // local binding so bundlers do not rename the exception constructor.
    output += key === 'SerializationException'
        ? `const serializationException = ${JSON.stringify(values.get(key))};\nexport { serializationException as SerializationException };\n`
        : `export const ${key} = ${JSON.stringify(values.get(key))};\n`;
}
const path = 'packages/core/src/lib/exception_resources.ts';
if (mode === '--write') writeFileSync(path, output);
else if (readFileSync(path, 'utf8') !== output) throw new Error('Exception resources differ from the pinned reference or its consumers.');
