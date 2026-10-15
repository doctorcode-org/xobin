# Date, time and duration formatting

Formatting stays on `DateTime`, `DateOnly`, `TimeOnly` and `TimeSpan` through
`toString` and `tryFormat`. This reference describes the supported 2.0 behavior;
it does not provide parsing. Every TypeScript example includes its own imports.

## Providers and defaults

Use `value.toString(format, provider)` with a CultureInfo or DateTimeFormatInfo.
Without a provider (or with null), formatting uses the current culture; the
initial current culture is invariant. Without a format (or with null/empty text),
DateTime uses `G`, DateOnly uses `d`, TimeOnly uses `t`, and TimeSpan uses `c`.
A DateTime below a non-Gregorian calendar's minimum can select the reference's
sortable fallback when no format was supplied.

For predictable invariant output, pass `CultureInfo.invariantCulture` or
`DateTimeFormatInfo.invariantInfo`. Standard `O`, `R`, `s` and `u` are invariant
Gregorian formats regardless of the supplied culture.

```ts
import { DateTime, CultureInfo } from '@xobin/globalization';
import { cultureData } from '@xobin/globalization/locales/fa-IR';

const culture = CultureInfo.loadCultureInfo('fa-IR', cultureData);
const date = new DateTime(2024, 3, 20, 13, 45, 6);

console.log(date.toString('yyyy/MM/dd HH:mm:ss', culture));
console.log(date.toString('yyyy/MM/dd HH:mm:ss', CultureInfo.invariantCulture));
console.log(date.toString('s', culture));
```

Output:

```text
1403/01/01 13:45:06
2024/03/20 13:45:06
2024-03-20T13:45:06
```

Culture names and patterns do not imply numeric digit substitution. For example,
the Persian examples above use ASCII digits. Some calendars have calendar-specific
representations, such as Hebrew numbers or the Japanese first year of an era.

## Standard DateTime formats

A format consisting of one character is a standard specifier:

- `d`: short date.
- `D`: long date.
- `t`: short time.
- `T`: long time.
- `f`: long date and short time.
- `F`: full date/time pattern.
- `g`: short date and short time.
- `G`: short date and long time (the usual DateTime default).
- `m` / `M`: month/day pattern.
- `y` / `Y`: year/month pattern.
- `o` / `O`: invariant round-trip shape with seven fractional digits and Kind.
- `r` / `R`: invariant RFC1123 shape ending in the literal `GMT`.
- `s`: invariant sortable `yyyy-MM-ddTHH:mm:ss`.
- `u`: invariant universal-sortable `yyyy-MM-dd HH:mm:ssZ`.
- `U`: convert to UTC and format using the culture's full pattern with Gregorian
  date fields.

`R` and `u` do **not** convert DateTime to UTC before appending their literal zone
text. Call `toUniversalTime()` first when formatting a local value as UTC.
`s` contains no timezone information. `O` emits `Z` for UTC, a host local offset
for local Kind, and no suffix for unspecified Kind. It preserves seven fractional
digits in the output; Xobin does not currently parse that text back.

```ts
import { DateTime, DateTimeKind } from '@xobin/globalization';

const date = new DateTime(2024, 3, 20, 13, 45, 6, 123, DateTimeKind.utc).addTicks(4567n);
console.log(date.toString('O'));
console.log(date.toString('R'));
console.log(date.toString('s'));
console.log(date.toString('u'));
```

Output:

```text
2024-03-20T13:45:06.1234567Z
Wed, 20 Mar 2024 13:45:06 GMT
2024-03-20T13:45:06
2024-03-20 13:45:06Z
```

## Custom DateTime tokens

Formats longer than one character are custom patterns. Letter case matters:
`MM` is a month, `mm` is minutes, `HH` is a 24-hour clock, and `hh` is a 12-hour
clock.

- `y`, `yy`: the year modulo 100, with minimum one/two digits.
- `yyy`, `yyyy`, etc.: calendar year padded to the requested width. Japanese and
  Taiwan era years have reference-specific padding rules.
