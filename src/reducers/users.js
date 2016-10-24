import { SET_CURRENT_USERID, SET_CURRENT_USER_FIRSTNAME, SET_AUTH_TOKEN } from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
    userID: "",
    userFirstName: "",
    authToken: "",
});


function userReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case SET_CURRENT_USERID:
		return state.update('userID', () => action.payload);
	case SET_CURRENT_USER_FIRSTNAME:
		return state.update('userFirstName', () => action.payload);
	case SET_AUTH_TOKEN:
    return state.update('authToken', () => action.payload);
   
  default:
      return state;
  }
}
export default userReducer;