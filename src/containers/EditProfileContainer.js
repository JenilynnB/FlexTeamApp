import { connect } from 'react-redux'
import EditProfile from '../components/EditProfile.js'

function mapStateToProps(state){
	return {
		userID: state.users.get('userID'),
		userFirstName: state.users.get('userFirstName'),
    authToken: state.users.get('authToken'),
	};
}

function mapDispatchToProps(dispatch){
	return{
		setUserFirstName: (userName) => dispatch(setUserFirstName(userName)),
		setAuthToken: (token) => dispatch(setAuthToken(token)),
		setUserID: (userID) => dispatch(setCurrentUserID(userID)),
		
  };
}


export default connect(
	mapStateToProps,
)(EditProfile);