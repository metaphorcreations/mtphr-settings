# Group Field

A container field that groups related fields together with configurable layout options.

## Usage

```php
Settings::fields( [
    [
        'id' => 'contact_info',
        'type' => 'group',
        'label' => 'Contact Information',
        'fields' => [
            [
                'id' => 'email',
                'type' => 'text',
                'label' => 'Email',
            ],
            [
                'id' => 'phone',
                'type' => 'text',
                'label' => 'Phone',
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
- `type` (string) - Must be `'group'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `fields` (array) - Array of field configurations to group together

### Optional Properties

- `label` (string) - Group label displayed as a heading
- `alignment` (string) - Field alignment: `'left'` | `'center'` | `'right'` | `'stretch'`
- `direction` (string) - Layout direction: `'row'` (horizontal) | `'column'` (vertical, default)
- `justify` (string) - Justify content: `'flex-start'` | `'center'` | `'flex-end'` | `'space-between'` | `'space-around'`
- `spacing` (string) - Spacing between fields (e.g., `'10px'`, `'1rem'`)
- `wrap` (boolean) - Whether fields should wrap to next line
- `class` (string) - Additional CSS classes
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Nested Fields

Fields within a group can use all standard field properties. If the group has an `id`, nested field values are stored under that group's value object. If no group `id` is provided, nested fields are stored at the root level of the settings option.

## Examples

### Vertical Group (Default)

```php
[
    'id' => 'address',
    'type' => 'group',
    'label' => 'Address',
    'direction' => 'column',
    'spacing' => '10px',
    'fields' => [
        [
            'id' => 'street',
            'type' => 'text',
            'label' => 'Street Address',
        ],
        [
            'id' => 'city',
            'type' => 'text',
            'label' => 'City',
        ],
        [
            'id' => 'zip',
            'type' => 'text',
            'label' => 'ZIP Code',
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Horizontal Group

```php
[
    'id' => 'dimensions',
    'type' => 'group',
    'label' => 'Dimensions',
    'direction' => 'row',
    'spacing' => '15px',
    'fields' => [
        [
            'id' => 'width',
            'type' => 'number',
            'label' => 'Width',
        ],
        [
            'id' => 'height',
            'type' => 'number',
            'label' => 'Height',
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Group Without ID (Fields at Root Level)

```php
[
    'type' => 'group',
    'direction' => 'row',
    'fields' => [
        [
            'id' => 'first_name',
            'type' => 'text',
            'label' => 'First Name',
        ],
        [
            'id' => 'last_name',
            'type' => 'text',
            'label' => 'Last Name',
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Storage

### With Group ID

If the group has an `id`, nested field values are stored as an object:

```php
// Field: 'contact_info' group with 'email' and 'phone' fields
[
    'contact_info' => [
        'email' => 'user@example.com',
        'phone' => '123-456-7890',
    ],
]
```

### Without Group ID

If the group has no `id`, nested fields are stored at the root level:

```php
// Group with 'first_name' and 'last_name' fields (no group id)
[
    'first_name' => 'John',
    'last_name' => 'Doe',
]
```

## Value Type

Object (if group has `id`) or individual field values (if group has no `id`)

## Related Fields

- [Tabs Field](Field-Types-Tabs-Field) - For tabbed field organization
- [Heading Field](Field-Types-Heading-Field) - For section headings within groups

