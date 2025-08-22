// CheckboxesInput.js
import {
  BaseControl,
  CheckboxControl,
  useBaseControlProps,
  __experimentalHStack as HStack,
  __experimentalVStack as VStack,
} from "@wordpress/components";

/**
 * A reusable checkbox group input for plugin settings.
 * Supports both array-based and object-based `choices` definitions.
 * Ensures that only values present in `choices` are stored.
 */
const CheckboxesInput = ({ field, value, settingsOption, onChange }) => {
  // Destructure field config
  const { class: className, disabled, help, label, id, choices } = field;

  // If `choices` is a simple array, then the array items themselves are the values.
  // If `choices` is an object, the keys are the values and the values are labels.
  const useValueKeys = Array.isArray(choices);

  /**
   * Build a Set of all allowed values from `choices`.
   * Supports both array-style and object-style definitions.
   * Normalizes to strings for consistent comparison.
   */
  const getAllowedSet = (choices) => {
    if (Array.isArray(choices)) {
      return new Set(choices.map(String));
    }
    if (choices && typeof choices === "object") {
      return new Set(Object.keys(choices).map(String));
    }
    return new Set();
  };

  /**
   * Handle a single checkbox change.
   * - Removes any stored values that are not in the current `choices`.
   * - Toggles the selected value on or off.
   * - Calls the parent `onChange` callback with the new value array.
   */
  const onChangeHandler = (checked, choice) => {
    const allowed = getAllowedSet(choices);

    // Ensure current value is always an array
    const current = Array.isArray(value) ? value : [];

    // Step 1: prune anything that isn't allowed anymore
    const pruned = current.filter((v) => allowed.has(String(v)));

    // Step 2: add or remove the clicked choice
    let next;
    if (checked) {
      // Add only if it's allowed and not already selected
      const hasChoice = pruned.some((v) => String(v) === String(choice));
      next =
        allowed.has(String(choice)) && !hasChoice
          ? [...pruned, choice]
          : pruned;
    } else {
      // Remove the choice if it exists
      next = pruned.filter((item) => String(item) !== String(choice));
    }

    // Notify parent with updated array
    onChange({ id, value: next, settingsOption });
  };

  // Get standard control props (label, help, etc.) for BaseControl
  const { baseControlProps } = useBaseControlProps(field);

  return (
    <BaseControl {...baseControlProps} __nextHasNoMarginBottom>
      <VStack>
        {Object.entries(choices).map(([choice, choiceLabel]) => {
          // Decide what the "value" for this checkbox should be:
          // - if choices is an array: the label IS the value
          // - if choices is an object: the object key is the value
          const choiceVal = useValueKeys ? choiceLabel : choice;

          return (
            <CheckboxControl
              key={choiceVal}
              label={choiceLabel}
              checked={Array.isArray(value) ? value.includes(choiceVal) : false}
              onChange={(checked) => onChangeHandler(checked, choiceVal)}
              disabled={disabled}
              __nextHasNoMarginBottom
            />
          );
        })}
      </VStack>
    </BaseControl>
  );
};

export default CheckboxesInput;
