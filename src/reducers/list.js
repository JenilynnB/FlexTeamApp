import { ADD_LIST_ITEM, REMOVE_LIST_ITEM, EDIT_LIST_ITEM, ADD_LIST_HISTORY } from '../constants';
import { fromJS, toJS, isMap } from 'immutable';

const INITIAL_STATE = fromJS({
    //rawListItems: [],
    listItems: {},
    sectionIDs: [],
});

function listReducer(state = INITIAL_STATE, action = {}){
	switch(action.type){
		case ADD_LIST_ITEM:
			//Table accepts the following list format { sectionID_1: { rowID_1: <rowData1>, ... }, ... }

			var item = action.payload;
			console.log("add list item reducer");
			console.log(item);

			var formattedItem = [];
			//Item is formatted for use in ListView
			formattedItem = {_id: item._id, text: item.text};

			return state
			.update('listItems', (listItems) => 
				{
					//Tricky way to clone object, to keep function pure (Object.assign throws error)
					var listCopy = JSON.parse(JSON.stringify(listItems));
					if (listCopy[item.type] === undefined){
						listCopy[item.type] = [];
					}
					var newListSection = listCopy[item.type].concat([formattedItem])
					listCopy[item.type] = newListSection;
					console.log(listCopy);
					return listCopy;
					
				});
		case EDIT_LIST_ITEM:
			
			var item = action.payload.listItem;
			var previousSection = action.payload.previousSection;

			var formattedItem = [];
			formattedItem = {_id: item._id, text: item.text};

			return state
			.update('listItems', (listItems) => 
				{
					//assigning new variable to avoid mutations
					var listCopy = JSON.parse(JSON.stringify(listItems));
					
					//Loop through the previous section until a match is found
					for(var j = 0; j < listCopy[previousSection].length; j++){
						if (listCopy[previousSection][j]._id == item._id){
							//This is the item to be changed. Remove it
							listCopy[previousSection].splice(j, 1);
						}
					}

					//If the section is now empty, delete it
					if (listCopy[previousSection].length == 0){
						delete listCopy[previousSection];
					}
					//If the new section doesn't exist, create it
					if (listCopy[item.type] === undefined){
						listCopy[item.type] = [];
					}

					var newListSection = listCopy[item.type].concat([formattedItem])
					listCopy[item.type] = newListSection;
					return listCopy;
					
				});

		case REMOVE_LIST_ITEM:
			var item = action.payload;
			
			return state
			.update('listItems', (listItems) => 
				{
					//assigning new variable to avoid mutations
					var listCopy = JSON.parse(JSON.stringify(listItems));
					
					//Loop through the list section until a match is found
					for(var j = 0; j < listCopy[item.type].length; j++){
						if (listCopy[item.type][j]._id == item._id){
							//This is the item to be changed. Remove it
							listCopy[item.type].splice(j, 1);
						}
					}

					//If the section is now empty, delete it
					if (listCopy[item.type].length == 0){
						delete listCopy[item.type];
					}
					
					return listCopy;
					
				});
		case ADD_LIST_HISTORY:	
				
		default:
			return state;
	}

}

function listViewReducer(state = INITIAL_STATE, action){
	//Calls the list reducer with the ation and returns the new state
	var newState = listReducer(state, action);
	
	return newState
	.update('sectionIDs', (sectionIDs) =>
		{
			console.log("list view reducer");
			console.log(newState);
		}
	);

}

export default listReducer;
