# Spacer Field

A field that adds vertical spacing between other fields. Useful for visual organization and separation of settings sections.

## Usage

```php
Settings::fields( [
    [
        'id' => 'spacer_1',
        'type' => 'spacer',
        'height' => '30px',
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'spacer'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key

### Optional Properties

- `height` (string) - Height of the spacer (default: `'20px'`)
- `class` (string) - Additional CSS classes
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Examples

### Basic Spacer

```php
[
    'id' => 'spacer',
    'type' => 'spacer',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Custom Height Spacer

```php
[
    'id' => 'large_spacer',
    'type' => 'spacer',
    'height' => '50px',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Spacer with Rem Units

```php
[
    'id' => 'spacer',
    'type' => 'spacer',
    'height' => '2rem',
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Height Values

The `height` property accepts any valid CSS height value:

- Pixels: `'20px'`, `'50px'`
- Rem: `'1rem'`, `'2rem'`
- Em: `'1em'`, `'2em'`
- Percentage: `'10%'` (relative to parent)
- Viewport units: `'10vh'`

## Value Type

Spacers don't store values. They are display-only fields.

## Related Fields

- [Heading Field](Field-Types-Heading-Field) - For section headings
- [Custom HTML](Field-Types-Custom-HTML) - For custom spacing with HTML

