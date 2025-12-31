# Select Field

A dropdown select field that supports both single and multiple selections.

## Usage

```php
Settings::fields( [
    [
        'id' => 'post_type',
        'type' => 'select',
        'label' => 'Post Type',
        'choices' => [
            'post' => 'Post',
            'page' => 'Page',
            'custom' => 'Custom Post Type',
        ],
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'select'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `choices` (array|object) - Available options

### Optional Properties

- `label` (string) - Field label displayed above the select
- `help` (string) - Help text displayed below the select
- `multiple` (boolean) - Allow multiple selections (default: false)
- `variant` (string) - Select variant: `'default'` | `'compact'`
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `labelPosition` (string) - Label position: `'top'` (default) | `'side'` | `'bottom'`
- `std` (string|array) - Default value (string for single, array for multiple)
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Choices Format

Choices can be provided in two formats:

### Object Format (Recommended)

```php
'choices' => [
    'value1' => 'Label 1',
    'value2' => 'Label 2',
    'value3' => 'Label 3',
]
```

### Array Format

```php
'choices' => [
    ['value' => 'value1', 'label' => 'Label 1'],
    ['value' => 'value2', 'label' => 'Label 2'],
    ['value' => 'value3', 'label' => 'Label 3'],
]
```

## Examples

### Single Selection

```php
[
    'id' => 'theme',
    'type' => 'select',
    'label' => 'Theme',
    'choices' => [
        'light' => 'Light',
        'dark' => 'Dark',
        'auto' => 'Auto',
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Multiple Selection

```php
[
    'id' => 'post_types',
    'type' => 'select',
    'label' => 'Post Types',
    'multiple' => true,
    'choices' => [
        'post' => 'Posts',
        'page' => 'Pages',
        'product' => 'Products',
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Compact Variant

```php
[
    'id' => 'status',
    'type' => 'select',
    'label' => 'Status',
    'variant' => 'compact',
    'choices' => [
        'active' => 'Active',
        'inactive' => 'Inactive',
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Type

- Single select: String
- Multiple select: Array of strings

## Related Fields

- [Radio Buttons](Field-Types-Radio-Buttons) - For single selection with visible options
- [Checkboxes](Field-Types-Checkboxes) - For multiple selections with visible options
- [Selection Input](Field-Types-Selection-Input) - For advanced selection interface

