import userReducer from './users';
import chatReducer from './chat';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    users: userReducer,
    chat: chatReducer,
});

export default rootReducer;