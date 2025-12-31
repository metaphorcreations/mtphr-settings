# Custom HTML Field

A field that displays custom HTML content. Useful for adding informational content, instructions, or custom markup to your settings page.

## Usage

```php
Settings::fields( [
    [
        'id' => 'info_box',
        'type' => 'html',
        'label' => 'Information',
        'std' => '<p>This is custom HTML content.</p>',
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'html'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `std` (string) - HTML content to display

### Optional Properties

- `label` (string) - Field label displayed above the HTML content
- `help` (string) - Help text displayed below the HTML content
- `class` (string) - Additional CSS classes
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Examples

### Basic HTML Content

```php
[
    'id' => 'welcome_message',
    'type' => 'html',
    'label' => 'Welcome',
    'std' => '<p>Welcome to the settings page!</p>',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Information Box

```php
[
    'id' => 'info',
    'type' => 'html',
    'std' => '<div class="notice notice-info">
        <p><strong>Note:</strong> Changes to these settings will take effect immediately.</p>
    </div>',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Instructions with Links

```php
[
    'id' => 'instructions',
    'type' => 'html',
    'label' => 'Setup Instructions',
    'std' => '<ol>
        <li>Configure your API key</li>
        <li>Set your preferences</li>
        <li>Save your settings</li>
    </ol>
    <p>Need help? <a href="https://example.com/docs" target="_blank">View documentation</a></p>',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Conditional HTML Content

```php
[
    'id' => 'upgrade_notice',
    'type' => 'html',
    'std' => '<div class="notice notice-warning">
        <p>Upgrade to Pro for advanced features!</p>
    </div>',
    'show' => [
        'id' => 'license_type',
        'value' => 'free',
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Security Note

The HTML content is rendered using `dangerouslySetInnerHTML`, so ensure you only include trusted HTML content. The content is not automatically sanitized, so be careful with user-generated content.

## Value Type

String (HTML markup)

## Related Fields

- [Heading Field](Field-Types-Heading-Field) - For section headings
- [Spacer Field](Field-Types-Spacer-Field) - For spacing between fields

