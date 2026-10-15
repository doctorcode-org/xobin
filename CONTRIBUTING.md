# Contributing

Use Node.js 24 and npm 11.13.0. Install with npm ci. Sources remain TypeScript;
tests use ordinary JavaScript against the built packages.

Run npm test, npm run browser:install -- --with-deps, npm run test:browser,
npm run test:packed, npm run test:size and npm run check:generated before review.
The browser install downloads pinned Chromium/Firefox/WebKit into dist. On Linux
--with-deps installs required system libraries. Reports and temporary consumers
stay under ignored dist directories.

The reference is dotnet/runtime v10.0.7 at commit
7706f546bac1a99b3d891afe3591dc88c67f0cc4. Normal tests use checked-in fixtures.
Reference regeneration is a separate deliberate operation requiring matching
source and .NET 10.0.7; do not refresh expected results to hide a regression.
The API inventory's --local mode compares checked-in reference signatures against
the TypeScript surface. It does not re-run or re-fetch the .NET source.

Preserve existing public naming, documentation spacing, exact ticks and selected
.NET behavior. Keep cultures explicitly loadable. Parsing and new public API
contracts require a separate design decision. Internal modules must remain free
of implicit registration and unrelated calendar dependencies.

Use pull requests, wait for CI, and review API and size changes. Publish only
through the reviewed manual release workflow described in docs/RELEASING.md.
