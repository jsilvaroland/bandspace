import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import AlbumShow from './album_show';
import { fetchAlbum, clearAlbums } from '../../actions/albums_actions';
import { fetchAlbumTracks, clearTracks } from '../../actions/tracks_actions';
import { openModal } from '../../actions/modal_actions';


// gotta make sure it renders differently if the album belongs to current user or not

const mapStateToProps = (state, ownProps) => {
    const pageUserId = parseInt(ownProps.match.params.userId);
    const pageUser = state.entities.users[ownProps.match.params.userId];
    const pageAlbumId = parseInt(ownProps.match.params.albumId);
    const pageAlbum = Object.values(state.entities.albums)[0];
    const pageTracks = Object.values(state.entities.tracks);
    const currentUserId = state.session.id;
    return ({
        pageUserId,
        pageUser,
        pageTracks,
        pageAlbumId,
        pageAlbum,
        currentUserId,
    });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchUser: () => dispatch(fetchUser(ownProps.match.params.userId)),
    fetchAlbum: albumId => dispatch(fetchAlbum(albumId)),
    fetchAlbumTracks: albumId => dispatch(fetchAlbumTracks(albumId)),
    openModal: modal => dispatch(openModal(modal)),
    clearTracks: () => dispatch(clearTracks()),
    clearAlbums: () => dispatch(clearAlbums()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlbumShow));