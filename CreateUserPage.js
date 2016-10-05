import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Navigator
} from 'react-native'


export default class CreateUserPage extends React.Component{
	state = {
		emailText: "",
		passwordText: ""
	}

	submitForm(){
		//TODO: Verify fields are non-empty
		//TODO: Verify correct email format

		this.navigateToCreateProfilePage()
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
						<Text style={styles.heading}>Join the Team</Text>
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

var styles = require('./intro-styles.js')