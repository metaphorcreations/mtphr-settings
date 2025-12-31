# Date Input Field

A date picker input field for selecting dates.

## Usage

```php
Settings::fields( [
    [
        'id' => 'start_date',
        'type' => 'date',
        'label' => 'Start Date',
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'date'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key

### Optional Properties

- `label` (string) - Field label displayed above the input
- `help` (string) - Help text displayed below the input
- `placeholder` (string) - Placeholder text shown when input is empty
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `labelPosition` (string) - Label position: `'top'` (default) | `'side'` | `'bottom'`
- `std` (string) - Default value (date string)
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Examples

### Basic Date Input

```php
[
    'id' => 'event_date',
    'type' => 'date',
    'label' => 'Event Date',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Date with Placeholder

```php
[
    'id' => 'expiry_date',
    'type' => 'date',
    'label' => 'Expiry Date',
    'placeholder' => 'Select a date',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Date with Default Value

```php
[
    'id' => 'start_date',
    'type' => 'date',
    'label' => 'Start Date',
    'std' => date('Y-m-d'), // Today's date
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Type

String (date in YYYY-MM-DD format)

Example: `'2024-12-31'`

## Date Format

The date input uses the HTML5 date input type, which typically displays dates in the user's locale format but stores values in ISO 8601 format (YYYY-MM-DD).

## Related Fields

- [Text Input](Field-Types-Text-Input) - For entering dates manually
- [Number Input](Field-Types-Number-Input) - For numeric date components

