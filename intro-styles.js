import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableHighlight,
  Navigator
} from 'react-native'

module.exports = StyleSheet.create({
	
	container: {
		backgroundColor: "#355376",
		flex: 1,
	},
	contentContainer: {
		flex: 1,
	},
	headingView: {
		flexDirection: 'row',
		alignItems: 'center',
		padding: 5,	
	},
	headingText: {
		fontSize: 30,
		color: "#fff",
		margin: 7,
		fontFamily: 'OpenSans',
	},
	formContainer: {
		flex: 3,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: 'center',
	},
	bottomContentContainer: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	textbox: {
		fontFamily: 'OpenSans',
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
		backgroundColor: "#FFE630",
		borderRadius: 4,
		height: 40,
		width: 200,
		margin: 7,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonText: {
		fontFamily: 'OpenSans',
		color: "#294163",
	},
	linkText: {
		fontFamily: 'OpenSans',
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
		fontFamily: 'OpenSans',
		color: "#fff",
		fontSize: 16,
	},
	loginLink: {
		fontFamily: 'OpenSans',
		color: "#fff",
		fontSize: 16,
		fontWeight: "bold",
	},


})