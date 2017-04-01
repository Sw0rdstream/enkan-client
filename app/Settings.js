import React, { Component } from 'react';
import {Switch} from 'react-native';
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

import * as Progress from 'react-native-progress';

import { connect } from 'react-redux';
import { settingsActionHide} from './redux';

class SettingsMainPage extends Component {
  static propTypes = {
  };

  static navigationOptions = {
    title: 'Settings',
    header: ({state, setParams, goBack, navigate}) => {
      let left = (
        <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>
          <Button styleName="clear" onPress={() => {
            if(SettingsMainPage.dispatch){
              SettingsMainPage.dispatch(settingsActionHide());
            }
          }}><Icon name="back" /></Button>
        </View>
      );
      let right = (
        <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>
          <Button styleName="clear"><Text>Update</Text></Button>
        </View>
      );
      return {left,right,  style:{backgroundColor:'#ffffff'}}
    },
  };

  render() {
    console.log(this.props);
    return (
      <Screen style={{flex:1}}>
        <View>
        <Row>
          <View styleName="vertical stretch">
            <Text>Server Domain</Text>
            <TextInput style={{padding:0}} placeholder={'e.g. hue-smartdevice.sv.workslan'} />
          </View>
        </Row>
        <Row>
          <View styleName="horizontal space-between v-center stretch">
            <Text>Enable Push</Text>
            <Switch />
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

const mapDispatchToProps = (dispatch) => {
  SettingsMainPage.dispatch = dispatch;
  return {};
};

export default connect(
	state => ({context:state}),
	mapDispatchToProps
)(AppNavigator);
