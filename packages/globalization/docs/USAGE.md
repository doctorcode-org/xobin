# Using @xobin/globalization

This guide covers the supported 2.0 API. Each TypeScript example is independent:
copy its imports and code together. Examples with output use fixed values rather
than the machine's current time or timezone.

## Contents

- [Install and import](#install-and-import)
- [Choose a temporal type](#choose-a-temporal-type)
- [Construct and calculate with DateTime](#construct-and-calculate-with-datetime)
- [Dates without a clock](#dates-without-a-clock)
- [Times without a date](#times-without-a-date)
- [Durations and exact ticks](#durations-and-exact-ticks)
- [Compare values](#compare-values)
- [Use cultures](#use-cultures)
- [Use calendars](#use-calendars)
- [ISO week dates](#iso-week-dates)
- [UTC, local time and native Date](#utc-local-time-and-native-date)
- [JSON and server requests](#json-and-server-requests)
- [Handle invalid values](#handle-invalid-values)
- [Formatting reference](FORMATTING.md)
- [Migration from 1.x](../MIGRATION.md)

## Install and import

```sh
npm install @xobin/globalization
```

This installs the matching `@xobin/core` automatically. Use an ES2022-capable
browser or Node.js 22/24. TypeScript consumers need an ES2022 target (or higher)
and a module resolver that understands package exports, such as `bundler` for a
bundled browser app or `NodeNext` for Node.js. A bundler does not make bigint work
in older browsers.

Use named imports from `@xobin/globalization`. Modern browser bundlers can
tree-shake unused ESM exports. Preserve ESM until the bundling step: compiling
imports to CommonJS first can prevent effective tree shaking. On a CommonJS
server, requiring the root loads the complete API, which is supported. Direct
paths are optional. Culture data stays separate: import only the locales you use.

```ts
import { DateTime, TimeSpan } from '@xobin/globalization';

const start = new DateTime(2024, 3, 20, 13, 45, 0);
console.log(start.add(TimeSpan.fromMinutes(30)).toString('s'));
```

Output:

```text
2024-03-20T14:15:00
```

CommonJS equivalent:

```js
const { DateTime, TimeSpan } = require('@xobin/globalization');

const start = new DateTime(2024, 3, 20, 13, 45, 0);
console.log(start.add(TimeSpan.fromMinutes(30)).toString('s'));
```

Keep an application's temporal objects and providers in one module format. ESM
and CommonJS each have their own class identities and culture state.

## Choose a temporal type

- `DateTime`: calendar date and clock time, with an unspecified/UTC/local Kind.
- `DateOnly`: a date without a time of day or timezone, for example a birthday.
- `TimeOnly`: a time of day within a 24-hour clock, for example an opening time.
- `TimeSpan`: a signed duration, for example an elapsed interval.

Temporal arithmetic returns new instances. Formatting and conversions are methods
on these classes; no prototype registration or extensions import is needed.

## Construct and calculate with DateTime

Date components are numbers and months are **one-based**: January is 1. Gregorian
component constructors accept years 1 through 9999. The parameterless constructor
is the minimum date, not the current time. Use `DateTime.now`, `utcNow` or `today`
when current machine time is intended.

```ts
import { DateTime, DateTimeKind } from '@xobin/globalization';

const start = new DateTime(2024, 1, 31, 9, 0, 0, DateTimeKind.utc);
const nextMonth = start.addMonths(1);
const oneTickLater = nextMonth.addTicks(1n);
const elapsed = nextMonth.subtract(start);

console.log(start.toString('O'));
console.log(nextMonth.toString('O'));
console.log(oneTickLater.toString('O'));
console.log(elapsed.totalDays);
```

Output:

```text
2024-01-31T09:00:00.0000000Z
2024-02-29T09:00:00.0000000Z
2024-02-29T09:00:00.0000001Z
29
```

`addMonths`/`addYears` clamp the day when the target month is shorter. `addDays`,
`addHours`, `addMinutes`, `addSeconds`, `addMilliseconds` and `addMicroseconds`
accept numbers; `addTicks` accepts bigint. `add(TimeSpan)` adds a duration.
`subtract(DateTime)` returns a TimeSpan, while `subtract(TimeSpan)` returns a
DateTime. Arithmetic throws when the resulting value is out of range.

`date.year`, `month`, `day` and `dayOfYear` are Gregorian even when the value was
constructed using another calendar. Use a Calendar to read non-Gregorian fields.
`date.date` removes the clock part; `date.timeOfDay` returns a TimeSpan.

## Dates without a clock

```ts
import { DateOnly, TimeOnly } from '@xobin/globalization';

const day = new DateOnly(2024, 2, 29);
const anniversary = day.addYears(1);
const meeting = day.toDateTime(new TimeOnly(13, 45));

console.log(day.toString('O'));
console.log(anniversary.toString('O'));
console.log(meeting.toString('s'));
console.log(DateOnly.fromDateTime(meeting).equals(day));
```

Output:

```text
2024-02-29
2025-02-28
2024-02-29T13:45:00
true
```

DateOnly supports `addDays`, `addMonths`, `addYears`, and a numeric `dayNumber`
counting days since 0001-01-01 (day 0). Restore that value with
`DateOnly.fromDayNumber`. `toDateTime(time, kind)` optionally sets a DateTimeKind;
the default is unspecified. The combined DateTime does not retain a timezone ID.

## Times without a date

TimeOnly wraps at midnight. An optional output parameter reports the number of
whole days crossed. Its shape is `{ result: number }`, not a returned tuple.

```ts
import { TimeOnly, TimeSpan } from '@xobin/globalization';

const start = new TimeOnly(23, 45);
const wrappedDays = { result: 0 };
const end = start.add(TimeSpan.fromMinutes(90), wrappedDays);

console.log(end.toString('O'));
console.log(wrappedDays.result);
console.log(end.subtract(start).toString('c'));
console.log(end.isBetween(new TimeOnly(22, 0), new TimeOnly(2, 0)));
```

Output:

```text
01:15:00.0000000
1
01:30:00
true
```

`subtract(TimeOnly)` measures forward around a circular clock, always returning
zero or a positive duration shorter than a day. Use DateTime values when elapsed
days matter. `isBetween` includes the start, excludes the end, and supports ranges
crossing midnight; equal endpoints form an empty range.

Use `TimeOnly.fromDateTime`, `fromTimeSpan` and `toTimeSpan` for conversions.
A TimeSpan supplied to `fromTimeSpan` must be nonnegative and shorter than a day.

## Durations and exact ticks

One tick is **100 nanoseconds**. DateTime ticks count from 0001-01-01; TimeOnly
ticks count from midnight; TimeSpan ticks represent a signed duration. Tick
constructors require bigint. Never route full tick values through number.

```ts
import { TimeSpan } from '@xobin/globalization';

const duration = TimeSpan.fromHours(26).add(TimeSpan.fromMinutes(30));
const precise = new TimeSpan(1n);

console.log(duration.toString('c'));
console.log(duration.hours);
console.log(duration.totalHours);
console.log(duration.divide(TimeSpan.fromMinutes(30)));
console.log(precise.ticks.toString());
```

Output:

```text
1.02:30:00
2
26.5
53
1
```

Component properties (`days`, `hours`, `minutes`, etc.) differ from `totalDays`,
`totalHours`, `totalMinutes`, etc., which describe the entire interval. Total
properties are numbers and can lose precision for large durations; ticks remain
exact. TimeSpan is limited to the signed 64-bit tick range.

Factories include `fromDays`, `fromHours`, `fromMinutes`, `fromSeconds`,
`fromMilliseconds`, `fromMicroseconds` and `fromTicks`. Arithmetic includes
`add`, `subtract`, `multiply`, `divide`, `negate` and absolute `duration`.
`divide(number)` returns a TimeSpan; `divide(TimeSpan)` returns a numeric ratio.

## Compare values

Use `equals` for value equality, and `compareTo` or the relevant static comparison
method for ordering. JavaScript `===` compares object references. Subtracting
objects with JavaScript `-` does not return a TimeSpan; use the methods above.

```ts
import { DateTime, DateTimeKind } from '@xobin/globalization';

const first = new DateTime(2024, 3, 20);
const copy = new DateTime(first.ticks);
const labelled = DateTime.specifyKind(first, DateTimeKind.utc);
const sorted = [first.addDays(1), first].sort((a, b) => a.compareTo(b));

console.log(first === copy);
console.log(first.equals(copy));
console.log(first.equals(labelled));
console.log(sorted[0]!.toString('s'));
```

Output:

```text
false
true
true
2024-03-20T00:00:00
```

DateTime equality, ordering and subtraction compare ticks and ignore Kind. Convert
values into the same time basis before comparing instants. `specifyKind` changes
the label without converting the clock fields. It is not a timezone conversion.

## Use cultures

A locale module exports `cultureData`. Importing it does not register the culture
or change the current culture. Register it explicitly, then pass the returned
CultureInfo to formatting methods.

```ts
import { DateTime, CultureInfo } from '@xobin/globalization';
import { cultureData as persianData } from '@xobin/globalization/locales/fa-IR';
import { cultureData as englishData } from '@xobin/globalization/locales/en-US';

const persian = CultureInfo.loadCultureInfo('fa-IR', persianData);
const english = CultureInfo.loadCultureInfo('en-US', englishData);
const date = new DateTime(2024, 3, 20, 13, 45, 0);

console.log(date.toString('yyyy/MM/dd HH:mm', persian));
console.log(date.toString('yyyy/MM/dd HH:mm', english));
```

Output:

```text
1403/01/01 13:45
2024/03/20 13:45
```

Only imported culture data enters a browser build. Default locale modules contain
their default calendar. The explicit `/full` entry includes all supported optional
calendars for that culture. For Persian that adds Gregorian and Hijri calendars.
Choose one data variant at startup; registering replacement data affects future
CultureInfo instances, not instances already created.

Use literal dynamic imports to let a bundler create independent locale chunks:

```ts
import { CultureInfo } from '@xobin/globalization';

async function loadCulture(name: 'fa-IR' | 'en-US'): Promise<CultureInfo> {
    const { cultureData } = name === 'fa-IR'
        ? await import('@xobin/globalization/locales/fa-IR')
        : await import('@xobin/globalization/locales/en-US');
    return CultureInfo.loadCultureInfo(name, cultureData);
}

const culture = await loadCulture('fa-IR');
console.log(culture.name);
```

Output:

```text
fa-IR
```

Avoid a computed import of an arbitrary locale name: bundlers may include many
files or fail to resolve it. Keep the application's supported locale allowlist
explicit.

If accessing `culture.parent`, also import and register its parent data. For
`fa-IR`, load `@xobin/globalization/locales/fa` first. Parent data is not loaded
automatically. The invariant culture requires no locale import.

Browser applications with a single active culture can set
`CultureInfo.currentCulture = culture`; no-provider formatting then uses it.
On servers, pass a provider per request, as described below.

## Use calendars

A Calendar interprets the same DateTime using its own year, month, day and era.
Creating a Persian date does not attach a Persian calendar to the DateTime.
Choose the calendar again when reading fields or formatting.

```ts
import { DateTime, PersianCalendar } from '@xobin/globalization';

const calendar = new PersianCalendar();
const date = new DateTime(1403, 1, 1, calendar);
const nextMonth = calendar.addMonths(date, 1);

console.log(date.toString('s'));
console.log(`${calendar.getYear(date)}/${calendar.getMonth(date)}/${calendar.getDayOfMonth(date)}`);
console.log(calendar.getMonth(nextMonth));
```

Output:

```text
2024-03-20T00:00:00
1403/1/1
2
```

Use calendar `addMonths`/`addYears` for that calendar's month/year arithmetic;
DateTime's corresponding methods use Gregorian rules. Calendar methods also
provide `getDaysInMonth`, `getMonthsInYear`, `isLeapYear`, `isLeapMonth`,
`getLeapMonth`, `getEra`, `eras` and `toDateTime`. Overloads accepting an era use
0 for the calendar's current era. Explicit era values matter for calendars such
as JapaneseCalendar.

Each calendar has `minSupportedDateTime` and `maxSupportedDateTime`. Lunisolar
calendars and UmAlQura have narrower ranges than DateTime. Query the range before
handling arbitrary historical/future input. Leap months and era years must be
interpreted using that calendar's methods.

All fourteen concrete calendar classes are named exports from
`@xobin/globalization`:

- `GregorianCalendar`, `PersianCalendar`, `ThaiBuddhistCalendar`, `UmAlQuraCalendar`
- `KoreanCalendar`, `TaiwanCalendar`, `JapaneseCalendar`, `HijriCalendar`
- `HebrewCalendar`, `JulianCalendar`
- `ChineseLunisolarCalendar`, `JapaneseLunisolarCalendar`, `KoreanLunisolarCalendar`,
  `TaiwanLunisolarCalendar`

The abstract base classes `Calendar` and `EastAsianLunisolarCalendar` are exported
from the same root. Browser bundlers can remove calendars you do not use.

Calendar construction/conversion needs no culture data. Culture data is needed
for localized names and patterns. To format with an alternate culture calendar,
load its `/full` data and choose from `optionalCalendars` through
`dateTimeFormat.calendar`:

```ts
import { DateTime, CultureInfo, GregorianCalendar } from '@xobin/globalization';
import { cultureData } from '@xobin/globalization/locales/fa-IR/full';

const culture = CultureInfo.loadCultureInfo('fa-IR', cultureData);
const gregorian = culture.optionalCalendars.find(c => c instanceof GregorianCalendar);
if (!gregorian) throw new Error('Gregorian calendar data is required.');
culture.dateTimeFormat.calendar = gregorian;
console.log(new DateTime(2024, 3, 20).toString('yyyy/MM/dd', culture));
```

Output:

```text
2024/03/20
```

Assigning an unsupported calendar throws. `CultureInfo.calendar` is the culture's
default; `culture.dateTimeFormat.calendar` is the selected formatting calendar.
Do not mutate read-only invariant instances; clone formatting information first.

## ISO week dates

ISO week years can differ from Gregorian years near January 1. ISOWeek accepts
DateTime or DateOnly, and uses the public DayOfWeek enum (Sunday = 0).

```ts
import { DateOnly, ISOWeek, DayOfWeek } from '@xobin/globalization';

const date = new DateOnly(2021, 1, 1);
console.log(ISOWeek.getYear(date));
console.log(ISOWeek.getWeekOfYear(date));
console.log(ISOWeek.toDateOnly(2020, 53, DayOfWeek.Friday).toString('O'));
```

Output:

```text
2020
53
2021-01-01
```

`getWeeksInYear`, `getYearStart`, `getYearEnd` and `toDateTime` are also available.
Calendar week numbering through `getWeekOfYear` and CalendarWeekRule is a separate
API; use ISOWeek when an ISO week year is required.

## UTC, local time and native Date

DateTimeKind is the project's enum wrapper: use `DateTimeKind.utc`, `.local` or
`.unspecified`, not a raw number. Kind does not contain a named timezone.

`DateTime.utcNow` reads UTC; `now` and `today` use the host's local zone. Native
clock reads have JavaScript's clock resolution; storing 100 ns ticks does not
make the system clock more precise. `toUniversalTime` and `toLocalTime` convert
using the host zone. For unspecified values, `toUniversalTime` assumes local time
and `toLocalTime` assumes UTC. Prefer specifying the intended Kind explicitly.

Xobin ships no timezone database and no arbitrary named-zone conversion API.
Native Date data and historical offsets depend on the host. Ambiguous local
construction chooses the later UTC occurrence; UTC-to-local roundtrips preserve
the selected occurrence. Gaps follow native Date resolution.
`isDaylightSavingTime` is an estimate based on sampled host offsets.

There are no native Date conversion methods. When integrating with a native
Date, make the UTC epoch calculation explicit:

```ts
import { DateTime, DateTimeKind, TimeSpan } from '@xobin/globalization';

const native = new Date('2024-03-20T13:45:00.000Z');
const value = new DateTime(
    DateTime.unixEpoch.ticks + BigInt(native.getTime()) * TimeSpan.ticksPerMillisecond,
    DateTimeKind.utc,
);
const milliseconds = (value.ticks - DateTime.unixEpoch.ticks) / TimeSpan.ticksPerMillisecond;
const restored = new Date(Number(milliseconds));

console.log(value.toString('O'));
console.log(restored.toISOString());
```

Output:

```text
2024-03-20T13:45:00.0000000Z
2024-03-20T13:45:00.000Z
```

Validate native Date input (`Number.isFinite(native.getTime())`) and Xobin's
supported year range at the application boundary. Native Date loses submillisecond
precision; bigint division in this example truncates fractional milliseconds
toward zero. Normalize non-UTC DateTime values before using this UTC formula.
An unspecified wall time needs an application decision about its timezone first.

## JSON and server requests

Temporal instances are not JSON DTOs. Serialize explicit wire fields: string
ticks for DateTime/TimeOnly/TimeSpan, and numeric `dayNumber` for DateOnly.
Preserve DateTime Kind separately.

```ts
import { DateTime, DateTimeKind } from '@xobin/globalization';

const value = new DateTime(638464896000000001n, DateTimeKind.utc);
const json = JSON.stringify({ ticks: value.ticks.toString(), kind: value.kind.value });
const data: { ticks: string; kind: number } = JSON.parse(json);
const restored = new DateTime(BigInt(data.ticks), new DateTimeKind(data.kind));

console.log(restored.ticks === value.ticks);
console.log(restored.kind.value === value.kind.value);
```

Output:

```text
true
true
```

The type annotation above describes data produced by this example; it does not
validate network input. Validate field types, decimal tick syntax, range and Kind
0/1/2 before accepting external data. A timezone ID is separate application data.

Register cultures once at application startup, then pass the request's CultureInfo
explicitly through asynchronous work. Never change `currentCulture` for each
concurrent request: it is shared module state.

```ts
import { DateTime, CultureInfo } from '@xobin/globalization';
import { cultureData as persianData } from '@xobin/globalization/locales/fa-IR';
import { cultureData as englishData } from '@xobin/globalization/locales/en-US';

const cultures = {
    'fa-IR': CultureInfo.loadCultureInfo('fa-IR', persianData),
    'en-US': CultureInfo.loadCultureInfo('en-US', englishData),
};

async function render(date: DateTime, locale: keyof typeof cultures): Promise<string> {
    await Promise.resolve();
    return date.toString('yyyy/MM/dd', cultures[locale]);
}

const date = new DateTime(2024, 3, 20);
console.log((await Promise.all([render(date, 'fa-IR'), render(date, 'en-US')])).join(' | '));
```

Output:

```text
1403/01/01 | 2024/03/20
```

## Handle invalid values

Invalid calendar components and out-of-range arithmetic throw typed exceptions.
Invalid format patterns throw FormatException. A culture must be registered before
constructing CultureInfo for that name. `tryFormat` handles insufficient buffer
space by returning false; it still throws for invalid format strings/providers.

```ts
import { ArgumentOutOfRangeException } from '@xobin/core';
import { DateTime } from '@xobin/globalization';

try {
    new DateTime(2024, 2, 30);
} catch (error: unknown) {
    if (!(error instanceof ArgumentOutOfRangeException)) throw error;
    console.log('Invalid date.');
}
```

Output:

```text
Invalid date.
```

Parsing is not implemented in 2.0. Constructors accept components or exact tick
values, not arbitrary date strings. Do not treat formatting output as a parsing
contract. CLR Binary/OADate/FileTime conversions, TypeCode, serialization hooks,
temporal hashing/deconstruction and HRESULT are intentionally absent. Numeric
formatting is outside this package's supported API.

For complete overload signatures and parameter documentation, use the published
TypeScript declarations and editor completion. This guide and the
[formatting reference](FORMATTING.md) cover usage; they do not claim support for
every API available in .NET.
