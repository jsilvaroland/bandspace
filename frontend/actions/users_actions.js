import * as UsersApiUtil from '../util/users_api_util';

export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';

const receiveAllUsers = users => ({
    type: RECEIVE_ALL_USERS,
    users
});

export const fetchAllUsers = () => dispatch => {
    // do I need something here
    return UsersApiUtil.fetchAllUsers()
        .then( users => dispatch(receiveAllUsers(users)));
};