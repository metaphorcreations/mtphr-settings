# Number Input Field

A numeric input field with optional min/max validation.

## Usage

```php
Settings::fields( [
    [
        'id' => 'max_items',
        'type' => 'number',
        'label' => 'Maximum Items',
        'min' => 1,
        'max' => 100,
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'number'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key

### Optional Properties

- `label` (string) - Field label displayed above the input
- `help` (string) - Help text displayed below the input
- `placeholder` (string) - Placeholder text shown when input is empty
- `min` (number) - Minimum allowed value
- `max` (number) - Maximum allowed value
- `step` (number) - Step increment (default: 1)
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `labelPosition` (string) - Label position: `'top'` (default) | `'side'` | `'bottom'`
- `std` (number) - Default value
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Examples

### Basic Number Input

```php
[
    'id' => 'quantity',
    'type' => 'number',
    'label' => 'Quantity',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Number with Min/Max

```php
[
    'id' => 'age',
    'type' => 'number',
    'label' => 'Age',
    'min' => 0,
    'max' => 120,
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Number with Step

```php
[
    'id' => 'price',
    'type' => 'number',
    'label' => 'Price',
    'min' => 0,
    'step' => 0.01,
    'placeholder' => '0.00',
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Type

Number (integer or float)

## Related Fields

- [Text Input](Field-Types-Text-Input) - For text values
- [Slider](Field-Types-Slider) - For visual number selection (if available)

