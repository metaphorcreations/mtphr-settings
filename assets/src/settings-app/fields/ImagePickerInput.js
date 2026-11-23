import he from 'he';
import { useState, useRef } from '@wordpress/element';
import { Button, BaseControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * ImagePickerInput — a single-image field that offers both a WordPress
 * media-library picker and a plain URL text input. The stored value is a
 * simple string URL.
 *
 * Field config options:
 *   label       string   Field label.
 *   help        string   Helper text shown below the field.
 *   placeholder string   Placeholder text for the URL input.
 *   button_text string   Label for the media-library button.
 *   id          string   Field identifier passed to onChange.
 */
const ImagePickerInput = ({ field, value, settingsOption, onChange }) => {
  const { id, label, help, placeholder, button_text } = field;
  const url = typeof value === 'string' ? value : '';
  const [inputVal, setInputVal] = useState(url);
  const inputRef = useRef(null);

  const mediaAvailable = typeof window !== 'undefined' && window.wp && window.wp.media;

  const openMediaFrame = () => {
    if (!mediaAvailable) return;
    const frame = window.wp.media({
      title: __('Select Image', 'mtphr-settings'),
      multiple: false,
      library: { type: 'image' },
      button: { text: __('Use this image', 'mtphr-settings') },
    });
    frame.on('select', () => {
      const att = frame.state().get('selection').first().toJSON();
      const selected = att.sizes?.large?.url || att.sizes?.medium?.url || att.url || '';
      setInputVal(selected);
      onChange({ id, value: selected, settingsOption });
    });
    frame.open();
  };

  const handleUrlChange = (e) => {
    const next = e.target.value;
    setInputVal(next);
    onChange({ id, value: next, settingsOption });
  };

  const handleClear = () => {
    setInputVal('');
    onChange({ id, value: '', settingsOption });
    inputRef.current?.focus();
  };

  const decodedLabel = label ? he.decode(label) : '';
  const decodedHelp = help ? he.decode(help) : '';

  return (
    <BaseControl label={decodedLabel} help={decodedHelp} __nextHasNoMarginBottom>
      <div className="mtphrSettings__image-picker">
        {/* Thumbnail + remove when an image is set */}
        {inputVal && (
          <div className="mtphrSettings__image-picker__preview">
            <img src={inputVal} alt="" className="mtphrSettings__image-picker__thumb" />
            <button
              type="button"
              className="mtphrSettings__image-picker__remove"
              onClick={handleClear}
              aria-label={__('Remove image', 'mtphr-settings')}
            >
              ×
            </button>
          </div>
        )}

        {/* URL input row: text field + optional media button */}
        <div className="mtphrSettings__image-picker__row">
          <input
            ref={inputRef}
            type="url"
            className="mtphrSettings__image-picker__url-input"
            value={inputVal}
            placeholder={placeholder || 'https://…'}
            onChange={handleUrlChange}
          />
          {mediaAvailable && (
            <Button variant="secondary" onClick={openMediaFrame}>
              {button_text || __('Select', 'mtphr-settings')}
            </Button>
          )}
        </div>
      </div>
    </BaseControl>
  );
};

export default ImagePickerInput;
