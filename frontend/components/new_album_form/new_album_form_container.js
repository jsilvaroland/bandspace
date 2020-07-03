import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createAlbum, updateAlbum, clearAlbums } from '../../actions/albums_actions';
import { createTrack, clearTracks } from '../../actions/tracks_actions';
import NewAlbumForm from './new_album_form';

const mapStateToProps = state => {
    return ({
        currentUser: state.entities.users[state.session.id]
        // errors: state.entities.albums[0],
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        createAlbum: album => dispatch(createAlbum(album)),
        updateAlbum: album => dispatch(updateAlbum(album)),
        createTrack: track => dispatch(createTrack(track)),
        clearAlbums: () => dispatch(clearAlbums()),
        clearTracks: () => dispatch(clearTracks()),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewAlbumForm));