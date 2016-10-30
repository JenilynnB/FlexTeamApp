import { connect } from 'react-redux'
import AddToList from '../components/AddToList.js'

import { addListItem} from '../actions'

function mapStateToProps(state){

	return {
		userID: state.users.get('userID'),
		userFirstName: state.users.get('userFirstName'),
    authToken: state.users.get('authToken'),
    listItems: state.list.get('listItems'),
	};
}

function mapDispatchToProps(dispatch){
	return{
		addListItem: (listItem) => dispatch(addListItem(listItem)),
		editListItem: (listItem) => dispatch(editListItem(listItem)),
  };
}

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(AddToList);