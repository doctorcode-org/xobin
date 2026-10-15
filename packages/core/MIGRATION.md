# Migrating @xobin/core to 2.0

Upgrade alongside @xobin/globalization 2.0. CLR primitive conversion contracts,
TypeCode, serialization hooks and hResult are removed. Keep using the retained
message, parameter and innerException constructor overloads; numeric HRESULT
constructor overloads are not supported. ESM/CommonJS and declarations are shipped.
The output targets ES2022 and the supported Node.js baseline is 22.
