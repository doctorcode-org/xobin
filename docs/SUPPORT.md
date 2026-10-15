# Supported environments

The 2.0 release target is Node.js 22 and 24 and modern browsers with ES2022,
bigint, Intl, TextEncoder and TextDecoder. CommonJS and native ESM entries are
available. Bundlers need package exports support; use ESM for tree shaking.
TypeScript 5.9.3 is the pinned strict consumer compiler. Older TypeScript and
legacy moduleResolution=node are not part of the release validation matrix.

CI checks Linux on Node 22/24, Windows on Node 24, and Chromium/Firefox/WebKit
from the pinned Playwright version. This validates those engines, not every
historical browser release or every Safari configuration. No Node polyfills or
timezone database are added to browser bundles.

Native local timezone results depend on the host's database. DST classification
is an estimate; .NET Windows timezone equality is not promised. Culture and calendar
fixtures are pinned to .NET 10.0.7, including default two-digit-year cutoffs.

Parsing is intentionally unavailable. CLR binary/COM/FileTime conversions,
serialization, TypeCode, hashing/deconstruction and HRESULT are intentionally
omitted. The full .NET CultureInfo API is not promised. NumberFormatInfo is data;
numeric formatting is not implemented by this package.

Normal tests use checked-in reference outputs; full reference regeneration needs
the pinned source/runtime. API surface presence is distinct from behavior parity.
The inventory accounts for inherited public members and retained constant naming;
parsing omissions and excluded CLR APIs must not be described as regressions.
