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
const channel = 'list';

const publish_key = 'pub-c-04f04d57-09d0-428a-9ca9-c750a0811e17';
const subscribe_key = 'sub-c-e6204314-8430-11e6-a68c-0619f8945a4f';
const listSections = ['NOW', 'LATER', 'PROJECTS'];
const sectionPrefix = 'ID';

const pubnub = new PubNub({                         
  publishKey   : publish_key,
  subscribeKey : subscribe_key,
  ssl: true,
  uuid: username
});

		
var newArray = {}
newArray["ID0"] = "NOW";
newArray["ID1"] = "LATER";
newArray["ID2"] = "PROJECTS";
newArray["ID0:row45"] = "This is a thing";
newArray["ID1:row55"] = "Another thing";
newArray["ID2:row66"] = "Third thing";
var sectionIDs = ["ID0", "ID1", "ID2"];
var rowIDs = [['45'],['55'],['66']]

export default class MyList extends React.Component{
	

	constructor(){
		super();

		var ds = new ListView.DataSource({
	      	getSectionHeaderData: (dataBlob, sectionID) => dataBlob[sectionID],
	      	getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':row' + rowID],
	      	rowHasChanged: (row1, row2) => row1 !== row2,
	      	sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
	      });
		
		this.state = {
			data: newArray,
	    dataSource: ds.cloneWithRowsAndSections(newArray, sectionIDs, rowIDs),
	    sectionOpen: [true, true, true, true],
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
	}


	connect() { 
	    console.log("connect");
	    
	    pubnub.history(
	    	{
	      	channel: 'list',
	      	count: 50,
	      	callback: (response) => {
	      		console.log("callback");
	      		//console.log(status);
	      		console.log(response);
	      		//this.success(response.messages),
	      	}
	      	
	    	}
	    	
	    );
	}

	//Pubnub success callback
	success(m){
		console.log("success");
		
		/* The list sectionsIDs and rowIDs have to be the same length arrays (not associative) arrays either.
		 * The datablob holds the key-value pairs for the section header values. React
		 * Native is very stupid and hacky with sectioned lists right now.
		*/

		var ds = this.state.dataSource;
		var dataBlob = ds._dataBlob;
		var sectionIDs = ds.sectionIdentities;
		var rowIDs = ds.rowIdentities;
		
		//List sections are pre-assigned, as we know all the headers and empty sections will be displayed.
		for (var i = 0 ; i < listSections.length; i++){
			if (sectionIDs[sectionPrefix+i] === null){
				sectionIDs.push(sectionPrefix+i);
			}
			if (dataBlob[sectionPrefix+i] === null){
				dataBlob[sectionPrefix+i] = listSections[i];
			}
		}

		for (var i = 0; i<m.length; i++) {
			var item = m[i];
			
			var itemExists = false;
			for (id in rowIDs){
				if (item._id == id) {
					itemExists = true;
				}
			}

			if (!itemExists){
				rowIDs[item.list].push(item._id);
			}

			if (dataBlob[sectionPrefix+item.list+":row"+item._id] === undefined){
				dataBlob[sectionPrefix+item.list+":row"+item._id] = item.text;
			}
		}

		this.setState({
			dataSource : this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      
  	});
  	
		
	}

	toggleSectionOpen(sectionID){
		var sectionIndex = sectionID.substring(sectionPrefix.length);
		this.state.sectionOpen[sectionIndex] = !(this.state.sectionOpen[sectionIndex]);
		console.log("here");

		var ds = this.state.dataSource;
		var dataBlob = ds._dataBlob;
		var sectionIDs = ds.sectionIdentities;
		var rowIDs = ds.rowIdentities;

		this.setState({
			dataSource : this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      
  	});
	}

	deleteRow(sectionID, rowID) {
		/*
		rowMap[`${secId}${rowId}`].closeRow();
		const newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
		this.setState({listViewData: newData});
		*/
	}

	_renderRow(rowData, sectionID, rowID){
		var sectionIndex = sectionID.substring(sectionPrefix.length);
		
		console.log("row");
		console.log(this.state.sectionOpen[sectionIndex]);

		if (this.state.sectionOpen[sectionIndex]){
			return(

				<SwipeRow
            disableRightSwipe={true}
            disableLeftSwipe={false}
            leftOpenValue={20 + parseInt(rowID) * 5}
            rightOpenValue={-150}
        >
        	<View style={styles.rowBack}>
						
						<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnLeft]} onPress={ _ => this.deleteRow(sectionID, rowID) }>
							<Icon
								type = 'font-awesome'
								name = 'trash-o'
								color = '#fff'
								size = {18}
							/>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]}>
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
							<Text style={styles.rowText}>{rowData}</Text>
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
		}else{
			return null;
		}
	}

	_renderSectionHeader(headerData, sectionID){
		return(
			<TouchableOpacity
				onPress={()=>this.toggleSectionOpen(sectionID)}
				>
				<Text style={styles.header}>{headerData}</Text>
			</TouchableOpacity>
		);
	}

	render(){
		//console.log("data source");
		//console.log(this.state.dataSource);
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
