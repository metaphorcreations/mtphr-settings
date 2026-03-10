# API Connections Field

A display-only field for managing OAuth-based API connections. Renders a branded provider section with connected account cards and an "Add Account" button. Supports multiple accounts per provider. All connection data is passed via field properties -- the field does not persist values itself.

## Usage

```php
Settings::fields( [
    'section' => 'connections',
    'fields' => [
        [
            'id'       => 'instagram_accounts',
            'type'     => 'api_connections',
            'label'    => 'Instagram',
            'noupdate' => true,
            'provider' => [
                'name'  => 'Instagram',
                'icon'  => '<svg>...</svg>',
                'color' => '#E4405F',
            ],
            'authorize_url'   => 'https://example.com/oauth/authorize',
            'authorize_label' => 'Add Instagram Account',
            'accounts' => [
                [
                    'id'              => '12345',
                    'avatar'          => 'https://example.com/avatar.jpg',
                    'name'            => 'John Doe',
                    'username'        => 'johndoe',
                    'deauthorize_url' => 'https://example.com/wp-admin/?deauth=12345',
                ],
            ],
        ],
    ],
] );
```

## Properties

### Required Properties

- `id` (string) - Unique field identifier
- `type` (string) - Must be `'api_connections'`
- `section` (string) - Section ID this field belongs to

### Optional Properties

- `label` (string) - Field label displayed by the settings framework
- `noupdate` (bool) - Set to `true` to exclude this field from save operations (recommended)
- `provider` (array) - Provider branding:
  - `name` (string) - Provider display name (e.g. "Instagram")
  - `icon` (string) - SVG markup for the provider icon
  - `color` (string) - Accent color for the provider (used for avatar fallback and icon tinting)
- `authorize_url` (string) - URL to redirect to when the user clicks the add account button
- `authorize_label` (string) - Custom label for the add account button (default: "Add Account")
- `accounts` (array) - Array of connected account objects (see below)
- `help` (string) - Help text displayed below the field
- `class` (string) - Additional CSS classes
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`

### Account Object Properties

Each item in the `accounts` array can include:

- `id` (string) - Unique account identifier (required)
- `avatar` (string) - URL to the account's profile image
- `name` (string) - Display name
- `username` (string) - Username or handle
- `email` (string) - Email address
- `deauthorize_url` (string) - URL to disconnect this specific account

The component displays whichever properties are provided. If no `avatar` is given, a colored circle with the first initial is shown as a fallback.

## Examples

### Single Provider with Multiple Accounts

```php
[
    'id'       => 'instagram_accounts',
    'type'     => 'api_connections',
    'label'    => 'Instagram',
    'noupdate' => true,
    'provider' => [
        'name'  => 'Instagram',
        'icon'  => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">...</svg>',
        'color' => '#E4405F',
    ],
    'authorize_url'   => $authorize_url,
    'authorize_label' => 'Add Instagram Account',
    'accounts' => $connected_accounts,
]
```

### Empty State (No Accounts Connected)

```php
[
    'id'       => 'twitter_accounts',
    'type'     => 'api_connections',
    'label'    => 'Twitter',
    'noupdate' => true,
    'provider' => [
        'name'  => 'Twitter / X',
        'icon'  => '<svg>...</svg>',
        'color' => '#1DA1F2',
    ],
    'authorize_url' => $twitter_auth_url,
    'accounts'      => [],
]
```

### Provider with Minimal Account Data

```php
[
    'id'       => 'rss_connections',
    'type'     => 'api_connections',
    'label'    => 'RSS Feeds',
    'noupdate' => true,
    'provider' => [
        'name'  => 'RSS',
        'icon'  => '<svg>...</svg>',
        'color' => '#F26522',
    ],
    'authorize_url' => $add_feed_url,
    'authorize_label' => 'Add Feed',
    'accounts' => [
        [
            'id'              => 'feed_1',
            'name'            => 'Tech News RSS',
            'deauthorize_url' => $remove_feed_url,
        ],
    ],
]
```

## Value Type

This field does not store values. It is display-only. The consuming plugin is responsible for storing connection data and populating the `accounts` array from its own storage.

## Related Fields

- [Integrations Field](Field-Types-Integrations-Field) - For managing plugin integrations with toggles
- [Notification Field](Field-Types-Notification-Field) - For status messages
- [Custom HTML](Field-Types-Custom-HTML) - For custom HTML content
