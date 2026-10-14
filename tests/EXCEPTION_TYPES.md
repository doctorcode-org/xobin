# Exception contracts and resources — ERR-01 through ERR-03

The constructor contracts used by the temporal and globalization library are
checked against the real .NET 10.0.7 runtime. The pinned reference is runtime tag
`v10.0.7`, commit `7706f546bac1a99b3d891afe3591dc88c67f0cc4`.

## Runtime contracts

The core exceptions preserve null versus empty messages, the invalid parameter
name, the actual argument value and inner-exception identity.
`SystemException` and `ArithmeticException` supply the reference inheritance
hierarchy. CLR HRESULT state and the `InvalidCastException(message, errorCode)`
overload are deliberately excluded from the JavaScript API. Null messages on
`ArgumentException` use the default argument message without HRESULT-dependent
mutation behavior.
`CultureNotFoundException` now follows the reference constructor order and
exposes `invalidCultureName` and `invalidCultureId`; its identifier suffix uses
invariant decimal and hexadecimal formatting.

The number in an exception message is formatted when the message is read, using
the current culture's decimal separator, signs and special-value symbols. The
number formatter imports no culture data. Updating `CultureInfo.currentCulture`
updates the internal shared numeric context in ESM and CommonJS. Resource text
is the pinned English UI text. The reference fixture records the Windows
platform and CRLF line ending; JavaScript messages retain that reference ending.

Different C# nullable overloads can have identical JavaScript argument shapes.
For ArgumentNullException, ArgumentOutOfRangeException and CultureNotFoundException,
a null second or third argument selects the parameter/message overload. An
Exception instance selects the inner-exception overload. A C# cast such as
`(Exception)null` has no runtime representation in JavaScript; no extra public
overload-selection API is introduced.

Legacy BinaryFormatter constructors and serialization APIs, runtime stack
introspection, Data, HelpLink and Source are not added by these tasks. Parsing
remains postponed.

## Source and execution coverage

`dotnet10-exception-inputs.mjs` extracts 62 official constructor method bodies
and their InlineData inputs from the pinned source. The generated C# executes
those bodies, including the original shared assertion helper, on System types.
The observer records constructor arguments and reference results. Source paths,
method identifiers and source hashes are in `exception-constructor-sources.json`.

JavaScript replays the ERR-02 constructor contracts on the built package: type,
message, parameter, actual value, inner-exception identity and invalid
culture identifiers. Shared-helper assertions for Data, HelpLink, Source and
StackTrace are outside the JavaScript coverage scope. These rows are named
`constructor-contract` and are not added as fully mapped methods to the temporal
inventory. The direct culture/serialization constructor assertions are also
checked by the replay.

The JavaScript replay now covers 61 of the 62 extracted constructor methods.
`InvalidCastExceptionTests.Ctor_String_Int32` is intentionally excluded because
its error-code overload is CLR-only. The replay also omits three supplemental
error-code constructor rows and six HRESULT mutation rows, for 1314 executed
operations out of the 1324 recorded operations. It does not assert HRESULT on
any remaining row or on inner exceptions. The original reference fixtures and
their historical scope metadata remain unchanged; the current JavaScript scope
is defined by `exception-contracts.test.mjs` and this document.

The contract fixture contains 1324 recorded constructor operations, including
boundary numbers, negative zero, NaN, infinities, long limits, 128 deterministic
double bit patterns, culture symbols and custom symbols. A separate 146-row
consumer fixture checks CultureInfo's null/invalid-name errors and DateTime
validation ordering. A custom calendar verifies that the millisecond value is
passed to Calendar.ToDateTime exactly once.

## Resource layout

`exception_resources.ts` is generated from the original CoreLib Strings.resx.
Every resource is a separate named export, referenced with the original SR key.
There is no runtime dictionary containing the complete catalog. The internal
package paths share the formatter state while leaving root public exports free
of resource/helper APIs. The generator's check rejects copied inline .NET
messages and detects missing or altered resource text.

The existing JavaScript-specific argument-shape guards use a separate internal
module; their messages are not presented as .NET resources. The old placeholder
messages and incorrect calendar-era message were removed. DateTime overloads
now delegate milliseconds to the calendar and follow the reference's validation
order when several arguments are invalid.

Consumer tests cover TypeScript, Node ESM, CommonJS and browser bundling. They
verify that unrelated exception classes and resource strings are removed, and
that numeric symbols remain shared between cultures and exceptions.

## Reproduction

```powershell
node tools/dotnet10-exception-inputs.mjs D:/source/runtime --check
node tools/dotnet10-exception-resources.mjs D:/source/runtime --check
dotnet run --project tools/dotnet10-calendar-oracle -- --exception-types tests/dotnet10/exception-types-cases.json --check
dotnet run --project tools/dotnet10-calendar-oracle -- --exception-contracts tests/dotnet10/exception-contracts-cases.json --check
dotnet run --project tools/dotnet10-calendar-oracle -- --exception-consumers tests/dotnet10/exception-consumers-cases.json --check
```

Use `--write` for the source/resource generators or omit `--check` for an oracle
to regenerate its output. Tests execute the built package rather than TS source.

## Previous refactor verification

Before CLR HRESULT removal, the final suite passed all 89,957 tests with zero
failures or skips. Source and
consumer type checks, ESM/CommonJS builds, all 938 culture-symbol checks, the
resource/source generators, real .NET fixture checks, inventory checks and
`git diff --check` passed. ERR-01 was approved and committed as `b520dad`;
ERR-02/ERR-03 were completed and approved for commit.

After removing CLR-only temporal and HRESULT contracts, the rebuilt full suite
passes 89,824 tests with zero failures or skips. The supported exception
constructor and consumer contracts, culture-symbol checks and both package
formats are included. The removal batch has been reviewed and approved.
