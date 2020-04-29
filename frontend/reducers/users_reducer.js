import { RECEIVE_ALL_USERS } from '../actions/users_actions';

// at some point put logic in to only fetch artist. Maybe not in this file

const usersReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    const newState = Object.assign({}, oldState);
    switch (action.type) {
        case RECEIVE_ALL_USERS:
            return Object.assign(newState, action.users);
        default:
            return oldState;        
    }
};

export default usersReducer;