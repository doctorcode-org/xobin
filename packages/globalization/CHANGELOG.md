# Changelog

## 2.0.0 — prepared for release

### Breaking changes

- Exact temporal ticks use bigint with 100-nanosecond .NET tick units. Legacy
  JavaScript numeric tick values and compatibility adapters are not retained.
- Remove Binary/OADate/FileTime, CLR-only conversions, TypeCode, serialization,
  temporal hashing/deconstruction and exception hResult contracts.
- Default locale modules load their default calendar. Use the explicit full
  locale module when alternate calendars are required.
- DateTimeFormatInfo is a class with provider, clone and readonly behavior.
- Package output targets ES2022; the supported Node.js baseline is 22.

### Added and improved

- DateOnly, TimeOnly, ISOWeek and fourteen concrete calendar implementations.
- Standard/custom temporal formatting, UTF-16/UTF-8 buffer formatting and exact
  arithmetic checked against the pinned .NET 10.0.7 reference.
- Named root imports for browser and server usage, optional ESM/CommonJS direct
  entries, selective cultures and optional-calendar modules.
- Native JavaScript timezone handling without a bundled timezone database.
- Strict packed consumer checks, real-browser CI, bundle size budgets, release
  metadata validation and a manual trusted-publishing workflow.

### Scope

Parsing remains deferred. Full CLR API equality is not a release goal. Instance
formatting and temporal conversion methods remain available; the modularization
experiments are not part of the public package.
