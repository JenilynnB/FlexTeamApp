import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  TouchableHighlight
} from 'react-native';
import MyList from './MyListContainer.js'
import SideMenu from 'react-native-side-menu';
import Menu from './Menu.js';
import Chat from './ChatContainer.js';
import AddToList from './AddToList.js';	
import EditProfile from './EditProfileContainer.js'

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

  cancelPressed(){
  	console.log("cancel pressed");
  	var navigator = this.props.navigator;
  	navigator.pop();
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
	  		<Chat 
	  		/>
	  	);
	  }else if (this.props.scene === 'list'){
	  	return(
	  		<MyList />
	  	);
	  }else if(this.props.scene === 'addToList'){
	  	return(
	  		<AddToList />
	  	);
	  }else if (this.props.scene === 'editProfile'){
	  	return(
	  		<EditProfile />
	  	)
	  }
  }
  renderLeftButton(route, navigator, index, navState){
  	if (this.props.scene === 'addToList' || this.props.scene === 'editProfile'){
			return(
				<TouchableHighlight style={styles.navBarButton} onPress={this.cancelPressed.bind(this)}>
			      <Text style={styles.navBarBtnText}>Cancel</Text>
			  </TouchableHighlight>
			 );
  	}else{
  		return;
  	}
  }

  renderTitle(route, navigator, index, navState){
		if (this.props.scene === "chat"){
			return (
		    <View style={styles.navBarTitleView}>
		      <Image source={require('../icons/logo.png')}/>
		      <Text style={styles.navBarTitleText}> FlexTeam</Text>
		    </View>
		   ); 
		}else if (this.props.scene === 'list'){
			return (
				<Text style={styles.navBarTitleText}>My List</Text>
			);
		}else if(this.props.scene === 'addToList'){
			return(
				<Text style={styles.navBarTitleText}>Add to List</Text>
			);
		}else if(this.props.scene === 'editProfile'){
			return(
				<Text style={styles.navBarTitleText}>Edit Profile</Text>
			);
		}
  }

	render(){
		console.log("rendering TopNavBar");
		
		return(
		<SideMenu
		    menu={<Menu onItemSelected={this.onMenuItemSelected} navigator = {this.props.navigator}/>}
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
		            LeftButton: this.renderLeftButton.bind(this),
		            RightButton: (route, navigator, index, navState) =>
		              { return (
		                <TouchableHighlight style={styles.navBarButton} onPress={() => this.toggleMenu()}>
		                  <Image source={require('../icons/more.png')}/>
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
     width: 60,
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
  navBarBtnText: {
  	color: "#fff",
  },
  container: {
  
  flex: 1,
  backgroundColor: '#ffffff',
  }
});