import * as UsersApiUtil from '../util/users_api_util';

export const RECEIVE_ALL_USERS = 'RECEIVE_ALL_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const CLEAR_ALL_USERS = 'CLEAR_USERS';

const receiveAllUsers = users => ({
    type: RECEIVE_ALL_USERS,
    users
});

const receiveUser = user => ({
    type: RECEIVE_USER,
    user
});

export const clearAllUsers = () => ({
    type: CLEAR_ALL_USERS,
});

export const fetchAllUsers = () => dispatch => {
    return UsersApiUtil.fetchAllUsers()
        .then(users => dispatch(receiveAllUsers(users)));
};

export const fetchUser = userId => dispatch => {
    return UsersApiUtil.fetchUser(userId)
        .then(user => dispatch(receiveUser(user)));
};

export const updateUser = user => dispatch => {
    return UsersApiUtil.updateUser(user)
        .then(user => dispatch(receiveUser(user)));
};