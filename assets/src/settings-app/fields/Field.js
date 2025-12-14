import he from "he";
import classNames from "classnames";

import {
  Card,
  CardHeader,
  CardBody,
  Notice,
  __experimentalHeading as Heading,
} from "@wordpress/components";

const { getComponent } = window.mtphrSettingsRegistry || {};

// Style presets for container settings
const stylePresets = {
  simple: {
    padding: '0',
    isBorderless: true,
    background: 'transparent',
  },
};

const Field = ({
  field,
  value,
  onChange,
  onSettingsChange,
  values,
  settingsOption,
  settingsId,
  sections,
  onSave,
  isSaving,
}) => {
  // Apply default container settings for ad fields if not explicitly set
  const containerDefaults = {};
  
  // Handle container: string (style preset), object with style key, or plain object
  let container = containerDefaults;
  
  if (field.container) {
    if (typeof field.container === 'string') {
      // Container is a string - use it as a style preset name
      const preset = stylePresets[field.container];
      if (preset) {
        container = { ...containerDefaults, ...preset };
      } else {
        // Unknown preset, just use defaults
        container = containerDefaults;
      }
    } else if (typeof field.container === 'object' && field.container.style) {
      // Container is an object with a style key - apply preset and merge other properties
      const preset = stylePresets[field.container.style];
      if (preset) {
        // Extract style key and merge preset with remaining container properties
        const { style, ...containerOverrides } = field.container;
        container = { ...containerDefaults, ...preset, ...containerOverrides };
      } else {
        // Unknown preset, just merge container properties
        const { style, ...containerOverrides } = field.container;
        container = { ...containerDefaults, ...containerOverrides };
      }
    } else {
      // Container is a plain object - merge with defaults
      container = { ...containerDefaults, ...field.container };
    }
  }
  
  const { 
    isBorderless, 
    padding, 
    margin,
    background, 
    backgroundColor,
    borderColor,
    borderStyle,
    borderWidth,
    border,
  } = container;
  const { inline } = field;

  const Component = getComponent(field.type);

  if (!Component) {
    console.error(`No component registered for field type '${field.type}'`);
    return (
      <Notice status="error" isDismissible={false}>
        Unknown field type: {field.type}
      </Notice>
    );
  }

  const CardClassName = classNames(
    "mtphrSettings__field",
    `mtphrSettings__field--${field.type}`,
    field.class,
    { "mtphrSettings__field--inline": inline }
  );

  // Build border styles - support both shorthand and nested object formats
  const borderStyles = {};
  if (border) {
    // Nested border object: { border: { color: '#000', style: 'solid', width: '1px' } }
    if (typeof border === 'object' && !Array.isArray(border)) {
      if (border.color) borderStyles.borderColor = border.color;
      if (border.style) borderStyles.borderStyle = border.style;
      if (border.width) borderStyles.borderWidth = border.width;
    }
  } else {
    // Shorthand border properties: borderColor, borderStyle, borderWidth
    if (borderColor) borderStyles.borderColor = borderColor;
    if (borderStyle) borderStyles.borderStyle = borderStyle;
    if (borderWidth) borderStyles.borderWidth = borderWidth;
  }

  // Build margin styles - support both string and object formats
  const marginStyles = {};
  if (margin) {
    if (typeof margin === 'string') {
      // String format: "10px", "10px 20px", etc.
      // When a single value like "0" is provided, explicitly set all sides to override CSS
      if (margin === '0' || margin.trim() === '0') {
        marginStyles.margin = '0';
        marginStyles.marginTop = '0';
        marginStyles.marginRight = '0';
        marginStyles.marginBottom = '0';
        marginStyles.marginLeft = '0';
      } else {
        marginStyles.margin = margin;
      }
    } else if (typeof margin === 'object' && !Array.isArray(margin)) {
      // Object format: { top: '10px', bottom: '0', left: '20px', right: '20px' }
      if (margin.top !== undefined) marginStyles.marginTop = margin.top;
      if (margin.right !== undefined) marginStyles.marginRight = margin.right;
      if (margin.bottom !== undefined) marginStyles.marginBottom = margin.bottom;
      if (margin.left !== undefined) marginStyles.marginLeft = margin.left;
    }
  }

  // Build Card style object, including background, border, and margin
  const cardStyle = {
    flex: 1,
    ...(background || backgroundColor ? { backgroundColor: background || backgroundColor } : {}),
    ...marginStyles,
    ...borderStyles,
  };

  return (
    <Card
      className={CardClassName}
      isRounded={false}
      size="small"
      isBorderless={isBorderless}
      style={cardStyle}
    >
      {field.type === "group" && field.label && (
        <CardHeader className={`$mtphrSettings__field__heading`}>
          <Heading level={4}>{he.decode(field.label)}</Heading>
        </CardHeader>
      )}
      <CardBody
        className={`mtphrSettings__field__input-wrapper`}
        style={(() => {
          // Build padding styles - support both string and object formats
          if (!padding) return {};
          if (typeof padding === 'string') {
            return { padding };
          } else if (typeof padding === 'object' && !Array.isArray(padding)) {
            // Object format: { top: '10px', bottom: '0', left: '20px', right: '20px' }
            const paddingStyles = {};
            if (padding.top !== undefined) paddingStyles.paddingTop = padding.top;
            if (padding.right !== undefined) paddingStyles.paddingRight = padding.right;
            if (padding.bottom !== undefined) paddingStyles.paddingBottom = padding.bottom;
            if (padding.left !== undefined) paddingStyles.paddingLeft = padding.left;
            return paddingStyles;
          }
          return {};
        })()}
      >
        <Component
          field={field}
          value={value}
          onChange={onChange}
          onSettingsChange={onSettingsChange}
          values={values}
          settingsOption={settingsOption}
          settingsId={settingsId}
          sections={sections}
          onSave={onSave}
          isSaving={isSaving}
        />
      </CardBody>
    </Card>
  );
};

export default Field;
