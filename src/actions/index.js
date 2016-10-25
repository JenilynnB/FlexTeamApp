import { SET_CURRENT_USERID, SET_CURRENT_USER_FIRSTNAME, SET_AUTH_TOKEN, ADD_MESSAGE, ADD_HISTORY } from '../constants';

export function setCurrentUserID(userID) {
    return {
        type: SET_CURRENT_USERID,
        payload: userID,
    };
}

export function setUserFirstName(userName){
	return {
		type: SET_CURRENT_USER_FIRSTNAME,
		payload: userName,
	}
}

export function setAuthToken(authToken) {
	return {
		type: SET_AUTH_TOKEN,
		payload: authToken,
	}
}


export function addMessage(message) {
    return {
        type: ADD_MESSAGE,
        payload: message,
    };
}

export function addHistory(messages, timestamp) {
	return {
		type: ADD_HISTORY,
		payload: {history, timestamp}

	}
}