import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-time-comparison-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.rows.length, 9);

for (const [index, row] of fixture.rows.entries()) {
  test(`${row.source}/${index}`, () => {
    const date = new DateTime(BigInt(row.dateTicks));
    const other = row.otherKind === 'dateTime'
      ? new DateTime(BigInt(row.otherTicks))
      : row.otherKind === 'object' ? {} : null;

    if (row.source === 'DateTimeTests.CompareTo_Invoke_ReturnsExpected') {
      assert.equal(date.compareTo(other), row.compareTo);
      if (other instanceof DateTime) {
        assert.equal(DateTime.compare(date, other), row.staticCompare);
        assert.equal(date > other, row.greaterThan);
        assert.equal(date >= other, row.greaterThanOrEqual);
        assert.equal(date < other, row.lessThan);
        assert.equal(date <= other, row.lessThanOrEqual);
      }
      return;
    }

    if (row.source === 'DateTimeTests.Equals_Invoke_ReturnsExpected') {
      assert.equal(date.equals(other), row.instanceEquals);
      if (other instanceof DateTime) {
        assert.equal(DateTime.equals(date, other), row.staticEquals);
        assert.equal(date.valueOf() === other.valueOf(), row.equalOperator);
        assert.equal(date.valueOf() !== other.valueOf(), row.notEqualOperator);
      }
      return;
    }

    throw new Error(`Unknown DateTime comparison source: ${row.source}`);
  });
}

test('DateTimeTests.CompareTo_NotDateTime_ThrowsArgumentException', () => {
  assert.equal(fixture.invalidCompare.source, 'DateTimeTests.CompareTo_NotDateTime_ThrowsArgumentException');
  assert.throws(() => new DateTime(10n).compareTo({}), error => {
    assert.equal(error.constructor.name, fixture.invalidCompare.error);
    assert.equal(error.paramName ?? null, fixture.invalidCompare.paramName);
    assert.equal(error.message, fixture.invalidCompare.message);
    return true;
  });
});
