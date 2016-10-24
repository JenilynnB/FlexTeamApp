import userReducer from './users';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    //routing: routerReducer,
    users: userReducer,
});

export default rootReducer;