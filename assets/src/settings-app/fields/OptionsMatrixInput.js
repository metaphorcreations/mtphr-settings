import he from "he";
import { __ } from "@wordpress/i18n";
import {
  BaseControl,
  CheckboxControl,
  ToggleControl,
  SelectControl,
  TextControl,
  __experimentalVStack as VStack,
  useBaseControlProps,
} from "@wordpress/components";
import { useState, useEffect } from "@wordpress/element";

/**
 * OptionsMatrixInput - A flexible field type for configuring multiple options per item
 * 
 * Displays a table/matrix where each row is an item and each column is an option to configure.
 * Supports different input types (checkbox, toggle, select, text) for each option.
 * 
 * @param {Object} field - Field configuration
 * @param {string} field.id - Field ID
 * @param {string} field.label - Field label
 * @param {string} field.help - Help text
 * @param {Array} field.items - Array of items (strings or objects with {id, label})
 * @param {Array} field.options - Array of option configurations
 * @param {Object} value - Current field value (multidimensional object)
 * @param {string} settingsOption - Settings option name
 * @param {Function} onChange - Change handler
 */
const OptionsMatrixInput = ({ field, value = {}, settingsOption, onChange }) => {
  const {
    label,
    id,
    help,
    items = [],
    options = [],
    disabled,
    item_label = __("Item", "mtphr-settings"),
  } = field;

  // Normalize items to always be objects with id and label
  const normalizedItems = items.map((item) => {
    if (typeof item === "string") {
      return { id: item, label: item };
    }
    return {
      id: item.id,
      label: item.label || item.id,
    };
  });

  // Initialize state with current values
  const [matrixValues, setMatrixValues] = useState(() => {
    const initial = {};
    normalizedItems.forEach((item) => {
      initial[item.id] = value[item.id] || {};
      // Set defaults for each option if not present
      options.forEach((option) => {
        if (!(option.key in initial[item.id])) {
          // Default values based on type
          if (option.type === "checkbox" || option.type === "toggle") {
            initial[item.id][option.key] = false;
          } else if (option.type === "select") {
            initial[item.id][option.key] = option.choices && option.choices[0] ? option.choices[0].value : "";
          } else {
            initial[item.id][option.key] = "";
          }
        }
      });
    });
    return initial;
  });

  // Update parent when matrix values change
  const handleValueChange = (itemId, optionKey, newValue) => {
    const updatedMatrix = {
      ...matrixValues,
      [itemId]: {
        ...matrixValues[itemId],
        [optionKey]: newValue,
      },
    };
    setMatrixValues(updatedMatrix);
    onChange({ id, value: updatedMatrix, settingsOption });
  };

  // Render the appropriate input based on option type
  const renderOptionInput = (item, option) => {
    const currentValue = matrixValues[item.id]?.[option.key];
    const inputId = `${id}-${item.id}-${option.key}`;

    switch (option.type) {
      case "checkbox":
        return (
          <CheckboxControl
            key={inputId}
            checked={currentValue || false}
            onChange={(checked) => handleValueChange(item.id, option.key, checked)}
            disabled={disabled}
            __nextHasNoMarginBottom
          />
        );

      case "toggle":
        return (
          <ToggleControl
            key={inputId}
            checked={currentValue || false}
            onChange={(checked) => handleValueChange(item.id, option.key, checked)}
            disabled={disabled}
            __nextHasNoMarginBottom
          />
        );

      case "select":
        return (
          <SelectControl
            key={inputId}
            value={currentValue || ""}
            options={option.choices || []}
            onChange={(val) => handleValueChange(item.id, option.key, val)}
            disabled={disabled}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
          />
        );

      case "text":
        return (
          <TextControl
            key={inputId}
            value={currentValue || ""}
            onChange={(val) => handleValueChange(item.id, option.key, val)}
            disabled={disabled}
            __nextHasNoMarginBottom
            __next40pxDefaultSize
          />
        );

      default:
        return null;
    }
  };

  const { baseControlProps } = useBaseControlProps({
    ...field,
    label: field.label ? he.decode(field.label) : field.label,
    help: field.help ? he.decode(field.help) : field.help,
  });

  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "8px",
  };

  const thStyles = {
    textAlign: "left",
    padding: "12px 8px",
    borderBottom: "1px solid #dcdcde",
    fontSize: "13px",
    fontWeight: 500,
    color: "#1e1e1e",
    backgroundColor: "#f6f7f7",
    verticalAlign: "top",
  };

  const tdStyles = {
    padding: "12px 8px",
    borderBottom: "1px solid #dcdcde",
    verticalAlign: "middle",
  };

  const itemLabelStyles = {
    fontWeight: 500,
    fontSize: "13px",
    color: "#1e1e1e",
  };

  const helpStyles = {
    fontSize: "11px",
    color: "#646970",
    fontWeight: 400,
    marginTop: "4px",
    lineHeight: 1.4,
  };

  return (
    <BaseControl {...baseControlProps} __nextHasNoMarginBottom>
      <VStack spacing="0">
        <table style={tableStyles}>
          <thead>
            <tr>
              <th style={{ ...thStyles, width: "30%" }}>
                {item_label !== false && he.decode(item_label)}
              </th>
              {options.map((option) => (
                <th key={option.key} style={thStyles}>
                  <div>
                    {option.label ? he.decode(option.label) : option.key}
                    {option.help && (
                      <div style={helpStyles}>
                        {he.decode(option.help)}
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {normalizedItems.map((item) => (
              <tr key={item.id}>
                <td style={tdStyles}>
                  <span style={itemLabelStyles}>
                    {he.decode(item.label)}
                  </span>
                </td>
                {options.map((option) => (
                  <td key={`${item.id}-${option.key}`} style={tdStyles}>
                    {renderOptionInput(item, option)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </VStack>
    </BaseControl>
  );
};

export default OptionsMatrixInput;

