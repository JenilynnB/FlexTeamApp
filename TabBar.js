import React from 'react'
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native'
import Chat from './Chat.js'

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
        unselectedTintColor="#ffffff"
        tintColor="#ffe429"
        barTintColor="#294163">
        <TabBarIOS.Item 
          title="Flex Chat"
          systemIcon="history"
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
          title="My List"
          systemIcon="bookmarks"
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
          title="Projects"
          systemIcon="favorites"
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
          title="Search"
          systemIcon="search"
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
  },
  tabText: {
    color: 'darkslategrey',
    margin: 50,
  },
});