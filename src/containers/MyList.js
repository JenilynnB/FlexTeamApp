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
import PubNub from 'pubnub';
import { Icon } from 'react-native-elements'

var username = 'Saujin';
const channel = 'list5';
const user = {"_id": "4","name": "Saujin"}

const publish_key = 'pub-c-04f04d57-09d0-428a-9ca9-c750a0811e17';
const subscribe_key = 'sub-c-e6204314-8430-11e6-a68c-0619f8945a4f';
const listSections = ['NOW', 'LATER', 'PROJECTS', 'COMPLETE'];
const completeSectionID = 3;
const sectionPrefix = 'ID';

const pubnub = new PubNub({                         
  publishKey   : publish_key,
  subscribeKey : subscribe_key,
  ssl: true,
  uuid: username
});


export default class MyList extends React.Component{
	
	constructor(){
		super();

		var ds = new ListView.DataSource({
	      	rowHasChanged: (row1, row2) => row1 !== row2,
	      	sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
	      });

		this.state = {
			data: [],
			dataSource: ds.cloneWithRowsAndSections([]),
	  }
	}


	componentWillMount() {

		this.connect();
	  pubnub.addListener({
      message: (m) => this.success([m.message])
    });
	    
    pubnub.subscribe({
      channels: [channel],
    });   

    pubnub.setFilterExpression("user != " + pubnub.uuid); 
	}


	connect() { 
	    console.log("connect");
	    var self = this;
	    pubnub.history(
		  	{
		      channel: channel,
		      count: 50
		  	},
		    function (status, response) {
		        self.success(response.messages);
		    }
			);
	}

	//Pubnub success callback
	success(m){
		console.log("success");

		var data = this.convertListDatatoMap(m);
		console.log(data);

		this.setState({
			data: data,
			dataSource : this.state.dataSource.cloneWithRowsAndSections(data),
      
  	});
  	
	}

	convertListDatatoMap(data){

		var listSectionsMap = {};  // Create the blank map

		for (var i = 0; i<data.length; i++) {
			var item = data[i];
			
			var newListSectionsMap = this.addItemToListMap(item, listSectionsMap);
		}
		return newListSectionsMap;
	}

	addItemToListMap(item, listSectionsMap){
		
		console.log("adding to map");
		//Items from history are formatted slightly differently, this extracts them
		if (item.entry != undefined) {
			item = item.entry;
		}

		if(item.deleted != true){
			var sectionName = listSections[item.list];
			if (!listSectionsMap[sectionName]){
				listSectionsMap[sectionName] = [];
			}

			listSectionsMap[sectionName].push(item);
			console.log(listSectionsMap[sectionName]);
			console.log(listSectionsMap[sectionName].length);
		}


		return listSectionsMap
	}
	

	deleteRow(sectionID, rowID, rowMap) {
		
		console.log('deleting row');
		var data = Object.assign({}, this.state.data);
		var item = data[sectionID][rowID];

		item.deleted = true;

		rowMap[`${sectionID}${rowID}`].closeRow();
		
		data[sectionID].splice(rowID, 1);

		console.log(data[sectionID]);
		console.log(data[sectionID].length);
		if (data[sectionID].length == 0 ){
			console.log("deleting section");
			delete data[sectionID];
		}


		this.setState({
			data: data,
			dataSource : this.state.dataSource.cloneWithRowsAndSections(data),
      
  	});

		pubnub.publish({
			message: item,
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

	}


	markRowComplete(sectionID, rowID, rowMap){
		
		console.log("marking complete");
		var data = Object.assign({}, this.state.data);
		var item = data[sectionID][rowID];
		var newItem = Object.assign({}, item);

		
		this.deleteRow(sectionID, rowID, rowMap);

		newItem.list = completeSectionID;
		var newList = this.addItemToListMap(newItem, data);

		this.setState({
			data: newList,
			dataSource : this.state.dataSource.cloneWithRowsAndSections(newList),
      
  	});

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

	}


	_renderRow(rowData, sectionID, rowID, rowMap){
			//var sectionIndex = sectionID.substring(sectionPrefix.length);
			console.log("rendering row");

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
		console.log(headerData);
		console.log(sectionIndex);
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
