# Textarea Field

A multi-line text input field for entering longer text content.

## Usage

```php
Settings::fields( [
    [
        'id' => 'description',
        'type' => 'textarea',
        'label' => 'Description',
        'help' => 'Enter a detailed description',
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'textarea'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key

### Optional Properties

- `label` (string) - Field label displayed above the textarea
- `help` (string) - Help text displayed below the textarea
- `placeholder` (string) - Placeholder text shown when textarea is empty
- `rows` (integer) - Number of visible text lines (default: 4)
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `labelPosition` (string) - Label position: `'top'` (default) | `'side'` | `'bottom'`
- `std` (string) - Default value
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Examples

### Basic Textarea

```php
[
    'id' => 'description',
    'type' => 'textarea',
    'label' => 'Description',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Textarea with Custom Rows

```php
[
    'id' => 'long_description',
    'type' => 'textarea',
    'label' => 'Long Description',
    'rows' => 10,
    'placeholder' => 'Enter a detailed description...',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Textarea with Help Text

```php
[
    'id' => 'custom_css',
    'type' => 'textarea',
    'label' => 'Custom CSS',
    'help' => 'Add custom CSS code here. This will be added to the frontend.',
    'rows' => 8,
    'section' => 'advanced',
    'option' => 'my_settings',
]
```

## Value Type

String

## Related Fields

- [Text Input](Field-Types-Text-Input) - For single-line text input
- [Custom HTML](Field-Types-Custom-HTML) - For displaying HTML content

