import { SET_CURRENT_USERID, SET_CURRENT_USER_FIRSTNAME, SET_AUTH_TOKEN } from '../constants';
import { ADD_MESSAGE, ADD_HISTORY } from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
    userID: "",
    userFirstName: "",
    authToken: "",
    //messages: [],
    //lastMessageTimestamp: null,
});


function userReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
  case SET_CURRENT_USERID:
		return state.update('userID', () => action.payload);
	case SET_CURRENT_USER_FIRSTNAME:
		return state.update('userFirstName', () => action.payload);
	case SET_AUTH_TOKEN:
    return state.update('authToken', () => action.payload);
  /*
  case ADD_MESSAGE:
      console.log("hellooooooo");
      return state
      .update('messages', (messages) => messages.concat(action.payload));
    case ADD_HISTORY:
      return state
      .update('messages', (messages) => messages.unshift(...action.payload.messages))
      .update('lastMessageTimestamp', () => action.payload.timestamp); 
      */
  default:
      return state;
  }
}
export default userReducer;