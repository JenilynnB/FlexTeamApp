import { SET_CURRENT_USERID } from '../constants';
import { SET_AUTH_TOKEN } from '../constants';

export function setCurrentUserID(userID) {
    return {
        type: SET_CURRENT_USERID,
        payload: userID,
    };
}

export function setAuthToken(authToken) {
	return {
		type: SET_AUTH_TOKEN,
		payload: authToken,
	}
}

/*
export function addMessage(message) {
    return {
        type: ADD_MESSAGE,
        payload: message,
    };
}
*/