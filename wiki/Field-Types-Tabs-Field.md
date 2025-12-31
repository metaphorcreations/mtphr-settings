# Tabs Field

A field container that organizes fields into tabs. Useful for grouping related settings into separate tabbed sections.

## Usage

```php
Settings::fields( [
    [
        'id' => 'advanced_settings',
        'type' => 'tabs',
        'tabs' => [
            [
                'id' => 'general',
                'label' => 'General',
                'fields' => [
                    [
                        'id' => 'setting1',
                        'type' => 'text',
                        'label' => 'Setting 1',
                    ],
                ],
            ],
            [
                'id' => 'advanced',
                'label' => 'Advanced',
                'fields' => [
                    [
                        'id' => 'setting2',
                        'type' => 'text',
                        'label' => 'Setting 2',
                    ],
                ],
            ],
        ],
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'tabs'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `tabs` (array) - Array of tab configurations

### Optional Properties

- `label` (string) - Field label (optional, tabs have their own labels)
- `init_tab` (string) - Initial tab to display (tab `id`)
- `class` (string) - Additional CSS classes
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Tab Properties

Each tab in the `tabs` array should have:

- `id` (string, required) - Unique tab identifier
- `label` (string, required) - Tab label
- `fields` (array, required) - Array of field configurations for this tab
- `show` (array, optional) - Conditional display for the entire tab
- `hide` (array, optional) - Conditional hide for the entire tab

## Examples

### Basic Tabs

```php
[
    'id' => 'settings_tabs',
    'type' => 'tabs',
    'tabs' => [
        [
            'id' => 'general',
            'label' => 'General',
            'fields' => [
                [
                    'id' => 'site_name',
                    'type' => 'text',
                    'label' => 'Site Name',
                ],
            ],
        ],
        [
            'id' => 'advanced',
            'label' => 'Advanced',
            'fields' => [
                [
                    'id' => 'debug_mode',
                    'type' => 'toggle',
                    'label' => 'Debug Mode',
                ],
            ],
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Tabs with Initial Tab

```php
[
    'id' => 'config_tabs',
    'type' => 'tabs',
    'init_tab' => 'advanced', // Start with 'advanced' tab
    'tabs' => [
        [
            'id' => 'general',
            'label' => 'General',
            'fields' => [ /* ... */ ],
        ],
        [
            'id' => 'advanced',
            'label' => 'Advanced',
            'fields' => [ /* ... */ ],
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Conditional Tabs

```php
[
    'id' => 'feature_tabs',
    'type' => 'tabs',
    'tabs' => [
        [
            'id' => 'basic',
            'label' => 'Basic',
            'fields' => [ /* ... */ ],
        ],
        [
            'id' => 'pro',
            'label' => 'Pro Features',
            'show' => [
                'id' => 'license_type',
                'value' => 'pro',
            ],
            'fields' => [ /* ... */ ],
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## URL Persistence

The active tab is stored in the URL query parameter using the field's `id`. This allows users to bookmark or share links to specific tabs.

Example: `?settings_tabs=advanced`

## Value Storage

Fields within tabs are stored at the root level of the settings option, not nested under the tab structure. Each field's `id` must be unique across all tabs.

## Value Type

Individual field values (not grouped by tab)

## Related Fields

- [Group Field](Field-Types-Group-Field) - For grouping fields without tabs
- [Heading Field](Field-Types-Heading-Field) - For headings within tabs

