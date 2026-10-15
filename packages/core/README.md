# @xobin/core

Shared TypeScript exception classes and utility types used by Xobin packages.
Ships ESM and CommonJS with declarations. Targets modern ES2022 browsers and
Node.js 22/24. Runtime dependencies are not required.

```sh
npm install @xobin/core
```

```ts
import { ArgumentException, Exception } from '@xobin/core';

const cause = new Exception('Underlying failure');
const error = new ArgumentException('Invalid value.', 'value', cause);
console.log(error.message, error.paramName, error.innerException);
```

The public exceptions follow the retained .NET message, parameter and cause
contracts. CLR conversion interfaces, TypeCode, serialization hooks and HRESULT
state are intentionally omitted. Internal exception-format/resource exports are
implementation dependencies of matching Xobin packages and are not application APIs.

See [migration](MIGRATION.md), [changelog](CHANGELOG.md), [license](LICENSE) and
[third-party notices](THIRD_PARTY_NOTICES.md).
