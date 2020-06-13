import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAlbum, updateAlbum, clearAlbums } from '../../actions/albums_actions';
import { fetchAlbumTracks, updateTrack, clearTracks } from '../../actions/tracks_actions';
import EditAlbumForm from './edit_album_form';

const mapStateToProps = (state, ownProps) => {
    const albumId = parseInt(ownProps.match.params.albumId);
    const album = state.entities.albums[albumId];
    const tracks = Object.values(state.entities.tracks);
    const currentUser = state.entities.users[state.session.id];

    return ({
        albumId,
        album,
        tracks,
        currentUser,
        // errors: state.entities.albums[0],
    });
};

const mapDispatchToProps = dispatch => {
    // pass update album AND update track? or just update album?
    return ({
        fetchAlbum: albumId => dispatch(fetchAlbum(albumId)),
        fetchAlbumTracks: albumId => dispatch(fetchAlbumTracks(albumId)),
        updateAlbum: album => dispatch(updateAlbum(album)),
        updateTrack: track => dispatch(updateTrack(track)),
        clearAlbums: () => dispatch(clearAlbums()),
        clearTracks: () => dispatch(clearTracks()),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditAlbumForm));