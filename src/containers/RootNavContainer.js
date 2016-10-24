import { connect } from 'react-redux'
import NavigationRoot from '../components/RootNav'

import {setCurrentUserID, setUserFirstName, setAuthToken} from '../actions'

function mapStateToProps(state) {
	return {
    userID: state.users.get('userID'),
    userFirstName: state.users.get('userFirstName'),
    authToken: state.users.get('authToken'),
	};
} 

function mapDispatchToProps(dispatch) {
  return {
    setUserID: (userID) => dispatch(setCurrentUserID(userID)),
    setUserFirstName: (username) => dispatch(setUserFirstName(username)),
    setAuthToken: (authToken) => dispatch(setAuthToken(authToken)),
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(NavigationRoot);


