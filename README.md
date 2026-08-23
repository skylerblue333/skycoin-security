# Skycoin Security

Security and authentication component candidate for the SKYCOIN4444 ecosystem.

## Current repository evidence

- Public TypeScript repository on `main`.
- 27 tracked files were observed in the current audit snapshot.
- `package.json`, Docker configuration, Docker Compose configuration, and GitHub Actions CI configuration are present.
- No test-related filename was detected by the current audit.

## Ecosystem role

**Security → Authentication / Authorization / Security Controls**

This repository is a candidate source for security controls, authentication-related behavior, authorization, and security integration patterns. It must be compared with the canonical Identity/Auth implementation before capabilities are promoted.

## Truthful status

- Source/configuration: **present**
- Canonical security integration: **pending implementation comparison**
- Automated tests: **not established by the current repository evidence**
- Security audit: **not performed**
- Production deployment: **not verified**
- End-to-end authentication: **not claimed**

The previous README described the project as professional-grade and enterprise-ready without sufficient implementation evidence. This README intentionally separates repository presence from security assurance.

## Consolidation approach

Preserve existing source and configuration. Compare authentication, authorization, session, secrets, audit, and security-control capabilities against the canonical Identity/Auth, infrastructure, ShadowChat, and production repositories. Consolidate verified controls into the appropriate canonical boundary instead of maintaining duplicate security services.

For missing security infrastructure, prefer mature, actively maintained public open-source foundations where appropriate, but perform license, dependency, threat-model, and security review before adoption. Security code is never accepted solely because it is popular or large.

## Security requirements

Before production promotion:

- establish meaningful security and authorization tests
- perform dependency and static analysis
- define authentication/session/token boundaries
- enforce least privilege and secure secret handling
- add audit logging for security-sensitive operations
- test abuse, rate limits, and failure paths
- perform threat modeling and independent security review
- verify CI protections and branch controls
- perform end-to-end authentication/authorization tests

## License

See the checked-in repository license and applicable third-party dependency licenses.
