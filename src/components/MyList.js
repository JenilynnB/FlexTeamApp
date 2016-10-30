import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
} from 'react-native'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { Icon } from 'react-native-elements'
import { getList, editListItem, deleteListItem } from '../components/Remote.js';

const authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1ODEwMTZmOTlkMDBjMzAwMDNkMDhlMDEiLCJleHBpcmVzSW4iOiIyMDE2LTExLTA0VDE0OjQ1OjE0Ljk4MFoifQ.zo1hZZFfIorieNTunJbYZQBwWVhjY6ZOYXvHXONpFFM';
	

export default class MyList extends React.Component{
	static propTypes = {
    
    userID: React.PropTypes.string,
    userFirstName: React.PropTypes.string,
    authToken: React.PropTypes.string,

    listItems: React.PropTypes.object,
    addListItem: React.PropTypes.func,
    removeListItem: React.PropTypes.func,
    editListItem: React.PropTypes.func,

    dataSource: React.PropTypes.object,
  }
	
	constructor(){
		super();

		var ds = new ListView.DataSource({
	      	rowHasChanged: (row1, row2) => row1 !== row2,
	      	sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
	      });

		this.state = {
			dataSource: ds.cloneWithRowsAndSections([]),
	  }
	}

	componentWillReceiveProps(nextProps) {
		
		if(nextProps.listItems !== this.props.listItems){
			let data = nextProps.listItems;
			console.log("component will recieve props");
			console.log(data);
			this.setState ({
				dataSource: this.state.dataSource.cloneWithRowsAndSections(data)
			});

		}
	}

	componentWillMount() {
		
		//Get initial list when component first mounts
		this.fetchListData();
	}


	async fetchListData(){
			
		var listData = await getList(authToken);
		
		for (var i = listData.length - 1; i >= 0; i--) {
			//console.log("adding a list item");
			this.props.addListItem(listData[i]);
			
		}
		
	}



	deleteRow(sectionID, rowID, rowMap) {
		
		//console.log("deleting row");
		//Get the current list item id

		console.log("deleting row");
		console.log(sectionID);
		console.log(rowID);
		rowMap[`${sectionID}${rowID}`].closeRow();

		var itemToDelete = this.props.listItems[sectionID][rowID];
		var itemToDeleteFormatted = {_id: itemToDelete._id, type: sectionID}
		this.props.removeListItem(itemToDeleteFormatted);
/*
		this.setState({
			dataSource : this.state.dataSource.cloneWithRowsAndSections(this.props.listItems),
  	});
*/
		//Remote method to delete from server
		deleteListItem(authToken, itemToDeleteFormatted);

	}


	markRowComplete(sectionID, rowID, rowMap){
		
		//console.log("marking complete");
		//Get the current list item id

		rowMap[`${sectionID}${rowID}`].closeRow();

		var itemToEdit = this.props.listItems[sectionID][rowID];
		var itemID = itemToEdit._id;

		var newItem = {_id: itemID, type: "complete", text: itemToEdit.text}
		var newList = this.props.editListItem(newItem, sectionID);
		
		//Remote method to delete from server
		editListItem(authToken, newItem);
		/*
		this.setState({			
			dataSource : this.state.dataSource.cloneWithRowsAndSections(newList),
  	});

  	*/


/*
		pubnub.publish({
			message: newItem,
			channel: channel,
			meta: {userDevice: pubnub.uuid}
		},
		function(status, response){
			if (status.error) {
        // handle error
        console.log(status)
      } else {
        console.log("message Published w/ timetoken", response.timetoken)
      }
		});
*/
	}


	_renderRow(rowData, sectionID, rowID, rowMap){
			//var sectionIndex = sectionID.substring(sectionPrefix.length);
			return(

				<SwipeRow
            disableRightSwipe={true}
            disableLeftSwipe={false}
            leftOpenValue={20 + parseInt(rowID) * 5}
            rightOpenValue={-150}
        >
        	<View style={styles.rowBack}>
						
						<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.deleteRow(sectionID, rowID, rowMap) }>
							<Icon
								type = 'font-awesome'
								name = 'trash-o'
								color = '#fff'
								size = {18}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress= { _ => this.markRowComplete(sectionID, rowID, rowMap)} >
							<Icon
								type = 'font-awesome'
								name = 'check'
								color = '#fff'
								size = {18}
								iconStyle = {{fontWeight:'100'}}
							/>
						</TouchableOpacity>
					</View>

					<TouchableHighlight >
						<View style={styles.rowContainer}	>
							<Text style={styles.rowText}>{rowData.text}</Text>
							<View style={styles.chevronContainer}>
								<Icon
				          style={styles.chevron}
				          size={28}
				          name={'chevron-right'}
				          color={'#66A1E6'} />
				      </View>
			      </View>
					</TouchableHighlight>
				</SwipeRow>
			);

	}

	_renderSectionHeader(headerData, sectionIndex){
		return(
			<TouchableOpacity
				onPress={()=>this.toggleSectionOpen(sectionIndex)}
				>
				<Text style={styles.header}>{sectionIndex}</Text>
			</TouchableOpacity>
		);
	}

	render(){

		return(
			<View style={styles.container}>
				<SwipeListView
					dataSource = {this.state.dataSource}
					renderRow = {this._renderRow.bind(this)}
					renderSectionHeader = {this._renderSectionHeader.bind(this)}
					enableEmptySections = {true}
				/>
			</View>
				

			)
	}

}


var styles = StyleSheet.create ({

	container: {
		//marginTop: 100,
		backgroundColor: '#f1f0f0',
		flex: 1,
		paddingTop: 64,
		marginBottom: 50,
		//TODO: Background color needs to be made to 40% opacity
	},
	rowContainer:{
		borderWidth: 1,
		borderColor: "#e2e2e2",
		borderRadius: 4,
		padding: 10,
		paddingLeft: 15,
		backgroundColor: "#fff",
		marginLeft: 4,
		marginRight: 4,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
	},
	rowText:{
		color:"#66A1E6",
		fontSize: 15,	
		fontFamily: "OpenSans"
	},
	header: {
		color: "#355376",
		fontWeight: "bold",
		fontFamily: "OpenSans",
		padding: 8,

	},
	chevronContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',

  },
  chevron: {
  },
  rowBack: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
		marginLeft: 4,
		marginRight: 4,
		borderRadius: 5,
	},
	backRightBtn: {
		alignItems: 'center',
		bottom: 0,
		justifyContent: 'center',
		position: 'absolute',
		top: 0,
		width: 75
	},
	backRightBtnLeft: {
		backgroundColor: '#7F7F7F',
		right: 75
	},
	backRightBtnRight: {
		backgroundColor: '#66A1E6',
		right: 0,
		borderTopRightRadius: 5,
		borderBottomRightRadius: 5,
	},
	icon: {
		color: "#fff",
	},

})
