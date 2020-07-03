import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteAlbum, clearAlbums } from '../../actions/albums_actions';
import { deleteTrack, clearTracks } from '../../actions/tracks_actions';
import { closeModal } from '../../actions/modal_actions';
import Delete from './delete';

const mapStateToProps = (state, ownProps) => {
    const album = Object.values(state.entities.albums)[0];
    const tracks = Object.values(state.entities.tracks);
    // const currentUser = state.entities.users[state.session.id];
    const releaseType = ownProps.location.pathname.includes('albums') ? 'Album' : 'Track';

    return ({
        releaseType,
        album,
        tracks,
        // currentUser,
    });
};

const mapDispatchToProps = dispatch => {
    // pass update album AND update track? or just update album?
    return ({
        deleteAlbum: albumId => dispatch(deleteAlbum(albumId)),
        deleteTrack: trackId => dispatch(deleteTrack(trackId)),
        closeModal: () => dispatch(closeModal()),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Delete));