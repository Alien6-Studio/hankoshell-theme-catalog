# Authored catalogue

This directory is the canonical source of all 16 themes and their 288 page documents. Each theme owns its pages, native appearance configuration, original assets and actual Studio preview. Shared translations, font sources and image-generation prompts live alongside the theme directories.

Author changes here and in `../src/layouts/`, then validate and build with `npm test`. Consumers use the generated, versioned package; do not maintain another editable catalogue in the builder. See the [repository README](../README.md) for packaging and the explicit builder update command.
