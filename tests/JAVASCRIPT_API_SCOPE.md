# JavaScript API scope

The .NET 10.0.7 source is a behavioral reference for selected features, not a
requirement to reproduce the complete CLR API. Browser and server consumers must
be able to load only the functionality they use. Parsing remains deferred.

The following approved removals apply to the current JavaScript API:

- DateTime Binary, OADate and Windows FileTime conversions.
- DateTime CLR conversions, TypeCode and SerializationInfo adapters.
- GetHashCode and Deconstruct on temporal types.
- Exception HRESULT state and HRESULT constructor overloads.

`dotnet10/excluded-members.json` records intentionally excluded reference API
members and test methods. Both inventory generators emit `excluded` rather than
counting these entries as missing implementations or mapped JavaScript tests.
Mixed reference tests still verify their retained comparison, arithmetic,
conversion and component assertions. Hash/deconstruction observations inside
those reference traces are deliberately not replayed.

Oracle fixtures retain the original .NET operations and values as reference
data. They do not imply that all fields or APIs are implemented in JavaScript.
Exception constructor replay excludes CLR error-code and HRESULT-mutation cases;
the supported message, parameter, actual-value and cause contracts remain tested.

Culture/calendar separation is a separate design step. The `U` format for a
non-Gregorian culture depends on that culture's Gregorian patterns and names.
Separating alternate calendar factories must preserve the required format data;
removing all `calendarFormats` would change valid formatting results.

## Verification after the removals

The rebuilt ESM/CommonJS packages and TypeScript consumers pass. The full
remaining suite passes 89,824 tests with zero failures, cancellations or skips.
Both reference inventories and the exception resource subset pass their checks.
The API inventory explicitly excludes 20 reference member signatures; the test
inventory excludes 64 case records for deliberately removed reference methods.

Using the same esbuild settings as the previous measurement (minified browser
ESM, ES2020, no gzip), TimeSpan-only consumption falls from 10.74 to 10.34 KiB,
DateTime consumption from 41.79 to 36.88 KiB, and the ordinary fa-IR scenario
from 78.54 to 73.62 KiB. One KiB is 1024 bytes. These are measured consumer
scenarios, not the size of every export or a completed modular redesign.
