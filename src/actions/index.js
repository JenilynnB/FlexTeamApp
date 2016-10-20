import { SET_CURRENT_USERID } from '../constants';

export function setCurrentUserID(userID) {
    return {
        type: SET_CURRENT_USERID,
        payload: userID,
    };
}

/*
export function addMessage(message) {
    return {
        type: ADD_MESSAGE,
        payload: message,
    };
}
*/