- `M`, `MM`: month number with minimum one/two digits.
- `MMM`, `MMMM`: abbreviated/full month name; culture-specific genitive and leap
  month names are selected when applicable.
- `d`, `dd`: day of month with minimum one/two digits.
- `ddd`, `dddd`: abbreviated/full weekday name.
- `H`, `HH`: hours 0 through 23.
- `h`, `hh`: hours 1 through 12.
- `m`, `mm`: minutes; `s`, `ss`: seconds.
- `f` through `fffffff`: fixed-width fractional seconds (maximum seven digits).
- `F` through `FFFFFFF`: fractional seconds with trailing zeroes removed. A
  preceding decimal point is also omitted when all selected digits are zero.
- `t`, `tt`: first character/full AM or PM designator.
- `g`, `gg`: calendar era name.
- `z`, `zz`, `zzz`: offset hour, padded hour, or hour and minute. Local offsets
  use the host timezone; UTC values have offset zero.
- `K`: Kind suffix (`Z`, local offset, or empty for unspecified).
- `/`, `:`: the provider's date and time separators, not necessarily literal
  slash and colon.

Quote literal text with single or double quotes. A backslash escapes one pattern
character; in a normal JavaScript string it must be written as `\\`.
Use `%` to request a single custom token: `'%d'` is day of month, whereas `'d'`
alone is the standard short date. An unknown single standard specifier throws.
Unrecognized letters in a longer DateTime custom pattern can be emitted literally;
quote intended literal text to avoid accidental interpretation.

```ts
import { DateTime, CultureInfo } from '@xobin/globalization';

const date = new DateTime(2024, 3, 20, 13, 5, 6, 120);
const provider = CultureInfo.invariantCulture;

console.log(date.toString("yyyy'-'MM'-'dd 'at' HH':'mm", provider));
console.log(date.toString('hh:mm tt', provider));
console.log(date.toString('ss.fff', provider));
console.log(date.toString('ss.FFFFFFF', provider));
console.log(date.toString('%d', provider));
```

Output:

```text
2024-03-20 at 13:05
01:05 PM
06.120
06.12
20
```

Custom date fields follow the provider's selected calendar. Use an invariant
provider for Gregorian machine-oriented custom formats. Writing `yyyy-MM-dd`
with a Persian provider formats a Persian date, not an ISO Gregorian date.

## DateOnly and TimeOnly formats

DateOnly permits standards `d`, `D`, `m`, `M`, `y`, `Y`, `o`, `O`, `r`, `R`.
`O` is invariant `yyyy-MM-dd`; `R` is invariant `ddd, dd MMM yyyy`.
Custom date patterns may use date and era fields, but not clock or offset fields.

TimeOnly permits standards `t`, `T`, `o`, `O`, `r`, `R`. `O` is invariant
`HH:mm:ss.fffffff`; `R` is invariant `HH:mm:ss`. Custom clock patterns may use
hours, minutes, seconds, fractions and AM/PM, but not date or timezone fields.
Quote literal text that would otherwise be interpreted as an unsupported field.

```ts
import { DateOnly, TimeOnly, CultureInfo } from '@xobin/globalization';

const day = new DateOnly(2024, 3, 20);
const time = new TimeOnly(13, 45, 6, 123);
console.log(day.toString('O'));
console.log(day.toString('R'));
console.log(time.toString('O'));
console.log(time.toString('hh:mm tt', CultureInfo.invariantCulture));
```

Output:

```text
2024-03-20
Wed, 20 Mar 2024
13:45:06.1230000
01:45 PM
```

## TimeSpan formats

TimeSpan describes an interval, not a time of day or a date. It has a separate
format language:

- `c` (also `t` / `T`): invariant constant format
  `[-][d.]hh:mm:ss[.fffffff]`; omit days/fractions when zero.
- `g`: general short; omit zero days and trailing fraction zeroes, use an
  unpadded hour and the provider's decimal separator.
- `G`: general long; always include days, two-digit hours and seven fraction
  digits, with the provider's decimal separator.

