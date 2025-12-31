# Getting Started

This guide will help you integrate the Mtphr Settings library into your WordPress plugin or theme.

## Installation

### Option 1: Include as a Git Submodule

```bash
cd your-plugin-or-theme
git submodule add https://github.com/your-repo/mtphr-settings.git includes/mtphr-settings
```

### Option 2: Copy the Directory

Copy the entire `mtphr-settings-git` directory into your plugin or theme's `includes` folder.

## Basic Setup

### 1. Include the Library

In your main plugin or theme file, include the settings library:

```php
require_once plugin_dir_path( __FILE__ ) . 'includes/mtphr-settings-git/index.php';
```

### 2. Initialize Settings

The library uses a namespace-based singleton pattern. The namespace is automatically detected from your plugin/theme structure, or you can set it manually.

### 3. Create an Admin Page

Add an admin page using the static API:

```php
use Mtphr\Settings;

// Hook into WordPress admin
add_action( 'admin_menu', 'my_plugin_add_settings_page' );

function my_plugin_add_settings_page() {
    Settings::admin_page( [
        'id' => 'my-plugin-settings',
        'title' => 'My Plugin Settings',
        'menu_title' => 'My Plugin',
        'capability' => 'manage_options',
        'icon' => 'dashicons-admin-settings',
        'position' => 30,
    ] );
}
```

### 4. Add Sections

Sections organize your fields into tabs or groups:

```php
add_action( 'my-plugin-settings/init_settings', 'my_plugin_register_sections' );

function my_plugin_register_sections() {
    Settings::section( [
        'id' => 'general',
        'label' => 'General Settings',
        'slug' => 'general',
        'option' => 'my_plugin_settings',
        'order' => 10,
        'type' => 'primary', // Creates a tab
    ] );
    
    Settings::section( [
        'id' => 'advanced',
        'label' => 'Advanced',
        'slug' => 'advanced',
        'option' => 'my_plugin_settings',
        'order' => 20,
        'type' => 'primary',
    ] );
}
```

### 5. Add Fields

Add fields to your sections:

```php
add_action( 'my-plugin-settings/init_fields', 'my_plugin_register_fields' );

function my_plugin_register_fields() {
    Settings::fields( [
        [
            'id' => 'plugin_name',
            'type' => 'text',
            'label' => 'Plugin Name',
            'help' => 'Enter the name of your plugin',
            'section' => 'general',
            'option' => 'my_plugin_settings',
        ],
        [
            'id' => 'enable_feature',
            'type' => 'toggle',
            'label' => 'Enable Feature',
            'section' => 'general',
            'option' => 'my_plugin_settings',
        ],
        [
            'id' => 'api_key',
            'type' => 'text',
            'label' => 'API Key',
            'help' => 'Your API key for external services',
            'section' => 'advanced',
            'option' => 'my_plugin_settings',
            'encrypt' => true, // Encrypt sensitive data
        ],
    ] );
}
```

### 6. Set Default Values

Define default values for your fields:

```php
add_action( 'my-plugin-settings/init_settings', 'my_plugin_set_defaults' );

function my_plugin_set_defaults() {
    Settings::default_values( 'my_plugin_settings', [
        'plugin_name' => 'My Plugin',
        'enable_feature' => false,
        'api_key' => '',
    ] );
}
```

### 7. Retrieve Values

Get saved values in your code:

```php
// Get all settings
$settings = Settings::get_value( 'my_plugin_settings' );

// Get a specific setting
$plugin_name = Settings::get_value( 'my_plugin_settings', 'plugin_name' );

// Set a value programmatically
Settings::set_value( 'my_plugin_settings', 'plugin_name', 'New Name' );
```

## Advanced Configuration

### Header Customization

Customize the settings page header:

```php
Settings::admin_page( [
    'id' => 'my-plugin-settings',
    'title' => 'My Plugin Settings',
    'header_icon' => 'dashicons-admin-settings', // or URL to image
    'header_description' => 'Configure your plugin settings',
    'header_version' => '1.0.0',
] );
```

### Sidebar

Add a sidebar to your settings page:

```php
Settings::sidebar( [
    'items' => [
        [
            'id' => 'sidebar-info',
            'type' => 'heading',
            'label' => 'Information',
        ],
        [
            'id' => 'sidebar-help',
            'type' => 'html',
            'content' => '<p>Need help? Contact support.</p>',
        ],
    ],
    'width' => '320px', // Optional, default is 320px
] );
```

### Sanitization

Set custom sanitization for fields:

```php
Settings::sanitize_settings( 'my_plugin_settings', [
    'plugin_name' => 'sanitize_text_field',
    'api_key' => 'sanitize_text_field',
    'description' => 'wp_kses_post',
] );
```

### Encryption

Encrypt sensitive field values:

```php
// In your field definition
[
    'id' => 'api_key',
    'type' => 'text',
    'encrypt' => true, // This field will be encrypted
]

// Or set encryption for multiple fields
Settings::encryption_settings( 'my_plugin_settings', [
    'api_key' => true,
    'secret_key' => true,
] );
```

## Conditional Fields

Show or hide fields based on other field values:

```php
[
    'id' => 'advanced_option',
    'type' => 'text',
    'label' => 'Advanced Option',
    'section' => 'general',
    'option' => 'my_plugin_settings',
    'show' => [
        'id' => 'enable_feature',
        'value' => true,
    ],
]
```

## Next Steps

- Learn about [Creating Custom Fields](Creating-Custom-Fields) for your specific needs
- Explore all available [Field Types](Home#field-types)
- See [Creating New Field Types](Creating-New-Field-Types) to extend the core library

