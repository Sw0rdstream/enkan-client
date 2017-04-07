import React, { Component } from 'react';
import {Switch, ActivityIndicator} from 'react-native';
import {
  ScrollView,
  Icon,
  Row,
  Subtitle,
  Text,
  Title,
  View,
  Image,
  Divider,
  Tile,
  Screen,
  Button,
  Caption,
  TextInput
} from '@shoutem/ui';
import {addNavigationHelpers, StackNavigator} from 'react-navigation';

import { connect } from 'react-redux';
import { settingsActionHide, startPullList,settingsActionUpdateInput } from './redux';
import ReduxService from './global/ReduxService';
import SettingsService from './services/SettingsService';
import SettingsStatus from './redux-status/SettingsStatus';
import SettingsController from './redux-controllers/SettingsController';

class SettingsMainPage extends Component {
  static propTypes = {
    screenProps: React.PropTypes.instanceOf(SettingsStatus),
  };

  static navigationOptions = {
    title: 'Settings',
    header: ({state, setParams, goBack, navigate}) => {
      let left = (
        <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>
          <Button styleName="clear" onPress={() => {
            ReduxService.dispatch(settingsActionHide());
          }}><Icon name="back" /></Button>
        </View>
      );
      let right =  state.params && state.params.validating ? (
        <View style={{alignItems:'center', flex:1, justifyContent:'center', padding:16}}>
            <ActivityIndicator />
        </View>
      ) : (
        <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>
          <Button styleName="clear" onPress={() => {
            const currentState = ReduxService.store.getState().settingsState;
            setParams({validating:true});
            SettingsService.validateSettings(currentState.settingsPojo).then((res) => {
              console.log(res);
              if(res.status == 200){
                res.text().then((text)=>{
                  if(!text || text.length == 0){
                    setParams({validating:false});
                    SettingsController.resolveUpdateSettings(currentState.settingsPojo);
                  }
                  else{
                    setParams({validating:false});
                    alert('This is not a server for SanadaMaru.');
                  }
                });
              }
              else{
                setParams({validating:false});
                alert('Server has problems.');
              }
            }).catch(()=>{
              setParams({validating:false});
              alert('Server cannot be connected. ');
            });
          }}><Text>Update</Text></Button>
        </View>
      );
      return {left,right,  style:{backgroundColor:'#ffffff'}}
    },
  };

  render() {
    let {settingsPojo} = this.props.screenProps;
    return (
      <Screen style={{flex:1}}>
        <View>
        <Row>
          <View styleName="vertical stretch">
            <Text>Server Domain</Text>
            <TextInput autoCapitalize={'none'} autoCorrect={false} style={{padding:0}}
              placeholder={'e.g. hue-smartdevice.sv.workslan'}
              value={settingsPojo.serverDomain}
              onChangeText={(text) => {ReduxService.dispatch(settingsActionUpdateInput(text))}} />
          </View>
        </Row>
        <Row>
          <View styleName="horizontal space-between v-center stretch">
            <Text>Enable Push</Text>
            <Switch value={settingsPojo.enablePush} />
          </View>
        </Row>
        </View>
      </Screen>
    );
  }
}

const AppNavigator = StackNavigator({
  Home: {screen:SettingsMainPage},
})

export default AppNavigator;
