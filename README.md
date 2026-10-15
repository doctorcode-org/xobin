# Xobin

TypeScript date/time libraries for browsers and Node.js, with exact 100-nanosecond
bigint ticks, .NET-derived calendar algorithms and selective culture data.

## Packages

- [@xobin/globalization](packages/globalization/README.md): DateTime, DateOnly,
  TimeOnly, TimeSpan, ISOWeek, fourteen concrete calendars and date/time formatting.
- [@xobin/core](packages/core/README.md): shared exceptions and utility types.

The supported JavaScript API deliberately omits CLR-only contracts. Parsing is
not implemented in this release. NumberFormatInfo is data, not a numeric formatter.

## Quick start

```sh
npm install @xobin/globalization
```

```ts
import { DateTime, CultureInfo } from '@xobin/globalization';
import { cultureData } from '@xobin/globalization/locales/fa-IR';

const culture = CultureInfo.loadCultureInfo('fa-IR', cultureData);
const date = new DateTime(2024, 3, 20, 13, 45, 0);
console.log(date.toString('yyyy/MM/dd HH:mm', culture)); // 1403/01/01 13:45
```

Formatting and conversions remain ordinary methods on the temporal classes.
There is no extensions registration step or prototype patching.

## User documentation

Start with the [usage guide](packages/globalization/docs/USAGE.md) for date/time
arithmetic, exact ticks, DateOnly/TimeOnly, selective cultures, calendars, ISO weeks,
native Date integration and server usage. See the
[formatting reference](packages/globalization/docs/FORMATTING.md) for standard and
custom patterns, providers, DateTimeFormatInfo and UTF-8/UTF-16 buffers.
Both guides are also included in the published globalization package.

## Compatibility and migration

Target environments are modern ES2022 browsers and Node.js 22/24.
See [support policy](docs/SUPPORT.md), [migration](packages/globalization/MIGRATION.md),
[JSON and server usage](docs/TRANSPORT_AND_SERVER.md) and [changelog](CHANGELOG.md).
The release CI validates Chromium, Firefox and WebKit using pinned Playwright.

## Development

```sh
npm ci
npm test
npm run browser:install -- --with-deps
npm run test:browser
npm run test:packed
npm run test:size
npm run check:generated
```

Normal tests use checked-in .NET 10.0.7 reference fixtures and do not require a
.NET installation. Regenerating the reference requires the pinned runtime source
and the matching .NET runtime. See [contributing](CONTRIBUTING.md).

## Release

```sh
npm run release:prepare
```

This runs the build, reference tests, strict consumer types, real browsers,
packed consumer tests, bundle size budgets and metadata checks. The public npm
publish workflow is manual and restricted to main; publication is not triggered
by a push. See [release instructions](docs/RELEASING.md).

## License

[MIT](LICENSE). See [third-party notices](THIRD_PARTY_NOTICES.md) for the .NET-derived
code and tests.
