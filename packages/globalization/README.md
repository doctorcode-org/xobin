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
