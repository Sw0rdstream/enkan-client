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
} from '@shoutem/ui';

import {
  NavigationBar,
} from '@shoutem/ui/navigation';

import { connect } from 'react-redux';

class AppDetails extends Component {
  static propTypes = {
  };

  render() {
    return (
      <Screen styleName="paper full-screen">

      </Screen>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onDownloadPress: (appData) => {

  }
});

export default connect(
	state => ({list:state.appListState}),
	mapDispatchToProps
)(AppDetails);
