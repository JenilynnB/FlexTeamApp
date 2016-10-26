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
			//console.log("ADD HISTORY reducer");
			//console.log(action.payload);
			//function getMessage{} (m) => m.entry};
			var responseMessages = action.payload.messages.messages;
			//var messagesToAdd = responseMessages.map( m => m.entry );
			//console.log(messagesToAdd);
			return state
			.update('messages', (messages) => messages.concat(responseMessages.map( m => m.entry )))
			.update('lastMessageTimestamp', () => action.payload.timestamp);
		default:
			return state;
	}

}

export default chatReducer;
