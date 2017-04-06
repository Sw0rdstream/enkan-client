import {settingsActionShow,settingsActionHide, showInitialRequest, showErrorList, loadAppList } from '../redux'
import ReduxService from '../global/ReduxService';
import SettingsService from '../services/SettingsService';
import AppListService from '../services/AppListService';
class SettingsController{
  resolveUpdateSettings(){
    ReduxService.dispatch(settingsActionHide());
    ReduxService.dispatch(showInitialRequest());
    AppListService.loadAppList().then((resJson) => {
      ReduxService.dispatch(loadAppList(resJson));
    }).catch(()=>{
      ReduxService.dispatch(showErrorList());
    });
  }
}
export default new SettingsController();
