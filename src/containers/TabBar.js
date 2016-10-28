import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'
import TabNavigator from 'react-native-tab-navigator';
import LoginPage from './LoginPage.js'
import TopNavBar from './TopNavBar.js'

import { Tabs, Tab, Icon } from 'react-native-elements'
import {USER_ID_KEY, USER_FIRSTNAME_KEY, AUTH_TOKEN_KEY} from '../constants'


export default class TabBar extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedTab: 'chat'
    }
  }

  navigateToAddToList(){
    var navigator = this.props.navigator;
    navigator.push({id: 'AddToList'});

  }


  changeTab (selectedTab) {
    this.setState({selectedTab})
  }

  _logoutPressed(){
    console.log("clicked Log Out");
    //this.props._setAuthToken('');
    //this.props._setUserID('');
    //this.props._setUserFirstName('');
    AsyncStorage.removeItem(USER_ID_KEY);
    AsyncStorage.removeItem(USER_FIRSTNAME_KEY);
    AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  }



  render() {
    console.log("rendering tabbar");
    //console.log(this.props.navigator);
    return (
      
      <Tabs tabBarStyle={styles.tabBar}>
        <Tab 
          title="FLEX CHAT"
          renderIcon={() => (<Image source={require('../icons/chat-unselected.png')} />) }
          renderSelectedIcon={() => <Image source={require('../icons/chat-selected.png')} />}
          titleStyle={styles.tabTitle}
          //selectedTitleStyle={styles.selectedTabTitle}
          tabStyle={styles.tab}
          onPress={() => this.changeTab('chat')}
          selected={this.state.selectedTab==='chat'}
          >
          <TopNavBar 
          //navigator = {this.props.navigator}
          scene='chat'/>
        </Tab>

        <Tab
          renderIcon={() => (<Image source={require('../icons/list-unselected.png')} />) }
          renderSelectedIcon={() => <Image source={require('../icons/list-selected.png')} />}
          title="MY LIST"
          titleStyle={styles.tabTitle}
          tabStyle={styles.tab}
          onPress={() => this.changeTab('list')}
          selected={this.state.selectedTab==='list'}
          >
          <TopNavBar scene='list'/>
        </Tab>


        <Tab
          renderIcon={() => (<Image source={require('../icons/add.png')} />) }
          renderSelectedIcon={() => <Image source={require('../icons/add.png')} />}
          tabStyle={styles.addButton}
          onPress={() => this.navigateToAddToList() }
          selected={this.state.selectedTab==='add'}
          >
          
        </Tab>

        <Tab 
          renderIcon={() => (<Image source={require('../icons/projects-unselected.png')} />) }
          renderSelectedIcon={() => <Image source={require('../icons/projects-selected.png')} />}
          
          title="PROJECTS"
          titleStyle={styles.tabTitle}
          tabStyle={styles.tab}
          onPress={() => this.changeTab('projects')}
          selected={this.state.selectedTab==='projects'}
          >
          <View>
            <TouchableOpacity onPress={this._logoutPressed()}>
              <Text>Log Out</Text>
            </TouchableOpacity>
          </View>
        </Tab>

        <Tab 
          renderIcon={() => (<Image source={require('../icons/search-unselected.png')} />) }
          renderSelectedIcon={() => <Image source={require('../icons/search-selected.png')} />}
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
  
  tabBar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',    
    shadowColor: 'dimgrey',
    //shadowOffset: {width: 2, height: 2},
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#e2e2e2',
  },
  tab:{
    marginTop: 2,
  },
  addButton:{
    marginBottom: -5,
    bottom: -5
  },
  tabTitle: {
    color: '#66A1E6', 
  }

});