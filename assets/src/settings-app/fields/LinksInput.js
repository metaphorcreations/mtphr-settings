import he from "he";
import { __ } from "@wordpress/i18n";
import { BaseControl, useBaseControlProps } from "@wordpress/components";

const LinksInput = ({ field, value }) => {
  const { baseControlProps } = useBaseControlProps({
    ...field,
    label: field.label ? he.decode(field.label) : field.label,
    help: field.help ? he.decode(field.help) : field.help,
  });

  // Extract links array - check field configuration first, then value prop
  // This supports both sidebar items (links in field config) and saved settings (links in value)
  let links = [];
  
  // First, check if links are defined in the field configuration
  if (field.links && Array.isArray(field.links)) {
    links = field.links;
  }
  // Otherwise, check the value prop (for saved settings)
  else if (value && typeof value === "object") {
    if (Array.isArray(value)) {
      links = value;
    } else if (value.links && Array.isArray(value.links)) {
      links = value.links;
    }
  }

  // Filter out links without URLs
  const validLinks = links.filter((link) => link && link.url);

  return (
    <BaseControl {...baseControlProps} __nextHasNoMarginBottom>
      {validLinks.length > 0 ? (
        <ul className="mtphrSettings__links" style={{margin: 0}}>
          {validLinks.map((link, index) => {
            const url = link.url;
            const label = link.label || url;
            const target = link.target || "_blank";

            return (
              <li key={index} className="mtphrSettings__links-item">
                <a
                  href={url}
                  target={target}
                  rel={target === "_blank" ? "noopener noreferrer" : undefined}
                >
                  {he.decode(label)}
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="mtphrSettings__links-empty">
          {__("No links available.", "mtphr-settings")}
        </p>
      )}
    </BaseControl>
  );
};

export default LinksInput;

