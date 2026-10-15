import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { TimeOnly, TimeSpan, DateTime, DateTimeKind } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./time-only-core-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.sourceTag, 'v10.0.7');
function decode(argument) {
  switch (argument.kind) {
    case 'time': return new TimeOnly(BigInt(argument.value));
    case 'span': return new TimeSpan(BigInt(argument.value));
    case 'int64': return BigInt(argument.value);
    case 'dateTime': return new DateTime(BigInt(argument.value.ticks), new DateTimeKind(argument.value.kind));
    case 'double': return typeof argument.value === 'string' ? Number(argument.value) : argument.value;
    case 'object': return {};
    default: return argument.value;
  }
}
function invoke(check) {
  const args = check.arguments.map(decode);
  const [first, second, third] = args;
  switch (check.operation) {
    case 'default': return new TimeOnly();
    case 'ticks': return new TimeOnly(first);
    case 'ctor': return new TimeOnly(...args);
    case 'min': return TimeOnly.minValue;
    case 'max': return TimeOnly.maxValue;
    case 'fromDateTime': return TimeOnly.fromDateTime(first);
    case 'fromTimeSpan': return TimeOnly.fromTimeSpan(first);
    case 'getTicks': return first.ticks;
    case 'hour': case 'minute': case 'second': case 'millisecond': case 'microsecond': case 'nanosecond': return first[check.operation];
    case 'compareToObject': return first.compareTo(second);
    case 'equalsObject': return first.equals(second);
    case 'op_Equality': return first.equals(second);
    case 'op_Inequality': return !first.equals(second);
    case 'op_LessThan': return first < second;
    case 'op_LessThanOrEqual': return first <= second;
    case 'op_GreaterThan': return first > second;
    case 'op_GreaterThanOrEqual': return first >= second;
    case 'isBetween': return first.isBetween(second, third);
    case 'addWrapped': case 'addHoursWrapped': case 'addMinutesWrapped': {
      const wrappedDays = { result: 999 };
      const time = first[check.operation.replace('Wrapped', '')](second, wrappedDays);
      return { ticks: time.ticks.toString(), wrappedDays: wrappedDays.result };
    }
    default: return first[check.operation](...args.slice(1));
  }
}
function verify(row) {
  assert.ok(row.checks.length > 0);
  for (const [index, check] of row.checks.entries()) {
    if (check.operation === 'getHashCode' || check.operation.startsWith('deconstruct')) continue;
    const context = `${row.source}/${index}/${check.operation}`;
    if (check.error) {
      assert.throws(() => invoke(check), error => {
        assert.equal(error.constructor.name, check.error, context);
        assert.equal(error.message, check.message, context);
        assert.equal(error.paramName ?? null, check.paramName, context);
        assert.equal(error.actualValue ?? null, check.actualValue, context);
        return true;
      });
    } else {
      const result = invoke(check);
      if (check.result.kind === 'time' || check.result.kind === 'span') assert.equal(result.ticks.toString(), check.result.value, context);
      else if (check.result.kind === 'int64') assert.equal(result.toString(), check.result.value, context);
      else assert.deepEqual(result, check.result.value, context);
    }
  }
}
for (const [index, row] of fixture.rows.entries()) {
  if (/\.(GetHashCodeTest|DeconstructionTest)/.test(row.source)) continue;
  test(`${row.source}/${index}`, () => verify(row));
}

test('TimeOnlyTests.MinMaxValuesTest', () => verify(fixture.rows.find(row => row.source === 'TimeOnlyTests.MinMaxValuesTest')));
test('TimeOnlyTests.ConstructorsTest', () => verify(fixture.rows.find(row => row.source === 'TimeOnlyTests.ConstructorsTest')));
test('TimeOnlyTests.AddTest', () => verify(fixture.rows.find(row => row.source === 'TimeOnlyTests.AddTest')));
test('TimeOnlyTests.IsBetweenTest', () => verify(fixture.rows.find(row => row.source === 'TimeOnlyTests.IsBetweenTest')));
test('TimeOnlyTests.CompareOperatorsTest', () => verify(fixture.rows.find(row => row.source === 'TimeOnlyTests.CompareOperatorsTest')));
test('TimeOnlyTests.SubtractOperatorTest', () => verify(fixture.rows.find(row => row.source === 'TimeOnlyTests.SubtractOperatorTest')));
test('TimeOnlyTests.FromToTimeSpanTest', () => verify(fixture.rows.find(row => row.source === 'TimeOnlyTests.FromToTimeSpanTest')));
test('TimeOnlyTests.FromDateTimeTest', () => verify(fixture.rows.find(row => row.source === 'TimeOnlyTests.FromDateTimeTest')));
test('TimeOnlyTests.ComparisonsTest', () => verify(fixture.rows.find(row => row.source === 'TimeOnlyTests.ComparisonsTest')));
