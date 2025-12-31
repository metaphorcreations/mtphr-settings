import he from "he";
import { __experimentalInputControl as InputControl } from "@wordpress/components";

const DateInput = ({ field, value, settingsOption, onChange }) => {
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
      placeholder={placeholder}
      type="date"
      value={value || ""}
      __next40pxDefaultSize
    />
  );
};

export default DateInput;

