import { spawnSync } from 'node:child_process';
import { readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = ['tests/package', 'tests/dotnet10'].flatMap(directory =>
    readdirSync(path.join(root, directory)).filter(file => file.endsWith('.test.mjs')).sort()
        .map(file => path.join(root, directory, file)));
const result = spawnSync(process.execPath, ['--test', '--test-reporter=dot', ...process.argv.slice(2), ...files], {
    cwd: root, stdio: 'inherit',
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
