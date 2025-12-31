# Toggle Field

A toggle switch control for boolean true/false values. Provides a modern, visual alternative to checkboxes.

## Usage

```php
Settings::fields( [
    [
        'id' => 'enable_feature',
        'type' => 'toggle',
        'label' => 'Enable Feature',
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'toggle'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key

### Optional Properties

- `label` (string) - Field label displayed next to the toggle
- `help` (string) - Help text displayed below the toggle
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `std` (boolean) - Default value (default: false)
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Examples

### Basic Toggle

```php
[
    'id' => 'enable_notifications',
    'type' => 'toggle',
    'label' => 'Enable Email Notifications',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Toggle with Default Value

```php
[
    'id' => 'auto_save',
    'type' => 'toggle',
    'label' => 'Auto Save',
    'std' => true,
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Toggle with Help Text

```php
[
    'id' => 'debug_mode',
    'type' => 'toggle',
    'label' => 'Enable Debug Mode',
    'help' => 'Enable this to show debug information in the console.',
    'section' => 'advanced',
    'option' => 'my_settings',
]
```

### Conditional Display Based on Toggle

```php
// First toggle
[
    'id' => 'enable_api',
    'type' => 'toggle',
    'label' => 'Enable API',
    'section' => 'general',
    'option' => 'my_settings',
],

// Field that shows when toggle is on
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

- [Checkbox](Field-Types-Checkbox) - Similar functionality with checkbox UI
- [Select](Field-Types-Select) - For selecting from multiple options

