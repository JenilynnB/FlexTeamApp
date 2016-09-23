module.exports = [
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
      {text: 'ADD TO MY LIST', action: 'something here'},
      {text: 'REVIEW MY LIST', action: 'something here'},
      {text: 'LIVE CHAT WITH FLEXTEAM', action: 'something here'},
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
      {text: 'CANCEL', action: 'something here'},
      ],
  },
];
