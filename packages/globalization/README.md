# `Xobin`

The sources for this package are in the main [Xobin](https://github.com/doctorcode-org/xobin) repo. Please file issues and pull requests against that repo.

Usage information and reference details can be found in [Xobin documentation](https://xobinjs.com/docs).

License: MIT

## Local time reference

DateTime local conversions use a snapshot of Windows `TimeZoneInfo` rules
exported by the pinned .NET 10.0.7 oracle. The host's `Intl` time-zone ID selects
the corresponding Windows zone through generated IANA aliases. This deliberately
uses the same historical rules as the Windows reference rather than the host's
historical IANA offsets. This snapshot does not update automatically when an OS
time-zone database changes. Unmapped host zone IDs currently use native offsets;
parity with the Windows reference is verified only for the mapped zones.

The rule generator and its alias input are in `tools/dotnet10-calendar-oracle`.
Its `--windows-time-zones`, `--date-time-time-zone-matrix`,
`--date-time-file-time`, and `--date-time-binary` modes support `--check` to
compare regenerated output. The supplemental matrix selects each Windows zone
as .NET's local zone inside the isolated oracle process so hidden ambiguous DST
state is tested through DateTime's public conversion and binary APIs.

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

Formatting data for invariant, `en-US`, `fr-FR`, `ru-RU`, `fa-IR`, `ar-SA`, and
`th-TH` is generated from the .NET reference, including Gregorian variants for
`U`. `tools/dotnet10-format-locales.mjs --check` verifies the shipped profile
data against its oracle. Refreshing the remaining locale profiles and adding
the DateTimeFormatInfo class and remaining calendars are outstanding roadmap
tasks; current tests do not claim formatting parity for every .NET culture.
