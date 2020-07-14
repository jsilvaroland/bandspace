import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createAlbum, updateAlbum, clearAlbums } from '../../actions/albums_actions';
import { createTrack, clearTracks } from '../../actions/tracks_actions';
import { openModal } from '../../actions/modal_actions';
import { displayLoading, stopLoading } from '../../actions/loading_actions';
import NewAlbumForm from './new_album_form';

const mapStateToProps = state => {
    return ({
        currentUser: state.entities.users[state.session.id]
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        createAlbum: album => dispatch(createAlbum(album)),
        updateAlbum: album => dispatch(updateAlbum(album)),
        createTrack: track => dispatch(createTrack(track)),
        clearAlbums: () => dispatch(clearAlbums()),
        clearTracks: () => dispatch(clearTracks()),
        openModal: modal => dispatch(openModal(modal)),
        displayLoading: loading => dispatch(displayLoading(loading)),
        stopLoading: () => dispatch(stopLoading()),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewAlbumForm));