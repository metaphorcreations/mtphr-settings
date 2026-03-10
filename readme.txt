== Changelog ==

= UNRELEASED =
* ApiConnectionsField removed from core; consuming plugins (e.g. Ditty Pro X) must register the api_connections component via their custom fields bundle
* Field visibility: support multiple conditions via show/hide with operator (and|or) and conditions array; single-condition object format unchanged
* Added CloneWrapper — any field type can opt into clone/sort_clone/min_clone/max_clone/add_button props to render multiple bare inputs under one label
* Added Time field type (native browser time picker, value stored as HH:MM string)
* Added truthy and falsy comparison operators to fieldVisibility.js for boolean/numeric field conditions
* Added Toggles field type — renders a responsive grid of toggle controls stored as a single object value
* Added show_reset_button page option with Reset button in footer to restore defaults
* Added default_values to frontend settingVars for client-side default restoration
* Added Repeater field type with drag-and-drop reordering, add/remove rows, and configurable min/max limits
* Added section option show_tab_when_single to show the tab bar even when only one primary section exists
* Hide top-level tab bar when only one primary section exists (unless show_tab_when_single is set)
* Fixed sub-page sections not rendering due to incorrect parent_slug filtering in get_sections
* Added API Connections field for multi-account OAuth connection management
* ApiConnectionsField: added optional clear_cache_url/clear_cache_nonce/clear_cache_label to show a destructive "Clear Cache" button; uses fetch DELETE to a REST endpoint and shows an inline success/error confirmation without reloading the page

= 1.1.5 [2026-02-28] =
* Added Notification field with support for success, error, warning, and info types

= 1.1.4 [2026-01-02] =
* Sanitization bug fix

= 1.1.3 [2025-12-31] =
* Added Date input
* Added Toggle input
* Added Options Matrix

= 1.1.2 [2025-12-21] =
* Added Selection input

= 1.1.1 [2025-12-14] =
* Added Ad field input

= 1.1.0 [2025-12-12] =
* Major reconfiguration of php files
* Added Integrations field and inputs
* Added Links inputs
* Field.js updates

= 1.0.10 [2025-12-11] =
* Added Ad field
* Field container updates

= 1.0.9 [2025-12-10] =
* Added sidebar functionality with configurable width and main content max-width
* Added header icon support for URLs, dashicons, and WordPress icons
* Added header description and version display
* Added HTML entity decoding for field labels
* UI layout improvements with new container structure

= 1.0.8 [2025-08-22] =
* Checkboxes field update to allow basic array choices
* Multilevel sanitize value updates

= 1.0.7 [2025-08-14] =
* Added init_tab attribute to tabs field
* Modified encryption functionality to not encrypt empty strings
* Button notification updates

= 1.0.6 [2025-07-24] =
* Top level settings page bug fix

= 1.0.5 [2025-07-21] =
* Field style updates
* Top level settings page updates

= 1.0.4 [2025-07-06] =
* Conditional field updates

= 1.0.3 [2025-07-04] =
* EddLicenseInput.js bug fixes

= 1.0.2 [2025-04-12] =
* Moved mtphr_settings_initialize_settings to init

= 1.0.1 [2025-04-02] =
* Added checks to ensure init_settings and init_fields only fire once