import {Settings} from 'react-native';
import SettingsPOJO from '../pojos/SettingsPOJO';

class SettingsService {

  currentSettings = null;
  static SETTINGS_DICT_DOMAIN = 'Settings.Domain';
  static SETTINGS_DICT_ENABLEPUSH = 'Settings.EnablePush';

  dispatch = null;

  getCurrentSettings(){
    if(this.currentSettings == null){
      this.reloadSettings();
    }
    return this.currentSettings;
  }

  updateSettings(settingsPOJO){
    let settingObj = {};
    settingObj[SettingsService.SETTINGS_DICT_DOMAIN] = settingsPOJO.serverDomain;
    settingObj[SettingsService.SETTINGS_DICT_ENABLEPUSH] = settingsPOJO.enablePush;
    Settings.set(settingObj);
    this.reloadSettings();
  }

  reloadSettings(){
    const currentDomain = Settings.get(SettingsService.SETTINGS_DICT_DOMAIN);
    const currentEnablePush = Settings.get(SettingsService.SETTINGS_DICT_ENABLEPUSH);
    if(currentDomain && currentDomain.length > 0){
      this.currentSettings = new SettingsService();
      this.currentSettings.serverDomain = currentDomain;
      this.currentSettings.enablePush = currentEnablePush;
    }
    else{
      this.currentSettings = null;
    }
    return this.currentSettings;
  }

  /**
   * Check if the domain works
   * @return {Promise}
   */
  validateSettings(settingsPOJO){
    if(settingsPOJO && settingsPOJO.serverDomain){
      return fetch('https://' + settingsPOJO.serverDomain + '/api/hello');
    }
    else{
      return new Promise((resolve, reject) => {
        reject('server domain cannot be null');
      });
    }
  }
}

const singletonService = new SettingsService();
export default singletonService;
