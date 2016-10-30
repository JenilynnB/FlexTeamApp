import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Navigator,
  Alert,
} from 'react-native'
import Spinner from 'react-native-loading-spinner-overlay';
import validateEmail from '../components/helpers.js';


export default class CreateUserPage extends React.Component{
	state = {
		emailText: "",
		passwordText: ""
	}


	async submitForm(){
		this.setState({spinnerVisible: true});
		console.log("submitting login form");
		if (this.state.passwordText == ""){
			//password blank, show error
			console.log("blank password");
		}
		if (this.state.emailText == ""){
			//email blank, show error
			console.log("blank email");
		}

		if (!validateEmail(this.state.emailText)) {
		  // not a valid email
		  console.log("invalid email address");
		} else {
  		// valid email
  		//TODO: verify credentials, log user in
  		
			let response = await login(this.state.emailText, this.state.passwordText);
			this.setState({spinnerVisible: false});
			//console.log(response);
			if(response.accessToken){
				this.props._setAuthToken(response.accessToken);
				var userProfile = response.profile;
				this.props._setUserID(userProfile.id);
				this.props._setUserFirstName(userProfile.firstName);
				this.navigateToCreateProfilePage();
			}else{
				Alert.alert(
  			'Error Logging In',
			  response.message,
			  [
			    {text: 'OK', onPress: () => console.log('OK Pressed')},
			  ]
				)
			}
		}
	}


	navigateToLoginPage(){
		var navigator = this.props.navigator;
		navigator.replace({
        id: 'LoginPage',
        name: 'Login',
      });
	}

	navigateToCreateProfilePage(){
		var navigator = this.props.navigator;
		navigator.replace({
        id: 'CreateProfilePage',
        name: 'Create Profile',
      });
	}

	render(){
		return (
				<View style={styles.container}>
					<View style={styles.formContainer}>
						<Text style={styles.headingText}>Join the Team</Text>
						<View><TextInput  
							placeholder="Your Email"
							keyboardType="email-address"
							onChangeText={(text) => this.setState({emailText: text})}
							style={styles.textbox} /></View>
						<View><TextInput 
							placeholder="Password"
							secureTextEntry={true}
							onChangeText={(text) => this.setState({passwordText: text})}
							style={styles.textbox}/></View>
						<TouchableHighlight 
							style={styles.button}
							onPress={this.submitForm.bind(this)}
							>
								<Text style={styles.buttonText}>NEXT</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.bottomContentContainer}>
					</View>
					<View style={styles.footer}>
						<TouchableHighlight onPress={this.navigateToLoginPage.bind(this)}>
								<Text style={styles.loginText}>Already have an account? 
									<Text style={styles.loginLink}> Log in here.</Text>
								</Text>
						</TouchableHighlight>
					</View>
				</View>
				
			)
	}

}

var styles = require('../styles/intro-styles.js')