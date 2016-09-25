

botMessages = [
  {
    _id: Math.round(Math.random() * 1000000),
    key: 'welcome',
    text: 'Welcome Saujin. What would you like to do?',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Chat Bot',
    },
    messageActions: [
      {text: 'ADD TO MY LIST', action: 'addToList'},
      {text: 'REVIEW MY LIST', action: 'reviewList'},
      {text: 'LIVE CHAT WITH FLEXTEAM', action: 'initiateLiveChat'},
      ],
  },


  {
    _id: Math.round(Math.random() * 1000000),
    key: 'welcomeBack',
    text: 'Hi Saujin, Welcome back. What would you like to do?',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Chat Bot',
    },
    messageActions: [
      {text: 'ADD TO MY LIST', action: 'addToList'},
      {text: 'REVIEW MY LIST', action: 'reviewList'},
      {text: 'LIVE CHAT WITH FLEXTEAM', action: 'initiateLiveChat'},
      ],
  },

  {
    _id: Math.round(Math.random() * 1000000),
    key: 'addToList',
    text: 'Ok, let\'s add to your list. What would you like to add?',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Chat Bot',
    },
  },

  {
    _id: Math.round(Math.random() * 1000000),
    key: 'howUrgent',
    text: 'Great. Can you tell me how urgent this item is?',
    createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
    user: {
      _id: 2,
      name: 'Chat Bot',
    },
    messageActions: [
      {text: 'NEED IT NOW', action: 'something here'},
      {text: 'HOLD UNTIL NEXT CHECKIN', action: 'something here'},
      {text: 'CANCEL', action: 'cancel'},
      ],
  },
];

module.exports = botMessages;
