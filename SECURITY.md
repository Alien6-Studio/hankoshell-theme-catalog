# Security policy

The supported development line is 0.1.x. The catalogue is declarative data and authored CSS; it does not authenticate users, execute native identity operations or establish deployment state. Those responsibilities remain with the consuming application and theme builder.

Report vulnerabilities privately through [GitHub private vulnerability reporting](https://github.com/Alien6-Studio/hankoshell-theme-catalog/security/advisories/new). Include the affected revision or archive checksum, reproduction steps and expected impact. Do not disclose secrets or exploitable details in a public issue.

Catalogue builds validate document contracts before generating modules. CI checks dependencies and archive installation; CodeQL and secret scanning monitor the repository. Consumers should pin reviewed archive hashes and validate imported projects at their own trust boundary.
