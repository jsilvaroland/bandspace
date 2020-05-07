import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { HashRouter, Route, Switch } from "react-router-dom";

import Modal from './modal/modal';
import NavigationBarContainer from './navigation_bar/navigation_bar_container';
import UserShowContainer from './user_show/user_show_container';


const App = () => (
    <div className='bandspace'>
        <Modal />
        <div className="navbar-wrapper">
            <NavigationBarContainer  />
        </div>
        <div className="main-wrapper">
            <Switch>
            <Route path="/artists/:userId" component={UserShowContainer} />
            </Switch>
        </div>
    </div>
);

export default App;