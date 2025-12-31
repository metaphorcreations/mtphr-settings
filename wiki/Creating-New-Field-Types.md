# Creating New Field Types

This guide explains how to add new field types to the core Mtphr Settings library. These field types will be available to all users of the library.

## Overview

Adding a new field type to the core library involves:
1. Creating the React component
2. Registering it in the component registry
3. Documenting the field type

## Step 1: Create the Field Component

Create a new file in `assets/src/settings-app/fields/` following the naming convention: `YourFieldNameInput.js` or `YourFieldNameField.js`.

### Component Structure

Your component should follow this basic structure:

```javascript
import he from "he";
import { /* WordPress components */ } from "@wordpress/components";

const YourFieldInput = ({ field, value, settingsOption, onChange }) => {
  const {
    class: className,
    disabled,
    help,
    label,
    labelPosition,
    id,
    // ... other field-specific properties
  } = field;

  const onChangeHandler = (nextValue) => {
    onChange({ id, value: nextValue, settingsOption });
  };

  return (
    // Your component JSX
  );
};

export default YourFieldInput;
```

### Example: Creating a Time Input Field

Create `assets/src/settings-app/fields/TimeInput.js`:

```javascript
import he from "he";
import { __experimentalInputControl as InputControl } from "@wordpress/components";

const TimeInput = ({ field, value, settingsOption, onChange }) => {
  const {
    class: className,
    disabled,
    help,
    label,
    labelPosition,
    id,
    placeholder,
    format = 'HH:mm', // Default format
  } = field;

  const onChangeHandler = (nextValue) => {
    // Validate time format (basic validation)
    if (nextValue && !nextValue.match(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
      // Could show error or auto-format
      console.warn('Invalid time format');
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
      placeholder={placeholder || '00:00'}
      type="time"
      value={value || ''}
      __next40pxDefaultSize
    />
  );
};

export default TimeInput;
```

## Step 2: Register the Component

Add your component to `assets/src/settings-app/utils/RegisterComponents.js`:

```javascript
// Add import at the top
import TimeInput from "../fields/TimeInput";

// Add registration in the if block
if (registerComponent) {
  // ... existing registrations
  registerComponent("time", TimeInput);
}
```

## Step 3: Build the Assets

After adding your component, rebuild the JavaScript assets:

```bash
cd assets
npm install  # If needed
npm run build
```

Or if using yarn:

```bash
cd assets
yarn install
yarn build
```

## Step 4: Document the Field Type

