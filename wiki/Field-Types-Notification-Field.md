# Notification Field

A display-only field for showing color-coded notifications with built-in support for success, error, warning, and info types. Each type comes with default colors and icons that can be overridden.

## Usage

```php
Settings::fields( [
    'section' => 'general',
    'fields' => [
        [
            'id' => 'my_notification',
            'type' => 'notification',
            'notificationType' => 'warning',
            'label' => 'Heads up!',
            'message' => 'This feature requires an active license.',
        ],
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'notification'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key

### Optional Properties

- `notificationType` (string) - Notification style: `'success'`, `'error'`, `'warning'`, or `'info'` (default: `'info'`)
- `label` (string) - Bold title displayed at the top of the notification
- `message` (string) - Body text of the notification (supports HTML)
- `help` (string) - Help text displayed below the notification
- `isDismissible` (bool) - Whether the notification can be dismissed (default: `false`)
- `showIcon` (bool) - Whether to show the icon (default: `true`)
- `icon` (string) - Dashicon class to override the default icon (e.g. `'dashicons-admin-generic'`)
- `backgroundColor` (string) - Override the background color
- `borderColor` (string) - Override the border/highlight color
- `textColor` (string) - Override the text color
- `iconColor` (string) - Override the icon color
- `class` (string) - Additional CSS classes
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Notification Types

| Type | Background | Border | Text | Icon |
|------|-----------|--------|------|------|
| `success` | Light green (`#f0faf0`) | Green (`#46b450`) | Dark green (`#1e4620`) | Checkmark circle |
| `error` | Light red (`#fef0f0`) | Red (`#dc3232`) | Dark red (`#8b1a1a`) | X circle |
| `warning` | Light amber (`#fef8ee`) | Amber (`#dba617`) | Dark amber (`#6e4e00`) | Warning triangle |
| `info` | Light blue (`#f0f6fc`) | Blue (`#2271b1`) | Dark blue (`#1d3557`) | Info circle |

## Examples

### Basic Info Notification

```php
[
    'id' => 'info_notice',
    'type' => 'notification',
    'message' => 'Your settings are saved automatically.',
]
```

### Success Notification

```php
[
    'id' => 'success_notice',
    'type' => 'notification',
    'notificationType' => 'success',
    'label' => 'All Set!',
    'message' => 'Your configuration is complete.',
]
```

### Dismissible Warning

```php
[
    'id' => 'license_warning',
    'type' => 'notification',
    'notificationType' => 'warning',
    'label' => 'License Required',
    'message' => 'Some features are disabled without an active license.',
    'isDismissible' => true,
]
```

### Error with Custom Icon

```php
[
    'id' => 'error_notice',
    'type' => 'notification',
    'notificationType' => 'error',
    'label' => 'Connection Failed',
    'message' => 'Unable to reach the API server. Please check your settings.',
    'icon' => 'dashicons-warning',
]
```

### Custom Colors

```php
[
    'id' => 'custom_notice',
    'type' => 'notification',
    'message' => 'This is a custom styled notification.',
    'backgroundColor' => '#f3e8ff',
    'borderColor' => '#7c3aed',
    'textColor' => '#4c1d95',
    'iconColor' => '#7c3aed',
]
```

### Notification Without Icon

```php
[
    'id' => 'no_icon_notice',
    'type' => 'notification',
    'notificationType' => 'info',
    'message' => 'A simple text-only notification.',
    'showIcon' => false,
]
```

### Notification with HTML Message

```php
[
    'id' => 'html_notice',
    'type' => 'notification',
    'notificationType' => 'info',
    'message' => 'Visit <a href="https://example.com" target="_blank">our website</a> for more details.',
]
```

## Value Type

Notifications don't store values. They are display-only fields.

## Related Fields

- [Heading Field](Field-Types-Heading-Field) - For section headings
- [Custom HTML](Field-Types-Custom-HTML) - For custom HTML content
- [Spacer Field](Field-Types-Spacer-Field) - For visual spacing
