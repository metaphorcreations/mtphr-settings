# Radio Buttons Field

A field that displays radio buttons, allowing users to select a single option from multiple choices.

## Usage

```php
Settings::fields( [
    [
        'id' => 'layout',
        'type' => 'radio_buttons',
        'label' => 'Layout',
        'choices' => [
            'grid' => 'Grid',
            'list' => 'List',
            'masonry' => 'Masonry',
        ],
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'radio_buttons'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `choices` (array|object) - Available radio button options

### Optional Properties

- `label` (string) - Field label displayed above the radio buttons
- `help` (string) - Help text displayed below the radio buttons
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `std` (string) - Default selected value (choice key)
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

### Basic Radio Buttons

```php
[
    'id' => 'theme',
    'type' => 'radio_buttons',
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

### Radio Buttons with Default Value

```php
[
    'id' => 'sort_order',
    'type' => 'radio_buttons',
    'label' => 'Sort Order',
    'choices' => [
        'asc' => 'Ascending',
        'desc' => 'Descending',
    ],
    'std' => 'asc',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Radio Buttons with Help Text

```php
[
    'id' => 'cache_duration',
    'type' => 'radio_buttons',
    'label' => 'Cache Duration',
    'help' => 'Select how long cached data should be stored.',
    'choices' => [
        '1hour' => '1 Hour',
        '6hours' => '6 Hours',
        '24hours' => '24 Hours',
        '7days' => '7 Days',
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Type

String (the key of the selected choice)

Example: `'grid'`

## Related Fields

- [Select](Field-Types-Select) - For dropdown selection (single or multiple)
- [Checkboxes](Field-Types-Checkboxes) - For multiple selections
- [Toggle](Field-Types-Toggle) - For simple on/off toggle

