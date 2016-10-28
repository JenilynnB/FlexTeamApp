import { ADD_MESSAGE, ADD_HISTORY } from '../constants';
import { fromJS } from 'immutable';

const INITIAL_STATE = fromJS({
    messages: [],
    lastMessageTimestamp: null,
});

function chatReducer(state = INITIAL_STATE, action = {}){
	switch(action.type){
		case ADD_MESSAGE:
			return state
			.update('messages', (messages) => messages.unshift(...action.payload));
		case ADD_HISTORY:
			var responseMessages = action.payload.messages.messages;
			responseMessages = responseMessages.map( m => m.entry );
			return state
			.update('messages', (messages) => messages.concat(responseMessages))
			.update('lastMessageTimestamp', () => action.payload.timestamp);
		default:
			return state;
	}

}

export default chatReducer;
