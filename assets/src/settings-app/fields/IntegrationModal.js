// IntegrationModal.js
import { __ } from "@wordpress/i18n";
import { useRef } from "@wordpress/element";
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
  modalSize,
}) => {
  const { label } = integration;
  const Field = getComponent("field");

  // Snapshot the values at the moment the modal opens so Cancel can revert them.
  const initialValuesRef = useRef({ ...values });

  if (!Field) {
    console.error("Field component not registered");
    return null;
  }

  /**
   * Save and optionally close the modal.
   * @param {boolean} closeAfterSave
   */
  const handleSave = async (closeAfterSave = false) => {
    if (onSave) {
      await onSave();
      if (closeAfterSave) {
        onCloseSettings();
      }
    }
  };

  /**
   * Revert any field changes made while the modal was open, then close.
   */
  const handleCancel = () => {
    if (onSettingsChange && Array.isArray(fields)) {
      fields.forEach((field) => {
        if (!field.id) return;
        const original = initialValuesRef.current[field.id];
        const current = values[field.id];
        if (JSON.stringify(current) !== JSON.stringify(original)) {
          onSettingsChange({ id: field.id, value: original, settingsOption });
        }
      });
    }
    onCloseSettings();
  };

  // When modalSize is provided use a sized (non-fullscreen) dialog;
  // otherwise fall back to the original fullscreen behaviour.
  const modalProps = modalSize
    ? { size: modalSize }
    : { isFullScreen: true, style: { borderRadius: 0 } };

  return (
    <Modal
      title={`${label} ${__("Settings", "mtphr-settings")}`}
      onRequestClose={handleCancel}
      {...modalProps}
    >
      <div style={{ paddingBottom: "77px" }}>
        {fields.map((field, index) => {
          const fieldId = field.id;
          const fieldValue = values[fieldId] || "";

          if (!shouldRenderField(field, fieldValue, values)) return null;

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
        <Button variant="tertiary" onClick={handleCancel} disabled={isSaving}>
          {__("Cancel", "mtphr-settings")}
        </Button>
        {onSave && (
          <Button
            variant="primary"
            onClick={() => handleSave(true)}
            disabled={isSaving}
            isBusy={isSaving}
          >
            {__("Save & Close", "mtphr-settings")}
          </Button>
        )}
      </HStack>
    </Modal>
  );
};

export default IntegrationModal;

