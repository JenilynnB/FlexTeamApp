import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ListView,
} from 'react-native'
import PubNub from 'pubnub';
import { RadioButtons } from 'react-native-radio-buttons'
import { addListItem } from '../components/Remote.js';

const options = [
  {key: "now", label:"NOW"}, 
  {key:"later", label:"LATER"}, 
  {key: "liveChat", label:"LIVE CHAT"}];

export default class AddToList extends React.Component{

  static propTypes = {
      addListItem: React.PropTypes.func,
      editListItem: React.PropTypes.func
  }

  constructor(){
    super();

    this.state = {
      selectedOption: options[0],
      itemText: "",
    }

  }

  async submitNewItem(){
    //A temporary ID is created to insert the item in the table
    console.log("adding a list item");
    var tmpID = Math.round(Math.random() * 1000000);
    var listItem = {"_id": tmpID, "text": this.state.itemText, "type": this.state.selectedOption.key};
    console.log(tmpID);
    console.log(listItem);

    this.props.addListItem(listItem);
    

    var authToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOiI1ODEwMTZmOTlkMDBjMzAwMDNkMDhlMDEiLCJleHBpcmVzSW4iOiIyMDE2LTExLTA0VDE0OjQ1OjE0Ljk4MFoifQ.zo1hZZFfIorieNTunJbYZQBwWVhjY6ZOYXvHXONpFFM';
    var newListItemID = await addListItem(authToken, listItem);
    
    console.log("we got here");
    //When id is returned from server, list item is updated in table
    listItem._id = newListItemID;
    console.log(newListItemID);
    //var newList = this.props.editListItem(listItem);

    console.log("and then here");
    var navigator = this.props.navigator;
    navigator.pop();
  }


  setSelectedOption(selectedOption){
    
    this.setState({
      selectedOption: selectedOption,
    });
    
  }

  renderOption(option, selected, onSelect, index){
    
    var btnStyle = selected ? {fontWeight: 'bold', color: '#66A1E6'} : { color: '#E2E2E2'};
    return (
      <TouchableOpacity onPress={onSelect} key={index} style={styles.button}>
        <Text style={btnStyle}>{option.label}</Text>
      </TouchableOpacity>
    );
  }


  render(){
    var placeholderString = "What would you like to add to your list?" + "\n" + "You can choose where to store this item or live chat about it";

    return(
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput 
            style={styles.textInput} 
            placeholder={placeholderString} 
            onChangeText={(text) => this.setState({itemText: text})}
          />
        </View>
        
        <RadioButtons
          options = {options}
          onSelection = {this.setSelectedOption.bind(this)}
          selectedOption = {this.state.selectedOption}
          renderOption = {this.renderOption}
          renderContainer = {RadioButtons.renderHorizontalContainer}
          
          />
        <TouchableOpacity onPress={ _ => this.submitNewItem() }>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>

    )
  }
}

var styles = StyleSheet.create ({
  container: {
    backgroundColor: '#f1f0f0',
    flex: 1,
    paddingTop: 64,
  },
  textInputContainer: {
    paddingTop: 50,
  },  
  textInput: {
    height: 150,
    borderRadius: 4,
    padding: 10,
    borderColor: "#E2E2E2",
    backgroundColor: "#fff",  
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
    
  },
  button:{
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E2E2',

  },
  buttonText:{
    color: '#E2E2E2'
  },
  selectedButtonText:{
    fontWeight: 'bold', 
    color: '#66A1E6'
  }
});
