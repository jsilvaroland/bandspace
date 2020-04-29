import { 
    RECEIVE_CURRENT_USER, 
    LOGOUT_CURRENT_USER
} from '../actions/session_actions';

const _nullUser = Object.freeze({ id: null });

const sessionReducer = (oldState = _nullUser, action) => {
    Object.freeze(oldState);
    const newState = Object.assign({}, oldState);
    switch (action.type) {
        case RECEIVE_CURRENT_USER:
            return Object.assign(newState, { id: action.currentUser.id });
        case LOGOUT_CURRENT_USER:
            return Object.assign(newState, _nullUser);
        default:
            return oldState;
    }
};

export default sessionReducer;