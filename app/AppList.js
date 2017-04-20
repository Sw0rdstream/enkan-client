import React, { Component } from 'react';
import {
  Image,  Title,  Subtitle,  TouchableOpacity,  Screen,  Row, Text, Button, Spinner, View, Icon
} from '@shoutem/ui';

import {ListView, RefreshControl, Modal} from 'react-native';

import * as Progress from 'react-native-progress';

import { connect } from 'react-redux';
import { navigatePush, appListState, loadAppList,startPullList, settingsActionShow, showErrorList, showNoSettings, settingsActionUpdate} from './redux';
import {downloadApp} from './services/AppDownloadService';
import AppListStatus from './redux-status/AppListStatus';

import Settings from './Settings';
import ReduxService from './global/ReduxService';
import SettingsService from './services/SettingsService';
import SettingsController from './redux-controllers/SettingsController';
import AppListService from './services/AppListService';

class AppList extends Component {
  static propTypes = {
    onDownloadPress: React.PropTypes.func,
    appListState: React.PropTypes.object,
    onLoadFinish: React.PropTypes.func,
    actionPopSettings: React.PropTypes.func,
  };

  static navigationOptions = {
    header: ({state, setParams, goBack, navigate}) => {
      let left = (
        <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>
          <Button styleName="clear" onPress={()=>{
            ReduxService.dispatch(settingsActionShow());
          }}><Icon name="settings" /></Button>
        </View>
      );
      let title = (
        <Title>APP LIST</Title>
      );
      return {left, title, style:{backgroundColor: '#FFFFFF'}}
    }
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderDownloadArea = this.renderDownloadArea.bind(this);
  }

  componentDidMount(){
    let {actionPopSettings,showErrorPage, showNoSettingsPage, settingsChanged} = this.props;
    // TODO: Use a new controller to solve this bad code
    SettingsService.reloadSettings().then((currentSettings) => {
      if(currentSettings && currentSettings.serverDomain){
        settingsChanged(currentSettings);
      }
      AppListService.loadAppList().then((applistJson) => {
        this.props.onLoadFinish(applistJson);
      }).catch((rejectCode) => {
        if(rejectCode == AppListService.LOAD_REJECT_NOSETTING){
          showNoSettingsPage();
          actionPopSettings();
        }
        else{
          showErrorPage();
        }
      });
    }).catch(()=>{
      alert('Please enable storage access for SanadaMaru');
    });
  }


  renderRow(appData) {
    const { onDownloadPress } = this.props;
    return (
      <TouchableOpacity onPress={(e) => {this.props.navigation.navigate('Detail',appData)}}>
        <Row>
          <Image
            style={{width:48, height:48, borderRadius:24}}
            source={{uri: 'https://maiw.hue.worksap.com/collabo/img/mobile/' + appData.data.bundleId.replace('.release', '') + '.png'}}
          />
          <View>
            <Subtitle>{appData.data.name}</Subtitle>
            <Text>{appData.data.version}</Text>
          </View>
          {this.renderDownloadArea(appData)}
        </Row>
      </TouchableOpacity>
    );
  }

  renderDownloadArea(appData){
    const onDownloadPress = this.props.onDownloadPress;
    const isDownloading = appData.isDownloading;
    if(isDownloading){
      return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style={{width:24,height:24}}>
              <Progress.CircleSnail color={['red','green','blue']} size={24} duration={700} />
            </View>
        </View>
      )
    }
    else{
      return (
        <Button styleName="clear" onPress={(e)=>onDownloadPress(appData)}><Text>DOWNLOAD</Text></Button>
      )
    }
  }

  renderSettingsModal(){
    return(
      <Modal animationType={"slide"} transparent={true} visible={this.props.settingsState.display} onRequestClose={()=>{}}>
        <View style={{flex:1}}>
          <Settings screenProps={this.props.settingsState} />
        </View>
      </Modal>
    );
  }


  render() {
    console.log(ReduxService.store.getState());
    let {appListState,onRefresh,onLoadStart, onLoadFinish} = this.props;
    let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(appListState.applist);
    console.log(this.props.settingsState);
    if(appListState.loadStatus == AppListStatus.LOAD_STATUS_NO_SETTING){
      return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center', marginTop:-110}}>
            <Icon style={{fontSize:90}} name="edit"></Icon>
            <View style={{marginTop:16}}><Title>No Valid Setting</Title></View>
            {this.renderSettingsModal()}
        </View>
      )
    }
    else if(appListState.loadStatus == AppListStatus.LOAD_STATUS_ERROR){
      return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center', marginTop:-110}}>
            <Icon style={{fontSize:90}} name="error"></Icon>
            <View style={{marginTop:4, marginBottom:16}}><Title>Server Internal Error</Title></View>
            <Button styleName="clear"><Icon name="refresh"></Icon><Text>Retry</Text></Button>
            {this.renderSettingsModal()}
        </View>
      )
    }
    else if(appListState.loadStatus == AppListStatus.LOAD_STATUS_INIT_LOADING){
      return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style={{width:50,height:50, marginTop:-110, marginBottom:20}}>
              <Progress.CircleSnail color={['red','green','blue']} size={50} duration={700} />
            </View>
            <Title>Loading...</Title>
            {this.renderSettingsModal()}
        </View>
      )
    }
    else{
      return (
        <Screen>
          <ListView
            dataSource={dataSource}
            renderRow={appData => this.renderRow(appData)}
            refreshControl = {
              <RefreshControl
                refreshing={appListState.loadStatus === AppListStatus.LOAD_STATUS_PULL_LOADING}
                onRefresh={()=>{
                  onLoadStart();
                  AppListService.loadAppList().then((applistJson) => {
                    onLoadFinish(applistJson);
                  }).catch((rejectCode) => {
                    alert('Network error happens');
                  })
                }}
              />
            }
          />
          {this.renderSettingsModal()}
        </Screen>
      );
    }
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    onDownloadPress: (appData) => {
      downloadApp(dispatch, appData.data.bundleId, SettingsService.getCurrentSettings().serverDomain);
    },
    onLoadFinish: (list) => {
      dispatch(loadAppList(list));
    },
    onLoadStart: () => {
      dispatch(startPullList());
    },
    actionPopSettings: () => {
      dispatch(settingsActionShow());
    },
    showErrorPage: () =>{
      dispatch(showErrorList());
    },
    showNoSettingsPage: () => {
      dispatch(showNoSettings());
    },
    settingsChanged: (settingsPojo) => {
      dispatch(settingsActionUpdate(settingsPojo))
    }
  };
};

export default connect(
	state => {
    return state;
  },
	mapDispatchToProps
)(AppList);
