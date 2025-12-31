# Selection Input Field

An advanced selection field that displays options as clickable cards with headings and descriptions. Provides a more visual alternative to radio buttons or select dropdowns.

## Usage

```php
Settings::fields( [
    [
        'id' => 'plan',
        'type' => 'selection',
        'label' => 'Choose a Plan',
        'choices' => [
            'basic' => [
                'heading' => 'Basic Plan',
                'description' => 'Perfect for getting started',
            ],
            'pro' => [
                'heading' => 'Pro Plan',
                'description' => 'For advanced users',
            ],
        ],
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'selection'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `choices` (array|object) - Available selection options

### Optional Properties

- `label` (string) - Field label displayed above the selections
- `help` (string) - Help text displayed below the selections
- `showRadio` (boolean) - Show radio button on the left of each option (default: true)
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `std` (string) - Default selected value (choice key)
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Choices Format

Choices can be provided in two formats:

### Object Format with Heading and Description

```php
'choices' => [
    'value1' => [
        'heading' => 'Option 1',
        'description' => 'Description of option 1',
    ],
    'value2' => [
        'heading' => 'Option 2',
        'description' => 'Description of option 2',
    ],
]
```

### Object Format with Simple Labels

```php
'choices' => [
    'value1' => 'Option 1 Label',
    'value2' => 'Option 2 Label',
]
```

### Array Format

```php
'choices' => [
    [
        'value' => 'value1',
        'heading' => 'Option 1',
        'description' => 'Description of option 1',
    ],
    [
        'value' => 'value2',
        'heading' => 'Option 2',
        'description' => 'Description of option 2',
    ],
]
```

## Examples

### Basic Selection

```php
[
    'id' => 'theme',
    'type' => 'selection',
    'label' => 'Select Theme',
    'choices' => [
        'light' => 'Light Theme',
        'dark' => 'Dark Theme',
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Selection with Descriptions

```php
[
    'id' => 'plan',
    'type' => 'selection',
    'label' => 'Choose a Plan',
    'choices' => [
        'free' => [
            'heading' => 'Free Plan',
            'description' => 'Perfect for personal use',
        ],
        'pro' => [
            'heading' => 'Pro Plan',
            'description' => 'For businesses and professionals',
        ],
        'enterprise' => [
            'heading' => 'Enterprise Plan',
            'description' => 'Custom solutions for large organizations',
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Selection Without Radio Buttons

```php
[
    'id' => 'layout',
    'type' => 'selection',
    'label' => 'Layout Style',
    'showRadio' => false,
    'choices' => [
        'grid' => [
            'heading' => 'Grid Layout',
            'description' => 'Display items in a grid',
        ],
        'list' => [
            'heading' => 'List Layout',
            'description' => 'Display items in a list',
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Type

String (the key of the selected choice)

Example: `'pro'`

## Related Fields

- [Radio Buttons](Field-Types-Radio-Buttons) - For simpler single selection
- [Select](Field-Types-Select) - For dropdown selection

