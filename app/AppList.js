import React, { Component } from 'react';
import {
  Image,  ListView,  Title,  Subtitle,  TouchableOpacity,  Screen,  Row, Text, Button, Spinner, View
} from '@shoutem/ui';

import {
  NavigationBar,
} from '@shoutem/ui/navigation';

import * as Progress from 'react-native-progress';

import { connect } from 'react-redux';
import { navigatePush, appListState, loadAppList } from './redux';

import AppListStatus from './redux-status/AppListStatus';

class AppList extends Component {
  static propTypes = {
    onPress: React.PropTypes.func,
    onDownloadPress: React.PropTypes.func,
    appListState: React.PropTypes.object,
    onLoadFinish: React.PropTypes.func
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.onDownloadPress = this.onDownloadPress.bind(this);
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
    const {onPress, onDownloadPress } = this.props;

    return (
      <TouchableOpacity onPress={(e) => {onPress(appData)}}>
        <Row>
          <Image
            style={{width:48, height:48, borderRadius:24}}
            source={{uri:appData.data.logo}}
          />
          <View>
            <Subtitle>{appData.data.name}</Subtitle>
            <Text>{appData.data.version}</Text>
          </View>
          <Button styleName="clear" onPress={(e)=>onDownloadPress(appData)}><Text>DOWNLOAD</Text></Button>
        </Row>
      </TouchableOpacity>
    );
  }

  render() {
    let {appListState} = this.props;

    if(appListState.loadStatus === AppListStatus.LOAD_STATUS_DONE){
      return (
        <Screen>
          <ListView
            data={appListState.applist}
            renderRow={appData => this.renderRow(appData)}
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

  onDownloadPress(appData){
    console.log(appData);
  }
}

const mapDispatchToProps = (dispatch) => ({
  onPress: (appData) => {
    dispatch(navigatePush({
      key: 'AppDetails',
      title: 'Details'
    }, { appData }));
  },
  onDownloadPress: (appData) => {
    dispatch({type:"no_thing"});
  },
  onLoadFinish: (list) => {
    dispatch(loadAppList(list));
  }
});

export default connect(
	state => ({appListState:state.appListState}),
	mapDispatchToProps
)(AppList);
