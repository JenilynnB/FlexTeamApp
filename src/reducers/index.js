import userReducer from './users';
import chatReducer from './chat';
import listReducer from './list';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    users: userReducer,
    chat: chatReducer,
    list: listReducer
});

export default rootReducer;