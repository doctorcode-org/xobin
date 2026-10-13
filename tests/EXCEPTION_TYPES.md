# Exception types — ERR-01

The constructors of `Exception`, `FormatException`, `InvalidCastException`, and
`SerializationException` are checked against the real .NET 10.0.7 runtime.
The source reference is runtime tag `v10.0.7`, commit
`7706f546bac1a99b3d891afe3591dc88c67f0cc4`.

`ExceptionTypesOracle.cs` directly creates the System exception instances. Its
48 supplemental cases cover the default constructor, null/empty/custom/Unicode
messages, and the message-plus-inner-exception overload. JavaScript tests run
against the built package and also check inner-exception identity.

These are supplemental constructor checks, not new mappings of official
DateTime/calendar test methods. The existing official conversion and formatting
mappings continue to exercise InvalidCastException and FormatException.
SerializationException is exported as specified by ERR-01; this task introduces
no serialization or parsing algorithm. Legacy formatter constructors, HResult,
and the broader exception-contract audit are outside this task (ERR-02).

Regenerate or check the fixture:

```powershell
dotnet run --project tools/dotnet10-calendar-oracle -- --exception-types tests/dotnet10/exception-types-cases.json
dotnet run --project tools/dotnet10-calendar-oracle -- --exception-types tests/dotnet10/exception-types-cases.json --check
```

Packaging checks cover Node ESM, CommonJS, TypeScript consumers, and browser
bundles. Importing one of the three exception types excludes the other exception
classes from the browser bundle.
