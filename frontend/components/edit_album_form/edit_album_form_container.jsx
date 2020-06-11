import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateAlbum } from '../../actions/albums_actions';
import { updateTrack } from '../../actions/tracks_actions';
import EditAlbumForm from './edit_album_form';

const mapStateToProps = state => {
    debugger
    return ({
        // errors: state.entities.albums[0],
    });
};

const mapDispatchToProps = dispatch => {
    // pass update album AND update track? or just update album?
    return ({
        updateAlbum: album => dispatch(updateAlbum(album)),
        updateTrack: track => dispatch(updateTrack(track)),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditAlbumForm));