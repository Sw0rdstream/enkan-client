import { combineReducers } from 'redux';
import * as NavigationStateUtils from 'NavigationStateUtils';

import AppListStatus from './redux-status/AppListStatus';

const NAV_PUSH = 'NAV_PUSH';
const NAV_POP = 'NAV_POP';


const initialNavState = {
  index: 0,
  routes: [
    { key: 'AppList' },
  ],
};

function navigationState(state = initialNavState, action) {
  switch (action.type) {
    case NAV_PUSH:
      if (state.routes[state.index].key === (action.state && action.state.key)) return state;
      return NavigationStateUtils.push(state, action.state);

    case NAV_POP:
      if (state.index === 0 || state.routes.length === 1) return state;
      return NavigationStateUtils.pop(state);

    default:
      return state;
  }
}

////
//// App List State Reducer
////
const initAppListState = new AppListStatus();
const LIST_ACTION_REQUEST = 'LIST_ACTION_REQUEST';
const LIST_ACTION_REQUEST_PULL = 'LIST_ACTION_REQUEST_PULL';
const LIST_ACTION_RESOLVE = 'LIST_ACTION_RESOLVE';

export function appListState(state = initAppListState, action){
  let newState = new AppListStatus();
  newState.applist = state.applist;
  switch (action.type) {
    case LIST_ACTION_REQUEST_PULL:
      newState.loadStatus = AppListStatus.LOAD_STATUS_PULL_LOADING;
      break;
    case LIST_ACTION_RESOLVE:
      newState.loadStatus = AppListStatus.LOAD_STATUS_DONE;
      let list = action.list;
      newState.updateList(list);
      break;
    case LIST_ACTION_REQUEST:
    default:
      newState.loadStatus = AppListStatus.LOAD_STATUS_INIT_LOADING;
  }
  return newState;
}

export default combineReducers({
  navigationState,
  appListState
});

export function navigatePush(route, props) {
  return {
    type: NAV_PUSH,
    state: {
      ...route,
      props,
    },
  };
}

export function navigatePop() {
  return {
    type: NAV_POP,
  };
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
