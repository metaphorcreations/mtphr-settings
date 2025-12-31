# Links Input Field

A field that displays a list of links. Links can be defined in the field configuration or stored as saved values.

## Usage

```php
Settings::fields( [
    [
        'id' => 'helpful_links',
        'type' => 'links',
        'label' => 'Helpful Links',
        'links' => [
            [
                'url' => 'https://example.com/docs',
                'label' => 'Documentation',
                'target' => '_blank',
            ],
            [
                'url' => 'https://example.com/support',
                'label' => 'Support',
                'target' => '_blank',
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
- `type` (string) - Must be `'links'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key

### Optional Properties

- `label` (string) - Field label displayed above the links
- `help` (string) - Help text displayed below the links
- `links` (array) - Array of link objects (if not provided, uses saved value)
  - `url` (string, required) - Link URL
  - `label` (string) - Link text (defaults to URL if not provided)
  - `target` (string) - Link target: `'_blank'` | `'_self'` (default: `'_blank'`)
- `class` (string) - Additional CSS classes
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Link Object Format

Each link in the `links` array should be an object with:

```php
[
    'url' => 'https://example.com',  // Required
    'label' => 'Link Text',          // Optional, defaults to URL
    'target' => '_blank',            // Optional, defaults to '_blank'
]
```

## Examples

### Static Links

```php
[
    'id' => 'resources',
    'type' => 'links',
    'label' => 'Resources',
    'links' => [
        [
            'url' => 'https://example.com/docs',
            'label' => 'Documentation',
        ],
        [
            'url' => 'https://example.com/support',
            'label' => 'Support Forum',
        ],
        [
            'url' => 'https://example.com/changelog',
            'label' => 'Changelog',
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Links with Custom Targets

```php
[
    'id' => 'external_links',
    'type' => 'links',
    'label' => 'External Links',
    'links' => [
        [
            'url' => 'https://example.com',
            'label' => 'Open in New Tab',
            'target' => '_blank',
        ],
        [
            'url' => '/internal-page',
            'label' => 'Open in Same Tab',
            'target' => '_self',
        ],
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Dynamic Links from Settings

If `links` is not provided in the field configuration, the field will use the saved value. This allows links to be managed dynamically:

```php
// Save links programmatically
Settings::set_value( 'my_settings', 'helpful_links', [
    [
        'url' => 'https://example.com/docs',
        'label' => 'Documentation',
    ],
] );

// Field will display saved links
[
    'id' => 'helpful_links',
    'type' => 'links',
    'label' => 'Helpful Links',
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Value Type

Array of link objects:

```php
[
    [
        'url' => 'https://example.com',
        'label' => 'Example',
        'target' => '_blank',
    ],
    // ... more links
]
```

Or object with links property:

```php
[
    'links' => [
        [
            'url' => 'https://example.com',
            'label' => 'Example',
        ],
    ],
]
```

## Display

Links are displayed as an unordered list (`<ul>`) with each link as a list item (`<li>`). Links that open in a new tab automatically include `rel="noopener noreferrer"` for security.

## Related Fields

- [Button](Field-Types-Button) - For action buttons
- [Custom HTML](Field-Types-Custom-HTML) - For custom link HTML

