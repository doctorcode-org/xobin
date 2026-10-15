import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { DateOnly, DateTime, DateTimeKind, TimeOnly } from '@xobin/globalization';

const fixture = JSON.parse(readFileSync(new URL('./date-only-core-cases.json', import.meta.url), 'utf8'));
assert.equal(fixture.runtime, '10.0.7');
assert.equal(fixture.sourceTag, 'v10.0.7');
function decode(argument) {
  switch (argument.kind) {
    case 'date': return DateOnly.fromDayNumber(argument.value);
    case 'dateTime': return new DateTime(BigInt(argument.value.ticks), new DateTimeKind(argument.value.kind));
    case 'time': return new TimeOnly(BigInt(argument.value));
    case 'kind': return new DateTimeKind(argument.value);
    case 'object': return {};
    default: return argument.value;
  }
}
function invoke(check) {
  const [first, second, third] = check.arguments.map(decode);
  switch (check.operation) {
    case 'ctor': return new DateOnly(first, second, third);
    case 'min': return DateOnly.minValue;
    case 'max': return DateOnly.maxValue;
    case 'fromDayNumber': return DateOnly.fromDayNumber(first);
    case 'fromDateTime': return DateOnly.fromDateTime(first);
    case 'dayOfWeek': return first.dayOfWeek;
    case 'year': case 'month': case 'day': case 'dayNumber': case 'dayOfYear': return first[check.operation];
    case 'toDateTime': return first.toDateTime(second);
    case 'toDateTimeKind': return first.toDateTime(second, third);
    case 'compareToObject': return first.compareTo(second);
    case 'equalsObject': return first.equals(second);
    case 'op_Equality': return first.equals(second);
    case 'op_Inequality': return !first.equals(second);
    case 'op_LessThan': return first < second;
    case 'op_LessThanOrEqual': return first <= second;
    case 'op_GreaterThan': return first > second;
    case 'op_GreaterThanOrEqual': return first >= second;
    default: return first[check.operation](...check.arguments.slice(1).map(decode));
  }
}
function verify(row) {
  assert.ok(row.checks.length > 0);
  for (const check of row.checks) {
    if (check.operation === 'getHashCode' || check.operation.startsWith('deconstruct')) continue;
    if (check.error) {
      assert.throws(() => invoke(check), error => {
        assert.equal(error.constructor.name, check.error, check.operation);
        assert.equal(error.message, check.message, check.operation);
        assert.equal(error.paramName ?? null, check.paramName, check.operation);
        assert.equal(error.actualValue ?? null, check.actualValue, check.operation);
        return true;
      });
    } else {
      const result = invoke(check);
      if (check.result.kind === 'date') assert.equal(result.dayNumber, check.result.value, check.operation);
      else if (check.result.kind === 'dateTime') assert.deepEqual({ ticks: result.ticks.toString(), kind: result.kind.value }, check.result.value, check.operation);
      else assert.deepEqual(result, check.result.value, check.operation);
    }
  }
}
for (const [index, row] of fixture.rows.entries()) {
  if (/\.(GetHashCodeTest|DeconstructionTest)/.test(row.source)) continue;
  test(`${row.source}/${index}`, () => verify(row));
}

test('DateOnlyTests.FromDayNumberTest', () => verify(fixture.rows.find(row => row.source === 'DateOnlyTests.FromDayNumberTest')));
test('DateOnlyTests.DayOfWeekAndDayOfYearTest', () => verify(fixture.rows.find(row => row.source === 'DateOnlyTests.DayOfWeekAndDayOfYearTest')));
test('DateOnlyTests.AddDaysTest', () => verify(fixture.rows.find(row => row.source === 'DateOnlyTests.AddDaysTest')));
test('DateOnlyTests.AddMonthsTest', () => verify(fixture.rows.find(row => row.source === 'DateOnlyTests.AddMonthsTest')));
test('DateOnlyTests.AddYearsTest', () => verify(fixture.rows.find(row => row.source === 'DateOnlyTests.AddYearsTest')));
test('DateOnlyTests.OperatorsTest', () => verify(fixture.rows.find(row => row.source === 'DateOnlyTests.OperatorsTest')));
test('DateOnlyTests.DateTimeConversionTest', () => verify(fixture.rows.find(row => row.source === 'DateOnlyTests.DateTimeConversionTest')));
test('DateOnlyTests.ComparisonsTest', () => verify(fixture.rows.find(row => row.source === 'DateOnlyTests.ComparisonsTest')));

test('Supplemental.DateOnly.FullGregorianCycle', () => {
  const hash = createHash('sha256');
  for (let dayNumber = 0; dayNumber < fixture.cycleDays; dayNumber++) {
    const date = DateOnly.fromDayNumber(dayNumber);
    hash.update(`${date.year},${date.month},${date.day},${date.dayOfWeek},${date.dayOfYear}\n`);
  }
  assert.equal(hash.digest('hex'), fixture.cycleHash);
});
