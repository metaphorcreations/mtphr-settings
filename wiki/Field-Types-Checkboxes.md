# Checkboxes Field

A field that displays multiple checkboxes, allowing users to select multiple options from a list.

## Usage

```php
Settings::fields( [
    [
        'id' => 'post_types',
        'type' => 'checkboxes',
        'label' => 'Post Types',
        'choices' => [
            'post' => 'Posts',
            'page' => 'Pages',
            'product' => 'Products',
        ],
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'checkboxes'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `choices` (array|object) - Available checkbox options

### Optional Properties

- `label` (string) - Field label displayed above the checkboxes
- `help` (string) - Help text displayed below the checkboxes
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `std` (array) - Default selected values (array of choice keys)
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

### Basic Checkboxes

```php
[
    'id' => 'features',
    'type' => 'checkboxes',
    'label' => 'Enabled Features',
    'choices' => [
        'feature1' => 'Feature 1',
        'feature2' => 'Feature 2',
        'feature3' => 'Feature 3',
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Checkboxes with Default Values

```php
[
    'id' => 'notifications',
    'type' => 'checkboxes',
    'label' => 'Notification Types',
    'choices' => [
        'email' => 'Email',
        'sms' => 'SMS',
        'push' => 'Push Notifications',
    ],
    'std' => ['email'], // Email selected by default
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Dynamic Choices from WordPress

```php
// Get post types dynamically
$post_types = get_post_types(['public' => true], 'objects');
$choices = [];
foreach ($post_types as $post_type) {
    $choices[$post_type->name] = $post_type->label;
}

[
    'id' => 'post_types',
    'type' => 'checkboxes',
    'label' => 'Post Types',
    'choices' => $choices,
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Type

Array of selected choice keys (strings)

Example: `['post', 'page', 'product']`

## Related Fields

- [Checkbox](Field-Types-Checkbox) - For single true/false value
- [Select](Field-Types-Select) - For dropdown selection (supports multiple)
- [Radio Buttons](Field-Types-Radio-Buttons) - For single selection from multiple options

