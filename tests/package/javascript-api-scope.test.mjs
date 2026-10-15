import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import test from 'node:test';
import * as esmCore from '@xobin/core';
import * as esmGlobalization from '@xobin/globalization';

const require = createRequire(import.meta.url);
for (const [format, core, globalization] of [
  ['ESM', esmCore, esmGlobalization],
  ['CommonJS', require('@xobin/core'), require('@xobin/globalization')],
]) {
  test(`${format} exposes the selected JavaScript API without removed CLR contracts`, () => {
    assert.equal('TypeCode' in core, false);
    assert.equal('hResult' in new core.Exception(), false);
    for (const Type of [globalization.DateTime, globalization.DateOnly, globalization.TimeOnly, globalization.TimeSpan]) {
      assert.equal('getHashCode' in Type.prototype, false, Type.name);
      assert.equal('deconstruct' in Type.prototype, false, Type.name);
    }
    for (const name of ['fromBinary', 'fromOADate', 'fromFileTime', 'fromFileTimeUtc']) {
      assert.equal(name in globalization.DateTime, false, name);
    }
    for (const name of ['toBinary', 'toOADate', 'toFileTime', 'toFileTimeUtc', 'getTypeCode', 'toType', 'getObjectData',
      'toBoolean', 'toChar', 'toSByte', 'toByte', 'toInt16', 'toUInt16', 'toInt32', 'toUInt32',
      'toInt64', 'toUInt64', 'toSingle', 'toDouble', 'toDecimal', 'toDateTime']) {
      assert.equal(name in globalization.DateTime.prototype, false, name);
    }
  });
}
