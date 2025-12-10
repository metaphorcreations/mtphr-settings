// CheckboxInput.js
import he from "he";
import { CheckboxControl } from "@wordpress/components";

const CheckboxInput = ({ field, value, settingsOption, onChange }) => {
  const { class: className, disabled, help, label, id } = field;

  const onChangeHandler = (nextValue) => {
    onChange({ id, value: nextValue, settingsOption });
  };

  return (
    <CheckboxControl
      label={label ? he.decode(label) : label}
      help={help ? he.decode(help) : help}
      checked={value}
      onChange={onChangeHandler}
      __nextHasNoMarginBottom
    />
  );
};

export default CheckboxInput;
