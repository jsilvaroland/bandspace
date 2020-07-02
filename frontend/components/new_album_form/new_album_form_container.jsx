import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createAlbum, clearAlbums } from '../../actions/albums_actions';
import { createTrack, clearTracks } from '../../actions/tracks_actions';
import NewAlbumForm from './new_album_form';

const mapStateToProps = state => {
    const album = Object.values(state.entities.albums)[0];
    const tracks = Object.values(state.entities.tracks);
    const currentUser = state.entities.users[state.session.id];

    return ({
        album,
        tracks,
        currentUser,
        // errors: state.entities.albums[0],
    });
};

const mapDispatchToProps = dispatch => {
    // pass update album AND update track? or just update album?
    return ({
        createAlbum: album => dispatch(createAlbum(album)),
        createTrack: track => dispatch(createTrack(track)),
        // clearAlbums: () => dispatch(clearAlbums()),
        // clearTracks: () => dispatch(clearTracks()),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewAlbumForm));