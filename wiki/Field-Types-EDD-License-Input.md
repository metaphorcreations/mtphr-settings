# EDD License Input Field

A specialized field for managing Easy Digital Downloads (EDD) license keys. Provides license activation, deactivation, and refresh functionality with status display.

## Usage

```php
Settings::fields( [
    [
        'id' => 'license_key',
        'type' => 'edd_license',
        'label' => 'License Key',
        'activate_url' => '/wp-json/my-plugin/v1/activate-license',
        'deactivate_url' => '/wp-json/my-plugin/v1/deactivate-license',
        'refresh_url' => '/wp-json/my-plugin/v1/refresh-license',
        'license_data' => [
            'license' => 'valid',
            'expires' => '2024-12-31',
        ],
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'edd_license'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key

### Optional Properties

- `label` (string) - Field label displayed above the license input
- `help` (string) - Help text displayed below the license input
- `activate_url` (string) - REST API endpoint for activating the license
- `deactivate_url` (string) - REST API endpoint for deactivating the license
- `refresh_url` (string) - REST API endpoint for refreshing license status
- `license_data` (object) - Current license data object
  - `license` (string) - License status: `'valid'` | `'invalid'` | `'expired'` | `'deactivated'`
  - `expires` (string) - License expiration date
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `std` (string) - Default license key value
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## License Data Format

The `license_data` object should contain:

```php
[
    'license' => 'valid', // or 'invalid', 'expired', 'deactivated'
    'expires' => '2024-12-31', // Expiration date
]
```

## Examples

### Basic License Field

```php
[
    'id' => 'license',
    'type' => 'edd_license',
    'label' => 'License Key',
    'activate_url' => '/wp-json/my-plugin/v1/activate',
    'deactivate_url' => '/wp-json/my-plugin/v1/deactivate',
    'refresh_url' => '/wp-json/my-plugin/v1/refresh',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### License Field with Initial Data

```php
[
    'id' => 'license',
    'type' => 'edd_license',
    'label' => 'License Key',
    'activate_url' => '/wp-json/my-plugin/v1/activate',
    'deactivate_url' => '/wp-json/my-plugin/v1/deactivate',
    'refresh_url' => '/wp-json/my-plugin/v1/refresh',
    'license_data' => [
        'license' => 'valid',
        'expires' => '2024-12-31',
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## API Endpoints

The field expects REST API endpoints that accept POST requests with the license key in the request body:

```php
// Example endpoint handler
register_rest_route('my-plugin/v1', 'activate', [
    'methods' => 'POST',
    'permission_callback' => function() {
        return current_user_can('manage_options');
    },
    'callback' => function($request) {
        $license = $request->get_json_params()['license'];
        // Activate license logic
        return [
            'license' => 'valid',
            'expires' => '2024-12-31',
        ];
    },
]);
```

## License Key Masking

The license key input automatically masks all characters after the first 15 characters with asterisks (`*`) for security. The full key is still stored and sent to the API.

## Actions

### Activate

Activates the license key. Shows a success message when activation is successful.

### Deactivate

Deactivates the license key. Shows a warning message when deactivation is successful.

### Refresh

Refreshes the license status from the server. Only available when the license is valid.

## Value Type

String (the license key)

## Related Fields

- [Text Input](Field-Types-Text-Input) - For simple text input
- [Button](Field-Types-Button) - For custom action buttons

