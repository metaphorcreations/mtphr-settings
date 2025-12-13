// IntegrationsField.js
import { __ } from "@wordpress/i18n";
import {
  BaseControl,
  useBaseControlProps,
  __experimentalGrid as Grid,
} from "@wordpress/components";

const { getComponent } = window.mtphrSettingsRegistry || {};

const IntegrationsField = ({
  field,
  value,
  values,
  settingsOption,
  settingsId,
  sections,
  onChange,
  onSettingsChange,
  onSave,
  isSaving,
}) => {
  const { class: className, disabled, help, label, id, integrations } = field;
  const queryVar = field.query_var || field.id;

  const IntegrationInput = getComponent("integration_input");

  if (!IntegrationInput) {
    console.error("IntegrationInput component not registered");
    return null;
  }

  /**
   * Set the enabled value of the integration
   * This handler is used for the toggle and triggers auto-save
   */
  const onChangeHandler = (checked, integration) => {
    if (!Array.isArray(value)) {
      value = [];
    }

    const updatedValues = checked
      ? [...value, integration.id]
      : value.filter((item) => item !== integration.id);

    // Pass integration label and enabled state for custom notification
    onChange({ 
      id, 
      value: updatedValues, 
      settingsOption,
      integrationLabel: integration.label,
      isEnabled: checked
    });
  };

  /**
   * Update the settings added to the integration
   * This handler is used for settings changes within the modal (no auto-save)
   */
  const onSettingsChangeHandler = (data) => {
    const { id, value, settingsOption } = data;
    // Use onSettingsChange (handleInputChange) for regular save, not auto-save
    if (onSettingsChange) {
      onSettingsChange({ id, value, settingsOption });
    } else {
      onChange({ id, value, settingsOption });
    }
  };

  const { baseControlProps } = useBaseControlProps(field);

  return (
    <BaseControl {...baseControlProps} __nextHasNoMarginBottom>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
        {integrations.map((integration) => {
          /**
           * Look for the section with matching settings ID
           * and store it in `settings` if it exists, otherwise `undefined`.
           *
           * @type {Object|undefined}
           */
          const settings =
            integration.settings &&
            sections.find((section) => section.id === integration.settings);
          const fields = (settings && settings.fields) || false;

          return (
            <IntegrationInput
              key={integration.id}
              integration={integration}
              isEnabled={value && value.includes(integration.id)}
              isAuthorized={integration.is_authorized}
              values={values}
              fields={fields}
              queryVar={queryVar}
              settingsOption={settingsOption}
              settingsId={settingsId}
              onChange={onChangeHandler}
              onSettingsChange={onSettingsChangeHandler}
              onSave={onSave}
              isSaving={isSaving}
            />
          );
        })}
      </Grid>
    </BaseControl>
  );
};

export default IntegrationsField;

