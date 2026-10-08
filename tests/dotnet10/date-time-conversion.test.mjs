import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateTime, DateTimeKind } from '@xobin/globalization';
import { TypeCode, InvalidCastException } from '@xobin/core';

const fixture = JSON.parse(readFileSync(new URL('./date-time-conversion-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
function verify(source) {
    const row = fixture.rows.find(row => row.source === source);
    assert.ok(row);
    const date = new DateTime(10n, DateTimeKind.utc);
    const invoke = () => {
      if (row.operation === 'getObjectDataNull') return date.getObjectData(null);
      if (row.operation === 'getObjectData') {
        const values = {};
        date.getObjectData({ addValue: (name, value) => { values[name] = value.toString(); } });
        return values;
      }
      if (row.operation === 'toType') return date.toType(DateTime, null);
      return date[row.operation](null);
    };
    if (row.error) {
      assert.throws(invoke, error => {
        assert.equal(error.constructor.name, row.error);
        assert.equal(error.paramName ?? null, row.paramName);
        assert.equal(error.message, row.message);
        return true;
      });
      return;
    }
    const actual = invoke();
    if (actual instanceof DateTime) {
      assert.equal(actual.ticks, BigInt(row.result.ticks));
      assert.equal(actual.kind.value, row.result.kind);
    } else if (actual instanceof TypeCode) assert.equal(actual.value, row.result);
    else assert.deepEqual(actual, row.result);
}

test('DateTimeConversion.JavaScriptTypeAndSerializationAdapters', () => {
  const date = new DateTime(10n, DateTimeKind.local);
  assert.equal(date.toType(Object), date);
  assert.throws(() => date.toType(null), error => error.paramName === 'conversionType');
  const values = new Map();
  date.getObjectData({ addValue: (name, value) => values.set(name, value) });
  assert.equal(values.get('dateData'), 9223372036854775818n);
  assert.equal(new InvalidCastException().message, 'Specified cast is not valid.');
});

test('DateTimeTests.GetTypeCode_Invoke_ReturnsExpected', () => verify('DateTimeTests.GetTypeCode_Invoke_ReturnsExpected'));
test('DateTimeTests.ToBoolean_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToBoolean_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToChar_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToChar_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToSByte_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToSByte_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToByte_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToByte_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToInt16_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToInt16_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToUInt16_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToUInt16_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToInt32_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToInt32_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToUInt32_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToUInt32_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToInt64_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToInt64_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToUInt64_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToUInt64_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToSingle_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToSingle_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToDouble_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToDouble_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToDecimal_Invoke_ThrowsInvalidCastException', () => verify('DateTimeTests.ToDecimal_Invoke_ThrowsInvalidCastException'));
test('DateTimeTests.ToDateTime_Invoke_ReturnsExpected', () => verify('DateTimeTests.ToDateTime_Invoke_ReturnsExpected'));
test('DateTimeTests.ToType_DateTime_ReturnsExpected', () => verify('DateTimeTests.ToType_DateTime_ReturnsExpected'));
test('DateTimeTests.GetObjectData_Invoke_ReturnsExpected', () => verify('DateTimeTests.GetObjectData_Invoke_ReturnsExpected'));
test('DateTimeTests.GetObjectData_NullInfo_ThrowsArgumentNullException', () => verify('DateTimeTests.GetObjectData_NullInfo_ThrowsArgumentNullException'));
