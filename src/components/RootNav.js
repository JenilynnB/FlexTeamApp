import React from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Navigator,
  StatusBar
} from 'react-native'

import TabBar from '../containers/TabBar.js'
import LoginPage from '../containers/LoginPage.js'
import CreateUserPage from '../containers/CreateUserPage.js'
import CreateProfilePage from '../containers/CreateProfilePage.js'
import Chat from '../containers/ChatContainer.js'
import AddToList from '../containers/AddToList.js'
import TopNavBar from '../containers/TopNavBar.js'


  var routes = [
    {id: 'TabBar', name: 'TabBar'},
    {id: 'LoginPage', name: "Login"},
    {id: 'CreateUserPage', name: 'Create User'},
    {id: 'CreateProfilePage', name: 'Create Profile'},
    {id: 'AddToList', name: 'Add To List'},
  ];

export default class RootNav extends React.Component {
  
  static propTypes = {
    userID: React.PropTypes.string,
    userFirstName: React.PropTypes.string,
    setUserID: React.PropTypes.func,
    setUserFirstName: React.PropTypes.func,
    setAuthToken: React.PropTypes.func,
  };

  componentWillMount() {
    //TODO: see if the user is logged in
    //If the user is logged in, set the user state in the app  
  }


  getInitialRoute(){
    /*
    if (this.props.userID == 0) {
      return routes[1];
    }else{
      return routes[0];
    }
    */
    return routes[0];
  }

  _setUserID(userID){
    this.props.setUserID(userID);
  }

  _setUserFirstName(username){
    this.props.setUserFirstName(username);
  }

  _setAuthToken(authToken){
    this.props.setAuthToken(authToken);
  }

  render(){

    return (
      <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFE630"
        barStyle="light-content"
      />
      <Navigator
        initialRoute={this.getInitialRoute()}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.VerticalUpSwipeJump;
          }} />
      </View>
    )
  }

  renderScene(route, navigator) {
    var routeID = route.id;
    if (routeID === 'LoginPage') {
      return (
        <LoginPage
          _setUserID = {this._setUserID.bind(this)}
          _setUserFirstName = {this._setUserFirstName.bind(this)}
          _setAuthToken = {this._setAuthToken.bind(this)}
          navigator = {navigator} />
      );
    } if (routeID === 'CreateUserPage'){
      return(
        <CreateUserPage
          navigator = {navigator} />
      )
    } if (routeID === 'CreateProfilePage') {
      return (
        <CreateProfilePage
          navigator = {navigator} />
        )
    } if (routeID === 'TabBar') { 
      return (
        <TabBar
          navigator = {navigator} 
          configureScene={(route, routeStack) => Navigator.SceneConfigs.VerticalDownSwipeJump}
          />
        )
    } if (routeID === 'AddToList') {
      return (
        <TopNavBar 
          scene='addToList' 
          configureScene={(route, routeStack) => Navigator.SceneConfigs.VerticalUpSwipeJump}
          navigator = {navigator}
          />

        )
    }
  }
}



var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})