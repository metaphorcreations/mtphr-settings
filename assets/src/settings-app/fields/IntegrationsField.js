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
   */
  const onChangeHandler = (checked, integration) => {
    if (!Array.isArray(value)) {
      value = [];
    }

    const updatedValues = checked
      ? [...value, integration]
      : value.filter((item) => item !== integration);

    onChange({ id, value: updatedValues, settingsOption });
  };

  /**
   * Update the settings added to the integration
   */
  const onSettingsChangeHandler = (data) => {
    const { id, value, settingsOption } = data;
    onChange({ id, value, settingsOption });
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
            />
          );
        })}
      </Grid>
    </BaseControl>
  );
};

export default IntegrationsField;

