# SkyPolicy — Slot #72 / Lane 12

SkyPolicy is an engineering-beta deterministic policy decision core inside `skycoin-security`.

## Supported boundary

It validates a caller-supplied principal/action/resource request, validates bounded policy rules, applies wildcard matching, deterministic priority ordering, deny-overrides on equal priority, and default-deny behavior. The return value includes the winning rule identifier and `enforcementPerformed: false` so a decision cannot be mistaken for enforcement.

## SKYCOIN4444 integration contract

Consumers such as SkyAuth, SkyPermissions, API middleware, or administrative tooling may translate their authenticated subject and requested capability into:

```ts
{ principal: "user:123", action: "invoice:read", resource: "invoice:456" }
```

They may then call `evaluatePolicy(request, rules)` and independently enforce the returned decision. Authentication, tenant isolation, rule persistence/distribution, audit persistence, and enforcement remain consumer responsibilities.

## Security and truth boundaries

- Fail-closed default: unmatched requests are denied.
- Duplicate rule IDs, malformed tokens, empty matcher sets, excessive matcher counts, and excessive rule counts are rejected.
- Wildcards are exact `*` values only; there is no glob/regex interpretation.
- A deny rule wins an equal-priority allow/deny conflict.
- This library does not authenticate identities, fetch policies, store policies, enforce decisions, provide a PDP/PEP network service, prove compliance, or claim production deployment.

## Verification

`pnpm typecheck`, `pnpm test`, `pnpm audit --audit-level=high`, and package creation are exercised by GitHub Actions for product branches and pull requests.
