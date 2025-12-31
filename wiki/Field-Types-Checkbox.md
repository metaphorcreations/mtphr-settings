# Checkbox Field

A single checkbox field for boolean true/false values.

## Usage

```php
Settings::fields( [
    [
        'id' => 'enable_feature',
        'type' => 'checkbox',
        'label' => 'Enable Feature',
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'checkbox'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key

### Optional Properties

- `label` (string) - Field label displayed next to the checkbox
- `help` (string) - Help text displayed below the checkbox
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `std` (boolean) - Default value (default: false)
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Examples

### Basic Checkbox

```php
[
    'id' => 'enable_notifications',
    'type' => 'checkbox',
    'label' => 'Enable Email Notifications',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Checkbox with Default Value

```php
[
    'id' => 'auto_save',
    'type' => 'checkbox',
    'label' => 'Auto Save',
    'std' => true,
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Checkbox with Help Text

```php
[
    'id' => 'debug_mode',
    'type' => 'checkbox',
    'label' => 'Enable Debug Mode',
    'help' => 'Enable this to show debug information in the console.',
    'section' => 'advanced',
    'option' => 'my_settings',
]
```

### Conditional Display Based on Checkbox

```php
// First checkbox
[
    'id' => 'enable_api',
    'type' => 'checkbox',
    'label' => 'Enable API',
    'section' => 'general',
    'option' => 'my_settings',
],

// Field that shows when checkbox is checked
[
    'id' => 'api_key',
    'type' => 'text',
    'label' => 'API Key',
    'section' => 'general',
    'option' => 'my_settings',
    'show' => [
        'id' => 'enable_api',
        'value' => true,
    ],
]
```

## Value Type

Boolean (true/false)

## Related Fields

- [Toggle](Field-Types-Toggle) - Similar functionality with toggle switch UI
- [Checkboxes](Field-Types-Checkboxes) - For multiple checkbox options

