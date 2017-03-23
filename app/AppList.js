import React, { Component } from 'react';
import {
  Image,  ListView,  Title,  Subtitle,  TouchableOpacity,  Screen,  Row, Text, Button, Spinner, View
} from '@shoutem/ui';

import {
  NavigationBar,
} from '@shoutem/ui/navigation';

import * as Progress from 'react-native-progress';

import { connect } from 'react-redux';
import { navigatePush, appDownload } from './redux';

import AppListStatus from './redux-status/AppListStatus';

class AppList extends Component {
  static propTypes = {
    onPress: React.PropTypes.func,
    onDownloadPress: React.PropTypes.func,
    appListState: React.PropTypes.object
  };

  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.onDownloadPress = this.onDownloadPress.bind(this);
  }

  componentDidMount(){

  }

  tempTestAppDatas(){
    return  [{
      "bundleId":"com.worksap.company.timeline.mobile",
      "name":"HUE Timeline",
      "version": "17.02.00",
      "buildNumber": 4788291,
      "logo": "https://maiw.hue.worksap.com/collabo/img/mobile/com.worksap.company.timeline.mobile.png"
    },{
      "bundleId":"com.worksap.company.talk.mobile",
      "name":"HUE Talk",
      "version": "17.02.00",
      "buildNumber": 4788291,
      "logo": "https://maiw.hue.worksap.com/collabo/img/mobile/com.worksap.company.talk.mobile.png"
    }];
  }


  renderRow(appData) {
    const {onPress } = this.props;

    return (
      <TouchableOpacity onPress={onPress}>
        <Row>
          <Image
            style={{width:48, height:48, borderRadius:24}}
            source={{uri:appData.logo}}
          />
          <Text>{appData.name}</Text>
          <Button styleName="clear" onPress={this.onDownloadPress}><Text>DOWNLOAD</Text></Button>
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
            data={this.tempTestAppDatas()}
            renderRow={appData => this.renderRow(appData)}
          />
        </Screen>
      );
    }
    else{
      return (
        <Screen>
          <Row><View styleName="h-center">
            <Progress.CircleSnail color={['red','green','blue']} />
          </View></Row>
        </Screen>
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
      title: 'Details',
    }, { appData }));
  },
  onDownloadPress: (appData) => {

  }
});

export default connect(
	state => ({appListState:state.appListState}),
	mapDispatchToProps
)(AppList);