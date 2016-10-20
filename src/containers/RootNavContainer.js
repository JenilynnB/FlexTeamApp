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
import AddToList from './AddToList.js'
import TopNavBar from './TopNavBar.js'

import { connect } from 'react-redux';
import { setCurrentUserID, addMessage } from '../actions';

export default class App extends React.Component {
  
  static propTypes = {
        //history: React.PropTypes.array,
        userID: React.PropTypes.number,
        //addMessage: React.PropTypes.func,
        setUserID: React.PropTypes.func,
    };

  componentWillMount() {
      //TODO: see if the user is logged in
      //If the user is logged in, set the user state in the app  
  }
  /*
  mapDispatchToProps(dispatch) {
    return {
        //addMessage: (message) => dispatch(addMessage(message)),
        setUserID: (userID) => dispatch(setCurrentUserID(userID)),
    };
  }
  mapStateToProps(state) {
    return {
        //history: state.app.get('messages').toJS(),
        userID: state.app.get('userID'),
    };
  }
  */

  render(){

    return (
      <View style={styles.container}>
      <StatusBar
        backgroundColor="#FFE630"
        barStyle="light-content"
      />
      <Navigator
        initialRoute ={{id: 'LoginPage', name: 'LoginPage'}}
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
    } if (routeID === 'AddToList') {
      return (
        <TopNavBar 
            scene='addToList' 
            configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromBottom}
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