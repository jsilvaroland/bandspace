import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAlbum, updateAlbum, clearAlbums } from '../../actions/albums_actions';
import { fetchAlbumTracks, updateTrack, clearTracks, createTrack } from '../../actions/tracks_actions';
import { displayLoading, stopLoading } from "../../actions/loading_actions";
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
    });
};

const mapDispatchToProps = dispatch => {
    // pass update album AND update track? or just update album?
    return ({
        fetchAlbum: albumId => dispatch(fetchAlbum(albumId)),
        fetchAlbumTracks: albumId => dispatch(fetchAlbumTracks(albumId)),
        updateAlbum: album => dispatch(updateAlbum(album)),
        updateTrack: track => dispatch(updateTrack(track)),
        createTrack: track => dispatch(createTrack(track)),
        clearAlbums: () => dispatch(clearAlbums()),
        clearTracks: () => dispatch(clearTracks()),
        displayLoading: loading => dispatch(displayLoading(loading)),
        stopLoading: () => dispatch(stopLoading()),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditAlbumForm));