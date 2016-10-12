/**
npm components to install
react-native
react-validation
*/


import React from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Navigator,
  StatusBar
} from 'react-native'

import TabBar from './TabBar.js'
import LoginPage from './LoginPage.js'
import CreateUserPage from './CreateUserPage.js'
import CreateProfilePage from './CreateProfilePage.js'
import Chat from './Chat.js'

export default class App extends React.Component {
  
  state = {
    userIsLoggedIn: false,
    user: null,

  }

  componentWillMount() {
      //TODO: see if the user is logged in
      //If the user is logged in, set the user state in the app  
  }

  render(){

    return (
      <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFE630"
        barStyle="light-content"
      />
      <Navigator
        initialRoute ={{id: 'TabBar', name: 'TabBar'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
      </View>
    )
  }

  renderScene(route, navigator) {
    var routeID = route.id;
    if (routeID === 'LoginPage') {
      return (
        <LoginPage
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
          navigator = {navigator} />
        )
    } if (routeID === 'Chat') { 
      return (
        <Chat />
        )
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})