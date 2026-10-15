import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const result = spawnSync(process.execPath, [path.join(root, 'node_modules/playwright/cli.js'),
    ...(args[0] === 'install' ? args : ['test', ...args])], {
    cwd: root, stdio: 'inherit',
    env: { ...process.env, PLAYWRIGHT_BROWSERS_PATH: path.join(root, 'dist/playwright-browsers') },
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
