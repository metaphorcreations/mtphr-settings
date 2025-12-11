import he from "he";
import classNames from "classnames";

import {
  Card,
  CardHeader,
  CardBody,
  Notice,
  __experimentalHeading as Heading,
} from "@wordpress/components";

const { getComponent } = window.mtphrSettingsRegistry || {};

const Field = ({
  field,
  value,
  onChange,
  values,
  settingsOption,
  settingsId,
  sections,
}) => {
  // Apply default container settings for ad fields if not explicitly set
  const containerDefaults = field.type === 'ad' 
    ? { padding: '0', isBorderless: true }
    : {};
  
  // Merge defaults with provided container settings (provided settings take precedence)
  const container = field.container 
    ? { ...containerDefaults, ...field.container }
    : containerDefaults;
  
  const { isBorderless, padding, background, backgroundColor } = container;
  const { inline } = field;

  const Component = getComponent(field.type);

  if (!Component) {
    console.error(`No component registered for field type '${field.type}'`);
    return (
      <Notice status="error" isDismissible={false}>
        Unknown field type: {field.type}
      </Notice>
    );
  }

  const CardClassName = classNames(
    "mtphrSettings__field",
    `mtphrSettings__field--${field.type}`,
    field.class,
    { "mtphrSettings__field--inline": inline }
  );

  // Build Card style object, including background color if provided
  const cardStyle = {
    flex: 1,
    ...(background || backgroundColor ? { backgroundColor: background || backgroundColor } : {})
  };

  return (
    <Card
      className={CardClassName}
      isRounded={false}
      size="small"
      isBorderless={isBorderless}
      style={cardStyle}
    >
      {field.type === "group" && field.label && (
        <CardHeader className={`$mtphrSettings__field__heading`}>
          <Heading level={4}>{he.decode(field.label)}</Heading>
        </CardHeader>
      )}
      <CardBody
        className={`mtphrSettings__field__input-wrapper`}
        style={{ padding }}
      >
        <Component
          field={field}
          value={value}
          onChange={onChange}
          values={values}
          settingsOption={settingsOption}
          settingsId={settingsId}
          sections={sections}
        />
      </CardBody>
    </Card>
  );
};

export default Field;
