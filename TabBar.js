import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
import LoginPage from './LoginPage.js'
import Chat from './Chat.js'
import MyList from './MyList.js'
import TopNavBar from './TopNavBar.js'

import { Tabs, Tab, Icon } from 'react-native-elements'


export default class TabBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'chat'
    }

  }

  navigateToAddToList(){
    console.log("navigat to add to list");
    var navigator = this.props.navigator;
    navigator.push({id: 'AddToList'});
    /*
    navigator.replace({
        id: 'AddToList',
        name: 'AddToList',
      });
      */
  }

  changeTab (selectedTab) {
    this.setState({selectedTab})
  }

  render() {
    return (
      
      <Tabs tabBarStyle={styles.tabBar}>
        <Tab 
          title="FLEX CHAT"
          renderIcon={() => (<Image source={require('./icons/chat.png')} />) }
          renderSelectedIcon={() => <Image source={require('./icons/chat.png')} />}
          titleStyle={styles.tabTitle}
          selectedTitleStyle={styles.selectedTabTitle}
          tabStyle={styles.tab}
          onPress={() => this.changeTab('chat')}
          selected={this.state.selectedTab==='chat'}
          >
          <TopNavBar scene='chat'/>
        </Tab>

        <Tab
          renderIcon={() => (<Image source={require('./icons/list.png')} />) }
          renderSelectedIcon={() => <Image source={require('./icons/list.png')} />}
          title="MY LIST"
          titleStyle={styles.tabTitle}
          tabStyle={styles.tab}
          onPress={() => this.changeTab('list')}
          selected={this.state.selectedTab==='list'}
          >
          <TopNavBar scene='list'/>
        </Tab>


        <Tab
          renderIcon={() => (<Image source={require('./icons/add.png')} />) }
          renderSelectedIcon={() => <Image source={require('./icons/add.png')} />}
          tabStyle={styles.addButton}
          onPress={() => this.navigateToAddToList() }
          selected={this.state.selectedTab==='add'}
          >
          
        </Tab>

        <Tab 
          renderIcon={() => (<Image source={require('./icons/projects.png')} />) }
          renderSelectedIcon={() => <Image source={require('./icons/projects.png')} />}
          
          title="PROJECTS"
          titleStyle={styles.tabTitle}
          tabStyle={styles.tab}
          onPress={() => this.changeTab('projects')}
          selected={this.state.selectedTab==='projects'}
          >
          <View>
          </View>
        </Tab>

        <Tab 
          renderIcon={() => (<Image source={require('./icons/search.png')} />) }
          renderSelectedIcon={() => <Image source={require('./icons/search.png')} />}
          title="SEARCH"
          titleStyle={styles.tabTitle}
          tabStyle={styles.tab}
          onPress={() => this.changeTab('search')}
          selected={this.state.selectedTab==='search'}
          >
          <View>
          </View>
        </Tab>

      </Tabs>

      
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
  selectedTabTitle: {
    color: "#979797",
  }

});