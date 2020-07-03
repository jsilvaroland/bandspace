import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Route, Switch } from "react-router-dom";

import { ProtectedRoute } from '../util/route_util';
import Modal from './modal/modal';
import NavigationBarContainer from './navigation_bar/navigation_bar_container';
import UserShowContainer from './user_show/user_show_container';
import ArtistIndexContainer from './artist_index/artist_index_container';
import Splash from './splash/splash_container';
import AlbumShowContainer from './album_show/album_show_container';
import TrackShowContainer from './track_show/track_show_container';
import NewAlbumFormContainer from './new_album_form/new_album_form_container';
import NewTrackFormContainer from './new_track_form/new_track_form_container';
import EditAlbumFormContainer from './edit_album_form/edit_album_form_container';

// make em all protected routes, redirect if artist id doesn't match album or track id?

const App = () => (
    <div className='bandspace'>
        <Modal />
        <div className="navbar-wrapper">
            <NavigationBarContainer  />
        </div>
        <div className="main-wrapper">
            <Switch>
                <Route exact path="/artists/:userId" component={UserShowContainer} />
                <ProtectedRoute exact path="/artists/:userId/new_album" component={NewAlbumFormContainer} />
                <ProtectedRoute path="/artists/:userId/new_track" component={NewTrackFormContainer} />
                <ProtectedRoute exact path="/artists/:userId/albums/:albumId/edit" component={EditAlbumFormContainer} />
                {/* <ProtectedRoute path="/artists/:userId/tracks/:trackId/edit" component={} /> */}
                <Route exact path="/artists/:userId/albums/:albumId" component={AlbumShowContainer} />
                <Route exact path="/artists/:userId/tracks/:trackId" component={TrackShowContainer} />
                <Route exact path="/artist_index" component={ArtistIndexContainer} />
                <Route exact path="/" component={Splash} />
            </Switch>
        </div>
    </div>
);

export default App;