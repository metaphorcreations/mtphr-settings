# Ad Field

A display-only field for showing advertisement images with clickable links. Automatically opens links in a new tab with proper security attributes.

## Usage

```php
Settings::fields( [
    [
        'id' => 'ad_banner',
        'type' => 'ad',
        'label' => 'Advertisement',
        'image' => 'https://example.com/ad-image.jpg',
        'link' => 'https://example.com/promo',
        'section' => 'general',
        'option' => 'my_plugin_settings',
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'ad'`
- `section` (string) - Section ID this field belongs to
- `option` (string) - Settings option key
- `image` (string) - URL of the advertisement image
- `link` (string) - Destination URL when the ad is clicked

### Optional Properties

- `label` (string) - Field label displayed above the ad
- `help` (string) - Help text displayed below the ad
- `alt` (string) - Alt text for the image (defaults to label or "Advertisement")
- `class` (string) - Additional CSS classes
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

## Examples

### Basic Ad

```php
[
    'id' => 'promo_ad',
    'type' => 'ad',
    'image' => 'https://example.com/promo.jpg',
    'link' => 'https://example.com/promo',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Ad with Label and Alt Text

```php
[
    'id' => 'upgrade_ad',
    'type' => 'ad',
    'label' => 'Upgrade to Pro',
    'image' => 'https://example.com/upgrade.jpg',
    'link' => 'https://example.com/upgrade',
    'alt' => 'Upgrade to Pro Version',
    'section' => 'general',
    'option' => 'my_settings',
]
```

### Conditional Ad

```php
[
    'id' => 'pro_ad',
    'type' => 'ad',
    'label' => 'Upgrade to Pro',
    'image' => 'https://example.com/pro.jpg',
    'link' => 'https://example.com/upgrade',
    'show' => [
        'id' => 'license_type',
        'value' => 'free',
    ],
    'section' => 'general',
    'option' => 'my_settings',
]
```

## Image Display

- Images are displayed at their natural size
- Maximum width is constrained to 100% of the container
- Height is automatically adjusted to maintain aspect ratio
- Images are displayed as block elements

## Link Behavior

- Links open in a new tab (`target="_blank"`)
- Links include `rel="noopener noreferrer"` for security
- The entire image is clickable

## Value Type

Ad fields don't store values. They are display-only fields.

## Related Fields

- [Custom HTML](Field-Types-Custom-HTML) - For custom ad HTML
- [Links Input](Field-Types-Links-Input) - For displaying multiple links

