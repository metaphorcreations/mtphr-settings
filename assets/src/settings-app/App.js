import he from "he";
import { __, sprintf } from "@wordpress/i18n";
import { useState, useEffect, useMemo } from "@wordpress/element";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Notice,
  SlotFillProvider,
  SnackbarList,
  TabPanel,
  __experimentalHeading as Heading,
  createSlotFill,
} from "@wordpress/components";
import { Icon } from "@wordpress/icons";
import * as wpIcons from "@wordpress/icons";
import { dispatch, useDispatch, useSelect } from "@wordpress/data";

import Field from "./fields/Field";
import { shouldRenderField } from "./utils/fieldVisibility";

/**
 * Settings UI component for a registered settings ID.
 *
 * @param {Object} props
 * @param {string} props.settingsId - Unique identifier for the settings instance.
 * @param {string} props.settingsTitle - Title to display at the top of the card.
 * @returns {JSX.Element}
 */
export default ({ settingsId, settingsTitle }) => {
  /** @type {Object} */
  const settingVars = window[`${settingsId}Vars`];

  /** @type {[Object, Function]} */
  const [values, setValues] = useState(settingVars.values);

  /** @type {[Object<string, string[]>, Function]} */
  const [updatedValueKeys, setUpdatedValueKeys] = useState({});

  /** @type {[boolean, Function]} */
  const [isSaving, setIsSaving] = useState(false);

  /**
   * Creates a save handler for integration modals that saves only fields for a specific settingsOption
   * @param {string} settingsOption - The settings option to save
   * @returns {Function} Save handler function
   */
  const createIntegrationSaveHandler = (settingsOption) => {
    return async () => {
      setIsSaving(true);
      try {
        // Filter updatedValueKeys to only include keys for this settingsOption
        const filteredValueKeys = {
          [settingsOption]: updatedValueKeys[settingsOption] || [],
        };

        // Only proceed if there are changes to save
        if (!filteredValueKeys[settingsOption] || filteredValueKeys[settingsOption].length === 0) {
          dispatch("core/notices").createNotice(
            "info",
            __("No changes to save.", "mtphr-settings"),
            { type: "snackbar" }
          );
          return;
        }

        const res = await fetch(`${settingVars.restUrl}settings`, {
          method: "POST",
          headers: {
            "X-WP-Nonce": settingVars.nonce,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ valueKeys: filteredValueKeys, values }),
        });

        if (!res.ok) {
          const errorData = await res.json().catch(() => null);
          throw new Error(errorData?.message || `HTTP Error ${res.status}`);
        }

        const data = await res.json();
        setValues(data);
        
        // Clear the updated keys for this settingsOption since they're now saved
        setUpdatedValueKeys((prev) => {
          const newKeys = { ...prev };
          if (newKeys[settingsOption]) {
            delete newKeys[settingsOption];
          }
          return newKeys;
        });

        dispatch("core/notices").createNotice(
          "success",
          __("Settings saved successfully!", "mtphr-settings"),
          { type: "snackbar" }
        );
      } catch (error) {
        dispatch("core/notices").createNotice(
          "error",
          `${__("Error saving settings.", "mtphr-settings")} ${error.message}`,
          { type: "snackbar" }
        );
      } finally {
        setIsSaving(false);
      }
    };
  };

  /** @type {[{ status: string, message: string } | null, Function]} */
  const [notice, setNotice] = useState(null);

  const {
    fields,
    field_sections: fieldSections,
    sidebar_items: sidebarItems = [],
    sidebar_width: sidebarWidth = '320px',
    main_max_width: mainMaxWidth = '1000px',
    header_icon: headerIcon = '',
    header_description: headerDescription = '',
    header_version: headerVersion = ''
  } = settingVars;

  /** @type {{ Fill: React.ComponentType, Slot: React.ComponentType }} */
  const { Fill, Slot } = createSlotFill(`${settingsId}Notices`);

  /** @type {Array} */
  const notices = useSelect(
    (select) => select("core/notices").getNotices(),
    []
  );

  /** @type {Function} */
  const { removeNotice } = useDispatch("core/notices");

  /**
   * Creates a map of section IDs to section metadata for fast lookup.
   *
   * @type {Object<string, Object>}
   */
  const fieldSectionsMap = useMemo(() => {
    return fieldSections.reduce((map, section) => {
      map[section.id] = section;
      return map;
    }, {});
  }, [fieldSections]);

  /**
   * Groups fields into their respective sections with metadata.
   *
   * @type {Array<Object>}
   */
  const sections = useMemo(() => {
    const grouped = fields.reduce((acc, field) => {
      const sectionData = fieldSectionsMap[field.section];
      if (!sectionData) return acc;

      let section = acc.find((s) => s.id === field.section);
      if (!section) {
        section = {
          id: field.section,
          slug: sectionData.slug,
          label: sectionData.label,
          order: sectionData.order ?? 10,
          option: sectionData.option ?? null,
          show: sectionData.show ?? null,
          hide: sectionData.hide ?? null,
          type: sectionData.type ?? "tab",
          fields: [],
        };
        acc.push(section);
      }

      section.fields.push(field);
      return acc;
    }, []);

    return grouped.sort((a, b) => a.order - b.order);
  }, [fields, fieldSectionsMap]);

  /**
   * Filters and returns all visible 'primary' sections.
   *
   * @type {Array<Object>}
   */
  const primarySections = useMemo(() => {
    return sections.filter((section) => {
      if (section.type !== "primary") return false;
      if (
        (section.show || section.hide) &&
        !shouldRenderField(section, values[section.option])
      ) {
        return false;
      }
      return true;
    });
  }, [sections, values]);

  /**
   * Filters and returns all visible 'secondary' sections.
   *
   * @type {Array<Object>}
   */
  const secondarySections = useMemo(() => {
    return sections.filter((section) => {
      if (section.type !== "secondary") return false;
      if (
        (section.show || section.hide) &&
        !shouldRenderField(section, values[section.option])
      ) {
        return false;
      }
      return true;
    });
  }, [sections, values]);

  /**
   * Tab configuration for TabPanel component.
   *
   * @type {Array<{ id: string, name: string, title: string }>}
   */
  const tabs = useMemo(() => {
    return primarySections.map((section) => ({
      id: section.id,
      name: section.slug,
      title: section.label ? he.decode(section.label) : section.label,
    }));
  }, [primarySections]);

  /** @type {URLSearchParams} */
  const urlParams = new URLSearchParams(window.location.search);

  /** @type {string} */
  const defaultTab =
    urlParams.get("section") || (primarySections[0]?.slug ?? "");

  /** @type {[string, Function]} */
  const [activeTab, setActiveTab] = useState(defaultTab);

  /**
   * Updates the URL to reflect the current tab.
   */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (!primarySections.length || activeTab === primarySections[0].slug) {
      params.delete("section");
    } else {
      params.set("section", activeTab);
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [activeTab, primarySections]);

  /**
   * Handles updates to an individual field.
   *
   * @param {Object} data
   * @param {string} data.id - Field ID.
   * @param {*} data.value - New field value.
   * @param {string} data.settingsOption - Associated settings option key.
   */
  const handleInputChange = ({ id, value, settingsOption }) => {
    setValues((prev) => ({
      ...prev,
      [settingsOption]: {
        ...prev[settingsOption],
        [id]: value,
      },
    }));

    setUpdatedValueKeys((prev) => ({
      ...prev,
      [settingsOption]: prev[settingsOption]?.includes(id)
        ? prev[settingsOption]
        : [...(prev[settingsOption] || []), id],
    }));
  };

  /**
   * Handles auto-save for integration toggles.
   * Saves immediately when an integration is enabled/disabled.
   *
   * @param {Object} data
   * @param {string} data.id - Field ID.
   * @param {*} data.value - New field value.
   * @param {string} data.settingsOption - Associated settings option key.
   */
  const handleAutoSave = async ({ id, value, settingsOption, integrationLabel, isEnabled }) => {
    // Store the previous value for potential revert
    const previousValue = values[settingsOption]?.[id];
    
    // Update local state immediately for UI responsiveness
    setValues((prev) => ({
      ...prev,
      [settingsOption]: {
        ...prev[settingsOption],
        [id]: value,
      },
    }));

    // Trigger save
    setIsSaving(true);
    try {
      const currentUpdatedKeys = {
        [settingsOption]: [id],
      };
      const currentValues = {
        ...values,
        [settingsOption]: {
          ...values[settingsOption],
          [id]: value,
        },
      };

      const res = await fetch(`${settingVars.restUrl}settings`, {
        method: "POST",
        headers: {
          "X-WP-Nonce": settingVars.nonce,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ valueKeys: currentUpdatedKeys, values: currentValues }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP Error ${res.status}`);
      }

      const data = await res.json();
      setValues(data);
      
      // Clear the updated keys for this field since it's now saved
      setUpdatedValueKeys((prev) => {
        const newKeys = { ...prev };
        if (newKeys[settingsOption]) {
          newKeys[settingsOption] = newKeys[settingsOption].filter(key => key !== id);
          if (newKeys[settingsOption].length === 0) {
            delete newKeys[settingsOption];
          }
        }
        return newKeys;
      });

      // Show custom message with integration name
      const message = integrationLabel
        ? sprintf(
            __("%s %s", "mtphr-settings"),
            integrationLabel,
            isEnabled ? __("enabled", "mtphr-settings") : __("disabled", "mtphr-settings")
          )
        : __("Integration settings saved!", "mtphr-settings");

      dispatch("core/notices").createNotice(
        "success",
        message,
        { type: "snackbar" }
      );
    } catch (error) {
      // Revert the local state change on error
      setValues((prev) => ({
        ...prev,
        [settingsOption]: {
          ...prev[settingsOption],
          [id]: previousValue,
        },
      }));
      
      dispatch("core/notices").createNotice(
        "error",
        `${__("Error saving integration settings.", "mtphr-settings")} ${error.message}`,
        { type: "snackbar" }
      );
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Sends updated settings to the REST API and handles UI feedback.
   *
   * @returns {Promise<void>}
   */
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const res = await fetch(`${settingVars.restUrl}settings`, {
        method: "POST",
        headers: {
          "X-WP-Nonce": settingVars.nonce,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ valueKeys: updatedValueKeys, values }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || `HTTP Error ${res.status}`);
      }

      const data = await res.json();
      setValues(data);
      setNotice({
        status: "success",
        message: __("Settings saved successfully!", "mtphr-settings"),
      });

      dispatch("core/notices").createNotice(
        "success",
        __("Your settings have been saved!", "mtphr-settings"),
        { type: "snackbar" }
      );
    } catch (error) {
      setNotice({
        status: "error",
        message: `${__("Error saving settings.", "mtphr-settings")} ${
          error.message
        }`,
      });
    } finally {
      setIsSaving(false);
    }
  };

  /**
   * Renders a local dismissible Notice inside a SlotFill container.
   *
   * @returns {JSX.Element|null}
   */
  const Notification = () =>
    notice ? (
      <Fill>
        <Notice
          status={notice.status}
          onRemove={() => setNotice(null)}
          isDismissible
        >
          {notice.message}
        </Notice>
      </Fill>
    ) : null;

  /**
   * Renders the header icon based on its type (URL, dashicon, or WordPress icon).
   *
   * @param {string} icon - Icon identifier (URL, dashicon class, or WordPress icon name)
   * @param {string} alt - Alt text for the icon
   * @returns {JSX.Element|null}
   */
  const renderHeaderIcon = (icon, alt) => {
    if (!icon) return null;

    // Check if it's a URL (http:// or https://)
    if (icon.startsWith('http://') || icon.startsWith('https://')) {
      return (
        <img
          src={icon}
          alt={alt}
          style={{ maxWidth: '48px', maxHeight: '48px', width: 'auto', height: 'auto' }}
        />
      );
    }

    // Check if it's a dashicon (starts with "dashicons-")
    if (icon.startsWith('dashicons-')) {
      return (
        <span
          className={`dashicons ${icon}`}
          style={{ fontSize: '48px', width: '48px', height: '48px', lineHeight: '48px' }}
          aria-label={alt}
        />
      );
    }

    // Otherwise, try to use it as a WordPress icon
    // WordPress icons are exported as named exports, so we try to get it from wpIcons
    const IconComponent = wpIcons[icon];
    if (IconComponent) {
      return (
        <Icon
          icon={IconComponent}
          size={48}
          style={{ width: '48px', height: '48px' }}
        />
      );
    }

    // If not found, return null
    return null;
  };

  /**
   * Validates all fields for duplicate IDs.
   * Recursively checks main fields, sidebar items, and all nested fields (groups, tabs, buttons, etc.).
   *
   * @returns {Array<{id: string, contexts: string[], count: number}>} - Array of duplicate ID errors
   */
  const validateFieldIds = useMemo(() => {
    const idCounts = new Map();
    const idContexts = new Map();

    /**
     * Recursively collect all IDs from fields and nested structures
     * @param {Array} items - Fields or items to validate
     * @param {string} context - Context path for error messages
     */
    const collectIds = (items, context = "") => {
      if (!Array.isArray(items)) return;

      items.forEach((item, index) => {
        if (item.id) {
          if (!idCounts.has(item.id)) {
            idCounts.set(item.id, 0);
            idContexts.set(item.id, []);
          }
          idCounts.set(item.id, idCounts.get(item.id) + 1);
          idContexts.get(item.id).push(context || "root");
        }

        // Recursively check nested group fields
        if (item.type === "group" && Array.isArray(item.fields)) {
          const groupContext = context 
            ? `${context} > group '${item.id || `#${index}`}'`
            : `group '${item.id || `#${index}`}'`;
          collectIds(item.fields, groupContext);
        }

        // Recursively check nested tab fields
        if (item.type === "tabs" && Array.isArray(item.tabs)) {
          item.tabs.forEach((tab, tabIndex) => {
            if (Array.isArray(tab.fields)) {
              const tabContext = context
                ? `${context} > tabs '${item.id || `#${index}`}' > tab '${tab.id || tab.label || `#${tabIndex}`}'`
                : `tabs '${item.id || `#${index}`}' > tab '${tab.id || tab.label || `#${tabIndex}`}'`;
              collectIds(tab.fields, tabContext);
            }
          });
        }

        // Recursively check nested button fields
        if (item.type === "buttons" && Array.isArray(item.buttons)) {
          item.buttons.forEach((button, buttonIndex) => {
            if (button.id) {
              const buttonContext = context
                ? `${context} > buttons '${item.id || `#${index}`}' > button '${button.id}'`
                : `buttons '${item.id || `#${index}`}' > button '${button.id}'`;
              if (!idCounts.has(button.id)) {
                idCounts.set(button.id, 0);
                idContexts.set(button.id, []);
              }
              idCounts.set(button.id, idCounts.get(button.id) + 1);
              idContexts.get(button.id).push(buttonContext);
            }
          });
        }
      });
    };

    // Validate main fields by section
    sections.forEach((section) => {
      const sectionContext = `section '${section.label || section.id}'`;
      collectIds(section.fields, sectionContext);
    });

    // Validate sidebar items
    if (Array.isArray(sidebarItems) && sidebarItems.length > 0) {
      collectIds(sidebarItems, "sidebar");
    }

    // Find duplicates
    const duplicates = [];
    idCounts.forEach((count, id) => {
      if (count > 1) {
        duplicates.push({
          id,
          count,
          contexts: idContexts.get(id),
        });
      }
    });

    return duplicates;
  }, [sections, sidebarItems]);

  /**
   * Renders the sidebar with sidebar items.
   *
   * @returns {JSX.Element|null}
   */
  const Sidebar = () => {
    if (!sidebarItems || sidebarItems.length === 0) {
      return null;
    }

    return (
      <div className="mtphrSettings__sidebar" style={{ width: sidebarWidth }}>
        {sidebarItems.map((item, i) => {
          // Sidebar items don't need values/onChange since they're display-only
          // But we still use the Field component for consistency
          return (
            <Field
              key={`sidebar-${i}-${item.id || 'item'}`}
              field={item}
              value={item.std || ""}
              onChange={() => {}} // No-op for sidebar items
              values={{}}
              settingsOption={""}
              settingsId={settingsId}
              sections={[]}
            />
          );
        })}
      </div>
    );
  };

  return (
    <SlotFillProvider>
      <div className="mtphrSettings__container">
        <div className="mtphrSettings__main" style={{ maxWidth: mainMaxWidth }}>
          <Card
            isRounded={false}
            className={`mtphrSettings ${settingsId}`}
            style={{ position: "relative" }}
          >
        <CardHeader>
          <div className="mtphrSettings__header">
            {headerIcon && (
              <div className="mtphrSettings__header-icon">
                {renderHeaderIcon(headerIcon, settingsTitle ? he.decode(settingsTitle) : settingsTitle)}
              </div>
            )}
            <div className="mtphrSettings__header-content">
              <Heading className="mtphrSettings__header-title" style={{ padding: 0 }} level={1}>{settingsTitle ? he.decode(settingsTitle) : settingsTitle}</Heading>
              {headerDescription && (
                <p className="mtphrSettings__header-description">
                  {he.decode(headerDescription)}
                </p>
              )}
            </div>
            {headerVersion && (
              <div className="mtphrSettings__header-version">
                <span className="mtphrSettings__version-badge">
                  {he.decode(headerVersion)}
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        {/* Toolbar Slot for top-level controls */}
        <div className="toolbar">
          <Slot />
        </div>

        {/* Settings Form Body */}
        <CardBody className="mtphrSettings__form">
          {validateFieldIds.length > 0 && (
            <Notice
              status="error"
              isDismissible={false}
              className="mtphrSettings__validation-error"
              style={{ marginBottom: "16px" }}
            >
              <strong>{__("Duplicate Field ID Error", "mtphr-settings")}</strong>
              <br />
              {__("The following field IDs are used multiple times:", "mtphr-settings")}
              <ul style={{ margin: "8px 0 0 0", paddingLeft: "20px" }}>
                {validateFieldIds.map((duplicate) => (
                  <li key={duplicate.id}>
                    <code>{duplicate.id}</code> {__("appears", "mtphr-settings")} {duplicate.count} {__("time(s)", "mtphr-settings")}
                    {duplicate.contexts.length > 0 && (
                      <span> ({duplicate.contexts.join(", ")})</span>
                    )}
                  </li>
                ))}
              </ul>
              <p style={{ margin: "8px 0 0 0", fontSize: "13px" }}>
                {__("Each field must have a unique ID. Please update your settings configuration to use unique IDs for all fields.", "mtphr-settings")}
              </p>
            </Notice>
          )}
          <TabPanel
            className="mtphrSettings__tabs"
            activeClass="is-active"
            tabs={tabs}
            initialTabName={activeTab}
            onSelect={setActiveTab}
          >
            {(tab) => {
              const currentSection = primarySections.find(
                (section) => section.id === tab.id
              );
              if (!currentSection) return null;

              return (
                <div
                  className="mtphrSettings__section"
                  key={`tab-panel-${tab.id}`}
                >
                  {currentSection.fields.map((field, i) => {
                    const { option, id } = field;
                    if (!shouldRenderField(field, values[option])) return null;

                    return (
                      <Field
                        key={`${option}-${id || i}`}
                        field={field}
                        value={values[option][id] || ""}
                        onChange={field.type === "integrations" ? handleAutoSave : handleInputChange}
                        onSettingsChange={field.type === "integrations" ? handleInputChange : undefined}
                        values={values[option]}
                        settingsOption={option}
                        settingsId={settingsId}
                        sections={secondarySections}
                        onSave={field.type === "integrations" ? createIntegrationSaveHandler(option) : undefined}
                        isSaving={isSaving}
                      />
                    );
                  })}
                </div>
              );
            }}
          </TabPanel>
        </CardBody>

        {/* Save Button */}
        <CardFooter className="mtphrSettings__footer">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            variant="primary"
            isBusy={isSaving}
          >
            {isSaving
              ? __("Saving…", "mtphr-settings")
              : __("Save Settings", "mtphr-settings")}
          </Button>
        </CardFooter>

        {/* Local notice + global snackbar notices */}
        <Notification />
        <SnackbarList
          notices={notices.filter((notice) => notice.type === "snackbar")}
          onRemove={removeNotice}
        />
      </Card>
        </div>
        <Sidebar />
      </div>
    </SlotFillProvider>
  );
};
