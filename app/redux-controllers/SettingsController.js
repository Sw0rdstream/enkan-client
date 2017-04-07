import {settingsActionShow,settingsActionUpdate, showInitialRequest, showErrorList, loadAppList } from '../redux'
import ReduxService from '../global/ReduxService';
import SettingsService from '../services/SettingsService';
import AppListService from '../services/AppListService';
class SettingsController{
  resolveUpdateSettings(settingsPojo){
    ReduxService.dispatch(settingsActionUpdate(settingsPojo));
    ReduxService.dispatch(showInitialRequest());
    SettingsService.updateSettings(settingsPojo).then(()=>{
      AppListService.loadAppList().then((resJson) => {
        ReduxService.dispatch(loadAppList(resJson));
      }).catch(()=>{
        ReduxService.dispatch(showErrorList());
      });
    }).catch(()=>{
      alert('Please enable storage access for SanadaMaru')
    });

  }
}
export default new SettingsController();
