# Integrations Field

A field for managing multiple integrations with enable/disable toggles and optional settings modals. Each integration can be enabled or disabled, and may have additional settings that open in a modal.

## Usage

```php
Settings::fields( [
    [
        'id' => 'integrations',
        'type' => 'integrations',
        'label' => 'Integrations',
        'integrations' => [
            [
                'id' => 'stripe',
                'label' => 'Stripe',
                'description' => 'Payment processing',
                'is_authorized' => true,
                'settings' => 'stripe_settings', // Section ID for settings
            ],
            [
                'id' => 'mailchimp',
                'label' => 'Mailchimp',
                'description' => 'Email marketing',
                'is_authorized' => false,
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
- `type` (string) - Must be `'integrations'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `integrations` (array) - Array of integration configurations

### Optional Properties

- `label` (string) - Field label displayed above the integrations
- `help` (string) - Help text displayed below the integrations
- `query_var` (string) - Query parameter name for integration modal (defaults to field `id`)
- `disabled` (boolean) - Whether the field is disabled
- `class` (string) - Additional CSS classes
- `std` (array) - Default enabled integrations (array of integration IDs)
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Integration Properties

Each integration in the `integrations` array should have:

- `id` (string, required) - Unique integration identifier
- `label` (string, required) - Integration name
- `description` (string, optional) - Integration description
- `is_authorized` (boolean, optional) - Whether the integration is authorized/connected
- `settings` (string, optional) - Section ID containing integration-specific settings

## Integration Settings

To add settings for an integration, create a secondary section and reference it in the integration's `settings` property:

```php
// Create a secondary section for integration settings
Settings::section( [
    'id' => 'stripe_settings',
    'label' => 'Stripe Settings',
    'option' => 'my_plugin_settings',
    'type' => 'secondary', // Important: must be secondary type
] );

// Add fields to the integration settings section
Settings::fields( [
    [
        'id' => 'api_key',
        'type' => 'text',
        'label' => 'API Key',
        'section' => 'stripe_settings', // Match the section ID
        'option' => 'my_plugin_settings',
    ],
] );
```

## Examples

### Basic Integrations

```php
[
    'id' => 'integrations',
    'type' => 'integrations',
    'label' => 'Third-Party Integrations',
    'integrations' => [
        [
            'id' => 'stripe',
            'label' => 'Stripe',
            'description' => 'Payment processing',
            'is_authorized' => true,
        ],
        [
            'id' => 'paypal',
            'label' => 'PayPal',
            'description' => 'Payment processing',
            'is_authorized' => false,
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Integrations with Settings

```php
// First, create the settings section
Settings::section( [
    'id' => 'stripe_settings',
    'label' => 'Stripe Settings',
    'option' => 'my_settings',
    'type' => 'secondary',
] );

// Add integration settings fields
Settings::fields( [
    [
        'id' => 'stripe_api_key',
        'type' => 'text',
        'label' => 'API Key',
        'section' => 'stripe_settings',
        'option' => 'my_settings',
    ],
] );

// Then add the integrations field
Settings::fields( [
    [
        'id' => 'integrations',
        'type' => 'integrations',
        'label' => 'Integrations',
        'integrations' => [
            [
                'id' => 'stripe',
                'label' => 'Stripe',
                'description' => 'Payment processing',
                'is_authorized' => true,
                'settings' => 'stripe_settings', // Reference the section
            ],
        ],
        'section' => 'general',
        'option' => 'my_settings',
    ],
] );
```

## Auto-Save Behavior

When an integration is enabled or disabled, the change is automatically saved. The field uses a custom save handler that only saves the integration toggle state, not other settings.

Settings within integration modals are saved separately using the integration's save button.

## Value Type

Array of enabled integration IDs:

```php
['stripe', 'mailchimp']
```

## Related Fields

- [Toggle](Field-Types-Toggle) - For simple enable/disable
- [Checkboxes](Field-Types-Checkboxes) - For multiple selections

