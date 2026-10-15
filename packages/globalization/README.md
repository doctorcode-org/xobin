# @xobin/globalization

Exact date/time arithmetic, fourteen concrete calendars and culture-aware date/time
formatting for modern browsers and Node.js. Implemented in TypeScript with ESM and
CommonJS entries. The calendar and formatting reference is .NET 10.0.7.

## Install

```sh
npm install @xobin/globalization
```

The matching @xobin/core dependency is installed automatically.

## User documentation

Read the [usage guide](docs/USAGE.md) for complete, runnable examples of date/time
arithmetic, DateOnly/TimeOnly, durations, cultures, all calendar imports, ISO weeks,
native Date integration and server request cultures. The
[formatting reference](docs/FORMATTING.md) explains standard and custom formats,
DateTimeFormatInfo, literal escaping and UTF-8/UTF-16 buffers.
Both guides are included in this npm package as well as the source repository.

## Date and time

```ts
import { DateTime, DateTimeKind, TimeSpan } from '@xobin/globalization';

const date = new DateTime(2024, 3, 20, 13, 45, 0);
const later = date.add(TimeSpan.fromMinutes(30));
console.log(later.toString('yyyy-MM-dd HH:mm')); // 2024-03-20 14:15

const exact = new DateTime(638464896000000001n, DateTimeKind.utc);
console.log(exact.ticks); // bigint, one tick is 100 nanoseconds
```

Calendar component constructors use numbers; constructors that accept a tick count
require bigint. DateTimeKind is the existing enum wrapper: use its named values,
not a JavaScript number. Equality is value-based through equals; JavaScript ===
compares object identity. Comparison operators use the types' valueOf adapters.

## DateOnly and TimeOnly

```ts
import { DateOnly, TimeOnly, DateTime } from '@xobin/globalization';

const date = new DateOnly(2024, 3, 20);
const time = new TimeOnly(13, 45);
const combined = new DateTime(date, time);
const day = DateOnly.fromDateTime(combined);
const clock = TimeOnly.fromDateTime(combined);
```

Conversions remain on the classes. No extensions import or registration is needed.

## Selective cultures

```ts
import { CultureInfo, DateTime } from '@xobin/globalization';
import { cultureData } from '@xobin/globalization/locales/fa-IR';

const culture = CultureInfo.loadCultureInfo('fa-IR', cultureData);
new DateTime(2024, 3, 20).toString('yyyy/MM/dd', culture); // 1403/01/01
```

A locale import exports data without registering it or changing currentCulture.
Import only the cultures you need. Default culture modules load only their default
calendar. For alternate calendars import the explicit full module instead:

```ts
import { cultureData } from '@xobin/globalization/locales/fa-IR/full';
```

Use the same CultureInfo.loadCultureInfo call. The default Persian module supports
PersianCalendar; full also enables GregorianCalendar and HijriCalendar. Gregorian
pattern data needed for the standard U format remains available in the default
module without enabling a selectable Gregorian calendar.

Use literal imports for lazy loading, so bundlers can create a separate chunk:

```ts
const { cultureData } = await import('@xobin/globalization/locales/en-US');
const culture = CultureInfo.loadCultureInfo('en-US', cultureData);
```

Import and register parent data explicitly before accessing culture.parent; for
fa-IR this means loading fa as well. Loading replacement data affects subsequent
instances, not existing instances. Format and calendar state is copied per instance.

## Formatting

DateTime, DateOnly, TimeOnly and TimeSpan keep toString and tryFormat methods.
DateTimeFormatInfo is a class supporting mutable/readonly state, providers and
cloning. DateTime formatting accepts the .NET standard and custom patterns in the
retained API. DateOnly/TimeOnly reject tokens and standard specifiers that do not
apply to their type. TimeSpan supports constant, general and custom interval formats.

