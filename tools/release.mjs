import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { access, copyFile, mkdir, mkdtemp, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'dist/release');
const packages = ['core', 'globalization'];
const readJson = async file => JSON.parse(await readFile(file, 'utf8'));
function npm(args, cwd = root) {
    assert.ok(process.env.npm_execpath, 'Run this tool through npm run release:check, release:pack or test:packed.');
    const result = spawnSync(process.execPath, [process.env.npm_execpath, ...args], {
        cwd, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024,
        env: { ...process.env, npm_config_update_notifier: 'false' },
    });
    if (result.error) throw result.error;
    assert.equal(result.status, 0, result.stderr || result.stdout);
    return result.stdout;
}
function targets(value) {
    return typeof value === 'string' ? [value] : Object.values(value).flatMap(targets);
}
async function check(name) {
    const base = path.join(root, 'packages', name);
    const manifest = await readJson(path.join(base, 'package.json'));
    assert.equal(manifest.name, '@xobin/' + name);
    assert.match(manifest.version, /^\d+\.\d+\.\d+(?:-[\w.-]+)?$/);
    assert.equal(manifest.publishConfig.access, 'public');
    assert.equal(manifest.publishConfig.registry, 'https://registry.npmjs.org/');
    assert.equal(manifest.sideEffects, false);
    assert.ok(manifest.scripts.prepack, 'packing must build fresh output');
    for (const file of ['LICENSE', 'THIRD_PARTY_NOTICES.md', 'README.md', 'MIGRATION.md', 'CHANGELOG.md']) {
        assert.ok((await stat(path.join(base, file))).size > 0, name + '/' + file);
    }
    for (const target of targets(manifest.exports)) {
        if (target.includes('*')) continue;
        assert.ok(target.startsWith('./dist/'), target);
        await access(path.join(base, target));
    }
    for (const ext of ['js', 'mjs', 'd.ts', 'd.mts']) await access(path.join(base, 'dist/index.' + ext));
    if (name === 'globalization') {
        for (const file of ['docs/USAGE.md', 'docs/FORMATTING.md']) {
            assert.ok((await stat(path.join(base, file))).size > 0, name + '/' + file);
        }
        const core = await readJson(path.join(root, 'packages/core/package.json'));
        assert.equal(manifest.dependencies['@xobin/core'], '^' + core.version);
        assert.equal(manifest.exports['./extensions'], undefined);
        assert.equal(manifest.exports['./formatting'], undefined);
        const localeFiles = (await readdir(path.join(base, 'locales'), { recursive: true })).filter(file => file.endsWith('.ts'));
        for (const file of localeFiles) for (const ext of ['js', 'mjs', 'd.ts', 'd.mts']) {
            await access(path.join(base, 'dist/locales', file.replace(/\.ts$/, '.' + ext)));
        }
    }
    return manifest;
}
async function pack() {
    await mkdir(output, { recursive: true });
    const reports = [];
    for (const name of packages) {
        await check(name);
        const [report] = JSON.parse(npm(['pack', '--workspace', '@xobin/' + name, '--json', '--ignore-scripts',
            '--pack-destination', output, '--cache', path.join(output, 'npm-cache')]));
        assert.ok(report.files.some(file => file.path === 'LICENSE'));
        assert.ok(report.files.some(file => file.path === 'THIRD_PARTY_NOTICES.md'));
        assert.ok(report.files.every(file => /^(?:dist\/|docs\/(?:USAGE|FORMATTING)\.md$|package\.json$|README\.md$|LICENSE$|THIRD_PARTY_NOTICES\.md$|MIGRATION\.md$|CHANGELOG\.md$)/.test(file.path)), 'unexpected published file');
        if (name === 'globalization') for (const file of ['docs/USAGE.md', 'docs/FORMATTING.md']) {
            assert.ok(report.files.some(entry => entry.path === file), 'missing published guide: ' + file);
        }
        assert.ok(report.files.every(file => !/experiment|extensions|tests?\/|tsbuildinfo/i.test(file.path)), 'experimental or test code entered package');
        reports.push(report);
    }
    const checksums = [];
    for (const report of reports) {
        const bytes = await readFile(path.join(output, report.filename));
        checksums.push(createHash('sha256').update(bytes).digest('hex') + '  ' + report.filename);
    }
    await writeFile(path.join(output, 'SHA256SUMS'), checksums.join('\n') + '\n');
    await writeFile(path.join(output, 'pack-report.json'), JSON.stringify(reports, null, 2) + '\n');
    return reports;
}
async function testPacked() {
    const reports = await pack();
    const consumer = await mkdtemp(path.join(output, 'consumer-'));
    await writeFile(path.join(consumer, 'package.json'), JSON.stringify({ name: 'xobin-packed-consumer', private: true, type: 'module' }));
    npm(['install', '--offline', '--ignore-scripts', '--no-audit', '--no-fund', '--package-lock=false', '--workspaces=false',
        '--cache', path.join(output, 'npm-cache'), ...reports.map(report => path.join(output, report.filename))], consumer);
    const smoke = `
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { DateTime, CultureInfo } from '@xobin/globalization';
import { cultureData } from '@xobin/globalization/locales/fa-IR';
import { DateTime as DirectDateTime } from '@xobin/globalization/date-time';
const require = createRequire(import.meta.url);
const manifest = JSON.parse(readFileSync(new URL('./node_modules/@xobin/globalization/package.json', import.meta.url)));
const culture = CultureInfo.loadCultureInfo('fa-IR', cultureData);
assert.equal(new DateTime(2024, 3, 20).toString('yyyy/MM/dd', culture), '1403/01/01');
assert.strictEqual(DateTime, DirectDateTime);
const commonjs = require('@xobin/globalization');
assert.strictEqual(commonjs.DateTime, require('@xobin/globalization/date-time').DateTime);
const { cultureData: fullData } = require('@xobin/globalization/locales/fa-IR/full');
assert.equal(commonjs.CultureInfo.loadCultureInfo('fa-IR', fullData).optionalCalendars.length, 3);
for (const api of [await import('@xobin/globalization'), commonjs]) {
    assert.deepEqual(JSON.parse(JSON.stringify([
        new api.DateTime(1n, api.DateTimeKind.utc), new api.DateOnly(2024, 3, 20),
        new api.TimeOnly(1n), new api.TimeSpan(-1n),
    ])), ['0001-01-01T00:00:00.0000001Z', '2024-03-20', '00:00:00.0000001', '-00:00:00.0000001']);
}
for (const entry of Object.keys(manifest.exports).filter(value => !value.includes('*'))) {
    const specifier = '@xobin/globalization' + (entry === '.' ? '' : entry.slice(1));
    await import(specifier);
    require(specifier);
}
console.log('Packed ESM/CJS entries, class identity, default/full culture loading passed.');
`;
    await writeFile(path.join(consumer, 'smoke.mjs'), smoke);
    let result = spawnSync(process.execPath, ['smoke.mjs'], { cwd: consumer, encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    console.log(result.stdout.trim());
    for (const file of ['types.mts', 'types.cts', 'entrypoints.mts', 'entrypoints.cts']) {
        await copyFile(path.join(root, 'tests/package', file), path.join(consumer, file));
    }
    await writeFile(path.join(consumer, 'tsconfig.json'), JSON.stringify({ compilerOptions: {
        target: 'ES2022', module: 'NodeNext', moduleResolution: 'NodeNext', strict: true, skipLibCheck: false, noEmit: true,
    }, include: ['*.mts', '*.cts'] }));
    result = spawnSync(process.execPath, [path.join(root, 'node_modules/typescript/bin/tsc'), '-p', consumer], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stdout || result.stderr);
    for (const source of [
        "import {TimeSpan} from '@xobin/globalization'; globalThis.result=TimeSpan.fromHours(2).toString('c');",
        "import {DateTime,CultureInfo} from '@xobin/globalization'; import {cultureData} from '@xobin/globalization/locales/fa-IR'; globalThis.result=new DateTime(2024,3,20).toString('yyyy/MM/dd',CultureInfo.loadCultureInfo('fa-IR',cultureData));",
    ]) {
        const bundle = await build({ stdin: { contents: source, resolveDir: consumer }, bundle: true, platform: 'browser',
            format: 'iife', target: 'es2022', treeShaking: true, metafile: true, write: false, logLevel: 'silent' });
        const inputs = Object.keys(bundle.metafile.inputs).map(file => file.replaceAll('\\', '/'));
        assert.ok(!inputs.some(file => file.startsWith('packages/')), 'consumer used workspace files instead of packed files');
        if (source.includes('TimeSpan')) assert.doesNotMatch(bundle.outputFiles[0].text, /\bclass _?DateTime\b/);
    }
    console.log('Packed strict TypeScript and browser bundle checks passed.');
}

const command = process.argv[2] ?? 'check';
if (command === 'check') {
    for (const name of process.argv[3] ? [process.argv[3]] : packages) {
        assert.ok(packages.includes(name));
        await check(name);
    }
    console.log('Release metadata and built entry checks passed.');
} else if (command === 'pack') {
    console.log((await pack()).map(({ name, filename, size }) => ({ name, filename, size })));
} else if (command === 'test-packed') await testPacked();
else throw new Error('Expected check, pack or test-packed.');