Custom tokens: `d` through `dddddddd` for whole days, `h` / `hh`, `m` / `mm`,
`s` / `ss` for component fields, and up to seven `f` / `F` for fixed/trimmed
fractions. Other characters, including punctuation, must be escaped or quoted.
Use `%d`, `%h`, etc. for a single custom token. Custom formats do not add a minus
sign automatically; add a literal sign deliberately when displaying a negative
interval. The component hours are modulo 24, not total hours.

```ts
import { TimeSpan, CultureInfo } from '@xobin/globalization';

const span = new TimeSpan(1, 2, 3, 4, 500);
const provider = CultureInfo.invariantCulture;
console.log(span.toString('c'));
console.log(span.toString('g', provider));
console.log(span.toString('G', provider));
console.log(span.toString("d' days 'hh':'mm':'ss"));
console.log(TimeSpan.fromMinutes(90).toString('hh\\:mm'));
```

Output:

```text
1.02:03:04.5000000
1:2:03:04.5
1:02:03:04.5000000
1 days 02:03:04
01:30
```

For an unambiguous signed duration representation, prefer `c` rather than a
custom format that drops the sign or days.

## Customize DateTimeFormatInfo

Clone a culture's `dateTimeFormat` to customize patterns without changing that
CultureInfo's formatting state. Pass the clone directly as the provider.
Read-only/invariant instances reject setters; `clone()` returns a writable copy.
When changing name arrays, assign a replacement array rather than mutating an
array obtained from a shared or read-only instance.

```ts
import { DateTime, DateTimeFormatInfo } from '@xobin/globalization';

const info = DateTimeFormatInfo.invariantInfo.clone();
info.shortDatePattern = 'yyyy/MM/dd';
info.dateSeparator = '-';
const date = new DateTime(2024, 3, 20);

console.log(date.toString('d', info));
console.log(date.toString("yyyy'/'MM'/'dd", info));
console.log(DateTimeFormatInfo.readOnly(info).isReadOnly);
```

Output:

```text
2024-03-20
2024/03/20
true
```

`setAllDateTimePatterns(patterns, format)` accepts `d`, `D`, `t`, `T`, `y` or `Y`;
the first pattern becomes the active pattern. `getAllDateTimePatterns(format)`
returns pattern strings. DateTime's `getDateTimeFormats(format, provider)` returns
the actual formatted strings. `DateTimeFormat.format` and `getAllFormats` are
also available from `@xobin/globalization`, when an explicit
formatter call is preferable to the equivalent instance methods.

## Format into a buffer

`tryFormat(destination, written, format, provider)` accepts `string[]`,
`Uint16Array` or `Uint8Array`. Initialize array length as buffer capacity.
`written.result` counts UTF-16 code units for the first two types, and UTF-8 bytes
for Uint8Array. Decode only the written portion, not the entire buffer.

```ts
import { DateTime, CultureInfo } from '@xobin/globalization';
import { cultureData } from '@xobin/globalization/locales/fa-IR';

const culture = CultureInfo.loadCultureInfo('fa-IR', cultureData);
const date = new DateTime(2024, 3, 20);
const written = { result: 0 };
const bytes = new Uint8Array(64);
if (!date.tryFormat(bytes, written, 'yyyy/MM/dd', culture)) {
    throw new Error('Buffer too small.');
}
console.log(new TextDecoder().decode(bytes.subarray(0, written.result)));

const chars = new Array<string>(32);
if (!date.tryFormat(chars, written, 's')) throw new Error('Buffer too small.');
console.log(chars.slice(0, written.result).join(''));
```

Output:

```text
1403/01/01
2024-03-20T00:00:00
```

A too-small destination returns false with a zero written count. Do not consume
its contents after failure: DateOnly/TimeOnly can partially write according to the
reference builder behavior. Invalid format strings still throw FormatException;
`tryFormat` is not a no-throw validation API. No allocation-free formatting
guarantee is made.

See the [usage guide](USAGE.md) for selective culture loading, alternate calendars,
native timezone limitations and server request isolation.
