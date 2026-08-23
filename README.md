# Skycoin Security

Security primitives component for the SKYCOIN4444 ecosystem.

## Current repository evidence

- Public TypeScript repository on `main`.
- AES-256-GCM encryption implementation is present under `src/security/encryption.ts`.
- A Node-based encryption test is present under `tests/encryption.test.js`.
- `package.json` provides real build, test, lint, and typecheck commands.

## Ecosystem role

**Security → Cryptographic Primitives / Security Controls**

The strongest demonstrated capability in this repository is controlled local encryption using Node.js AES-256-GCM. It is a reusable primitive, not a complete authentication system.

## Truthful status

- Encryption implementation: **present**
- Basic encryption tests: **present**
- Canonical security integration: **pending comparison and integration testing**
- Independent security audit: **not performed**
- Production deployment: **not verified**
- End-to-end authentication: **not claimed**

The repository should not be described as a complete enterprise security platform solely because cryptographic primitives are present.

## Consolidation approach

Preserve the existing implementation and tests. Compare this encryption capability with established Node.js cryptography practices and the other SKYCOIN4444 security repositories. Reuse the strongest verified primitive through a narrow interface rather than creating multiple encryption services.

For missing authentication, authorization, secret-management, or identity capabilities, evaluate mature public open-source foundations with strong maintenance and security records before implementing replacements. Preserve licenses and attribution and isolate external dependencies behind stable interfaces.

## Security requirements

Before production use:

- run the checked-in build, typecheck, lint, and encryption tests in CI
- document key lifecycle, storage, rotation, and destruction requirements
- add negative tests for malformed payloads and authentication-tag failures
- perform dependency/static analysis
- threat-model consumers of the primitive
- obtain independent security review for security-critical deployment
- never hard-code or persist encryption keys in source control

## License

MIT, subject to the checked-in license and applicable third-party dependency licenses.
