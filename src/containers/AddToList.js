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

var username = 'Saujin';
const channel = 'list5';
const user = {"_id": "4","name": "Saujin"}

const publish_key = 'pub-c-04f04d57-09d0-428a-9ca9-c750a0811e17';
const subscribe_key = 'sub-c-e6204314-8430-11e6-a68c-0619f8945a4f';
const options = ['NOW', 'LATER', 'LIVE CHAT'];


const pubnub = new PubNub({                         
  publishKey   : publish_key,
  subscribeKey : subscribe_key,
  ssl: true,
  uuid: username
});


export default class AddToList extends React.Component{

  constructor(){
    super();

    this.state = {
      selectedOption: options[0],
    }

  }

  setSelectedOption(selectedOption){
    
console.log(this.state.selectedOption);
    this.state = {
      selectedOption: selectedOption,
    };
    
  }

  renderOption(option, selected, onSelect, index){
    
    var btnStyle = selected ? {fontWeight: 'bold', color: '#66A1E6'} : { color: '#E2E2E2'};
    return (
      <TouchableOpacity onPress={onSelect} key={index} style={styles.button}>
        <Text style={btnStyle}>{option}</Text>
      </TouchableOpacity>
    );
  }


  render(){
    var placeholderString = "What would you like to add to your list?" + "\n" + "You can choose where to store this item or live chat about it";

    return(
      <View style={styles.container}>
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} placeholder={placeholderString}/>
        </View>
        
          <RadioButtons
            options = {options}
            onSelection = {this.setSelectedOption.bind(this)}
            selectedOption = {this.state.selectedOption}
            renderOption = {this.renderOption}
            renderContainer = {RadioButtons.renderHorizontalContainer}
            />
    
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
