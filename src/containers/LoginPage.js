import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Navigator,
  Image,
  Dimensions
} from 'react-native'
import Swiper from 'react-native-swiper'
import { login } from '../components/Remote.js';

var {height, width} = Dimensions.get('window');


export default class LoginPage extends React.Component{
	state = {
		emailText: "",
		passwordText: ""
	}

	submitForm(){
		console.log("submitting login form");
		if (this.state.passwordText == ""){
			//password blank, show error
			console.log("blank password");
		}
		if (this.state.emailText == ""){
			//email blank, show error
			console.log("blank email");
		}

		if (!this.validateEmail(this.state.emailText)) {
		  // not a valid email
		  console.log("invalid email address");
		} else {
  		// valid email
  		//TODO: verify credentials, log user in
  		var accessToken = login(this.state.emailText, this.state.passwordText);
		}

		

	}

	validateEmail = (email) => {
  	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@+"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
					<View  style={styles.contentContainer}>
						<View style={styles.formContainer}>
							<View style={styles.headingView}>
								<Image source={require('../images/logo.png')}/>
								<Text style={styles.headingText}>FlexTeam</Text>
							</View>
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
							<TouchableOpacity 
								style={styles.button}
								onPress={this.submitForm.bind(this)}
								>
									<Text style={styles.buttonText}>LOGIN</Text>
							</TouchableOpacity>
							<TouchableOpacity>
								<Text style={styles.linkText}>I forgot my password</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.bottomContentContainer}>
							<Swiper style={carouselStyles.wrapper} 
								width={width - 60} 
								height={250} 
								showsButtons={false}
								dot={<View style={{backgroundColor:'#979797', width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
								activeDot={<View style={{backgroundColor: '#fff', width: 8, height: 8, borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
								>
					      <View style={carouselStyles.slide1}>
					        <Image source={require('../images/scoping.png')} style={carouselStyles.image}/>
					        <Text style={carouselStyles.heading}>GUIDED SCOPING</Text>
					        <Text style={carouselStyles.text}>Start with a simple brief chat where we learn your needs and help you scope your project. Then, you just leave everything to us. No need to interview countless freelancers</Text>
					      </View>
					      <View style={carouselStyles.slide2}>
					        <Image source={require('../images/projectmgmt.png')} />
					        <Text style={carouselStyles.heading}>PROJECT MANAGEMENT</Text>
					        <Text style={carouselStyles.text}>Your Project Manager, who will serve as your single point of contact will assemble and oversee our team of experts for you. Your work will get started right away.</Text>
					      </View>
					      <View style={carouselStyles.slide3}>
					      	<Image source={require('../images/satisfaction.png')} />
					      	<Text style={carouselStyles.heading}>SATISFACTION GUARANTEED</Text>
					        <Text style={carouselStyles.text}>Your PM will deliver quality results back to you on time. We are your simplest and most cost-efficient solution in accessing high-caliber talent. If you are not happy, we will make it right.</Text>
					      </View>
			      	</Swiper>
		      	</View>
			     </View>


					<View style={styles.footer}>
					<TouchableOpacity onPress={this.navigateToCreateAccountPage.bind(this)}>
						<Text style={styles.loginText}>Dont Have an account? 
							<Text style={styles.loginLink}> Start a project with us.</Text>
						</Text>
					</TouchableOpacity>
				</View>

				
			</View>
		)
	}

}

var carouselStyles = StyleSheet.create({
	
	wrapper: {
		
  },
  text:{
  	color: "#fff",
  	fontFamily: 'OpenSans',
  	textAlign: 'center',
  	fontSize: 12,
  },
  image: {
  	margin: 15,
  },
  heading:{
  	color: '#fff',
  	fontWeight: '500',
  	fontFamily: 'OpenSans',
  	padding: 5,
  },
  slide1: {
    flex: 1,
    alignItems: 'center',
    	
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

var styles = require('../styles/intro-styles.js')

