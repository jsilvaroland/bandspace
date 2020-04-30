import { 
    RECEIVE_SESSION_ERRORS,
    CLEAR_SESSION_ERRORS,
    // RECEIVE_CURRENT_USER 
} from '../actions/session_actions';

import { CLOSE_MODAL } from '../actions/modal_actions';

const sessionErrorsReducer = (oldState = [], action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_SESSION_ERRORS:
            return action.errors;
        case CLEAR_SESSION_ERRORS:
            return [];
        // case RECEIVE_CURRENT_USER:
        case CLOSE_MODAL:
            return [];
        default:
            return oldState;
    }
};

export default sessionErrorsReducer;