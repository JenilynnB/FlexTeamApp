import React from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Navigator
} from 'react-native'

import TabBar from './TabBar.js'
import {LoginPage, CreateUserPage, CreateProfilePage} from './CreateAccount-Login.js'

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
      <Navigator
        initialRoute ={{id: 'LoginPage', name: 'Index'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.FloatFromRight;
          }} />
    )
  }

  renderScene(route, navigator) {
    var routeID = route.id;
    console.log(routeID);
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
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})