import { combineReducers } from 'redux';
import sessionReducer from '../reducers/session_reducer';

const rootReducer = combineReducers({
    session: sessionReducer
});

export default rootReducer;