import he from "he";
import { useState } from "@wordpress/element";
import { SelectControl, TextControl } from "@wordpress/components";

const CUSTOM_VALUE = "__custom__";

const SelectInput = ({ field, value, settingsOption, onChange }) => {
  const {
    class: className,
    disabled,
    help,
    label,
    labelPosition,
    multiple,
    id,
    choices,
    variant,
    allow_custom: allowCustom,
    custom_placeholder: customPlaceholder,
  } = field;

  const formattedChoices = () => {
    let base;
    if (Array.isArray(choices)) {
      base = choices;
    } else if (typeof choices === "object" && choices !== null) {
      base = Object.entries(choices).map(([v, l]) => ({
        value: v,
        label: typeof l === "string" ? he.decode(l) : l,
      }));
    } else {
      base = [];
    }
    return allowCustom ? [...base, { value: CUSTOM_VALUE, label: "Custom..." }] : base;
  };

  const knownValues = allowCustom
    ? formattedChoices().filter((o) => o.value !== CUSTOM_VALUE).map((o) => o.value)
    : [];

  const isKnownValue = !allowCustom || knownValues.includes(value);
  const selectValue = allowCustom && !isKnownValue ? CUSTOM_VALUE : (value || "");
  const showCustomInput = allowCustom && selectValue === CUSTOM_VALUE;

  const [customInput, setCustomInput] = useState(isKnownValue ? "" : (value || ""));

  const onSelectChange = (nextValue) => {
    if (nextValue !== CUSTOM_VALUE) {
      onChange({ id, value: nextValue, settingsOption });
    } else {
      onChange({ id, value: customInput, settingsOption });
    }
  };

  const onCustomChange = (nextValue) => {
    setCustomInput(nextValue);
    onChange({ id, value: nextValue, settingsOption });
  };

  return (
    <>
      <SelectControl
        className={className}
        label={label ? he.decode(label) : label}
        labelPosition={labelPosition}
        help={help ? he.decode(help) : help}
        onChange={onSelectChange}
        multiple={multiple}
        name={id}
        options={formattedChoices()}
        value={selectValue}
        variant={variant}
        disabled={disabled}
        __nextHasNoMarginBottom
        __next40pxDefaultSize
      />
      {showCustomInput && (
        <TextControl
          value={customInput}
          onChange={onCustomChange}
          placeholder={customPlaceholder || "Enter custom value"}
          __nextHasNoMarginBottom
          __next40pxDefaultSize
        />
      )}
    </>
  );
};

export default SelectInput;
