import appReducer from './app';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    //routing: routerReducer,
    app: appReducer,
});

export default rootReducer;