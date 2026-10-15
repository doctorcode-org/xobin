# Data transport and server cultures

## Direct JSON serialization

DateTime, DateOnly, TimeOnly and TimeSpan implement toJSON. JSON.stringify calls
it automatically, including for nested properties and array elements. The result
is an invariant string: DateTime O, DateOnly yyyy-MM-dd, TimeOnly HH:mm:ss.fffffff,
and TimeSpan c. Tick precision and interval signs are preserved.

DateTime UTC values have a Z suffix, local values have the host offset and
unspecified values have no suffix. Serialization does not force values to UTC.
No arbitrary named timezone is stored. Format output is independent of the
current culture and selected calendar.

JSON.parse returns ordinary strings; it does not reconstruct instances. Parsing
remains deferred. Passing these strings through native Date loses submillisecond
precision. toJSON does not change JavaScript's behavior for unrelated raw bigint
properties, which still need explicit conversion to strings.

## Exact wire values for restoring instances

When instances must be restored without a date/time parser, use explicit fields,
preserving exact ticks as decimal strings:

```ts
import { DateTime, DateTimeKind } from '@xobin/globalization';

const value = new DateTime(638464896000000001n, DateTimeKind.utc);
const json = JSON.stringify({ ticks: value.ticks.toString(), kind: value.kind.value });
const data = JSON.parse(json);
// Validate object shape, decimal tick text and Kind 0/1/2 at the application boundary.
const restored = new DateTime(BigInt(data.ticks), new DateTimeKind(data.kind));
```

For DateOnly use { dayNumber: value.dayNumber } and DateOnly.fromDayNumber.
For TimeOnly and TimeSpan use { ticks: value.ticks.toString() } and their bigint
constructors. Do not pass tick values through number. A named timezone is separate
application metadata; DateTimeKind does not store an arbitrary timezone ID.

## Request-specific culture

Register required culture data at application startup. Pass an explicit provider
through asynchronous rendering; currentCulture is shared module state.

```ts
import { CultureInfo } from '@xobin/globalization';
import { cultureData as persianData } from '@xobin/globalization/locales/fa-IR';
import { cultureData as englishData } from '@xobin/globalization/locales/en-US';

CultureInfo.loadCultureInfo('fa-IR', persianData);
CultureInfo.loadCultureInfo('en-US', englishData);

async function render(date, supportedLocale) {
    const culture = new CultureInfo(supportedLocale);
    await Promise.resolve();
    return date.toString('G', culture);
}
```

Choose supportedLocale from an application allowlist. Do not mutate shared
currentCulture to implement request isolation. The library does not introduce
AsyncLocalStorage or a Node-only browser dependency.

ESM and CommonJS have separate class identities and culture state. Keep each
application object graph in one module format. Default/full culture imports have
no registration side effects, so importing the data alone does not change a server's
current culture.
