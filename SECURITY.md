# Security Policy

## Status

This repository is an engineering-beta cryptographic primitive. It implements AES-256-GCM authenticated encryption using Node.js `crypto`; it is not a key-management service, authentication system, secret vault, HSM integration, or audited cryptographic product.

## Key requirements

Callers must provide 32-byte keys from an approved cryptographically secure source and keep them outside source control, logs, analytics, URLs, and persisted application payloads. Key generation, custody, distribution, rotation, revocation, backup, and destruction are intentionally outside this package.

Never reuse an IV with the same AES-GCM key. `FileEncryption.encrypt()` generates a fresh 96-bit IV through `crypto.randomBytes()` for each envelope. Do not replace that behavior with predictable or caller-reused IVs.

Associated data, when used, must be supplied identically during decryption. It is authenticated but not encrypted by AES-GCM.

## Threat boundary

The package detects ciphertext, authentication-tag, IV, version, algorithm, and associated-data mismatches through GCM authentication and envelope validation. It does not protect plaintext or keys already exposed in process memory, compromised hosts, malicious dependencies, insecure key stores, application authorization failures, or side channels outside Node.js/OpenSSL.

## Verification

CI typechecks and runs negative/positive envelope tests, audits dependencies, and performs a package smoke test. These checks are not an independent security audit or formal cryptographic review.

Report suspected vulnerabilities privately through GitHub's security-reporting mechanism when available. Do not include live secrets, keys, tokens, private customer data, or exploitable production credentials in reports.
