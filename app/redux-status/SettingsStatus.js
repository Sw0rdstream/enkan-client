export default class SettingsStatus {
  /**
   * domain
   * @type {String}
   */
  serverDomain = "";

  /**
   * enable push for updates
   * @type {Boolean}
   */
  enablePush = false;

  /**
   * the dialog is displayed or not
   * @type {Boolean}
   */
  display = false;

  static STATUS_FORM_DONE = 0;
  static STATUS_FORM_SUBMITTING = 1;
  formStatus = SettingsStatus.STATUS_FORM_DONE;

  static currentSetting = null;
}
