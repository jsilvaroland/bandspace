import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import TrackShow from './track_show';
import { fetchAlbum, clearAlbums } from '../../actions/albums_actions';
import { fetchTrack, clearTracks } from '../../actions/tracks_actions';

// gotta make sure it renders differently if the Track belongs to current user or not

const mapStateToProps = (state, ownProps) => {
    const pageUserId = parseInt(ownProps.match.params.userId);
    const pageUser = state.entities.users[ownProps.match.params.userId];
    const pageAlbumId = parseInt(ownProps.match.params.albumId);
    const pageAlbum = Object.values(state.entities.albums)[0];
    const pageTrackId = parseInt(ownProps.match.params.trackId);
    const pageTrack = Object.values(state.entities.tracks)[0];
    return ({
        pageUserId,
        pageUser,
        pageTrack,
        pageTrackId,
        pageAlbumId,
        pageAlbum,
    });
};

const mapDispatchToProps = (dispatch, ownProps) => ({
    fetchUser: () => dispatch(fetchUser(ownProps.match.params.userId)),
    fetchTrack: trackId => dispatch(fetchTrack(trackId)),
    fetchAlbum: albumId => dispatch(fetchAlbum(albumId)),
    clearTracks: () => dispatch(clearTracks()),
    clearAlbums: () => dispatch(clearAlbums()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TrackShow));