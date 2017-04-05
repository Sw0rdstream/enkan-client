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
    Settings.set(SettingsService.SETTINGS_DICT_DOMAIN, settingsPOJO.serverDomain);
    Settings.set(SettingsService.SETTINGS_DICT_ENABLEPUSH, settingsPOJO.enablePush);
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
}

const singletonService = new SettingsService();
export default singletonService;
