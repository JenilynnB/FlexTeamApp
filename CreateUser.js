import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
} from 'react-native'

export default class CreateUser extends React.Component{
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
							onPress={this.submitForm}
							>
								<Text style={styles.buttonText}>NEXT</Text>
						</TouchableHighlight>
					</View>
					<View style={styles.footer}>
						<TouchableHighlight >
								<Text style={styles.loginText}>Already have an account? 
									<Text style={styles.loginLink}> Log in here.</Text>
								</Text>
						</TouchableHighlight>
					</View>
				</View>
			)
	}

}

class CreateProfile extends React.Component{
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
						onPress={this.submitForm}
						>
							<Text style={styles.buttonText}>CREATE ACCOUNT</Text>
					</TouchableHighlight>
				</View>
				<View style={styles.footer}>
						<TouchableHighlight >
								<Text style={styles.loginText}>Already have an account? 
									<Text style={styles.loginLink}> Log in here.</Text>
								</Text>
						</TouchableHighlight>
					</View>
			</View>
		)
	}
}

export class Login extends React.Component{
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


	render(){
		return (
				<View style={styles.container}>
					
				</View>
			)
	}

}

var styles = StyleSheet.create({
	heading: {
		fontSize: 30,
		color: "#fff",
		margin: 7,
	},
	container: {
		backgroundColor: "#294163",
		flex: 1,
	},
	formContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: 'center',
	},
	textbox: {
		backgroundColor: "white",
		borderColor: "lightgrey",
		borderWidth: 1,
		borderRadius: 4,
		height: 40,
		width: 250,
		margin: 7,
		padding: 7,
	},
	button: {
		backgroundColor: "#ffe429",
		borderRadius: 4,
		height: 40,
		width: 200,
		margin: 7,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		color: "#294163",
	},
	linkText: {
		textDecorationLine: 'underline',
		color: "#fff",
	},
	footer: {
		borderTopColor: "#fff",
		borderWidth: 1,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
	},
	loginText: {
		color: "#fff",
		fontSize: 16,
	},
	loginLink: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	}


})