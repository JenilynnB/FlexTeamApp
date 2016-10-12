import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'
import Tabs from 'react-native-tabs';
import Chat from './Chat.js'

export default class TabBar extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'chat'
    }

    this._renderContent=this._renderContent.bind(this);
  }

  _renderContent(){
    console.log("render content");
    if (this.state.selectedTab === 'chat'){
      return (
          <Chat />

        )
    }else{
      return (
        <View>
          <Text style={styles.welcome}>
              Welcome to React Native
          </Text>
          <Text style={styles.instructions}>
              Selected page: {this.state.selectedTab}
          </Text>
        </View>
        )
    }
  }

  render() {
    return (
      
    <View style={styles.container}>
        <Chat />
        <Tabs selected={this.state.selectedTab} style={{backgroundColor:'white'}}
              selectedStyle={{color:'red'}} onSelect={el=>this.setState({selectedTab:el.props.name})}>
            <Text name="chat">First</Text>
            <Text name="list" selectedIconStyle={{borderTopWidth:2,borderTopColor:'red'}}>Second</Text>
            <Text name="add">Third</Text>
            <Text name="projects" selectedStyle={{color:'green'}}>Fourth</Text>
            <Text name="settings">Fifth</Text>
        </Tabs>
      </View>

        
      
    );
  }
}


var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  
  tabBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#294163',    
  },
  tab:{
    marginTop: 2,
  },
  addButton:{
    marginBottom: -5,
    bottom: -5
  },
  tabTitle: {
    color: '#ffffff', 
  },


  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },

});