# Built-in field `type` values

These strings match `registerComponent()` keys in `assets/src/settings-app/utils/RegisterComponents.js` (the PHP `type` on each field should use these identifiers).

| `type` | Notes |
| ------ | ----- |
| `text` | Single-line text |
| `textarea` | Multi-line text |
| `number` | Numeric input |
| `date` | Date picker |
| `time` | Time picker (stored as `HH:MM` string) |
| `select` | Dropdown |
| `checkbox` | Single checkbox |
| `checkboxes` | Multiple checkboxes |
| `radio_buttons` | Radio group |
| `toggle` | Toggle switch |
| `toggles` | Grid of toggles (object value) |
| `selection` | Advanced selection control |
| `options_matrix` | Matrix options |
| `color` | Color picker |
| `button` | Single button |
| `buttons` | Button group |
| `links` | Link list / link builder |
| `html` | Custom HTML (`CustomHTMLInput`) |
| `heading` | Section heading |
| `spacer` | Spacing / separator |
| `group` | Groups nested fields |
| `tabs` | Tabbed container for nested fields |
| `repeater` | Repeating rows |
| `field` | Generic field wrapper |
| `notification` | Static notice (success/error/warning/info) |
| `mapping` | Key/value mapping |
| `ad` | Promo / ad slot |
| `edd_license` | EDD license field |
| `api_connections` | OAuth / API connection accounts |
| `integrations` | Integrations list |
| `integration_input` | Single integration line |
| `integration_modal` | Integration modal launcher |

Custom fields: enqueue a script on `{get_id()}/enqueue_fields` and call the registry’s register function (see `wiki/Creating-Custom-Fields.md`).
