import { __ } from "@wordpress/i18n";
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

  /** @type {[{ status: string, message: string } | null, Function]} */
  const [notice, setNotice] = useState(null);

  const { fields, field_sections: fieldSections } = settingVars;

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
      title: section.label,
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

  return (
    <SlotFillProvider>
      <Card
        isRounded={false}
        className={`mtphrSettings ${settingsId}`}
        style={{ position: "relative" }}
      >
        <CardHeader>
          <Heading level={1}>{settingsTitle}</Heading>
        </CardHeader>

        {/* Toolbar Slot for top-level controls */}
        <div className="toolbar">
          <Slot />
        </div>

        {/* Settings Form Body */}
        <CardBody className="mtphrSettings__form">
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
                        key={id || i}
                        field={field}
                        value={values[option][id] || ""}
                        onChange={handleInputChange}
                        values={values[option]}
                        settingsOption={option}
                        settingsId={settingsId}
                        sections={secondarySections}
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
    </SlotFillProvider>
  );
};
