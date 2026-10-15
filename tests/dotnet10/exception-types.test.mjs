import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import * as core from '@xobin/core';

const fixture = JSON.parse(readFileSync(new URL('./exception-types-cases.json', import.meta.url), 'utf8'));
for (const [index, row] of fixture.rows.entries()) {
    test(`.NET ${fixture.runtime} ${row.type} constructor supplemental ${index}`, () => {
        const Type = core[row.type];
        const inner = new core.Exception('inner error');
        const error = row.overload === 0 ? new Type()
            : row.overload === 1 ? new Type(row.message) : new Type(row.message, inner);
        assert.ok(error instanceof core.Exception);
        assert.ok(error instanceof Error);
        assert.equal(error.constructor.name, row.type);
        assert.equal(error.message, row.expectedMessage);
        assert.equal(error.innerException?.message ?? null, row.innerMessage);
        assert.equal(error.innerException, row.overload === 2 ? inner : null);
    });
}
