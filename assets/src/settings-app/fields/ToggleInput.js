import he from "he";
import { ToggleControl } from "@wordpress/components";

const ToggleInput = ({ field, value, settingsOption, onChange }) => {
  const {
    class: className,
    disabled,
    help,
    label,
    id,
  } = field;

  const onChangeHandler = (nextValue) => {
    onChange({ id, value: nextValue, settingsOption });
  };

  return (
    <ToggleControl
      className={className}
      label={label ? he.decode(label) : label}
      help={help ? he.decode(help) : help}
      checked={value || false}
      onChange={onChangeHandler}
      disabled={disabled}
      __nextHasNoMarginBottom
    />
  );
};

export default ToggleInput;

