import he from "he";
import { useState } from "@wordpress/element";
import { BaseControl, useBaseControlProps, Button } from "@wordpress/components";

const defaultIcons = {
  success: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.41 15.06l-4.24-4.24 1.41-1.41 2.83 2.83 6.36-6.36 1.41 1.41-7.77 7.77z" />
    </svg>
  ),
  error: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z" />
    </svg>
  ),
  warning: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
    </svg>
  ),
  info: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
    </svg>
  ),
};

const typePresets = {
  success: {
    backgroundColor: "#f0faf0",
    borderColor: "#46b450",
    textColor: "#1e4620",
    iconColor: "#46b450",
  },
  error: {
    backgroundColor: "#fef0f0",
    borderColor: "#dc3232",
    textColor: "#8b1a1a",
    iconColor: "#dc3232",
  },
  warning: {
    backgroundColor: "#fef8ee",
    borderColor: "#dba617",
    textColor: "#6e4e00",
    iconColor: "#dba617",
  },
  info: {
    backgroundColor: "#f0f6fc",
    borderColor: "#2271b1",
    textColor: "#1d3557",
    iconColor: "#2271b1",
  },
};

/**
 * NotificationField - Display-only field for showing color-coded notifications
 *
 * @param {Object} props
 * @param {Object} props.field - Field configuration
 * @param {string} [props.field.notificationType='info'] - Notification type: success, error, warning, info
 * @param {string} [props.field.message] - Notification message text (supports HTML via dangerouslySetInnerHTML)
 * @param {string} [props.field.label] - Optional title displayed above the message
 * @param {string} [props.field.help] - Optional help text below the notification
 * @param {boolean} [props.field.isDismissible=false] - Whether the notification can be dismissed
 * @param {boolean} [props.field.showIcon=true] - Whether to show the icon
 * @param {string} [props.field.icon] - Dashicon class name to override the default icon (e.g. 'dashicons-admin-generic')
 * @param {string} [props.field.backgroundColor] - Override background color
 * @param {string} [props.field.borderColor] - Override border/highlight color
 * @param {string} [props.field.textColor] - Override text color
 * @param {string} [props.field.iconColor] - Override icon color
 */
const NotificationField = ({ field }) => {
  const [dismissed, setDismissed] = useState(false);

  const {
    notificationType = "info",
    message,
    isDismissible = false,
    showIcon = true,
    icon,
  } = field;

  const preset = typePresets[notificationType] || typePresets.info;

  const backgroundColor = field.backgroundColor || preset.backgroundColor;
  const borderColor = field.borderColor || preset.borderColor;
  const textColor = field.textColor || preset.textColor;
  const iconColor = field.iconColor || preset.iconColor;

  const { baseControlProps } = useBaseControlProps({
    ...field,
    label: null,
    help: field.help ? he.decode(field.help) : field.help,
  });

  if (dismissed) {
    return null;
  }

  const renderIcon = () => {
    if (!showIcon) return null;

    if (icon) {
      return (
        <span
          className={`mtphrSettings__notification-icon dashicons ${icon}`}
          style={{ color: iconColor, fontSize: "24px", width: "24px", height: "24px" }}
        />
      );
    }

    return (
      <span className="mtphrSettings__notification-icon" style={{ color: iconColor }}>
        {defaultIcons[notificationType] || defaultIcons.info}
      </span>
    );
  };

  return (
    <BaseControl {...baseControlProps} __nextHasNoMarginBottom>
      <div
        className={`mtphrSettings__notification mtphrSettings__notification--${notificationType}`}
        style={{
          backgroundColor,
          borderLeft: `4px solid ${borderColor}`,
          color: textColor,
        }}
      >
        <div className="mtphrSettings__notification-body">
          {renderIcon()}
          <div className="mtphrSettings__notification-content">
            {field.label && (
              <div className="mtphrSettings__notification-title">
                {he.decode(field.label)}
              </div>
            )}
            {message && (
              <div
                className="mtphrSettings__notification-message"
                dangerouslySetInnerHTML={{ __html: message }}
              />
            )}
          </div>
        </div>
        {isDismissible && (
          <Button
            className="mtphrSettings__notification-dismiss"
            icon="no-alt"
            onClick={() => setDismissed(true)}
            label="Dismiss"
            isSmall
          />
        )}
      </div>
    </BaseControl>
  );
};

export default NotificationField;
