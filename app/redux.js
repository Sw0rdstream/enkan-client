import AppListStatus from './redux-status/AppListStatus';

const NAV_PUSH = 'NAV_PUSH';
const NAV_POP = 'NAV_POP';


////
//// App List State Reducer
////
const initAppListState = new AppListStatus();
const LIST_ACTION_REQUEST = 'LIST_ACTION_REQUEST';
const LIST_ACTION_REQUEST_PULL = 'LIST_ACTION_REQUEST_PULL';
const LIST_ACTION_RESOLVE = 'LIST_ACTION_RESOLVE';
const LIST_ACTION_DOWNLOAD = 'LIST_ACTION_DOWNLOAD';
const LIST_ACTION_DOWNLOAD_RESOLVE = 'LIST_ACTION_DOWNLOAD_RESOLVE';
const LIST_ACTION_SETTING_DONE = 'LIST_ACTION_SETTING_DONE';

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
    case LIST_ACTION_REQUEST:
    case LIST_ACTION_SETTING_DONE:
      newState.loadStatus = AppListStatus.LOAD_STATUS_INIT_LOADING;
      return
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
const initSettingsState = {
  display: false,
  serverDomain: '',
  enablePush: false,
  formSubmitting: false,
};

const SETTINGS_ACTION_SHOW = 'SETTINGS_ACTION_SHOW';
const SETTINGS_ACTION_HIDE = 'SETTINGS_ACTION_HIDE';

export function settingsState(state = initSettingsState, action){
  if(!action.type.startsWith('SETTINGS_ACTION_')){
    return state;
  }
  let newState = {
    display: state.display,
    serverDomain: state.serverDomain,
    enablePush: state.enablePush,
    formSubmitting: state.formSubmitting,
  }
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
