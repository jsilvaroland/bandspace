import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { HashRouter, Route, Switch } from "react-router-dom";

import Modal from './modal/modal';
import NavigationBarContainer from './navigation_bar/navigation_bar_container';
import UserShowContainer from './user_show/user_show_container';


const App = () => (
    <div id='bandspace'>
        <Modal />
        <NavigationBarContainer  />
        <Switch>
            <Route path="/artists/:userId" component={UserShowContainer} />
        </Switch>
    </div>
);

export default App;