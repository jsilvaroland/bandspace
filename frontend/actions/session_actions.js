import * as SessionApiUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER,
});

const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const clearErrors = () => ({
    type: CLEAR_SESSION_ERRORS,
    errors: []
});

export const signup = user => dispatch => (
    SessionApiUtil.signup(user)
        .then(user => dispatch(receiveCurrentUser(user)))
        .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const login = user => dispatch => (
    SessionApiUtil.login(user)
        .then(user => dispatch(receiveCurrentUser(user)))
        .fail(errors => dispatch(receiveErrors(errors.responseJSON)))
);

export const logout = () => dispatch => (                   // may need to pass in user here later to reroute to user's show page after logout
    SessionApiUtil.logout()
        .then(user => dispatch(logoutCurrentUser())) 
);