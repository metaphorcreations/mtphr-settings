import he from "he";
import { __experimentalInputControl as InputControl } from "@wordpress/components";

const TimeInput = ({ field, value, settingsOption, onChange }) => {
  const { class: className, disabled, help, label, id, maxWidth = "150px" } = field;

  const onChangeHandler = (nextValue) => {
    onChange({ id, value: nextValue, settingsOption });
  };

  const inputStyle = maxWidth ? `--mtphr-time-max-width: ${maxWidth};` : undefined;

  return (
    <InputControl
      className={`mtphr-time-input${className ? ` ${className}` : ""}`}
      disabled={disabled}
      help={help ? he.decode(help) : false}
      label={label ? he.decode(label) : label}
      onChange={onChangeHandler}
      type="time"
      value={value || ""}
      style={inputStyle ? { "--mtphr-time-max-width": maxWidth } : undefined}
      __next40pxDefaultSize
    />
  );
};

export default TimeInput;
