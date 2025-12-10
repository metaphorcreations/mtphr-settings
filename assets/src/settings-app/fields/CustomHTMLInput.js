import he from "he";
import { BaseControl, useBaseControlProps } from "@wordpress/components";

const CustomHTMLInput = ({ field }) => {
  const { class: className, std } = field;

  const { baseControlProps } = useBaseControlProps({
    ...field,
    label: field.label ? he.decode(field.label) : field.label,
    help: field.help ? he.decode(field.help) : field.help,
  });

  return (
    <BaseControl {...baseControlProps} __nextHasNoMarginBottom>
      <div dangerouslySetInnerHTML={{ __html: std }} />
    </BaseControl>
  );
};

export default CustomHTMLInput;
