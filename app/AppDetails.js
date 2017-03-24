import React, { Component } from 'react';
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

import {
  NavigationBar,
} from '@shoutem/ui/navigation';

import { connect } from 'react-redux';

class AppDetails extends Component {
  static propTypes = {
  };

  render() {
    const appData = this.props.appData;
    return (
      <Screen style={{flex:1, backgroundColor:'white'}}>
        <View>
        <Row>
          <Image
            style={{width:64, height:64}}
            source={{uri:appData.data.logo}}
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
            <Subtitle>{appData.data.buildNumber}</Subtitle>
            <View style={{height:8}}></View>
            <Caption>SIZE</Caption>
            <Subtitle>{parseInt(appData.data.size/100000)/10} MB</Subtitle>
            <View style={{height:8}}></View>
            <Caption>LAST UPDATE</Caption>
            <Subtitle>{appData.data.lastUpdateDate}</Subtitle>
          </View>
        </Row>
        <Row>
          <Button styleName="full-width clear" style={{backgroundColor:'#00aadf'}}><Title style={{color:'white'}}>DOWNLOAD</Title></Button>
        </Row>
        </View>
      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onDownloadPress: (appData) => {

  }
});

export default connect(
	state => ({context:state}),
	mapDispatchToProps
)(AppDetails);
