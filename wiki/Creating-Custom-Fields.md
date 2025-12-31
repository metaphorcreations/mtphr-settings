# Creating Custom Fields

This guide explains how to create custom field types for use in your WordPress plugin or theme without modifying the core Mtphr Settings library.

## Overview

Custom fields allow you to extend the settings framework with field types specific to your project. These fields are registered at runtime and don't require changes to the core library.

## Step 1: Create Your Field Component

Create a React component for your custom field. This component will receive props from the settings framework.

### Example: Custom URL Input Field

Create a file `my-custom-url-input.js`:

```javascript
import he from "he";
import { __experimentalInputControl as InputControl } from "@wordpress/components";

const MyCustomUrlInput = ({ field, value, settingsOption, onChange }) => {
  const {
    class: className,
    disabled,
    help,
    label,
    labelPosition,
    id,
    placeholder,
  } = field;

  const onChangeHandler = (nextValue) => {
    // Validate URL format
    if (nextValue && !nextValue.match(/^https?:\/\//)) {
      // Auto-prepend http:// if missing
      nextValue = 'http://' + nextValue;
    }
    onChange({ id, value: nextValue, settingsOption });
  };

  return (
    <InputControl
      className={className}
      disabled={disabled}
      help={help ? he.decode(help) : false}
      label={label ? he.decode(label) : label}
      labelPosition={labelPosition}
      onChange={onChangeHandler}
      placeholder={placeholder || 'https://example.com'}
      type="url"
      value={value}
      __next40pxDefaultSize
    />
  );
};

export default MyCustomUrlInput;
```

## Step 2: Enqueue Your Component

Enqueue your JavaScript file in WordPress:

```php
add_action( 'admin_enqueue_scripts', 'my_plugin_enqueue_custom_fields' );

function my_plugin_enqueue_custom_fields( $hook ) {
    // Only load on your settings page
    if ( 'toplevel_page_my-plugin-settings' !== $hook ) {
        return;
    }
    
    wp_enqueue_script(
        'my-custom-fields',
        plugin_dir_url( __FILE__ ) . 'assets/js/my-custom-fields.js',
        [ 'mtphr-settings-registry' ], // Dependency on the registry
        '1.0.0',
        true
    );
}
```

## Step 3: Register Your Component

In your JavaScript file, register the component with the settings registry:

```javascript
// Wait for the registry to be available
document.addEventListener('DOMContentLoaded', function() {
    const { registerComponent } = window.mtphrSettingsRegistry || {};
    
    if (registerComponent) {
        // Import your component (adjust path as needed)
        import('./my-custom-url-input').then(module => {
            registerComponent('custom_url', module.default);
        });
    }
});
```

Or if using a build tool like Webpack:

```javascript
import MyCustomUrlInput from './my-custom-url-input';

const { registerComponent } = window.mtphrSettingsRegistry || {};

if (registerComponent) {
    registerComponent('custom_url', MyCustomUrlInput);
}
```

## Step 4: Use Your Custom Field

Now you can use your custom field in your settings:

```php
Settings::fields( [
    [
        'id' => 'website_url',
        'type' => 'custom_url', // Your registered type
        'label' => 'Website URL',
        'help' => 'Enter your website URL',
        'section' => 'general',
        'option' => 'my_plugin_settings',
        'placeholder' => 'https://example.com',
    ],
] );
```

## Component Props

Your custom field component will receive these props:

- `field` (object) - The field configuration object
- `value` (mixed) - The current field value
- `settingsOption` (string) - The settings option key
- `onChange` (function) - Callback to update the field value
- `values` (object) - All values for the current settings option
- `settingsId` (string) - The settings instance ID
- `sections` (array) - Available sections (for complex fields)
- `onSave` (function, optional) - Save handler (for fields that need custom save behavior)
- `isSaving` (boolean) - Whether settings are currently being saved

## Field Configuration Properties

When defining your field in PHP, you can use these common properties:

- `id` (string, required) - Unique field identifier
- `type` (string, required) - Field type (your registered type)
- `label` (string) - Field label
- `help` (string) - Help text displayed below the field
- `section` (string, required) - Section ID this field belongs to
- `option` (string, required) - Settings option key
- `class` (string) - Additional CSS classes
- `disabled` (boolean) - Whether the field is disabled
- `std` (mixed) - Default value
- `show` (array) - Conditional display: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Conditional hide: `['id' => 'field_id', 'value' => expected_value]`
- `container` (string|object) - Container styling options
- `inline` (boolean) - Display field inline

## Advanced Example: Custom Field with Sub-fields

For more complex fields, you can create components that manage multiple values:

```javascript
import { useState } from "@wordpress/element";
import { Button } from "@wordpress/components";

const RepeaterField = ({ field, value = [], settingsOption, onChange }) => {
  const { id, label, help } = field;
  
  const addItem = () => {
    const newValue = [...(value || []), { title: '', content: '' }];
    onChange({ id, value: newValue, settingsOption });
  };
  
  const updateItem = (index, key, newValue) => {
    const updated = [...value];
    updated[index] = { ...updated[index], [key]: newValue };
    onChange({ id, value: updated, settingsOption });
  };
  
  const removeItem = (index) => {
    const updated = value.filter((_, i) => i !== index);
    onChange({ id, value: updated, settingsOption });
  };
  
  return (
    <div>
      {label && <label>{label}</label>}
      {help && <p className="description">{help}</p>}
      
      {(value || []).map((item, index) => (
        <div key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
          <input
            type="text"
            value={item.title || ''}
            onChange={(e) => updateItem(index, 'title', e.target.value)}
            placeholder="Title"
          />
          <textarea
            value={item.content || ''}
            onChange={(e) => updateItem(index, 'content', e.target.value)}
            placeholder="Content"
          />
          <Button onClick={() => removeItem(index)} isDestructive>
            Remove
          </Button>
        </div>
      ))}
      
      <Button onClick={addItem} variant="secondary">
        Add Item
      </Button>
    </div>
  );
};

export default RepeaterField;
```

## Best Practices

1. **Use WordPress Components**: Leverage `@wordpress/components` for consistency
2. **Handle HTML Entities**: Use the `he` library to decode HTML entities in labels/help text
3. **Validate Input**: Add client-side validation before calling `onChange`
4. **Follow Naming Conventions**: Use descriptive, unique field type names
5. **Document Your Fields**: Add comments explaining your field's purpose and usage
6. **Handle Edge Cases**: Check for undefined/null values and provide sensible defaults

## Testing Your Custom Field

1. Ensure your JavaScript file is enqueued correctly
2. Check browser console for registration errors
3. Verify the field appears in your settings page
4. Test saving and retrieving values
5. Test conditional display logic if applicable

## Next Steps

- See [Creating New Field Types](Creating-New-Field-Types) to add fields to the core library
- Explore existing [Field Types](Home#field-types) for reference implementations

