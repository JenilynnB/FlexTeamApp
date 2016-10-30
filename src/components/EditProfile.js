import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native'

export default class EditProfile extends React.Component {


	_logoutPressed(){
    console.log("clicked Log Out");
    this.props._setAuthToken('');
    this.props._setUserID('');
    this.props._setUserFirstName('');
    AsyncStorage.removeItem(USER_ID_KEY);
    AsyncStorage.removeItem(USER_FIRSTNAME_KEY);
    AsyncStorage.removeItem(AUTH_TOKEN_KEY);
  }

  render(){
  	return(
  
		<View>
		  <TouchableOpacity style={{marginTop: 50}} onPress={this._logoutPressed}>
		    <Text>Sign Out</Text>
		  </TouchableOpacity>

		</View>
		);
	}

}

EditProfile.defaultProps = {
	setUserID: {},
	setUserFirstName: {},
	setAuthToken: {},
}

EditProfile.propTypes = {
	setUserID: React.PropTypes.func,
	setUserFirstName: React.PropTypes.func,
	setAuthToken: React.PropTypes.func,
}

