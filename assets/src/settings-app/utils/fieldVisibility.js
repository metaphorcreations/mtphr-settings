export const shouldRenderField = (field, values) => {
  // Handle 'show' condition
  if (field.show) {
    const { id: showId, value: showValue, compare = "=" } = field.show;
    const currentValue = values[showId];

    const showConditions = {
      "=": currentValue === showValue,
      "!=": currentValue !== showValue,
      ">": currentValue > showValue,
      "<": currentValue < showValue,
      ">=": currentValue >= showValue,
      "<=": currentValue <= showValue,
      includes: Array.isArray(currentValue) && currentValue.includes(showValue),
      excludes:
        Array.isArray(currentValue) && !currentValue.includes(showValue),
      isEmpty: Array.isArray(currentValue) && currentValue.length === 0,
      isNotEmpty: Array.isArray(currentValue) && currentValue.length > 0,
    };

    if (!showConditions[compare]) return false; // Don't render if 'show' condition fails
  }

  // Handle 'hide' condition (Opposite of 'show')
  if (field.hide) {
    const { id: hideId, value: hideValue, compare = "=" } = field.hide;
    const currentValue = values[hideId];

    const hideConditions = {
      "=": currentValue === hideValue,
      "!=": currentValue !== hideValue,
      ">": currentValue > hideValue,
      "<": currentValue < hideValue,
      ">=": currentValue >= hideValue,
      "<=": currentValue <= hideValue,
      includes: Array.isArray(currentValue) && currentValue.includes(hideValue),
      excludes:
        Array.isArray(currentValue) && !currentValue.includes(hideValue),
      isEmpty: Array.isArray(currentValue) && currentValue.length === 0,
      isNotEmpty: Array.isArray(currentValue) && currentValue.length > 0,
    };

    if (hideConditions[compare]) return false; // Don't render if 'hide' condition matches
  }

  return true; // Render the field
};
