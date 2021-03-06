import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { deleteAlbum } from '../../actions/albums_actions';
import { deleteTrack } from '../../actions/tracks_actions';
import { closeModal } from '../../actions/modal_actions';
import DeleteRelease from './delete_release';

const mapStateToProps = (state, ownProps) => {
    const album = Object.values(state.entities.albums)[0];
    const tracks = Object.values(state.entities.tracks);
    const releaseType = ownProps.location.pathname.includes('albums') ? 'Album' : 'Track';

    return ({
        releaseType,
        album,
        tracks,
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        deleteAlbum: albumId => dispatch(deleteAlbum(albumId)),
        deleteTrack: trackId => dispatch(deleteTrack(trackId)),
        closeModal: () => dispatch(closeModal()),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteRelease));