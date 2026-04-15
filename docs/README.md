# Mtphr Settings — bundled documentation

This folder ships with the package (Composer installs and vendored copies) so tools and developers can see how the framework works without the GitHub wiki.

| Document | Contents |
| -------- | -------- |
| [framework.md](framework.md) | Namespace and IDs, bootstrapping, action hooks, admin pages and subpages, sections, fields, defaults, sanitization, encryption, sidebars |
| [field-types.md](field-types.md) | Built-in React field `type` strings registered by the library |

**Related:** human-edited wiki pages live in the repo’s `wiki/` directory (often mirrored on GitHub Wiki).

## Host plugins (Cursor and other AI tools)

Point project rules or `@`-references at `includes/.../mtphr-settings-git/docs/` (or your Composer `vendor/metaphorcreations/mtphr-settings/docs/` path) so agents load `framework.md` and `field-types.md` when editing integration code.
