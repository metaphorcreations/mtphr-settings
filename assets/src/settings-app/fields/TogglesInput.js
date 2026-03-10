import he from "he";
import {
  BaseControl,
  ToggleControl,
  useBaseControlProps,
} from "@wordpress/components";

/**
 * A grid of toggle controls stored as a single object value.
 * Similar in concept to CheckboxesInput but renders ToggleControl items.
 *
 * field.choices: object { key: label } defining each toggle.
 * field.defaults: optional object { key: bool } for initial states.
 * value: object { key: bool } stored under the field's id.
 */
const TogglesInput = ({ field, value, settingsOption, onChange }) => {
  const { id, choices, label, help, defaults: fieldDefaults = {} } = field;

  const currentValue =
    typeof value === "object" && value !== null && !Array.isArray(value)
      ? value
      : {};

  const onToggleChange = (key, checked) => {
    onChange({
      id,
      value: { ...currentValue, [key]: checked },
      settingsOption,
    });
  };

  const { baseControlProps } = useBaseControlProps({
    ...field,
    label: label ? he.decode(label) : label,
    help: help ? he.decode(help) : help,
  });

  const entries = Array.isArray(choices)
    ? choices.map((v) => [v, v])
    : Object.entries(choices || {});

  return (
    <BaseControl {...baseControlProps} __nextHasNoMarginBottom>
      <div className="mtphr-settings-toggles-grid">
        {entries.map(([key, choiceLabel]) => {
          const checked =
            key in currentValue
              ? Boolean(currentValue[key])
              : Boolean(fieldDefaults[key] ?? false);

          return (
            <ToggleControl
              key={key}
              label={
                typeof choiceLabel === "string"
                  ? he.decode(choiceLabel)
                  : choiceLabel
              }
              checked={checked}
              onChange={(val) => onToggleChange(key, val)}
              __nextHasNoMarginBottom
            />
          );
        })}
      </div>
    </BaseControl>
  );
};

export default TogglesInput;