Create a wiki page for your new field type following the pattern of existing field documentation. See [Field Types](Home#field-types) for examples.

## Component Props Reference

Your field component receives these props:

### Required Props

- `field` (object) - Field configuration object
- `value` (mixed) - Current field value
- `settingsOption` (string) - Settings option key
- `onChange` (function) - Callback: `onChange({ id, value, settingsOption })`

### Optional Props

- `values` (object) - All values for current settings option
- `settingsId` (string) - Settings instance ID
- `sections` (array) - Available sections
- `onSettingsChange` (function) - Alternative change handler
- `onSave` (function) - Custom save handler
- `isSaving` (boolean) - Saving state

## Field Configuration Properties

Common properties available in the `field` object:

### Standard Properties

- `id` (string, required) - Unique field identifier
- `type` (string, required) - Field type
- `label` (string) - Field label
- `help` (string) - Help text
- `section` (string, required) - Section ID
- `option` (string, required) - Settings option key
- `class` (string) - CSS classes
- `disabled` (boolean) - Disable field
- `std` (mixed) - Default value
- `labelPosition` (string) - Label position: 'top' | 'side' | 'bottom'

### Conditional Display

- `show` (array) - Show when: `['id' => 'field_id', 'value' => expected_value]`
- `hide` (array) - Hide when: `['id' => 'field_id', 'value' => expected_value]`

### Styling

- `container` (string|object) - Container styling
  - String: Style preset name (e.g., 'simple')
  - Object: `{ style: 'preset', padding: '10px', margin: { top: '0' }, border: { color: '#000' } }`
- `inline` (boolean) - Display inline

## Best Practices

### 1. Use WordPress Components

Always use components from `@wordpress/components` when possible for consistency:

```javascript
import { 
  InputControl,
  SelectControl,
  ToggleControl,
  Button,
  Card,
  // etc.
} from "@wordpress/components";
```

### 2. Handle HTML Entities

Decode HTML entities in user-facing text:

```javascript
import he from "he";

label={label ? he.decode(label) : label}
help={help ? he.decode(help) : false}
```

### 3. Provide Sensible Defaults

Always handle undefined/null values:

```javascript
value={value || ''}
placeholder={placeholder || 'Default placeholder'}
```

### 4. Validate Input

Add client-side validation when appropriate:

```javascript
const onChangeHandler = (nextValue) => {
  // Validate before updating
  if (validate(nextValue)) {
    onChange({ id, value: nextValue, settingsOption });
  } else {
    // Show error or prevent update
  }
};
```

### 5. Support Common Props

Support standard props like `disabled`, `help`, `label`, `labelPosition`:

```javascript
const {
  disabled,
  help,
  label,
  labelPosition,
  // ... field-specific props
} = field;
```

### 6. Use Proper Component Sizing

Use WordPress component size props when available:

```javascript
<InputControl
  __next40pxDefaultSize  // For InputControl
  __nextHasNoMarginBottom  // For ToggleControl, etc.
/>
```

## Complex Field Examples

### Field with Nested Structure

For fields that manage complex data structures:

```javascript
const ComplexField = ({ field, value = {}, settingsOption, onChange }) => {
  const { id } = field;
  
  const updateNestedValue = (key, subKey, newValue) => {
    onChange({
      id,
      value: {
        ...value,
        [key]: {
          ...(value[key] || {}),
          [subKey]: newValue,
        },
      },
      settingsOption,
    });
  };
  
  return (
    <div>
      {/* Your complex field UI */}
    </div>
  );
};
```

### Field with Custom Save Behavior

For fields that need special save handling:

```javascript
const CustomSaveField = ({ field, value, settingsOption, onChange, onSave, isSaving }) => {
  const handleCustomAction = async () => {
    // Perform custom action
    if (onSave) {
      await onSave();
    }
  };
  
  return (
    <div>
      {/* Field UI */}
      <Button onClick={handleCustomAction} isBusy={isSaving}>
        Custom Action
      </Button>
    </div>
  );
};
```

## Testing Your Field

1. **Build the assets**: Run `npm run build` or `yarn build`
2. **Test in settings page**: Add your field to a test settings page
3. **Test all props**: Verify label, help, disabled, etc. work correctly
4. **Test validation**: Ensure validation works as expected
5. **Test saving**: Verify values save and retrieve correctly
6. **Test conditionals**: Test show/hide logic if applicable

## Naming Conventions

- Component files: `YourFieldNameInput.js` or `YourFieldNameField.js`
- Component names: PascalCase (e.g., `TimeInput`, `ColorPicker`)
- Field type: lowercase with underscores (e.g., `time`, `color_picker`)
- Export: Default export of the component

## Example: Complete Field Implementation

Here's a complete example of a new field type:

```javascript
// assets/src/settings-app/fields/SliderInput.js
import he from "he";
import { RangeControl } from "@wordpress/components";

const SliderInput = ({ field, value, settingsOption, onChange }) => {
  const {
    class: className,
    disabled,
    help,
    label,
    id,
    min = 0,
    max = 100,
    step = 1,
  } = field;

  const onChangeHandler = (nextValue) => {
    onChange({ id, value: nextValue, settingsOption });
  };

  return (
    <RangeControl
      className={className}
      disabled={disabled}
      help={help ? he.decode(help) : false}
      label={label ? he.decode(label) : label}
      value={value !== undefined ? value : min}
      onChange={onChangeHandler}
      min={min}
      max={max}
      step={step}
      __nextHasNoMarginBottom
    />
  );
};

export default SliderInput;
```

Register it:

```javascript
// In RegisterComponents.js
import SliderInput from "../fields/SliderInput";
registerComponent("slider", SliderInput);
```

Use it:

```php
Settings::fields( [
    [
        'id' => 'opacity',
        'type' => 'slider',
        'label' => 'Opacity',
        'min' => 0,
        'max' => 100,
        'step' => 1,
        'section' => 'general',
        'option' => 'my_settings',
    ],
] );
```

## Next Steps

- Review existing field implementations for patterns
- Create documentation for your new field type
- Test thoroughly before submitting

