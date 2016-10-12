import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
} from 'react-native'

import PubNub from 'pubnub';

var username = 'Saujin';
const channel = 'list';

const publish_key = 'pub-c-04f04d57-09d0-428a-9ca9-c750a0811e17';
const subscribe_key = 'sub-c-e6204314-8430-11e6-a68c-0619f8945a4f';

const listSections = ['NOW', 'LATER', 'PROJECTS'];

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
	      	getSectionHeaderData: (dataBlob, sectionID) => dataBlob[sectionID],
	      	getRowData: (dataBlob, sectionID, rowID) => dataBlob[sectionID + ':row' + rowID],
	      	rowHasChanged: (row1, row2) => row1 !== row2,
	      	sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
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
		
		this.state = {
	    dataSource: ds.cloneWithRowsAndSections(newArray, sectionIDs, rowIDs)
	  }
	}


	componentWillMount() {

	  pubnub.addListener({
      message: (m) => this.success([m.message])
    });
	    
    pubnub.subscribe({
      channels: [channel],
    });

    //this.connect();
	}


	connect() { 
	    console.log("connect");
	    
	    pubnub.history(
	    	{
	      	channel: channel,
	      	count: 50,
	      	callback: (status, response) => this.setState(this.success(response.messages)),
	    	}
	    	
	    	//function (status, response) {
	      	//this.state = this.success(response.messages);
	      	//this.setState(this.success(response.messages));
	    	//}

	    );
	}

	//Pubnub success callback
	success(m){
		
		var ds = this.state.dataSource;
		var dataBlob = ds._dataBlob;
		var sectionIDs = ds.sectionIdentities;
		var rowIDs = ds.rowIdentities;
		
		/*
		var dataBlob = {},
			sectionIDs = [],
			rowIDs = [[],[],[]],
			item;
		*/

		/* The list sectionsIDs and rowIDs have to be the same length arrays (not associative) arrays either.
		 * The datablob holds the key-value pairs for the section header values. React
		 * Native is very stupid and hacky with sectioned lists right now.
		*/

		//List sections are pre-assigned, as we know all the headers and empty sections will be displayed.
		for (var i = 0 ; i < listSections.length; i++){
			if (sectionIDs["ID"+i] === null){
				sectionIDs.push("ID"+i);
			}
			if (dataBlob["ID"+i] === null){
				dataBlob["ID"+i] = listSections[i];
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

			if (dataBlob["ID"+item.list+":row"+item._id] === undefined){
				dataBlob["ID"+item.list+":row"+item._id] = item.text;
			}
			
		}

		this.setState({
			dataSource : this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
      
  	});
  	
		
	}

	render(){

		console.log("data source");
		console.log(this.state.dataSource);
		return(
			<View style={styles.container}>
				<ListView
					dataSource = {this.state.dataSource}
					renderRow = {(rowData) => <View style={styles.rowContainer}><Text style={styles.rowText}>{rowData}</Text></View>}
					renderSectionHeader = {(headerData) => <Text style={styles.header}>{headerData}</Text>}
					enableEmptySections = {true}
				/>
			</View>
				

			)
	}

}


var styles = StyleSheet.create ({

	container: {
		marginTop: 100,
		backgroundColor: '#f1f0f0',
		//TODO: Background color needs to be made to 40% opacity
	},
	rowContainer:{
		borderWidth: 1,
		borderColor: "#e2e2e2",
		borderRadius: 4,
		padding: 15,
		backgroundColor: "#fff",
		marginLeft: 4,
		marginRight: 4,
		marginTop: 2,
		marginBottom: 2
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

	}
})