```ts
import { DateTime } from '@xobin/globalization';

const date = new DateTime(2024, 3, 20, 13, 45, 0);
const text = date.toString('O');
const written = { result: 0 };
const destination = new Uint8Array(64);
const success = date.tryFormat(destination, written, 'yyyy-MM-dd');
```

tryFormat supports string[], Uint16Array and Uint8Array. The written count is UTF-16
code units or UTF-8 bytes. An undersized buffer returns false with a zero count.
DateOnly/TimeOnly follow the reference builder's partial-write behavior; do not
assume those destination buffers remain unchanged on failure.

## Calendars

The concrete calendars are Gregorian, Persian, ThaiBuddhist, UmAlQura, Korean,
Taiwan, Japanese, Hijri, Hebrew, Julian, ChineseLunisolar, JapaneseLunisolar,
KoreanLunisolar and TaiwanLunisolar. Import their classes and ISOWeek by name from
@xobin/globalization, like DateTime and TimeSpan.
Respect each calendar's supported date range. Default TwoDigitYearMax values follow
the pinned reference environment, not the user's operating-system settings.

## Browser and server imports

Use named imports from @xobin/globalization. Browser bundlers can tree-shake unused
exports from the ESM entry. Keep ESM imports through the bundling step; converting
them to require first can prevent that optimization. Culture data remains a
separate, selective import.

On a CommonJS server, use the same root package with require. Loading the complete
API on the server is supported:

```js
const { DateTime, CultureInfo } = require('@xobin/globalization');
const { cultureData } = require('@xobin/globalization/locales/fa-IR');
```

Optional direct paths remain available, but application code does not need them.
Root and direct paths share class identity and current-culture state within each
module format. ESM and CommonJS are separate module graphs; keep one format when
passing instances between providers and calendars.

CultureInfo.currentCulture is shared state in the module, not per-request async
storage. On servers pass each request's culture explicitly to toString/tryFormat.
Do not mutate currentCulture to implement simultaneous requests in different cultures.

## JSON transport

Do not serialize temporal instances directly. DateTime currently serializes as {},
DateOnly exposes its internal day field, and bigint-based values can throw. Use an
explicit wire representation with string ticks and a numeric Kind:

```ts
import { DateTime, DateTimeKind } from '@xobin/globalization';

const exact = new DateTime(638464896000000001n, DateTimeKind.utc);
const payload = JSON.stringify({ ticks: exact.ticks.toString(), kind: exact.kind.value });
const data = JSON.parse(payload);
const restored = new DateTime(BigInt(data.ticks), new DateTimeKind(data.kind));
```

Validate untrusted wire data before constructing values. For DateOnly, dayNumber
can be transported as a number and restored with fromDayNumber. TimeOnly and
TimeSpan ticks must be strings to retain their complete precision. No new toJSON
contract is introduced in this release.

## Local time

Local conversions use the host's native Date time-zone database; no Windows/IANA
timezone table is shipped. Historical offsets can differ across hosts. UTC ticks
retain single-tick precision. UTC-to-local conversions preserve the selected
occurrence of an overlapping local time; constructing an ambiguous local wall time
selects the later UTC occurrence. Gaps use native Date resolution.

Date has no DST flag. isDaylightSavingTime estimates it from monthly offset samples
and cannot classify all historical base-offset changes, permanent DST or negative
DST rules exactly as Windows does.

## Supported scope

Modern ES2022 browsers and Node.js 22/24 are the release target. bigint, Intl,
TextEncoder and TextDecoder must be available. TypeScript 5.9 is the tested type
consumer. Chromium, Firefox and WebKit are in the release CI matrix.

Parsing is not implemented. Binary/OADate/FileTime, CLR conversions, TypeCode,
SerializationInfo, temporal getHashCode/deconstruct and exception hResult are
intentionally absent. NumberFormatInfo is a data interface; numeric formatting
and the full .NET CultureInfo API are not promised.

See [migration](MIGRATION.md) and [changelog](CHANGELOG.md).

## License

[MIT](LICENSE). [Third-party notices](THIRD_PARTY_NOTICES.md).
