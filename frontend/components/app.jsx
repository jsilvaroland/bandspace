import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { HashRouter, Route, Switch } from "react-router-dom";

import Modal from './modal/modal';
import NavigationBarContainer from './navigation_bar/navigation_bar_container';

const App = () => (
    <div id='bandspace'>
        <Modal />
        <NavigationBarContainer />
        <h1>Bandspace</h1>

    </div>
);

export default App;