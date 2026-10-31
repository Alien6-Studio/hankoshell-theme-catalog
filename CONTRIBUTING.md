# Contributing

Use Node 22 or 24. Run `npm ci` and `npm test` before proposing changes. Tests validate the authored sources, compiled package, original assets and public TypeScript exports in an isolated consumer.

Theme content belongs in `catalog/themes/<id>/`; layouts belong in `src/layouts/`. Keep all 18 screens and eight translations coherent. Include original asset sources, generation prompts where applicable, licence information and SHA-256 metadata. Inspect actual desktop, mobile and RTL previews in Hanko Theme Studio before updating `preview.png`.

Keep documents declarative and self-contained. Editor behavior and Keycloak/React export engines belong to `hankoshell-keycloak-theme-builder`. Update the compatible contract snapshot when the document format changes and qualify the pinned package in the builder.

Open a pull request against `main`. Explain the visible change and include representative screenshots and relevant validation. Sign commits and include a `Signed-off-by` trailer for the Developer Certificate of Origin. Main requires successful checks, signed commits and resolved review discussions.
