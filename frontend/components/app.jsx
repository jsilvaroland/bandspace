import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { HashRouter, Route, Switch } from "react-router-dom";

import Modal from './modal/modal';
import NavigationBarContainer from './navigation_bar/navigation_bar_container';
import UserShowContainer from './user_show/user_show_container';
import ArtistIndexContainer from './artist_index/artist_index_container';
import Splash from './splash/splash_container';
import AlbumShowContainer from './album_show/album_show_container';
import TrackShowContainer from './track_show/track_show_container';

const App = () => (
    <div className='bandspace'>
        <Modal />
        <div className="navbar-wrapper">
            <NavigationBarContainer  />
        </div>
        <div className="main-wrapper">
            <Switch>
                <Route exact path="/artists/:userId" component={UserShowContainer} />
                <Route path="/artists/:userId/albums/:albumId" component={AlbumShowContainer} />
                <Route path="/artists/:userId/tracks/:trackId" component={TrackShowContainer} />
                <Route path="/artist_index" component={ArtistIndexContainer} />
                <Route exact path="/" component={Splash} />
            </Switch>
        </div>
    </div>
);

export default App;