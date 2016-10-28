import React from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
  Navigator,
  StatusBar,
  AsyncStorage
} from 'react-native'
  

import TabBar from '../containers/TabBar.js'
import LoginPage from '../containers/LoginPage.js'
import CreateUserPage from '../containers/CreateUserPage.js'
import CreateProfilePage from '../containers/CreateProfilePage.js'
import Chat from '../containers/ChatContainer.js'
import AddToList from '../containers/AddToList.js'
import TopNavBar from '../containers/TopNavBar.js'

import {USER_ID_KEY, AUTH_TOKEN_KEY, USER_FIRSTNAME_KEY} from '../constants';


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
    
    this.loadStoredState();
  }

  async loadStoredState(){
    AsyncStorage.getAllKeys((err, response) => console.log(response));
    AsyncStorage.getItem(USER_ID_KEY, 
        (error, result) => {
          if (error === null) {
            console.log("stored user ID");
            console.log(result);  
            this.props.setUserID(result);
          }
        });
        
    var token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (token != null) {
      this.props.setAuthToken(token);  
    }

    var firstName = await AsyncStorage.getItem(USER_FIRSTNAME_KEY);
    if (firstName != null) {
      this.props.setUserFirstName(firstName);  
    }
    
    console.log("Root Nav");
    console.log(this.props.userID);
    console.log(token);
    console.log(firstName);
  }


  getInitialRoute(){
    var userID = this.props.userID
    /*
    if (userID == 0) {
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
    switch(routeID){

    case 'LoginPage':
      return (
        <LoginPage
          _setUserID = {this._setUserID.bind(this)}
          _setUserFirstName = {this._setUserFirstName.bind(this)}
          _setAuthToken = {this._setAuthToken.bind(this)}
          navigator = {navigator} />
      );
    case 'CreateUserPage':
      return(
        <CreateUserPage
          navigator = {navigator} />
      )
    case 'CreateProfilePage':
      return (
        <CreateProfilePage
          navigator = {navigator} />
        )
    case 'TabBar':
      return (
        <TabBar
          navigator = {navigator} 
          configureScene={(route, routeStack) => Navigator.SceneConfigs.VerticalDownSwipeJump}
          />
        )
    case 'AddToList':
      return (
        <TopNavBar 
          navigator = {navigator}
          scene='addToList' 
          configureScene={(route, routeStack) => Navigator.SceneConfigs.VerticalUpSwipeJump}
          />

        )
    case 'EditProfile':
      
      return (
        <TopNavBar
          scene = 'editProfile'
          configureScene={(route, routeStack) => Navigator.SceneConfigs.VerticalUpSwipeJump}
          _setUserID = {this._setUserID.bind(this)}
          _setUserFirstName = {this._setUserFirstName.bind(this)}
          _setAuthToken = {this._setAuthToken.bind(this)}
          navigator = {navigator} />
        );
    default:
      return;
    }
  }
}



var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})