import React from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native'
import Chat from './Chat.js'
//import CreateUser from './CreateUser.js'

export default class TabBar extends React.Component {
  state = {
    selectedTab: 'chat'
  }

  _renderContent = (pageText: string) => {
    return (
      <View style={[styles.tabContent]}>
        <Text style={styles.tabText}>This will be the {pageText} page</Text>
      </View>
    );
  };

  render() {
    return (
      <TabBarIOS selectedTab={this.state.selectedTab}
        unselectedTintColor="#e2e2e2"
        tintColor="#fff"
        barTintColor="#294163"
        style={styles.tabBar}>
        <TabBarIOS.Item 
          icon={require('./icons/chat.png')}
          selectedIcon={require('./icons/chat.png')}
          style={styles.addButton}
          title="FLEX CHAT"
          selected={this.state.selectedTab==='chat'}
          onPress={() => {
              this.setState({
                  selectedTab: 'chat',
              });
          }}
          >
          <Chat/>
        </TabBarIOS.Item>

        <TabBarIOS.Item 
          title="MY LIST"
          icon={require('./icons/list.png')}
          selectedIcon={require('./icons/list.png')}
          style={styles.iconText}
          selected={this.state.selectedTab==='list'}
          onPress={() => {
              this.setState({
                  selectedTab: 'list',
              });
          }}
          >
          {this._renderContent("My List")}
        </TabBarIOS.Item>

        <TabBarIOS.Item 
          icon={require('./icons/add.png')}
          selectedIcon={require('./icons/add.png')}
          renderAsOriginal
          style={styles.addButton}
          selected={this.state.selectedTab==='add'}
          onPress={() => {
              this.setState({
                  selectedTab: 'add',
              });
          }}
          >
          {this._renderContent("Add List Item")}
        </TabBarIOS.Item>

        <TabBarIOS.Item 
          title="PROJECTS"
          icon={require('./icons/projects.png')}
          selectedIcon={require('./icons/projects.png')}
          style={styles.iconText}
          selected={this.state.selectedTab==='projects'}
          onPress={() => {
              this.setState({
                  selectedTab: 'projects',
              });
          }}
          >
          {this._renderContent("Projects")}
        </TabBarIOS.Item>
        <TabBarIOS.Item 
          title="SEARCH"
          icon={require('./icons/search.png')}
          imageInsets={[0,2,0,6]}
          selectedIcon={require('./icons/search.png')}
          selected={this.state.selectedTab==='search'}
          onPress={() => {
              this.setState({
                  selectedTab: 'search',
              });
          }}
          >
          {this._renderContent("Search")}
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}


var styles = StyleSheet.create({
  tabContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  tabBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  addButton:{
    marginBottom: -5,
    bottom: -5
  },
  tabText: {
    color: 'darkslategrey',
    margin: 50,
  },

});