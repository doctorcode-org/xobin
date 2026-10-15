# Security policy

Security fixes target the current major release. No support timeline is promised
for historical npm releases.

Use GitHub private vulnerability reporting when enabled:
https://github.com/doctorcode-org/xobin/security/advisories/new
If that channel is unavailable, open an issue asking for private contact without
posting exploit details or credentials. Do not post npm tokens in issues or PRs.

Library objects and parsed transport data are not input-validation boundaries.
Validate untrusted ticks, Kind and culture selections at the application boundary.
