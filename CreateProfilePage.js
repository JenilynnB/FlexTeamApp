import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Navigator,
} from 'react-native'


export default class CreateProfilePage extends React.Component{
	state = {
		nameText: "",
		professionText: ""
	}

	submitForm(){
		//TODO: Verify fields are non-empty
		//TODO: Verify correct email format
		console.log(this.state.emailText);
		console.log(this.state.passwordText);
	}

  navigateToLoginPage(){
		var navigator = this.props.navigator;
		console.log("Navigate to Login");
		navigator.replace({
        id: 'LoginPage',
        name: 'Login',
      });
	}

	render(){
		return (
			<View style={styles.container}>
				
				<View style={styles.formContainer}>
					<View><TextInput  
						placeholder="Full Name"
						onChangeText={(text) => this.setState({nameText: text})}
						style={styles.textbox} /></View>
					<View><TextInput 
						placeholder="Profession"
						onChangeText={(text) => this.setState({professionText: text})}
						style={styles.textbox}/></View>
					<TouchableHighlight 
						style={styles.button}
						onPress={this.submitForm.bind(this)}
						>
							<Text style={styles.buttonText}>CREATE ACCOUNT</Text>
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

export class LoginPage extends React.Component{
	state = {
		emailText: "",
		passwordText: ""
	}

	submitForm(){
		//TODO: Verify fields are non-empty
		//TODO: Verify correct email format
		//console.log(this.state.emailText);
		//console.log(this.state.passwordText);
	}

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
							onPress={this.submitForm}
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

