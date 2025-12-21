// SelectionInput.js
import he from "he";
import classNames from "classnames";
import {
  BaseControl,
  useBaseControlProps,
  __experimentalVStack as VStack,
  __experimentalHStack as HStack,
} from "@wordpress/components";

const SelectionInput = ({ field, value, settingsOption, onChange }) => {
  const { 
    class: className, 
    disabled, 
    help, 
    label, 
    id, 
    choices,
    showRadio = true, // Option to show radio button on the left
  } = field;

  const onChangeHandler = (nextValue) => {
    onChange({ id, value: nextValue, settingsOption });
  };

  /**
   * Format the choices
   * Expected format: array of objects with { value, heading, description }
   * Or object where keys are values and values are { heading, description }
   */
  const formattedChoices = () => {
    // If it's already an array, return it as is
    if (Array.isArray(choices)) {
      return choices.map(choice => ({
        value: choice.value,
        heading: typeof choice.heading === 'string' ? he.decode(choice.heading) : choice.heading,
        description: typeof choice.description === 'string' ? he.decode(choice.description) : choice.description,
      }));
    }

    // If it's an object, convert it to an array of objects
    if (typeof choices === "object" && choices !== null) {
      return Object.entries(choices).map(([val, choiceData]) => {
        // Handle both { heading, description } objects and simple string labels
        if (typeof choiceData === 'object' && choiceData !== null) {
          return {
            value: val,
            heading: typeof choiceData.heading === 'string' ? he.decode(choiceData.heading) : choiceData.heading || val,
            description: typeof choiceData.description === 'string' ? he.decode(choiceData.description) : choiceData.description || '',
          };
        }
        // If it's just a string, use it as the heading
        return {
          value: val,
          heading: typeof choiceData === 'string' ? he.decode(choiceData) : choiceData,
          description: '',
        };
      });
    }

    // Return an empty array or handle unexpected cases
    return [];
  };

  const options = formattedChoices();
  const selectedValue = value;

  const handleOptionClick = (optionValue, e) => {
    if (e) {
      e.stopPropagation();
    }
    if (!disabled && optionValue !== selectedValue) {
      onChangeHandler(optionValue);
    }
  };

  const { baseControlProps } = useBaseControlProps({
    ...field,
    label: field.label ? he.decode(field.label) : field.label,
    help: field.help ? he.decode(field.help) : field.help,
  });

  return (
    <BaseControl {...baseControlProps} __nextHasNoMarginBottom>
      <VStack spacing={3}>
        {options.map((option) => {
          const isSelected = selectedValue === option.value;
          const optionClassName = classNames(
            "mtphrSettings__selection-option",
            {
              "mtphrSettings__selection-option--selected": isSelected,
              "mtphrSettings__selection-option--disabled": disabled,
            }
          );

          return (
            <div
              key={`${id || 'selection'}-${option.value}`}
              className={optionClassName}
              onClick={(e) => handleOptionClick(option.value, e)}
              role="radio"
              aria-checked={isSelected}
              tabIndex={disabled ? -1 : 0}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
                  e.preventDefault();
                  handleOptionClick(option.value, e);
                }
              }}
            >
              <HStack alignment="flex-start" spacing={3}>
                {showRadio && (
                  <div className="mtphrSettings__selection-radio" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="radio"
                      name={id || 'selection'}
                      value={option.value}
                      checked={isSelected}
                      onChange={(e) => handleOptionClick(option.value, e)}
                      disabled={disabled}
                      className="mtphrSettings__selection-radio-input"
                    />
                  </div>
                )}
                <div className="mtphrSettings__selection-content">
                  {option.heading && (
                    <div className="mtphrSettings__selection-heading">
                      {option.heading}
                    </div>
                  )}
                  {option.description && (
                    <div className="mtphrSettings__selection-description">
                      {option.description}
                    </div>
                  )}
                </div>
              </HStack>
            </div>
          );
        })}
      </VStack>
    </BaseControl>
  );
};

export default SelectionInput;

