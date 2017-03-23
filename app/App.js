import React, { Component } from 'react';
import { connect } from 'react-redux';

import {NavigationBar, Icon, Title, Row,Button, Image, ListView, Screen, Text, View, Subtitle, TouchableOpacity} from '@shoutem/ui';
import {NavigationBar as Navigation, CardStack} from '@shoutem/ui/navigation';
import { navigatePop } from './redux';

import AppList from './AppList';
import AppDetails from './AppDetails';

const theme = {
  '.test':{
    backgroundColor:'#fdcdde'
  }
}
class App extends Component {
  static propTypes = {
    onNavigateBack: React.PropTypes.func.isRequired,
    navigationState: React.PropTypes.object,
    scene: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.renderNavBar = this.renderNavBar.bind(this);
    this.renderScene = this.renderScene.bind(this);
  }

  renderScene(props) {
    const { route } = props.scene;

    let Screen = route.key === 'AppDetails' ? AppDetails : AppList;

    return (<Screen {...route.props} />);
  }

  renderNavBar(props) {
    const { onNavigateBack } = this.props;
    return (
      <Navigation.View
        {...props}
        onNavigateBack={onNavigateBack}
        renderTitleComponent={(e) => {return (<View style={{alignItems:'center', flex:1, justifyContent:'center'}}><Title styleName="v-center h-center">APP LIST</Title></View>);}}
        renderLeftComponent={(e)=>{return (<View style={{alignItems:'center', flex:1, justifyContent:'center'}}><Button styleName="clear"><Icon name="sidebar" /></Button></View>);}}
      />
    );
  }

  render() {
    const { navigationState, onNavigateBack } = this.props;

    return (
      <CardStack
        navigationState={navigationState}
        onNavigateBack={onNavigateBack}
        renderNavBar={this.renderNavBar}
        renderScene={this.renderScene}
      />
    );
  }
}

export default connect(
  state => ({ navigationState: state.navigationState }),
  { onNavigateBack: navigatePop }
)(App);
