import React, { Component } from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';


import {addNavigationHelpers, StackNavigator} from 'react-navigation';
import AppList from './app/AppList';
import AppDetails from './app/AppDetails';
import {appListState} from './app/redux';
//
// Nav Reducer
//
const AppNavigator = StackNavigator({
  Home: {screen:AppList},
  Detail: {screen: AppDetails}
})
const initialNavState = AppNavigator.router.getStateForAction({type:'@ANY'}, undefined);
const navigationState = (state = initialNavState, action) => {
  console.log(state, action);
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
}

const reducer = combineReducers({
  navigationState,
  appListState
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
    console.log(state);
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
