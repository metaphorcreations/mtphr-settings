# Button Field

A button field that can perform actions, navigate to URLs, or make API calls.

## Usage

```php
Settings::fields( [
    [
        'id' => 'test_button',
        'type' => 'button',
        'text' => 'Test Connection',
        'action' => [
            'type' => 'api',
            'url' => '/wp-json/my-plugin/v1/test',
        ],
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'button'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key

### Optional Properties

- `text` (string) - Button text label
- `label` (string) - Field label displayed above the button
- `help` (string) - Help text displayed below the button
- `action` (array) - Button action configuration
  - `type` (string) - Action type: `'api'` | `'default'` (for links)
  - `url` (string) - URL for API endpoint or link destination
  - `confirm` (string) - Confirmation message before executing action
  - `response` (boolean) - Whether to show response message (default: true for API)
- `variant` (string) - Button variant: `'primary'` | `'secondary'` | `'tertiary'` | `'link'` (default: `'secondary'`)
- `size` (string) - Button size: `'small'` | `'medium'` | `'large'`
- `icon` (string) - Icon name or dashicon class
- `iconPosition` (string) - Icon position: `'left'` | `'right'`
- `iconSize` (number) - Icon size in pixels
- `isDestructive` (boolean) - Whether button is destructive (red styling)
- `isLink` (boolean) - Whether button should appear as a link
- `target` (string) - Link target: `'_blank'` | `'_self'` (for link actions)
- `description` (string) - Button description text
- `disabled` (boolean) - Whether the button is disabled
- `class` (string) - Additional CSS classes
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Examples

### API Action Button

```php
[
    'id' => 'test_api',
    'type' => 'button',
    'text' => 'Test API Connection',
    'action' => [
        'type' => 'api',
        'url' => '/wp-json/my-plugin/v1/test',
        'response' => true,
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Button with Confirmation

```php
[
    'id' => 'reset_settings',
    'type' => 'button',
    'text' => 'Reset to Defaults',
    'variant' => 'destructive',
    'isDestructive' => true,
    'action' => [
        'type' => 'api',
        'url' => '/wp-json/my-plugin/v1/reset',
        'confirm' => 'Are you sure you want to reset all settings?',
    ],
    'section' => 'advanced',
    'option' => 'my_settings',
]
```

### Link Button

```php
[
    'id' => 'documentation',
    'type' => 'button',
    'text' => 'View Documentation',
    'variant' => 'link',
    'isLink' => true,
    'action' => [
        'type' => 'default',
        'url' => 'https://example.com/docs',
    ],
    'target' => '_blank',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Button with Icon

```php
[
    'id' => 'export_data',
    'type' => 'button',
    'text' => 'Export',
    'icon' => 'download',
    'iconPosition' => 'left',
    'variant' => 'primary',
    'action' => [
        'type' => 'api',
        'url' => '/wp-json/my-plugin/v1/export',
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Action Types

### API Action

Performs a POST request to the specified URL with the current settings values. Shows a loading state and displays the response.

```php
'action' => [
    'type' => 'api',
    'url' => '/wp-json/my-plugin/v1/endpoint',
    'response' => true, // Show response message
    'confirm' => 'Are you sure?', // Optional confirmation
]
```

### Default Action (Link)

Navigates to the specified URL. Works like a regular link.

```php
'action' => [
    'type' => 'default',
    'url' => 'https://example.com',
]
```

## Value Type

Buttons don't store values. They perform actions only.

## Related Fields

- [Buttons Field](Field-Types-Buttons-Field) - For multiple buttons in a group

