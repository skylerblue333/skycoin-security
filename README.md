# Sky Crypto Envelope

A focused TypeScript AES-256-GCM authenticated-encryption primitive from the SKYCOIN4444 engineering portfolio.

**Status: engineering beta.** The implementation and automated checks are suitable for learning, integration testing, and controlled development use. Independent security review, production deployment, key management, authentication, authorization, and secret-vault behavior are not claimed.

## What it implements

`FileEncryption` uses Node.js `crypto` with AES-256-GCM, 32-byte keys, random 96-bit IVs, and 128-bit authentication tags. New envelopes include an explicit schema version and algorithm identifier. Decryption validates envelope structure and authentication before returning plaintext.

Optional associated data can bind ciphertext to an external context such as a tenant, record, or protocol identifier without encrypting that context:

```ts
import { FileEncryption } from "skycoin4444-security";

const cryptoEnvelope = new FileEncryption();
const key = cryptoEnvelope.generateKey();
const encrypted = cryptoEnvelope.encrypt("example", key, "record:123");
const plaintext = cryptoEnvelope.decrypt(encrypted, key, "record:123");
```

Callers must manage key generation policy, storage, distribution, rotation, revocation, backup, and destruction. Do not store keys beside ciphertext or commit them to Git.

## Verification

```bash
pnpm install
pnpm typecheck
pnpm test
pnpm audit --audit-level=high
pnpm pack
```

Tests cover successful round trips, empty plaintext, malformed envelopes, incorrect key length, ciphertext/tag tampering, invalid algorithm/version values, malformed hexadecimal fields, and associated-data mismatch.

GitHub Actions performs typecheck, tests, dependency audit, and a package smoke test on Node.js 22. There is intentionally no runtime Docker image: this repository is a reusable library, not an HTTP service.

## SKYCOIN4444 integration

Use the package through a narrow adapter where application-level encryption is genuinely required. Do not copy the implementation into multiple services. Identity, authorization, secrets storage, HSM/KMS integration, and service-to-service authentication belong behind separate interfaces and should not be inferred from this primitive.

## Security limitations

AES-GCM authenticity does not compensate for compromised keys, weak application authorization, plaintext leakage, unsafe host/process memory, malicious dependencies, or incorrect key lifecycle. See `SECURITY.md` before integrating the package with sensitive data.

## License

MIT, subject to the checked-in license and applicable third-party licenses.
