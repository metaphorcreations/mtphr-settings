const COMPARE_OPERATORS = {
  "=": (current, target) => current === target,
  "!=": (current, target) => current !== target,
  ">": (current, target) => current > target,
  "<": (current, target) => current < target,
  ">=": (current, target) => current >= target,
  "<=": (current, target) => current <= target,
  includes: (current, target) =>
    Array.isArray(current) && current.includes(target),
  excludes: (current, target) =>
    Array.isArray(current) && !current.includes(target),
  isEmpty: (current) => Array.isArray(current) && current.length === 0,
  isNotEmpty: (current) => Array.isArray(current) && current.length > 0,
  truthy: (current) => !!current,
  falsy: (current) => !current,
};

/**
 * Evaluate a single visibility condition against current values.
 * @param {Object} condition - { id, value?, compare }
 * @param {Object} values - Current form values
 * @returns {boolean}
 */
function evaluateCondition(condition, values) {
  const { id, value, compare = "=" } = condition;
  const currentValue = values[id];
  const op = COMPARE_OPERATORS[compare];
  if (!op) return false;
  if (compare === "truthy" || compare === "falsy" || compare === "isEmpty" || compare === "isNotEmpty") {
    return op(currentValue);
  }
  return op(currentValue, value);
}

/**
 * Evaluate show/hide config: either a single condition object or { operator, conditions }.
 * @param {Object} config - field.show or field.hide
 * @param {Object} values - Current form values
 * @returns {boolean} - For show: true if visible; for hide: true if should hide
 */
function evaluateShowHide(config, values) {
  if (!config) return null;

  // Multiple conditions with operator
  if (config.operator && Array.isArray(config.conditions)) {
    const results = config.conditions.map((c) => evaluateCondition(c, values));
    const op = (config.operator || "and").toLowerCase();
    if (op === "and") return results.every(Boolean);
    if (op === "or") return results.some(Boolean);
    return false;
  }

  // Single condition object
  return evaluateCondition(config, values);
}

export const shouldRenderField = (field, values) => {
  // Handle 'show' condition
  if (field.show) {
    const result = evaluateShowHide(field.show, values);
    if (result === null) return true;
    if (!result) return false;
  }

  // Handle 'hide' condition (Opposite of 'show')
  if (field.hide) {
    const result = evaluateShowHide(field.hide, values);
    if (result === null) return true;
    if (result) return false;
  }

  return true; // Render the field
};
