import React from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native'

import TabBar from './TabBar.js'
import IntroScreens from './IntroScreens.js'
//import CreateUser from './CreateUser.js'

export default class App extends React.Component {
  state = {
    userIsLoggedIn: false,
  }

  render(){
    return (
      <View style={styles.container}>
        {
          (this.state.userIsLoggedIn)? <TabBar /> : <IntroScreens />
        }
      </View>
      
      )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  }
})