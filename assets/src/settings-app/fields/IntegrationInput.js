// IntegrationInput.js
import { __ } from "@wordpress/i18n";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  ToggleControl,
  __experimentalHeading as Heading,
  __experimentalHStack as HStack,
  __experimentalText as Text,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import { cog, link, linkOff } from "@wordpress/icons";

const { getComponent } = window.mtphrSettingsRegistry || {};

const IntegrationInput = ({
  integration,
  isEnabled,
  isAuthorized,
  values,
  fields,
  queryVar,
  onChange,
  onSettingsChange,
  settingsOption,
  settingsId,
  onSave,
  isSaving,
}) => {
  const { id, label, description, logo } = integration;

  const params = new URLSearchParams(window.location.search);
  const activeIntegration = params.get(queryVar);

  const [settingsOpen, setSettingsOpen] = useState(id === activeIntegration);
  const openSettings = () => setSettingsOpen(true);
  const openAuthorize = () => setSettingsOpen(integration.authorize_tab || true);
  const closeSettings = () => setSettingsOpen(false);

  const IntegrationModal = getComponent("integration_modal");

  useEffect(() => {
    // Update the URL when the activeSubTab changes
    const params = new URLSearchParams(window.location.search);
    if (settingsOpen) {
      params.set(queryVar, id);
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;

    window.history.replaceState(null, "", newUrl);
    // Cleanup function to remove the sub-tab query variable when the component is unmounted
    return () => {
      const cleanupParams = new URLSearchParams(window.location.search);
      cleanupParams.delete(queryVar); // Remove the sub-tab query variable
      const cleanupUrl = `${
        window.location.pathname
      }?${cleanupParams.toString()}`;
      window.history.replaceState(null, "", cleanupUrl);
    };
  }, [settingsOpen, id, queryVar]);

  const cardStyles = {
    opacity: isEnabled ? 1 : 0.5,
  };

  if (!IntegrationModal) {
    console.error("IntegrationModal component not registered");
  }

  return (
    <Card className="integration" isRounded={false} style={cardStyles}>
      <VStack spacing={0} style={{ height: "100%" }}>
        <CardHeader
          style={{ flex: 1, alignItems: "flex-start", padding: "20px" }}
        >
          <VStack>
            <HStack>
              {logo && <div dangerouslySetInnerHTML={{ __html: logo }} />}
              {isEnabled && fields && (
                <HStack alignment="right">
                  {undefined !== isAuthorized && (
                    <Button
                      variant="secondary"
                      icon={isAuthorized ? linkOff : link}
                      onClick={openAuthorize}
                    ></Button>
                  )}
                  <Button
                    variant="secondary"
                    icon={cog}
                    onClick={openSettings}
                  ></Button>
                </HStack>
              )}
            </HStack>
            <VStack spacing={0}>
              <Heading level={4}>{label}</Heading>
              {description && <Text>{description}</Text>}
            </VStack>
          </VStack>
        </CardHeader>
        <CardBody style={{ padding: "20px" }}>
          <HStack>
            <Text>
              {isEnabled
                ? __("Enabled", "mtphr-settings")
                : __("Disabled", "mtphr-settings")}
            </Text>
            <ToggleControl
              __next40pxDefaultSize
              __nextHasNoMarginBottom
              checked={isEnabled}
              onChange={(checked) => {
                onChange(checked, integration);
              }}
            />
          </HStack>
        </CardBody>
      </VStack>
      {isEnabled && settingsOpen && fields && IntegrationModal && (
        <IntegrationModal
          integration={integration}
          values={values}
          fields={fields}
          authorizeTab={typeof settingsOpen !== "boolean" && settingsOpen}
          onSettingsChange={onSettingsChange}
          settingsOption={settingsOption}
          settingsId={settingsId}
          onCloseSettings={closeSettings}
          onSave={onSave}
          isSaving={isSaving}
        />
      )}
    </Card>
  );
};

export default IntegrationInput;

