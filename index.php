<?php
use Mtphr\Settings;

require_once __DIR__ . '/settings-class.php';

/**
 * Get things started
 * Add a custom function name for your settings to differentiate from other settings
 */
function MTPHR_SETTINGS() {
	return Settings::instance();
}
MTPHR_SETTINGS();

// Initialize the settings
// MTPHR_SETTINGS()->init( [
//   'id' => 'mtphrSettings',
//   'textdomain' => 'mtphr-settings',
//   'settings_dir' => MTPHR_EMAILCUSTOMIZER_DIR . 'includes/mtphr-settings',
//   'settings_url' => MTPHR_EMAILCUSTOMIZER_URL . 'includes/mtphr-settings',
// ] );

function mtphr_settings_init( $data ) {
  $vendor_dir = isset( $data['vendor_dir'] ) ? trailingslashit( $data['vendor_dir'] ) : '';
  $vendor_url = isset( $data['vendor_url'] ) ? trailingslashit( $data['vendor_url'] ) : '';
  $settings_dir = isset( $data['settings_dir'] ) ? trailingslashit( $data['settings_dir'] ) : false;
  $settings_url = isset( $data['settings_url'] ) ? trailingslashit( $data['settings_url'] ) : false;
  
  MTPHR_SETTINGS()->init( [
    'id' => 'mtphrSettings',
    'textdomain' => 'mtphr-settings',
    'settings_dir' => $settings_dir ? $settings_dir : $vendor_dir . 'meta4creations/mtphr-settings',
    'settings_url' => $settings_url ? $settings_url : $vendor_url . 'meta4creations/mtphr-settings',
  ] );
}

function mtphr_settings_add_admin_page( $data ) {
  MTPHR_SETTINGS()->add_admin_page( $data );
}

function mtphr_settings_add_section( $data ) {
  MTPHR_SETTINGS()->add_section( $data );
}

function mtphr_settings_add_default_values( $option, $data ) {
  MTPHR_SETTINGS()->add_default_values( $option, $data );
}

function mtphr_settings_add_sanitize_settings( $option, $data ) {
  MTPHR_SETTINGS()->add_default_values( $option, $data );
}

function mtphr_settings_add_fields( $data ) {
  MTPHR_SETTINGS()->add_fields( $data );
}

function mtphr_settings_get_option_value( $option, $key = false ) {
  if ( $values = MTPHR_SETTINGS()->get_option_values( $option ) ) {
    if ( $key ) {
      if ( isset( $values[$key] ) ) {
        return $values[$key];
      }
    } else {
      return $values;
    }
  }
}

function mtphr_settings_set_option_value( $option, $key, $value = false ) {
  if ( is_array( $key ) ) {
    $updated_values = $key;
  } else {
    $updated_values = [
      $key => $value,
    ];
  };

  $values = MTPHR_SETTINGS()->update_values( $option, $updated_values );
  return $values;
}