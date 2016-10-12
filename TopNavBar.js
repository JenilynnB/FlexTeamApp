import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  TouchableHighlight
} from 'react-native';
import MyList from './MyList.js'
import SideMenu from 'react-native-side-menu';
import Menu from './Menu.js';
import Chat from './Chat.js';

export default class TopNavBar extends React.Component{
	constructor(props) {
    super(props);
    this.state = {
    	//scene: ''
    	menuIsOpen: false,
      selectedMenuItem: 'Profile',
    };
  }

	toggleMenu() {
    this.setState({
      menuIsOpen: !this.state.menuIsOpen,
    });
  }

  updateMenuState(menuIsOpen) {
    this.setState({ menuIsOpen, });
  }

  onMenuItemSelected = (menuItem) => {
    this.setState({
      menuIsOpen: false,
      selectedMenuItem: menuItem,
    });
  }

  renderScene(route, Navigator){
  	 if (this.props.scene === "chat"){
	  	return(
	  		<Chat />
	  	);
	  }else if (this.props.scene === 'list'){
	  	return(
	  		<MyList />
	  	);
	  }
  }

  renderTitle(route, navigator, index, navState){
		if (this.props.scene === "chat"){
			return (
		    <View style={styles.navBarTitleView}>
		      <Image source={require('./icons/logo.png')}/>
		      <Text style={styles.navBarTitleText}> FlexTeam</Text>
		    </View>
		   ); 
		}else if (this.props.scene === 'list'){
			return (
				<Text style={styles.navBarTitleText}>My List</Text>
			);
		}
  }

	render(){
		return(
		<SideMenu
		    menu={<Menu onItemSelected={this.onMenuItemSelected} />}
		    isOpen={this.state.menuIsOpen}
		    menuPosition='right'
		    onChange={(isOpen) => this.updateMenuState(isOpen)}
		    >
		  <View style={styles.container}>
		    <Navigator 
		      renderScene={this.renderScene.bind(this)}
		      navigationBar={
		        <Navigator.NavigationBar
		          routeMapper={{
		            LeftButton: (route, navigator, index, navState) =>
		              {  },
		            RightButton: (route, navigator, index, navState) =>
		              { return (
		                <TouchableHighlight style={styles.navBarButton} onPress={() => this.toggleMenu()}>
		                  <Image source={require('./icons/more.png')}/>
		                </TouchableHighlight>
		                ); },
		            Title: this.renderTitle.bind(this),
		            }}
		          style={styles.navBar}
		          
		        />
		      }
		    />
		  
		  </View>
		</SideMenu>
		)
	}
}

const styles = StyleSheet.create({
	navBar: {
    backgroundColor: '#294163',
  },
  navBarButton: {
    height: 40,
      width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  navBarTitleView: {
    flex: 1,
    flexDirection: "row",
  },
  navBarTitleText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "OpenSans"
  },
    container: {
    //marginBottom: 50,
    flex: 1,
    backgroundColor: '#ffffff',
  }
});