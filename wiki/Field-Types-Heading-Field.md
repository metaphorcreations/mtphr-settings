# Heading Field

A field that displays a heading to organize and separate sections of your settings page.

## Usage

```php
Settings::fields( [
    [
        'id' => 'section_heading',
        'type' => 'heading',
        'label' => 'General Settings',
        'level' => 4,
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'heading'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `label` (string) - Heading text

### Optional Properties

- `level` (integer) - Heading level: `1` | `2` | `3` | `4` | `5` | `6` (default: `4`)
- `class` (string) - Additional CSS classes
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Examples

### Basic Heading

```php
[
    'id' => 'main_heading',
    'type' => 'heading',
    'label' => 'Main Settings',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Heading with Custom Level

```php
[
    'id' => 'sub_heading',
    'type' => 'heading',
    'label' => 'Advanced Options',
    'level' => 5,
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Conditional Heading

```php
[
    'id' => 'pro_heading',
    'type' => 'heading',
    'label' => 'Pro Features',
    'level' => 4,
    'show' => [
        'id' => 'license_type',
        'value' => 'pro',
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Type

Headings don't store values. They are display-only fields.

## Related Fields

- [Spacer Field](Field-Types-Spacer-Field) - For adding spacing between sections
- [Custom HTML](Field-Types-Custom-HTML) - For more complex headings with HTML

