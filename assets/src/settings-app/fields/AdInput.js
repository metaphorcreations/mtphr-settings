import he from "he";
import { BaseControl, useBaseControlProps } from "@wordpress/components";

/**
 * AdInput - Display-only field for showing ad images with tracked links
 * 
 * Automatically appends tracking parameters to the link URL:
 * - ref: field.trackingRef (identifies the plugin/source, passed from PHP)
 * - ad_id: field.id (identifies the specific ad)
 * 
 * @param {Object} props
 * @param {Object} props.field - Field configuration
 * @param {string} props.field.image - Image URL to display
 * @param {string} props.field.link - Destination URL (tracking params will be appended)
 * @param {string} props.field.id - Ad identifier (used for tracking)
 * @param {string} props.field.trackingRef - Reference identifier for tracking (passed from PHP)
 * @param {string} [props.field.alt] - Alt text for image (optional, defaults to label or "Advertisement")
 * @param {string} [props.field.label] - Optional label to display above ad
 * @param {string} [props.field.help] - Optional help text to display below ad
 * @param {string} [props.field.class] - Optional CSS class
 * @param {string} props.settingsId - Settings instance identifier (fallback if trackingRef not provided)
 * @returns {JSX.Element}
 */
const AdInput = ({ field, settingsId }) => {
  const { image, link, id, trackingRef, alt, class: className } = field;

  /**
   * Builds a tracked URL by appending tracking parameters
   * Preserves existing query parameters if present
   * 
   * @param {string} baseUrl - Original URL
   * @param {string} refValue - Reference identifier (from field.trackingRef or fallback to settingsId)
   * @param {string} adId - Ad identifier
   * @returns {string} URL with tracking parameters
   */
  const buildTrackedUrl = (baseUrl, refValue, adId) => {
    try {
      const url = new URL(baseUrl);
      url.searchParams.append('ref', refValue);
      url.searchParams.append('ad_id', adId);
      return url.toString();
    } catch (error) {
      // If URL parsing fails, return original URL
      console.error('AdInput: Invalid URL provided:', baseUrl);
      return baseUrl;
    }
  };

  // Use field.trackingRef if provided, otherwise fallback to settingsId
  const refValue = trackingRef || settingsId;

  // Build the tracked URL
  const trackedUrl = buildTrackedUrl(link, refValue, id);

  // Determine alt text: use field.alt, or fallback to decoded label, or "Advertisement"
  const imageAlt = alt 
    ? he.decode(alt) 
    : (field.label ? he.decode(field.label) : "Advertisement");

  const { baseControlProps } = useBaseControlProps({
    ...field,
    label: field.label ? he.decode(field.label) : field.label,
    help: field.help ? he.decode(field.help) : field.help,
  });

  return (
    <BaseControl {...baseControlProps} __nextHasNoMarginBottom>
      <div className={className} style={{ display: 'block', lineHeight: 0 }}>
        <a 
          href={trackedUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ display: 'inline-block' }}
        >
          <img 
            src={image} 
            alt={imageAlt}
            style={{ 
              maxWidth: '100%', 
              height: 'auto',
              display: 'block'
            }}
          />
        </a>
      </div>
    </BaseControl>
  );
};

export default AdInput;

