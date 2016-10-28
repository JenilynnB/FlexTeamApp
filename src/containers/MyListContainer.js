import { connect } from 'react-redux'
import MyList from '../components/MyList.js'

import { addListItem, removeListItem, editListItem } from '../actions'

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
  	removeListItem: (listItemID) => dispatch(removeListItem(listItemID)),
  	editListItem: (listItem, previousSection) => dispatch(editListItem(listItem, previousSection)),
  };
}



export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(MyList);