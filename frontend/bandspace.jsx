import React from 'react';
import ReactDOM from 'react-dom';

import Root from './components/root';
import configureStore from './store/store';

// testing
import { signup, login, logout } from './actions/session_actions';

import { fetchAllUsers, fetchUser, updateUser } from './actions/users_actions';
// end testing

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('root');
    let store;
    if (window.currentUser) {
        const preloadedState = {
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        // delete window.currentUser;        
    } else {
        store = configureStore();
    }

    // testing
    window.getState = store.getState;
    window.dispatch = store.dispatch;

    window.signup = signup;
    window.login = login;
    window.logout = logout;

    window.fetchAllUsers = fetchAllUsers;
    window.fetchUser = fetchUser;
    window.updateUser = updateUser;
    
    // end testing

    ReactDOM.render(<Root store={store}/>, root);
});