// ComponentRegistry.js

import { shouldRenderField } from "./fieldVisibility"; // Adjust path as needed

// Global Component Registry
const componentRegistry = {};

/**
 * Register a component with a specific field type.
 * @param {string} type - The field type.
 * @param {React.Component} component - The React component to render.
 */
export const registerComponent = (type, component) => {
  componentRegistry[type] = component;
};

/**
 * Get the component associated with a field type.
 * @param {string} type - The field type.
 * @returns {React.Component|null} - The registered component.
 */
export const getComponent = (type) => {
  return componentRegistry[type] || null;
};

// Initialize global registry (if not already set)
window.mtphrSettingsRegistry = window.mtphrSettingsRegistry || {};

// Expose component-related methods
window.mtphrSettingsRegistry.registerComponent = registerComponent;
window.mtphrSettingsRegistry.getComponent = getComponent;

// Expose utilities
window.mtphrSettingsRegistry.shouldRenderField = shouldRenderField;
