import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
const report = JSON.parse(await readFile(new URL('../dist/bundle-size/report.json', import.meta.url), 'utf8'));
const budgets = JSON.parse(await readFile(new URL('../tests/bundle-size-budgets.json', import.meta.url), 'utf8'));
for (const budget of budgets) {
    assert.equal(budget.entry, 'root', 'Size budgets must cover the documented root import.');
    assert.equal(budget.mode, 'browser-esm', 'Size budgets apply only to browser bundles.');
    const row = report.rows.find(row => row.scenario === budget.scenario && row.entry === budget.entry && row.mode === budget.mode);
    assert.ok(row, 'Missing size scenario: ' + budget.scenario);
    assert.ok(row.bytes <= budget.maxBytes, `${budget.scenario}/${budget.mode}: ${row.bytes} > ${budget.maxBytes} bytes`);
    assert.ok(row.gzip <= budget.maxGzipBytes, `${budget.scenario}/${budget.mode}: gzip ${row.gzip} > ${budget.maxGzipBytes} bytes`);
}
console.log('Browser root-import bundle size budgets passed.');
