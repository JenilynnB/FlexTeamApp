import {
  AppRegistry,
} from 'react-native';
import React from 'react'
import { Provider } from 'react-redux'

import RootNav from './containers/RootNav.js';
import configureStore from './store/configureStore.js'


const store = configureStore()

const App = () => (
  <Provider store={store}>
    <RootNav />
  </Provider>
)


AppRegistry.registerComponent('FlexTeam', () => App);
