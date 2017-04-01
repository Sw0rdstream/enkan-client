import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';


import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import AppList from './app/AppList';
import AppDetails from './app/AppDetails';
import Settings from './app/Settings';
import {appListState,settingsState} from './app/redux';
//
// Nav Reducer
//
const AppNavigator = StackNavigator({
  Home: {screen:AppList},
  Detail: {screen: AppDetails}
})
const initialNavState = AppNavigator.router.getStateForAction({type:'@ANY'}, undefined);
const NAV_ACTION_PREFIX = 'Navigation/';
const navigationState = (state = initialNavState, action) => {
  if(action.type.startsWith(NAV_ACTION_PREFIX)){
    console.log("Reduce in NavReducer: ", state, action);
    return AppNavigator.router.getStateForAction(action, state);
  }
  else{
    return state || initialNavState;
  }
}

const reducer = combineReducers({
  navigationState,
  appListState,
  settingsState
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducer);


class AppWithNavigationState extends Component{
  render() {
    const {dispatch, navigationState} = this.props;
    return (
        <AppNavigator navigation={addNavigationHelpers({
          dispatch: dispatch,
          state: navigationState
        })} />
    );
  }
}

const App = connect(
  state => {
    return {navigationState: state.navigationState};
  }
)(AppWithNavigationState);


export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}
