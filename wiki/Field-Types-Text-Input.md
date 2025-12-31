# Text Input Field

A single-line text input field for entering text values.

## Usage

```php
Settings::fields( [
    [
        'id' => 'plugin_name',
        'type' => 'text',
        'label' => 'Plugin Name',
        'help' => 'Enter the name of your plugin',
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'text'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key

### Optional Properties

- `label` (string) - Field label displayed above the input
- `help` (string) - Help text displayed below the input
- `placeholder` (string) - Placeholder text shown when input is empty
- `prefix` (string) - Text or element displayed before the input
- `suffix` (string) - Text or element displayed after the input
- `type` (string) - HTML input type (default: `'text'`). Can be `'text'`, `'email'`, `'url'`, `'password'`, etc.
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `labelPosition` (string) - Label position: `'top'` (default) | `'side'` | `'bottom'`
- `std` (string) - Default value
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Examples

### Basic Text Input

```php
[
    'id' => 'title',
    'type' => 'text',
    'label' => 'Title',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Email Input

```php
[
    'id' => 'email',
    'type' => 'text',
    'label' => 'Email Address',
    'placeholder' => 'user@example.com',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Text with Prefix/Suffix

```php
[
    'id' => 'price',
    'type' => 'text',
    'label' => 'Price',
    'prefix' => '$',
    'suffix' => '.00',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Conditional Display

```php
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

String

## Related Fields

- [Textarea](Field-Types-Textarea) - For multi-line text input
- [Number Input](Field-Types-Number-Input) - For numeric values

