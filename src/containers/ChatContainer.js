import { connect } from 'react-redux'
import Chat from '../components/Chat.js'

import { addMessage, addHistory} from '../actions'

function mapStateToProps(state){
	return {
		userID: state.users.get('userID'),
		userFirstName: state.users.get('userFirstName'),
    authToken: state.users.get('authToken'),
    history: state.app.get('messages').toJS(),
    lastMessageTimestamp: state.app.get('lastMessageTimestamp'),
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