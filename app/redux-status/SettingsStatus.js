import SettingsPOJO from '../pojos/SettingsPOJO';
export default class SettingsStatus {

  /**
   * the dialog is displayed or not
   * @type {Boolean}
   */
  display = false;

  /**
   * settings
   * @type {SettingsPOJO}
   */
  settingsPojo = new SettingsPOJO();

  constructor(state){
    if(state){
      Object.assign(this, state);
    }
  }
}
