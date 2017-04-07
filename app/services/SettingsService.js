import {AsyncStorage} from 'react-native';
import SettingsPOJO from '../pojos/SettingsPOJO';

class SettingsService {

  currentSettings = null;
  static STORAGE_DICT_SETTINGS = 'SettingsService.Settings';

  dispatch = null;

  getCurrentSettings(){
    return this.currentSettings;
  }

  updateSettings(settingsPOJO){
    return new Promise(((resolve, reject) => {
      AsyncStorage.setItem(SettingsService.STORAGE_DICT_SETTINGS, JSON.stringify(settingsPOJO), ((err) => {
        if(err){
          reject(err);
        }
        else{
          this.currentSettings = settingsPOJO;
          resolve();
        }
      }).bind(this))
    }).bind(this));
  }

  reloadSettings(){
    return new Promise(((resolve, reject) => {
      AsyncStorage.getItem(SettingsService.STORAGE_DICT_SETTINGS,((err,val)=>{
        if(err){
          reject(err, val);
        }
        else{
          if(val){
            try{
              this.currentSettings = new SettingsPOJO(JSON.parse(val));
            }
            catch(ex){
              alert('Data is corrupted, please reset');
              this.currentSettings = null;
            }
          }
          else{
            this.currentSettings = null;
          }
          resolve(this.currentSettings);
        }
      }).bind(this));
    }).bind(this));
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
