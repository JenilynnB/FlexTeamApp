import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Navigator,
  Image,
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
					<TouchableHighlight >
						<View style={profileStyles.imageContainer}>
							<Image style={profileStyles.image} source={require('./images/addphoto.png')}/>
							<Text style={profileStyles.text}>PHOTO</Text>
						</View>
					</TouchableHighlight>
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



var profileStyles = StyleSheet.create ({
	
	imageContainer: {
		borderWidth: 1,
		borderColor: "#fff",
		borderRadius: 200,
		paddingTop: 15,
		paddingBottom: 15,	
		paddingLeft: 25,
		paddingRight: 25,
		//flex: 1,
		alignItems: "center",
		margin: 10,
	},
	image: {
		margin: 5,
	},
	text: {
		fontSize: 12,
		color: "#fff",
		padding: 3
	}
})

var styles = require('./intro-styles.js')

