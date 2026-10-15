# Migrating to 2.0

This is a major release. Update @xobin/globalization and @xobin/core together.
The globalization dependency requires @xobin/core ^2.0.0.

## Tick units and types

A tick is 100 nanoseconds since 0001-01-01 for DateTime, and a signed interval
for TimeSpan. Tick constructors require bigint. Convert stored values deliberately
according to their original units; passing a legacy numeric tick count is invalid.
Do not convert arbitrary tick counts through number, which loses precision.

```ts
const value = new DateTime(638464896000000001n, DateTimeKind.utc);
```

DateTimeKind remains the project's wrapper enum; use DateTimeKind.utc/local/
unspecified instead of raw numbers. An existing culture must be explicitly loaded
before constructing CultureInfo for that name.

## Cultures

Keep using CultureInfo.loadCultureInfo(name, cultureData). Import
@xobin/globalization/locales/fa-IR for the default Persian calendar, or
@xobin/globalization/locales/fa-IR/full for all its supported calendars. Import
parents explicitly if using culture.parent. The former dist/locales path is an
alias, but new applications should use locales directly.

## Removed CLR APIs

Remove calls to toBinary/fromBinary, toOADate/fromOADate and FileTime conversions.
CLR primitive conversions/toType, TypeCode, getObjectData, getHashCode, deconstruct
and hResult are not provided. No automatic compatibility layer is shipped.

## Formatting, conversions and equality

Keep using instance toString/tryFormat and the existing temporal constructors,
fromDateTime/fromTimeSpan/toDateTime/toTimeSpan conversions. There is no public
extensions or standalone-formatting entry. Use equals for value equality; === is
reference equality. DateTimeFormatInfo is now a class; use an instance or a loaded
culture's dateTimeFormat to supply formatting information.

## Runtime and transport

Use an ES2022-capable browser or Node.js 22/24. Import classes by name from
@xobin/globalization in browser and server code. Browser bundlers tree-shake the
ESM entry; CommonJS servers may load the complete API. Culture imports remain
selective. Do not mix ESM and CommonJS object graphs.

Do not JSON.stringify temporal instances directly. Transport DateTime as string
ticks and numeric kind, TimeOnly/TimeSpan as string ticks and DateOnly as numeric
dayNumber. Restore with bigint and the existing constructors/fromDayNumber.
On a server, pass each request's culture explicitly rather than changing shared
CultureInfo.currentCulture during async requests.

Local timezone behavior follows the host's native Date/Intl data rather than a
Windows timezone table. DST classification is an estimate. Default two-digit-year
settings follow the reference fixture environment. Parsing remains unavailable.
