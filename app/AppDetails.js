import React, { Component } from 'react';
import {downloadApp} from './services/AppDownloadService';
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
  Caption
} from '@shoutem/ui';
import SettingsService from './services/SettingsService';
import {
  NavigationBar,
} from '@shoutem/ui/navigation';
import * as Progress from 'react-native-progress';

import { connect } from 'react-redux';

class AppDetails extends Component {
  static propTypes = {
  };

  static navigationOptions = {
    title: 'APP DETAIL',
    header: ({state, setParams, goBack, navigate}) => {
      let left = (
        <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>
          <Button styleName="clear" onPress={() => {goBack();}}><Icon name="back" /></Button>
        </View>
      );
      return {left, style:{backgroundColor:'#ffffff'}}
    },
  }

  renderDownloadArea(appData){
    const onPress = this.props.onDownloadPress;
    const isDownloading = appData.isDownloading;
    if(isDownloading){
      return (
        <View style={{height:50, alignItems:'center', justifyContent:'center'}}>
            <View style={{width:24,height:24}}>
              <Progress.CircleSnail color={['red','green','blue']} size={24} duration={700} />
            </View>
        </View>
      )
    }
    else{
      return (
        <Button styleName="full-width clear" style={{backgroundColor:'#00aadf'}} onPress={(e)=>{onPress(appData);}}>
          <Title style={{color:'white'}}>DOWNLOAD</Title>
        </Button>
      )
    }
  }

  render() {
    console.log(this.props);
    const appData = this.props.navigation.state.params;
    return (
      <Screen style={{flex:1, backgroundColor:'white'}}>
        <View>
        <Row>
          <Image
            style={{width:64, height:64}}
            source={{uri: 'https://maiw.hue.worksap.com/collabo/img/mobile/' + appData.data.bundleId.replace('.release', '') + '.png'}}
          />
          <View styleName="vertical stretch">
            <Caption>APP NAME</Caption>
            <Title>{appData.data.name}</Title>
          </View>
        </Row>
        <Row>
          <View styleName="vertical stretch">
            <Caption>VERSION</Caption>
            <Subtitle>{appData.data.version}</Subtitle>
            <View style={{height:8}}></View>
            <Caption>BUILD NUMBER</Caption>
            <Subtitle>{appData.data.build}</Subtitle>
            <View style={{height:8}}></View>
            <Caption>APP ID</Caption>
            <Subtitle>{appData.data.bundleId}</Subtitle>
            <View style={{height:8}}></View>
            <Caption>SIZE</Caption>
            <Subtitle>{parseInt(appData.data.size/100000)/10} MB</Subtitle>
            <View style={{height:8}}></View>
            <Caption>RELEASE DATE</Caption>
            <Subtitle>{new Date(appData.data.uploadTime).toLocaleDateString()}</Subtitle>
          </View>
        </Row>
        <Row>
          {this.renderDownloadArea(appData)}
        </Row>
        </View>
      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onDownloadPress: (appData) => {
    downloadApp(dispatch, appData.data.bundleId, SettingsService.getCurrentSettings().serverDomain);
  }
});

export default connect(
	state => ({context:state}),
	mapDispatchToProps
)(AppDetails);
