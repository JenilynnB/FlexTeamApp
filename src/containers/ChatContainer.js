import { connect } from 'react-redux'
import Chat from '../components/Chat.js'

import { addMessage, addHistory} from '../actions'

function mapStateToProps(state){
	return {
		userID: state.users.get('userID'),
		userFirstName: state.users.get('userFirstName'),
    authToken: state.users.get('authToken'),
    messages: state.chat.get('messages').toJS(),
    lastMessageTimestamp: state.users.get('lastMessageTimestamp'),
	};
}

function mapDispatchToProps(dispatch){
	return{
		addMessage: (message) => dispatch(addMessage(message)),
  	addHistory: (messages, timestamp) => dispatch(addHistory(messages, timestamp)),
  };
}



export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Chat);