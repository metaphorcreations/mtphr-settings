# Options Matrix Field

A table/matrix field that allows configuring multiple options for multiple items. Each row represents an item, and each column represents an option to configure.

## Usage

```php
Settings::fields( [
    [
        'id' => 'post_type_settings',
        'type' => 'options_matrix',
        'label' => 'Post Type Settings',
        'items' => ['post', 'page', 'product'],
        'options' => [
            [
                'key' => 'enabled',
                'label' => 'Enabled',
                'type' => 'toggle',
            ],
            [
                'key' => 'limit',
                'label' => 'Limit',
                'type' => 'number',
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
- `type` (string) - Must be `'options_matrix'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `items` (array) - Array of items (strings or objects with `id` and `label`)
- `options` (array) - Array of option configurations

### Optional Properties

- `label` (string) - Field label displayed above the matrix
- `help` (string) - Help text displayed below the matrix
- `item_label` (string|false) - Label for the items column (default: "Item")
- `disabled` (boolean) - Whether all inputs are disabled
- `class` (string) - Additional CSS classes
- `std` (object) - Default values (multidimensional object: `{ item_id: { option_key: value } }`)
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Items Format

Items can be provided as:

### Simple Strings

```php
'items' => ['post', 'page', 'product']
```

### Objects with ID and Label

```php
'items' => [
    ['id' => 'post', 'label' => 'Posts'],
    ['id' => 'page', 'label' => 'Pages'],
    ['id' => 'product', 'label' => 'Products'],
]
```

## Options Format

Each option in the `options` array should have:

- `key` (string, required) - Unique identifier for the option
- `label` (string, required) - Column header label
- `type` (string, required) - Input type: `'checkbox'` | `'toggle'` | `'select'` | `'text'`
- `help` (string, optional) - Help text for the column
- `choices` (array, optional) - For `'select'` type, array of `{ value, label }` objects

## Supported Option Types

### Checkbox

```php
[
    'key' => 'enabled',
    'label' => 'Enabled',
    'type' => 'checkbox',
]
```

### Toggle

```php
[
    'key' => 'featured',
    'label' => 'Featured',
    'type' => 'toggle',
]
```

### Select

```php
[
    'key' => 'status',
    'label' => 'Status',
    'type' => 'select',
    'choices' => [
        ['value' => 'active', 'label' => 'Active'],
        ['value' => 'inactive', 'label' => 'Inactive'],
    ],
]
```

### Text

```php
[
    'key' => 'custom_field',
    'label' => 'Custom Field',
    'type' => 'text',
]
```

## Examples

### Basic Matrix

```php
[
    'id' => 'settings',
    'type' => 'options_matrix',
    'label' => 'Settings Matrix',
    'items' => ['item1', 'item2', 'item3'],
    'options' => [
        [
            'key' => 'enabled',
            'label' => 'Enabled',
            'type' => 'toggle',
        ],
        [
            'key' => 'limit',
            'label' => 'Limit',
            'type' => 'number',
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Matrix with Custom Items

```php
[
    'id' => 'post_types',
    'type' => 'options_matrix',
    'label' => 'Post Type Configuration',
    'item_label' => 'Post Type',
    'items' => [
        ['id' => 'post', 'label' => 'Posts'],
        ['id' => 'page', 'label' => 'Pages'],
        ['id' => 'product', 'label' => 'Products'],
    ],
    'options' => [
        [
            'key' => 'enabled',
            'label' => 'Enabled',
            'type' => 'toggle',
            'help' => 'Enable this post type',
        ],
        [
            'key' => 'limit',
            'label' => 'Items Limit',
            'type' => 'text',
            'help' => 'Maximum number of items',
        ],
        [
            'key' => 'status',
            'label' => 'Default Status',
            'type' => 'select',
            'choices' => [
                ['value' => 'publish', 'label' => 'Published'],
                ['value' => 'draft', 'label' => 'Draft'],
            ],
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Type

Multidimensional object:

```php
[
    'item_id' => [
        'option_key' => 'value',
        'option_key2' => 'value2',
    ],
    'item_id2' => [
        'option_key' => 'value',
    ],
]
```

Example:
```php
[
    'post' => [
        'enabled' => true,
        'limit' => '10',
    ],
    'page' => [
        'enabled' => false,
        'limit' => '5',
    ],
]
```

## Related Fields

- [Group Field](Field-Types-Group-Field) - For grouping related fields
- [Mapping Field](Field-Types-Mapping-Field) - For mapping one set of values to another

