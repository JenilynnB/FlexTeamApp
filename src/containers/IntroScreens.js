import React from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native'

import CreateUser from './CreateUser.js'
import Login from './CreateUser.js'

export default class IntroScreens extends React.Component {
  state = {
    profileExists: false,
    accountExists: false,
  }

  render(){
    return (
      <View style={styles.container}>
      	{(this.state.accountExists)? 
      		<Login /> :
      		<CreateUser />
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