# Changelog

## 1.1.0-beta.1 - 2026-08-25

- Narrowed the repository to a truthful AES-256-GCM authenticated-encryption package.
- Added versioned/algorithm-tagged envelopes and strict hexadecimal envelope validation.
- Added optional authenticated associated data support.
- Expanded tamper, wrong-context, malformed-envelope, empty-plaintext, and invalid-key tests.
- Added dependency-audit and package-smoke CI gates on Node.js 22.
- Removed the nonfunctional service Dockerfile; this package does not expose an HTTP server.
- Added an explicit security boundary and key-lifecycle requirements.

Production deployment, independent security review, key management, authentication, authorization, and secret-vault behavior are not claimed.
