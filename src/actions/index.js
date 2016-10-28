import { SET_CURRENT_USERID, SET_CURRENT_USER_FIRSTNAME, SET_AUTH_TOKEN } from '../constants';
import { ADD_MESSAGE, ADD_HISTORY } from '../constants';
import { ADD_LIST_ITEM, REMOVE_LIST_ITEM, EDIT_LIST_ITEM } from '../constants';
import { PUSH, POP} from '../constants';

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
		payload: {messages, timestamp}

	}
}

export function addListItem(listItem) {
	return {
		type: ADD_LIST_ITEM,
		payload: listItem
	}
}

export function removeListItem(listItem) {
	return {
		type: REMOVE_LIST_ITEM,
		payload: listItem
	}
}

export function editListItem(listItem, previousSection) {
	return {
		type: EDIT_LIST_ITEM,
		payload: {listItem, previousSection}
	}
}

export function addListHistory(list){
	return {
		type: ADD_LIST_HISTORY,
		payload: list
	}
}