import {settingsActionShow,settingsActionHide, startPullList } from '../redux'
import ReduxService from '../global/ReduxService';
import SettingsService from '../services/SettingsService';
import {Linking} from 'react-native';
class AppListService {
  LOAD_REJECT_NOSETTING = 0;
  loadAppList(){
    const currentSettings = SettingsService.getCurrentSettings();
    if(currentSettings && currentSettings.serverDomain){
      const serverUrl = 'https://' + currentSettings.serverDomain + '/api/apps/list/ios';
      return fetch(serverUrl).then((response) => response.json());
    }
    else{
      return new Promise((resolve, reject) => {
        reject(this.LOAD_REJECT_NOSETTING);
      });
    }
  }

  downloadApp(bundleId){
    const currentSettings = SettingsService.getCurrentSettings();
    if(currentSettings && currentSettings.serverDomain){
      const serverUrl = 'https://' + currentSettings.serverDomain + '/api/apps/'+ bundleId +'/ios';
      try{
        //catch this call because it will return exception always
        Linking.openURL('itms-services://?action=download-manifest&url=' + serverUrl)
        .catch(function(ex){
          console.log(ex);
        });
      }
      catch(ex){
      }
    }
  }
}

export default new AppListService();
