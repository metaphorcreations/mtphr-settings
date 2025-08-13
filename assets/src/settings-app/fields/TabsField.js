import { TabPanel } from "@wordpress/components";
import { useEffect, useState } from "@wordpress/element";
import Field from "./Field";
import { shouldRenderField } from "../utils/fieldVisibility";

const TabsField = ({ field, onChange, values, settingsOption, settingsId }) => {
  const { tabs } = field;

  // Only show enabled tabs
  const enabledTabs = tabs.reduce((enabled, tab) => {
    if (shouldRenderField(tab, values)) {
      enabled.push(tab);
    }
    return enabled;
  }, []);

  // Get the initial tab from the URL or default to the first tab
  const params = new URLSearchParams(window.location.search);
  const initialSubTab =
    params.get(field.id) || field.init_tab || enabledTabs[0].id;

  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);

  useEffect(() => {
    // Update the URL when the activeSubTab changes
    const params = new URLSearchParams(window.location.search);
    params.set(field.id, activeSubTab); // Append the sub-tab field ID to the URL

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);

    // Cleanup function to remove the sub-tab query variable when the component is unmounted
    return () => {
      const cleanupParams = new URLSearchParams(window.location.search);
      cleanupParams.delete(field.id); // Remove the sub-tab query variable

      const cleanupUrl = `${
        window.location.pathname
      }?${cleanupParams.toString()}`;
      window.history.replaceState(null, "", cleanupUrl);
    };
  }, [activeSubTab, field.id]);

  return (
    <div className={`mtphrSettings__field--tabs__wrapper`}>
      <TabPanel
        activeClass="is-active"
        tabs={enabledTabs.map(({ id, label }) => ({
          name: id,
          title: label,
        }))}
        initialTabName={initialSubTab}
        onSelect={(tabName) => setActiveSubTab(tabName)}
      >
        {(tab) => {
          const currentTab = enabledTabs.find(({ id }) => id === tab.name);

          return (
            <div
              className={`mtphrSettings__field--tabs__content mtphrSettings__field--tabs__content--${tab.name}`}
            >
              {currentTab.fields.map((tabField, index) => {
                if (!shouldRenderField(tabField, values)) return null; // Don't render if conditions fail

                return (
                  <Field
                    key={tabField.id ? tabField.id : index}
                    field={tabField}
                    value={values[tabField.id] || ""}
                    onChange={onChange}
                    values={values}
                    settingsOption={settingsOption}
                    settingsId={settingsId}
                  />
                );
              })}
            </div>
          );
        }}
      </TabPanel>
    </div>
  );
};

export default TabsField;
