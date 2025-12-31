# Mapping Field

A field that maps source items to choice values, ensuring each choice can only be mapped to one source item. Useful for creating one-to-one relationships between two sets of data.

## Usage

```php
Settings::fields( [
    [
        'id' => 'field_mapping',
        'type' => 'mapping',
        'label' => 'Map Fields',
        'map_source' => [
            ['id' => 'source1', 'label' => 'Source Field 1'],
            ['id' => 'source2', 'label' => 'Source Field 2'],
        ],
        'map_choices' => [
            ['id' => 'choice1', 'label' => 'Destination 1'],
            ['id' => 'choice2', 'label' => 'Destination 2'],
        ],
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'mapping'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `map_source` (array) - Array of source items to map from
- `map_choices` (array) - Array of choice items to map to

### Optional Properties

- `label` (string) - Field label displayed above the mapping
- `help` (string) - Help text displayed below the mapping
- `source_label` (string) - Label for the source column (default: "Source")
- `source_help` (string) - Help text for the source column
- `choices_label` (string) - Label for the choices column (default: "Choices")
- `choices_help` (string) - Help text for the choices column
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `std` (object) - Default mappings: `{ source_id: 'choice_id' }`
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Source and Choice Format

Both `map_source` and `map_choices` should be arrays of objects:

```php
[
    ['id' => 'unique_id', 'label' => 'Display Label', 'help' => 'Optional help text'],
    // ... more items
]
```

## Examples

### Basic Mapping

```php
[
    'id' => 'field_mapping',
    'type' => 'mapping',
    'label' => 'Map Form Fields',
    'map_source' => [
        ['id' => 'name', 'label' => 'Name Field'],
        ['id' => 'email', 'label' => 'Email Field'],
        ['id' => 'phone', 'label' => 'Phone Field'],
    ],
    'map_choices' => [
        ['id' => 'first_name', 'label' => 'First Name'],
        ['id' => 'last_name', 'label' => 'Last Name'],
        ['id' => 'email_address', 'label' => 'Email Address'],
        ['id' => 'phone_number', 'label' => 'Phone Number'],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Mapping with Help Text

```php
[
    'id' => 'data_mapping',
    'type' => 'mapping',
    'label' => 'Data Mapping',
    'source_label' => 'Source Fields',
    'source_help' => 'Select the source field to map',
    'choices_label' => 'Destination Fields',
    'choices_help' => 'Select where the data should go',
    'map_source' => [
        ['id' => 'wp_title', 'label' => 'WordPress Title', 'help' => 'Post title'],
        ['id' => 'wp_content', 'label' => 'WordPress Content', 'help' => 'Post content'],
    ],
    'map_choices' => [
        ['id' => 'crm_title', 'label' => 'CRM Title Field'],
        ['id' => 'crm_description', 'label' => 'CRM Description Field'],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Mapping with Default Values

```php
[
    'id' => 'field_mapping',
    'type' => 'mapping',
    'label' => 'Map Fields',
    'map_source' => [
        ['id' => 'source1', 'label' => 'Source 1'],
        ['id' => 'source2', 'label' => 'Source 2'],
    ],
    'map_choices' => [
        ['id' => 'choice1', 'label' => 'Choice 1'],
        ['id' => 'choice2', 'label' => 'Choice 2'],
    ],
    'std' => [
        'source1' => 'choice1',
        'source2' => 'choice2',
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Type

Object mapping source IDs to choice IDs:

```php
[
    'source_id' => 'choice_id',
    'source_id2' => 'choice_id2',
]
```

Example:
```php
[
    'name' => 'first_name',
    'email' => 'email_address',
    'phone' => 'phone_number',
]
```

## Unique Mapping

Each choice can only be mapped to one source item. When a choice is selected for a source, it becomes disabled in other source dropdowns to prevent duplicate mappings.

## Related Fields

- [Options Matrix](Field-Types-Options-Matrix) - For configuring multiple options per item
- [Select](Field-Types-Select) - For simple dropdown selection

