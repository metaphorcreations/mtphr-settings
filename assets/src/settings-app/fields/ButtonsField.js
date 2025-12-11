import he from "he";
import {
  BaseControl,
  useBaseControlProps,
  __experimentalHStack as HStack,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import ButtonInput from "./ButtonInput";

const ButtonsField = ({ field, values, settingsOption, settingsId }) => {
  const {
    alignment,
    direction,
    justify,
    spacing,
    wrap,
    class: className = "",
    buttons,
  } = field;

  const { baseControlProps } = useBaseControlProps({
    ...field,
    label: field.label ? he.decode(field.label) : field.label,
    help: field.help ? he.decode(field.help) : field.help,
  });

  return (
    <BaseControl {...baseControlProps} __nextHasNoMarginBottom>
      <HStack
        alignment={alignment}
        direction={direction}
        justify={justify}
        spacing={spacing}
        wrap={wrap}
        className={className}
      >
        {buttons.map((button, index) => {
          return (
            <ButtonInput
              key={`${field.id || 'buttons'}-${button.id || index}`}
              field={button}
              values={values}
              settingsOption={settingsOption}
              settingsId={settingsId}
            />
          );
        })}
      </HStack>
    </BaseControl>
  );
};

export default ButtonsField;
