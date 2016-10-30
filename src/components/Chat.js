import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  TouchableHighlight,
  Alert,
  AsyncStorage
} from 'react-native';
import SideMenu from 'react-native-side-menu'
import PubNub from 'pubnub';


import {GiftedChat, Actions, Bubble, Avatar, Composer, Send} from 'react-native-gifted-chat';
import CustomActions from '../containers/CustomActions';
import CustomView from '../containers/CustomView';
import BotBubble from '../components/BotBubble.js';
import botMessages from '../data/bot-messages.js';

const publish_key = 'pub-c-04f04d57-09d0-428a-9ca9-c750a0811e17';
const subscribe_key = 'sub-c-e6204314-8430-11e6-a68c-0619f8945a4f';
var channel = '';

const pubnub = new PubNub({                         
  publishKey   : publish_key,
  subscribeKey : subscribe_key,
  ssl: true,
});


export default class Chat extends React.Component {
  static propTypes = {
    messages: React.PropTypes.array,
    lastMessageTimestamp: React.PropTypes.string,
    userID: React.PropTypes.string,
    addMessage: React.PropTypes.func,
    addHistory: React.PropTypes.func,
  }


  constructor(props) {
    super(props);
    /*
    this.state = {
      messages: [],
      //loadEarlier: true,
      //typingText: null,
      //isLoadingEarlier: false,
      userId: 1,
      //chattingWith: 'chatbot',
      //botState: 'welcome',
    };
    */

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderAvatar = this.renderAvatar.bind(this);
    //this.renderFooter = this.renderFooter.bind(this);
    //this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.onBotActionClicked = this.onBotActionClicked.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {
    //TODO: see if the user is logged in
    //If the user is logged in, set the user state in the app  
    AsyncStorage.getAllKeys((err, response) => console.log(response));
  }

  componentDidMount() {
    
    //TODO: Get list of chat channels user is subscribed to
    //TODO: If no chat channel exists, create a new one
    pubnub.uuid = this.props.userID;
    channel = this.props.userID + "_main";

    pubnub.addListener({
      message: (m) => this.success([m.message])
      //message: (m) => this.props.addMessage(m.message)
    });
    
    pubnub.subscribe({
      channels: [channel],
    });

    this.fetchHistory();
    //this.sendBotMessage('welcome')
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  fetchHistory = () => {
    const { props } = this;
    pubnub.history({
      channel: channel,
      count: 15,
      reverse: false,
      includeTimetoken: true,
      start: props.lastMessageTimestamp
    },
    function(status, response){
      if (!status.error){
        //console.log("fetch history response");
        //console.log(response);
        props.addHistory(response);
      }else{
        Alert.alert(
        'Error Fetching History',
        status,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]
      )
      }
      },
    );
  }

  //At the success callback, update the message list
  success(m){
    this.props.addMessage(m);
/*
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, m), 
      };
    });
    */
     
  }

/*
  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });
    

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('../data/old_messages.js')),
            //loadEarlier: false,
            //isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }
  */

  onSend(messages = []) {
    //console.log("sending");
    pubnub.publish({
      message: messages[0],
      channel: channel,
      },
      function (status, response) {
        if (status.error) {
          console.log(status) 
        }else{
          //console.log(response.timetoken)
          console.log(status)
        }
        
      }
    );
    
    /*
    //If chatting with the bot, possibly do something with the message sent
    if (this.state.botState == 'addToList' && this.state.chattingWith == 'chatbot'){
      //TODO: add message[0] as a list item
      this.sendBotMessage('howUrgent');
    }
    */
    // for demo purpose
    //this.answerDemo(messages);
  }

  onBotActionClicked(action){
    messageToSend = botMessages.find((m)=>m.key==action);
    if (messageToSend != null){
      this.sendBotMessage(action)
    }else{
      //Do something else that hasn't been built yet, like show a list
    }
  }

/*
  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'Chat Bot is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if(this.state.botState == 'addingListItem'){
            this.onReceive          
          
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
            
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }
  */

  sendBotMessage(action){
    messageToSend = botMessages.find((m)=>m.key==action);
    this.onSend([messageToSend]);
  }

  onReceive(text) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, {
          _id: Math.round(Math.random() * 1000000),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            // avatar: 'https://facebook.github.io/react/img/logo_og.png',
          },
        }),
      };
    });
  }
  
  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }
  renderAvatar(props){
    return (
      <Avatar
        {...props}
        imageStyle={{
          left: {
            backgroundColor: '#355376',
          },
        }}
      />
    );
  }

  renderBubble(props) {
    return (
      <BotBubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          },
        }}
      />
    );
  }

  renderComposer(props){
    return (
      <Composer
      {...props}
      placeholder="What's on your mind?"
      />
    );
  }
  renderSend(props){
    return (
      <Send
      {...props}
      textStyle={{color: '#66A1E6'}}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }
/*
  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }
*/

  render() {
    return(
      <View style={styles.container}>
        <GiftedChat
          messages={this.props.messages}
          onSend={this.onSend}
          onBotActionClicked={this.onBotActionClicked}

          user={{
            _id: this.props.userID,
            firstName: this.props.userFirstName,
          }}
          renderSend={this.renderSend}
          renderComposer={this.renderComposer}
          renderActions={this.renderCustomActions}
          renderBubble={this.renderBubble}
          renderAvatar={this.renderAvatar}
          renderCustomView={this.renderCustomView}
        />
      </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 49,
    flex: 1,
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});
