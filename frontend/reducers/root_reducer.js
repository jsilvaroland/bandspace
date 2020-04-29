import { combineReducers } from 'redux';

import sessionReducer from '../reducers/session_reducer';
import uiReducer from '../reducers/ui_reducer';

const rootReducer = combineReducers({
    session: sessionReducer,
    ui: uiReducer,
});

export default rootReducer;