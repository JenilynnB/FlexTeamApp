import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  TouchableHighlight
} from 'react-native';
import SideMenu from 'react-native-side-menu'
import PubNub from 'pubnub';


import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import CustomActions from './CustomActions';
import CustomView from './CustomView';
import BotBubble from './BotBubble.js';
import botMessages from './data/bot-messages.js';


var username = 'Saujin';
const channel = 'main-chat';

const publish_key = 'pub-c-04f04d57-09d0-428a-9ca9-c750a0811e17';
const subscribe_key = 'sub-c-e6204314-8430-11e6-a68c-0619f8945a4f';

const pubnub = new PubNub({                         
  publishKey   : publish_key,
  subscribeKey : subscribe_key,
  ssl: true,
  uuid: username
});

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      userId: 1,
      chattingWith: 'chatbot',
      botState: 'welcome',
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);
    this.onBotActionClicked = this.onBotActionClicked.bind(this);

    this._isAlright = null;
  }

  componentWillMount() {
    
    //TODO: Get list of chat channels user is subscribed to
    //TODO: If no chat channel exists, create a new one

    pubnub.addListener({
      message: (m) => this.success([m.message])
    });
    
    pubnub.subscribe({
      channels: [channel],
    });

    this.sendBotMessage('welcome')
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // grab data from PubNub History API when PubNub is connected for the first time
  connect() { 
    pubnub.history({
      channel: channel,
      count: 50,
    });
  }

  //At the success callback, update the message list
  success(m){
    
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, m), 
      };
    });
     
  }

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
            messages: GiftedChat.prepend(previousState.messages, require('./data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    
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
    
    //If chatting with the bot, possibly do something with the message sent
    if (this.state.botState == 'addToList' && this.state.chattingWith == 'chatbot'){
      //TODO: add message[0] as a list item
      this.sendBotMessage('howUrgent');
    }
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
          /*
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
            */
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

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

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


  render() {

    return(
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}
        onBotActionClicked={this.onBotActionClicked}

        user={{
          _id: 1, // sent messages should have same user._id
        }}

        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
      );
  }
}

const styles = StyleSheet.create({
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
