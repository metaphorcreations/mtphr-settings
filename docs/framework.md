# Mtphr Settings — framework reference

PHP entry: load `index.php` (or your packaged path). The main class is `Ditty\ProX\Settings` in this tree; **consumers typically change the namespace** in their copy or build step to match the host plugin.

## Namespace, instance ID, and hooks

- The library is a **singleton**: `Settings::instance()`.
- **Settings UI id** (used in REST routes, script handles, and hook prefixes): `get_id()` returns `{namespaceIdentifier}Settings`, where `namespaceIdentifier` is the PHP namespace with backslashes removed (e.g. `MyVendor\MyPlugin` → `MyVendorMyPluginSettings`).
- Initialization runs on `init` and `rest_api_init` (priority 20). It fires these **actions once** each:
  - `{get_id()}/init_settings` — register admin pages, sections, defaults, sanitize/encryption maps, sidebars.
  - `{get_id()}/init_fields` — register fields (after sections exist).

Example hook names for namespace `MyVendor\MyPlugin`:

- `MyVendorMyPluginSettings/init_settings`
- `MyVendorMyPluginSettings/init_fields`

Custom fields can enqueue into the registry script using:

- `{get_id()}/enqueue_fields` — passes the script handle for the component registry build.

## Registration order

1. Load the library (so hooks can be added).
2. On `{get_id()}/init_settings`: call `Settings::admin_page()`, then `Settings::section()` for each tab/section, plus `Settings::default_values()`, `Settings::sanitize_settings()`, `Settings::encryption_settings()`, `Settings::sidebar()` as needed.
3. On `{get_id()}/init_fields`: call `Settings::fields()` per section (or rely on `add_field` behavior via `fields()` batch API).

Sections must exist **before** fields that reference them. Fields resolve `option` from the section when omitted.

## Static API (PHP)

| Method | Purpose |
| ------ | ------- |
| `Settings::admin_page( $data )` | Register top-level menu or submenu screen. |
| `Settings::section( $data )` | Register a section (tab/primary group) tied to a `menu_slug` and option key. |
| `Settings::fields( $data )` | Batch-add fields for one section: `$data` must include `section` and `fields` (array of field configs). |
| `Settings::sidebar( $data )` | Sidebar items and optional `width`, `main_max_width`. |
| `Settings::default_values( $option, $values )` | Default option array for `get_option`. |
| `Settings::sanitize_settings( $option, $map )` | Per-field sanitizers (callable names). |
| `Settings::encryption_settings( $option, $map )` | Which keys are encrypted at rest. |
| `Settings::get_value( $option, $key = false )` | Read saved values (with decrypt + defaults). |
| `Settings::set_value( $option, $key, $value )` | Persist values (supports array batch as second arg — see source). |

## Admin pages: top-level and subpages

`add_admin_page` / `Settings::admin_page()` **requires**: `page_title`, `menu_title`, `capability`, `menu_slug`.

- **Top-level menu:** omit `parent_slug`. Optional: `icon`, `position`, `header_icon`, `header_description`, `header_version`, `show_reset_button`, etc.
- **Subpage:** set `parent_slug` to the parent menu slug. Optional `position` for submenu order.

Each registered page renders the React root `#mtphr-settings-app` with `data-id` equal to `get_id()`.

## Sections

`Settings::section()` **requires**: `id`, `slug`, `menu_slug` (must match the admin page you register).

Common keys:

- `label` — tab/section label (generated from `id` if omitted).
- `option` — WordPress option name storing values for fields in this section (required in practice for saving; often one option per plugin).
- `order` — sort order (default 10).
- `type` — e.g. `primary` for top-level tabs.
- `parent_slug` — for nested section hierarchies when applicable.
- `show_tab_when_single` — if true, show the tab bar even when there is only one primary section.

Sections are filtered per page by matching `menu_slug` when building the UI.

## Fields

Use `Settings::fields([ 'section' => 'section_id', 'fields' => [ ... ] ])`.

Each field should include:

- `id`, `type` (React component key — see [field-types.md](field-types.md)), `label` as needed.
- `section` is set automatically from the batch wrapper; you may still include `option` or omit it to inherit from the section.

Optional/common:

- `order`, `help`, `default`, `show` / `hide` (conditional visibility; supports advanced condition arrays in recent versions).
- `encrypt` / `noupdate` — handled in PHP when processing settings metadata.

## Extending another plugin’s settings

Because there is a **single singleton** per class namespace, “extend” behavior is:

1. Use the **same PHP namespace** as the host integration **only if** you are in the same compiled package (usually you are not).
2. In practice, **the host plugin** should expose hooks on `{get_id()}/init_settings` and `{get_id()}/init_fields` so add-on code can call `Settings::section()` / `Settings::fields()` with **new** section ids and field ids, using the same `menu_slug` / `option` as the host. Avoid duplicate section `id` values (they must be unique globally in the library).

If your add-on uses a different namespace, it is a **separate** `Settings` instance — not the same admin app. Coordinate via the host’s hooks and APIs.

## REST and scripts

- REST base: `{get_id()}/v1` (see `register_rest_route` in `index.php`).
- Admin enqueue runs only on screens registered in `admin_pages` for the current screen id.

For deeper UI behavior of each field type, see the wiki `wiki/Field-Types-*` pages and [field-types.md](field-types.md).
