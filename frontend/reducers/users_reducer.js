import { RECEIVE_ALL_USERS, RECEIVE_USER, CLEAR_ALL_USERS } from '../actions/users_actions';
import { RECEIVE_CURRENT_USER } from '../actions/session_actions';

const usersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    const newState = Object.assign({}, oldState);
    switch (action.type) {
        case RECEIVE_ALL_USERS:
            return Object.assign(newState, action.users);
        case RECEIVE_USER:
            return Object.assign(newState, { [action.user.id]: action.user }); // is this even needed, doesn't change anythign might be needed later for update user?
        case RECEIVE_CURRENT_USER:
            newState[action.currentUser.id] = action.currentUser;
            return newState;
        case CLEAR_ALL_USERS:
            return {};
        default:
            return oldState;        
    }
};

export default usersReducer;