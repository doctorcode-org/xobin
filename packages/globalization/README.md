# `Xobin`

The sources for this package are in the main [Xobin](https://github.com/doctorcode-org/xobin) repo. Please file issues and pull requests against that repo.

Usage information and reference details can be found in [Xobin documentation](https://xobinjs.com/docs).

License: MIT

## Browser culture loading

Import each required culture explicitly. Importing a locale does not register it
or load the other locale modules. The loader's name, arguments and synchronous
return value are unchanged:

```ts
import { CultureInfo } from '@xobin/globalization';
import { cultureData } from '@xobin/globalization/locales/fa-IR';

const culture = CultureInfo.loadCultureInfo('fa-IR', cultureData);
CultureInfo.currentCulture = culture;
CultureInfo.currentUICulture = culture;
```

The existing application path `@xobin/globalization/dist/locales/fa-IR` resolves
to the same module. Prefer `@xobin/globalization/locales/fa-IR` in new code.
For deferred loading, use a literal import so the browser bundler can create a
separate chunk without including every locale:

```ts
const { cultureData } = await import('@xobin/globalization/locales/en-US');
const culture = CultureInfo.loadCultureInfo('en-US', cultureData);
```

If an application accesses `culture.parent`, explicitly import and register the
parent culture as well (for example `fa` for `fa-IR`). Parent data is not
automatically downloaded. Each CultureInfo instance has independent date/number
format data and calendar state; changing an instance does not modify the imported
locale data or another instance.

The DateTimeFormatInfo class and its reference setter/read-only behavior remain
outstanding; this loading change does not claim to complete them.

## Local time reference

DateTime local conversions use the host's native Date time-zone database.
No Windows time-zone table or IANA alias table is shipped. Historical offsets,
including offsets with seconds, follow the browser or Node.js runtime and may
differ from Windows. Bigint arithmetic preserves all 100-nanosecond ticks.

For overlapping local times, a newly constructed value selects the later UTC
occurrence. Values converted from UTC preserve their original occurrence through
conversion, arithmetic and binary roundtrips. Nonexistent spring-forward times
use Date's native resolution with the offset before the transition.

Date does not expose a daylight-saving flag. IsDaylightSavingTime estimates it by
comparing the selected offset with the smallest offset sampled monthly in that
year. This covers ordinary seasonal clock changes, but cannot distinguish every
political base-offset change, permanent DST or negative-DST rule. Exact Windows
classification is not promised.

The .NET formatting, FileTime and binary fixtures use UTC as the local zone in
both runtimes, preserving direct comparison of the official test inputs. Native
zone tests separately verify local components, sub-millisecond precision, gaps,
overlaps and roundtrips using the zones supported by the test runtime. The oracle
pins UTC only inside its isolated process; it does not change the host's zone.

## CLR conversion adapters

`DateTime.getTypeCode()` returns `TypeCode.dateTime` from `@xobin/core`, with
the CLR numeric value 16. The primitive conversion methods throw
`InvalidCastException` with the reference message. `toType` accepts JavaScript
constructor tokens: `DateTime` and `Object` return the instance, `String` uses
the DateTime formatter, `Boolean`, `Number`, and `BigInt` request Boolean,
Double, and Int64 conversions.

`getObjectData(info, context)` accepts an adapter with
`addValue(name: string, value: bigint)`. It writes `ticks` and the unsigned
64-bit `dateData`, including Kind and the hidden ambiguous-DST bit. These are
the fields used by the CLR serializer; this API does not produce a JSON string
or emulate .NET's binary serializer.

## DateTime formatting

`toString` supports standard and custom .NET DateTime formats, and the long/short
date/time helpers use the same formatter. `getDateTimeFormats` preserves the
reference pattern order and duplicates. `tryFormat` accepts a `string[]` or
`Uint16Array` character buffer, or a `Uint8Array` UTF-8 buffer, and writes the
count to an `OutParam<number>` object (`{ result: 0 }`). Too-small buffers return
false with a zero count.

Formatting data for invariant and every shipped culture module is generated
from the .NET reference, including optional-calendar differences and Gregorian
variants for `U`. The catalog includes all cultures enumerated by the pinned
reference environment. `tools/dotnet10-format-locales.mjs --check` verifies
the profile data and culture-name union against the oracle. Every culture
remains an independent module, including newly added reference cultures.
Non-default calendars without an implementation and parsing remain roadmap
dependencies; matching default-culture formatting does not claim their parity.

## DateTimeFormatInfo

`DateTimeFormatInfo` is a class. Its constructor creates writable invariant
formatting information. `invariantInfo` is a shared read-only instance;
`currentInfo` follows `CultureInfo.currentCulture`. `clone()` produces a writable
copy with an independent calendar. `readOnly(info)` returns a read-only copy,
including its calendar, or the same instance when it is already read-only.

```typescript
import { DateTimeFormatInfo } from '@xobin/globalization/date-time-format-info';

const info = DateTimeFormatInfo.invariantInfo.clone();
info.shortDatePattern = 'yyyy/MM/dd';
const readOnlyInfo = DateTimeFormatInfo.readOnly(info);
```

`getInstance(provider)` accepts a format-info instance or queries
`provider.getFormat(DateTimeFormatInfo)`, using the constructor as the type token.
A null provider or an unsupported result falls back to `currentInfo`.
`CultureInfo.loadCultureInfo(name, data)` retains its synchronous registration
signature and constructs a format-info instance from the explicitly loaded data.

Locale era names and pattern collections are internal data, not additional
properties of this class. The RFC property is `rfc1123Pattern`. Designator,
first-day and week-rule validation, read-only checks, and calendar changes follow
the reference. Assigning a different calendar resets calendar-dependent date
data while preserving custom time patterns and designators. Assigning the same
calendar object preserves the current data.

Optional-calendar data is stored as compact differences in the selected locale
module. Each selected locale imports only the implementations of its optional calendars. The generated
profiles all have their calendar overrides and week rules regenerated from the reference. Day-name arrays require exactly seven
non-null entries. Their getters return copies, while setters retain the supplied
array, matching .NET (including subsequent caller mutations). All four month-name
arrays require thirteen entries, with non-null values in the first twelve; the
thirteenth entry may be empty, non-empty, or null. Getters copy the arrays and
setters retain the supplied references. Era names and abbreviations come from
the selected culture's data. `getEra`, `getEraName`, and
`getAbbreviatedEraName` support the current calendar; era-name comparison uses
the host's native `Intl.Collator` with case ignored and accents preserved.
Day/month name lookup methods validate their indexes without copying arrays.

`getAllDateTimePatterns` returns copies with the current default pattern first,
preserving reference order and duplicates. `setAllDateTimePatterns` accepts
`d`, `D`, `t`, `T`, `y`, or `Y`, retains its input array, and updates the default
and derived patterns. Tests check all default cultures and 59,094 DateTime
format-collection cases against the reference. The offset-zero DateTimeOffset
cache-invalidation assertions are exercised through the shared DateTime
formatter with an explicit offset pattern; no DateTimeOffset API is claimed.
Official tests containing parsing assertions remain pending; the complete official test
inventory has not yet reached full coverage.

### Formatting calendar prerequisites

JapaneseCalendar, TaiwanCalendar, KoreanCalendar, HijriCalendar and HebrewCalendar are TypeScript implementations with individual ESM entry points. CultureInfo.optionalCalendars creates fresh calendar instances in the pinned runtime's order. Locale modules carry private construction callbacks for their optional calendars; loadCultureInfo(name, data) remains synchronous. These callbacks are not public CultureData or CultureInfo properties. Importing a locale includes only its related calendar implementations.

Japanese first-era-year formatting, Japanese/Taiwan year digit rules, Hebrew calendar numbers and Hebrew leap/non-leap month names are compared with the actual .NET 10.0.7 runtime. HebrewCalendar contains only its intrinsic calendar translation data from the MIT-licensed .NET source. No time-zone database is added. Default two-digit-year settings follow the pinned reference environment.

Calendar dependency fixtures are supplemental differential checks, not a claim that every official calendar test has been ported. Five remaining official DateTimeFormatInfo methods contain parsing assertions and remain unmapped until parsing is agreed: both genitive parsing tests, Hebrew month round trips, Japanese first-era-year round trips, and French Canada time parsing. Their formatting portions have supplemental coverage.

KoreanCalendar now has equivalents for all 20 direct official test methods and 30 of its 31 inherited CalendarTestBase methods. Input providers, including seeded random inputs, are generated from the pinned official sources. Its 71 direct oracle rows include 55 MemberData rows. The remaining inherited Japanese date-parsing test is deliberately unmapped while parsing is deferred; no full CAL-07 completion is claimed.
