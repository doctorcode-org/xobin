import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
assert.equal(process.env.GITHUB_ACTIONS, 'true', 'Use the manual Publish npm workflow.');
assert.equal(process.env.GITHUB_REPOSITORY, 'doctorcode-org/xobin');
assert.equal(process.env.GITHUB_REF, 'refs/heads/main');
assert.match(process.env.RELEASE_VERSION ?? '', /^\d+\.\d+\.\d+$/);
const version = process.env.RELEASE_VERSION;
const npmCli = process.env.npm_execpath;
assert.ok(npmCli, 'Invoke through npm run release:publish.');
function npm(args) {
    const result = spawnSync(process.execPath, [npmCli, ...args], { cwd: root, encoding: 'utf8', maxBuffer: 4 * 1024 * 1024 });
    if (result.error) throw result.error;
    return result;
}
const clean = spawnSync('git', ['diff', '--exit-code'], { cwd: root });
assert.equal(clean.status, 0, 'Tracked source changed after verification.');
const reports = JSON.parse(await readFile(path.join(root, 'dist/release/pack-report.json'), 'utf8'));
for (const name of ['core', 'globalization']) {
    const manifest = JSON.parse(await readFile(path.join(root, 'packages', name, 'package.json'), 'utf8'));
    assert.equal(manifest.version, version);
    const report = reports.find(report => report.name === manifest.name);
    assert.equal(report.version, version);
    const filename = path.join(root, 'dist/release', report.filename);
    const integrity = 'sha512-' + createHash('sha512').update(await readFile(filename)).digest('base64');
    assert.equal(integrity, report.integrity);
    const existing = npm(['view', manifest.name + '@' + version, 'dist.integrity', '--json', '--prefer-online', '--registry', 'https://registry.npmjs.org/']);
    if (existing.status === 0) {
        assert.equal(JSON.parse(existing.stdout), integrity, 'Published version already exists with different contents.');
        console.log(manifest.name + '@' + version + ' already matches; continuing an interrupted release.');
        continue;
    }
    assert.equal(JSON.parse(existing.stdout || '{}').error?.code, 'E404', existing.stderr);
    const result = npm(['publish', filename, '--access', 'public', '--tag', 'latest', '--registry', 'https://registry.npmjs.org/']);
    assert.equal(result.status, 0, result.stderr || result.stdout);
    console.log(result.stdout.trim());
}
