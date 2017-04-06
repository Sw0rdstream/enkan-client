import AppListStatus from './redux-status/AppListStatus';
import SettingsStatus from './redux-status/SettingsStatus';
const NAV_PUSH = 'NAV_PUSH';
const NAV_POP = 'NAV_POP';


////
//// App List State Reducer
////
const initAppListState = new AppListStatus();
const LIST_ACTION_INITAL_REQUEST = 'LIST_ACTION_INITAL_REQUEST';
const LIST_ACTION_REQUEST_PULL = 'LIST_ACTION_REQUEST_PULL';
const LIST_ACTION_RESOLVE = 'LIST_ACTION_RESOLVE';
const LIST_ACTION_DOWNLOAD = 'LIST_ACTION_DOWNLOAD';
const LIST_ACTION_DOWNLOAD_RESOLVE = 'LIST_ACTION_DOWNLOAD_RESOLVE';
const LIST_ACTION_SETTING_DONE = 'LIST_ACTION_SETTING_DONE';
const LIST_ACTION_ERROR = 'LIST_ACTION_ERROR';

export function appListState(state = initAppListState, action){
  if(action.type && !action.type.startsWith('LIST_ACTION')){
    return state;
  }
  let newState = new AppListStatus(state);
  switch (action.type) {
    case LIST_ACTION_REQUEST_PULL:
      newState.loadStatus = AppListStatus.LOAD_STATUS_PULL_LOADING;
      break;
    case LIST_ACTION_RESOLVE:
      newState.loadStatus = AppListStatus.LOAD_STATUS_DONE;
      let list = action.list;
      newState.updateList(list);
      break;
    case LIST_ACTION_DOWNLOAD:
      if(action.bundleId){
        newState.appmap[action.bundleId].isDownloading = true;
      }
      break;
    case LIST_ACTION_DOWNLOAD_RESOLVE:
      if(action.bundleId){
        newState.appmap[action.bundleId].isDownloading = false;
      }
      break;
    case LIST_ACTION_INITAL_REQUEST:
      newState.loadStatus = AppListStatus.LOAD_STATUS_INIT_LOADING;
      break;
    case LIST_ACTION_ERROR:
      newState.loadStatus = AppListStatus.LOAD_STATUS_ERROR;
      break;
    default:
      newState.loadStatus = AppListStatus.LOAD_STATUS_NO_SETTING;
  }
  return newState;
}


///
/// Load List Actions
///
export function loadAppList(list){
  return {
    type: LIST_ACTION_RESOLVE,
    list: list
  }
}

///
/// Start Pull Action
///
export function startPullList(){
  return {
    type: LIST_ACTION_REQUEST_PULL,
  }
}

///
/// Start Pull Action
///
export function showInitialRequest(){
  return {
    type: LIST_ACTION_INITAL_REQUEST,
  }
}

///
/// show error page of list
///
export function showErrorList(){
  return {
    type: LIST_ACTION_ERROR,
  }
}

///
/// Download
///
export function downloadStart(bundleId){
    return {
      type: LIST_ACTION_DOWNLOAD,
      bundleId:bundleId
    }
}
export function downloadResolve(bundleId){
  return {
    type: LIST_ACTION_DOWNLOAD_RESOLVE,
    bundleId:bundleId
  }
}


//
// reducer of setting
//
const initSettingsState = new SettingsStatus();

const SETTINGS_ACTION_SHOW = 'SETTINGS_ACTION_SHOW';
const SETTINGS_ACTION_HIDE = 'SETTINGS_ACTION_HIDE';
const SETTINGS_ACTION_UPDATE = 'SETTINGS_ACTION_UPDATE';

export function settingsState(state = initSettingsState, action){
  if(!action.type.startsWith('SETTINGS_ACTION_')){
    return state;
  }
  let newState = new SettingsStatus(state);
  switch (action.type){
    case SETTINGS_ACTION_HIDE:
      newState.display = false;
      break;
    case SETTINGS_ACTION_SHOW:
      newState.display = true;
      break;
  }
  return newState;
}

export function settingsActionShow(){
  return {
    type:SETTINGS_ACTION_SHOW
  };
}

export function settingsActionHide(){
  return {
    type:SETTINGS_ACTION_HIDE
  };
}
