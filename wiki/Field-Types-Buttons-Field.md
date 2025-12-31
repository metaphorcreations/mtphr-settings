# Buttons Field

A field that displays multiple buttons in a group with configurable layout.

## Usage

```php
Settings::fields( [
    [
        'id' => 'action_buttons',
        'type' => 'buttons',
        'label' => 'Actions',
        'buttons' => [
            [
                'id' => 'save',
                'text' => 'Save',
                'variant' => 'primary',
            ],
            [
                'id' => 'cancel',
                'text' => 'Cancel',
                'variant' => 'secondary',
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
- `type` (string) - Must be `'buttons'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `buttons` (array) - Array of button configurations (see [Button Field](Field-Types-Button) for button properties)

### Optional Properties

- `label` (string) - Field label displayed above the buttons
- `help` (string) - Help text displayed below the buttons
- `alignment` (string) - Button alignment: `'left'` | `'center'` | `'right'`
- `direction` (string) - Button direction: `'row'` (horizontal) | `'column'` (vertical)
- `justify` (string) - Justify content: `'flex-start'` | `'center'` | `'flex-end'` | `'space-between'` | `'space-around'`
- `spacing` (string) - Spacing between buttons (e.g., `'10px'`, `'1rem'`)
- `wrap` (boolean) - Whether buttons should wrap to next line
- `class` (string) - Additional CSS classes
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Button Properties

Each button in the `buttons` array supports all properties from the [Button Field](Field-Types-Button), including:

- `id` (string) - Unique button identifier
- `text` (string) - Button text
- `action` (array) - Action configuration
- `variant` (string) - Button variant
- `icon` (string) - Icon name
- `disabled` (boolean) - Whether button is disabled
- And more...

## Examples

### Horizontal Button Group

```php
[
    'id' => 'actions',
    'type' => 'buttons',
    'label' => 'Quick Actions',
    'direction' => 'row',
    'spacing' => '10px',
    'buttons' => [
        [
            'id' => 'export',
            'text' => 'Export',
            'variant' => 'primary',
            'action' => [
                'type' => 'api',
                'url' => '/wp-json/my-plugin/v1/export',
            ],
        ],
        [
            'id' => 'import',
            'text' => 'Import',
            'variant' => 'secondary',
            'action' => [
                'type' => 'api',
                'url' => '/wp-json/my-plugin/v1/import',
            ],
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Vertical Button Group

```php
[
    'id' => 'settings_actions',
    'type' => 'buttons',
    'label' => 'Settings Actions',
    'direction' => 'column',
    'spacing' => '8px',
    'buttons' => [
        [
            'id' => 'reset',
            'text' => 'Reset to Defaults',
            'variant' => 'secondary',
            'isDestructive' => true,
        ],
        [
            'id' => 'backup',
            'text' => 'Create Backup',
            'variant' => 'secondary',
        ],
    ],
    'section' => 'advanced',
    'option' => 'my_settings',
]
```

### Centered Buttons

```php
[
    'id' => 'submit_buttons',
    'type' => 'buttons',
    'alignment' => 'center',
    'justify' => 'center',
    'buttons' => [
        [
            'id' => 'save',
            'text' => 'Save Changes',
            'variant' => 'primary',
        ],
        [
            'id' => 'cancel',
            'text' => 'Cancel',
            'variant' => 'secondary',
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Type

Buttons fields don't store values. They perform actions only.

## Related Fields

- [Button](Field-Types-Button) - For a single button

