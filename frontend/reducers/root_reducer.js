import { combineReducers } from 'redux';

import entitiesReducer from '../reducers/entities_reducer';
import uiReducer from '../reducers/ui_reducer';
import errorsReducer from '../reducers/errors_reducer';
import sessionReducer from '../reducers/session_reducer';


const rootReducer = combineReducers({
    entities: entitiesReducer,
    ui: uiReducer,
    errors: errorsReducer,
    session: sessionReducer,
});

export default rootReducer;