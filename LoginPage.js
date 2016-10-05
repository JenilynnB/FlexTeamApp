import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Navigator
} from 'react-native'

export default class LoginPage extends React.Component{
	state = {
		emailText: "",
		passwordText: ""
	}

	submitForm(){

		if (this.state.passwordText == ""){
			//password blank, show error
		}
		if (this.state.emailText == ""){
			//email blank, show error
		}

		if (!this.validateEmail(this.state.emailText)) {
		  // not a valid email
		} else {
  		// valid email
  		//TODO: verify credentials, log user in
		}

		

	}

	validateEmail = (email) => {
  	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
	};


	navigateToCreateAccountPage(){
		var navigator = this.props.navigator;
		navigator.replace({
        id: 'CreateUserPage',
        name: 'Create Account',
      });
	}

	render(){
		return (
				<View style={styles.container}>
					<View style={styles.formContainer}>
						<Text style={styles.heading}>Login</Text>
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
								<Text style={styles.buttonText}>LOGIN</Text>
						</TouchableHighlight>
						<TouchableHighlight>
							<Text style={styles.linkText}>I forgot my password</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.footer}>
					<TouchableHighlight onPress={this.navigateToCreateAccountPage.bind(this)}>
						<Text style={styles.loginText}>Dont Have an account? 
							<Text style={styles.loginLink}> Start a project with us.</Text>
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		)
	}

}

var styles = require('./intro-styles.js')

