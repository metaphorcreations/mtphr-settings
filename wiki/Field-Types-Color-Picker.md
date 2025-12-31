# Color Picker Field

A field for selecting one or more colors using WordPress's color palette.

## Usage

```php
Settings::fields( [
    [
        'id' => 'primary_color',
        'type' => 'color',
        'label' => 'Primary Color',
        'min' => 1,
        'max' => 5,
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'color'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key

### Optional Properties

- `label` (string) - Field label displayed above the color picker
- `help` (string) - Help text displayed below the color picker
- `min` (integer) - Minimum number of colors required (default: 1)
- `max` (integer) - Maximum number of colors allowed
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `std` (array) - Default color values (array of hex color strings)
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Examples

### Single Color

```php
[
    'id' => 'primary_color',
    'type' => 'color',
    'label' => 'Primary Color',
    'min' => 1,
    'max' => 1,
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Multiple Colors

```php
[
    'id' => 'color_scheme',
    'type' => 'color',
    'label' => 'Color Scheme',
    'min' => 1,
    'max' => 5,
    'help' => 'Select up to 5 colors for your color scheme',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Colors with Default Values

```php
[
    'id' => 'brand_colors',
    'type' => 'color',
    'label' => 'Brand Colors',
    'min' => 2,
    'max' => 4,
    'std' => ['#000000', '#ffffff'],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Type

Array of hex color strings

Example: `['#000000', '#ffffff', '#ff0000']`

## Usage Notes

- Click a color swatch to select it and open the color palette
- Click the "+" button to add a new color (up to max)
- Click the "×" button on a color to remove it (must maintain minimum)
- The color palette uses WordPress's default color swatches

## Related Fields

- [Text Input](Field-Types-Text-Input) - For entering color values manually

