# Releasing Xobin

The next release is 2.0.0 of @xobin/core and @xobin/globalization. Both package
versions and globalization's core dependency must move together. The workflow
publishes core first. No push, tag or PR automatically publishes a package.

## One-time npm setup

For EACH existing npm package (@xobin/core and @xobin/globalization), open package
Settings > Trusted publishing and add a GitHub Actions publisher:

- Organization or user: doctorcode-org
- Repository: xobin
- Workflow filename: publish.yml
- Environment: npm
- Allow direct npm publish for this trusted publisher.

The npm account configuring this must own/manage the two packages. The fields
must match exactly, including the environment. Do not send an npm token to a chat
or commit a token/npmrc. The workflow uses short-lived OIDC credentials and npm
provenance. See https://docs.npmjs.com/trusted-publishers/ .

In GitHub repository Settings > Environments, configure the npm environment with
required reviewers if appropriate, and restrict deployment branches to main.
Enable Actions if disabled. Require the CI package and browser jobs before merging
release changes to main. Private vulnerability reporting can be enabled in the
repository's Security settings. These are owner settings, not repository files.

## Review before publishing

Run the complete release preparation from a clean, installed checkout:

```sh
npm ci
npm run browser:install -- --with-deps
npm run release:prepare
```

The preparation does not publish or commit. It builds both packages, runs reference
and strict type tests, checks generated culture/API data, runs real browsers,
installs the actual tarballs in an offline consumer, checks browser bundles and
verifies browser size budgets using named imports from the package root. Server
bundle size is informational and does not gate releases. Artifacts live under
dist/release. A SHA256SUMS file records
tarball checksums. Review package contents, migration and changelog.

## Publish the reviewed commit

After review, merge to main. From Actions select Publish npm > Run workflow,
select main and enter the exact manifest version (initially 2.0.0).
The workflow re-runs all CI jobs before the protected npm job can publish.
It installs pinned npm, builds, re-tests tarballs and publishes those verified
files with public access. It rejects mismatched versions and a dirty tracked tree.
Do not manually run npm publish from an unverified working directory.

The workflow supports resuming a partial release: an existing npm version is
skipped only if its registry integrity matches the newly verified tarball exactly.
A different existing version is an error and is never overwritten. If core succeeds
but globalization fails, inspect the error and re-run the same reviewed commit.
If rebuilding produces different contents, resolve the difference or issue a new
version; do not change an already published version.

## Validate afterward

Install both packages from npm in a fresh project and check ESM/CommonJS, culture
loading and formatting. Check npm package versions, core dependency, provenance
and latest dist-tags, then create release notes for the reviewed version.
A published version cannot be replaced. Package availability and permissions must
be confirmed by the owner before the first manual run.

## Local browser download restrictions

The pinned Chromium download may be unavailable in some locations. Firefox and
WebKit can be installed independently with npm run browser:install -- firefox webkit.
For a local Chromium smoke run only, set XOBIN_CHROMIUM_CHANNEL to chrome or msedge
to use an installed compatible browser. CI does not set this override and tests
the pinned Playwright engines on GitHub-hosted Linux.

A local run cannot prove that GitHub CI or npm OIDC settings are configured. Require
successful remote CI and owner confirmation of trusted publishers before release.
