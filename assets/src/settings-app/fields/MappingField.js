import he from "he";
import { __ } from "@wordpress/i18n";
import {
  BaseControl,
  SelectControl,
  __experimentalHStack as HStack,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import { useState } from "@wordpress/element";

const MappingField = ({ field, value = {}, settingsOption, onChange }) => {
  const {
    label,
    id,
    help,
    map_source,
    map_choices,
    source_label,
    source_help,
    choices_label,
    choices_help,
    disabled,
  } = field;

  // Initialize state to track mapped values
  const [mappedValues, setMappedValues] = useState(() => {
    return map_source.map((item) => ({
      id: item.id,
      label: item.label ? he.decode(item.label || item.id) : (item.label || item.id),
      help: item.help ? he.decode(item.help) : item.help,
      value: value[item.id] || "",
    }));
  });

  const handleSelectChange = (selectedValue, mappedId) => {
    const updatedMappedValues = mappedValues.map((mapping) =>
      mapping.id === mappedId
        ? {
            ...mapping,
            value: selectedValue,
          }
        : mapping
    );

    setMappedValues(updatedMappedValues);

    // Create the updated value object, excluding empty selections
    const newValues = updatedMappedValues.reduce((acc, mapping) => {
      if (mapping.value) {
        acc[mapping.id] = mapping.value;
      }
      return acc;
    }, {});

    onChange({ id, value: newValues, settingsOption });
  };

  const availableChoices = (currentValue) =>
    map_choices.map((choice) => ({
      value: choice.id,
      label: choice.label ? he.decode(choice.label) : choice.label,
      disabled: mappedValues.some(
        (mapping) =>
          mapping.value === choice.id && mapping.value !== currentValue
      ),
    }));

  const headingStyles = {
    fontSize: "13px",
    color: "#1e1e1e",
    fontWeight: 500,
  };

  const labelStyles = {
    fontSize: "11px",
    fontWeight: 500,
    lineHeight: 1.4,
    textTransform: "uppercase",
    boxSizing: "border-box",
    display: "block",
    padding: "0",
    maxWidth: "100%",
    zIndex: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  };

  const helpStyles = {
    fontSize: "12px",
    color: "rgb(117, 117, 117)",
    margin: 0,
  };

  return (
    <BaseControl label={label ? he.decode(label) : label} help={help ? he.decode(help) : help} id={id} __nextHasNoMarginBottom>
      <VStack spacing="10px">
        <HStack alignment="topLeft">
          <div
            style={{
              flex: 1,
            }}
          >
            <label style={headingStyles}>
              {source_label ? he.decode(source_label) : __("Source", "mtphr-settings")}
            </label>
            {source_help && <p style={helpStyles}>{he.decode(source_help)}</p>}
          </div>
          <div
            style={{
              flex: 2,
            }}
          >
            <label style={headingStyles}>
              {choices_label ? he.decode(choices_label) : __("Choices", "mtphr-settings")}
            </label>
            {choices_help && <p style={helpStyles}>{he.decode(choices_help)}</p>}
          </div>
        </HStack>
        {mappedValues.map((item) => (
          <HStack
            key={`${id || 'mapping'}-${item.id}`}
            spacing="10px"
            className="mapping-field-row"
            alignment="left"
            style={{ borderTop: "1px solid #E5E5E5", paddingTop: "10px" }}
          >
            <div className="mapping-field-label" style={{ flex: 1 }}>
              <div style={labelStyles}>{item.label}</div>
              {item.help && <p style={helpStyles}>{item.help}</p>}
            </div>
            <div className="mapping-field-select" style={{ flex: 2 }}>
              <SelectControl
                value={item.value}
                options={[
                  { value: "", label: "-- Select --", disabled: false },
                  ...availableChoices(item.value),
                ]}
                onChange={(value) => handleSelectChange(value, item.id)}
                disabled={disabled}
                __nextHasNoMarginBottom
                __next40pxDefaultSize
              />
            </div>
          </HStack>
        ))}
      </VStack>
    </BaseControl>
  );
};

export default MappingField;
