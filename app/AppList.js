import React, { Component } from 'react';
import {
  Image,  Title,  Subtitle,  TouchableOpacity,  Screen,  Row, Text, Button, Spinner, View, Icon
} from '@shoutem/ui';

import {ListView, RefreshControl} from 'react-native';

import * as Progress from 'react-native-progress';

import { connect } from 'react-redux';
import { navigatePush, appListState, loadAppList,startPullList } from './redux';
import {downloadApp} from './services/AppDownloadService';
import AppListStatus from './redux-status/AppListStatus';

class AppList extends Component {
  static propTypes = {
    onDownloadPress: React.PropTypes.func,
    appListState: React.PropTypes.object,
    onLoadFinish: React.PropTypes.func,
  };

  static navigationOptions = {
    title: 'APP LIST' ,
    header: ({state, setParams, goBack, navigate}) => {
      let left = (
        <View style={{alignItems:'center', flex:1, justifyContent:'center'}}>
          <Button styleName="clear"><Icon name="sidebar" /></Button>
        </View>
      );
      return {left}
    },
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderDownloadArea = this.renderDownloadArea.bind(this);
  }

  componentDidMount(){
    setTimeout(function(){
      this.props.onLoadFinish(this.tempTestAppDatas());
    }.bind(this), 3000)
  }

  tempTestAppDatas(){
    return  [{
      "bundleId":"com.worksap.company.timeline.mobile",
      "name":"HUE Timeline",
      "version": "17.02.00",
      "buildNumber": 4788291,
      "size": 7118237,
      "lastUpdateDate": "2017/01/01",
      "logo": "https://maiw.hue.worksap.com/collabo/img/mobile/com.worksap.company.timeline.mobile.png"
    },{
      "bundleId":"com.worksap.company.talk.mobile",
      "name":"HUE Talk",
      "version": "17.02.00",
      "buildNumber": 4788291,
      "lastUpdateDate": "2017/01/01",
      "size" : 7118237,
      "logo": "https://maiw.hue.worksap.com/collabo/img/mobile/com.worksap.company.talk.mobile.png"
    }];
  }


  renderRow(appData) {
    const { onDownloadPress } = this.props;
    console.log(appData);
    return (
      <TouchableOpacity onPress={(e) => {this.props.navigation.navigate('Detail',appData,{type:'NAV'})}}>
        <Row>
          <Image
            style={{width:48, height:48, borderRadius:24}}
            source={{uri:appData.data.logo}}
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
    console.log(appData);
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

  render() {
    let {appListState,onRefresh,onLoadStart} = this.props;
    console.log(appListState);
    let ds = new ListView.DataSource({rowHasChanged: (r1,r2) => r1 !== r2});
    let dataSource = ds.cloneWithRows(appListState.applist);
    if(appListState.loadStatus != AppListStatus.LOAD_STATUS_INIT_LOADING){
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
                  setTimeout(function(){
                    this.props.onLoadFinish(this.tempTestAppDatas());
                  }.bind(this), 3000)
                }}
              />
            }
          />
        </Screen>
      );
    }
    else{
      return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <View style={{width:50,height:50, marginTop:-110, marginBottom:20}}>
              <Progress.CircleSnail color={['red','green','blue']} size={50} duration={700} />
            </View>
            <Title>Loading...</Title>
        </View>
      )
    }
  }

}

const mapDispatchToProps = (dispatch) => ({
  onDownloadPress: (appData) => {
    downloadApp(dispatch, appData.data.bundleId);
  },
  onLoadFinish: (list) => {
    dispatch(loadAppList(list));
  },
  onLoadStart: () => {
    dispatch(startPullList());
  }
});

export default connect(
	state => ({appListState:state.appListState}),
	mapDispatchToProps
)(AppList);
