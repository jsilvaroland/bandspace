import React from 'react';
import ReactDOM from 'react-dom';
// import { library } from '@fortawesome/fontawesome-svg-core';
// import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';

import Root from './components/root';
import configureStore from './store/store';

// testing
import { signup, login, logout } from './actions/session_actions';
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
    
    // end testing

    ReactDOM.render(<Root store={store}/>, root);
});