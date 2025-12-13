// IntegrationModal.js
import { __ } from "@wordpress/i18n";
import {
  Button,
  Modal,
  __experimentalHStack as HStack,
} from "@wordpress/components";

const { getComponent, shouldRenderField } = window.mtphrSettingsRegistry || {};

const IntegrationModal = ({
  integration,
  values,
  fields,
  authorizeTab,
  onSettingsChange,
  onCloseSettings,
  settingsOption,
  settingsId,
  onSave,
  isSaving,
}) => {
  const { label } = integration;
  const Field = getComponent("field");

  if (!Field) {
    console.error("Field component not registered");
    return null;
  }

  /**
   * Handle save action
   * @param {boolean} closeAfterSave - Whether to close the modal after saving
   */
  const handleSave = async (closeAfterSave = false) => {
    if (onSave) {
      await onSave();
      if (closeAfterSave) {
        onCloseSettings();
      }
    }
  };

  return (
    <Modal
      title={`${label} ${__("Settings", "mtphr-settings")}`}
      isFullScreen={true}
      onRequestClose={onCloseSettings}
      style={{ borderRadius: 0 }}
    >
      <div style={{ paddingBottom: "77px" }}>
        {fields.map((field, index) => {
          const fieldId = field.id;
          const fieldValue = values[fieldId] || "";

          if (!shouldRenderField(field, fieldValue, values)) return null; // Don't render if conditions fail

          if ("tabs" === field.type && authorizeTab) {
            field.init_tab = authorizeTab;
          } else {
            delete field.init_tab;
          }

          return (
            <Field
              key={fieldId || index}
              field={field}
              value={fieldValue}
              onChange={onSettingsChange}
              values={values}
              settingsOption={settingsOption}
              settingsId={settingsId}
            />
          );
        })}
      </div>
      <HStack
        alignment="right"
        spacing={2}
        style={{
          position: "absolute",
          bottom: "0px",
          left: "0",
          padding: "20px",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          background: "#FFF",
        }}
      >
        <Button variant="secondary" onClick={onCloseSettings} disabled={isSaving}>
          {__("Close", "mtphr-settings")}
        </Button>
        {onSave && (
          <>
            <Button
              variant="secondary"
              onClick={() => handleSave(false)}
              disabled={isSaving}
            >
              {__("Save", "mtphr-settings")}
            </Button>
            <Button
              variant="primary"
              onClick={() => handleSave(true)}
              disabled={isSaving}
            >
              {__("Save & Close", "mtphr-settings")}
            </Button>
          </>
        )}
      </HStack>
    </Modal>
  );
};

export default IntegrationModal;

