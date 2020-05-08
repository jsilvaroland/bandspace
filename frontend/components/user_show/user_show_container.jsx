import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserShow from './user_show';
import { fetchUser } from '../../actions/users_actions';
import { fetchArtistAlbums, clearAlbums } from '../../actions/albums_actions';
import { clearTracks } from '../../actions/tracks_actions';

const mapStateToProps = (state, ownProps) => {
    const pageUserId = parseInt(ownProps.match.params.userId);
    const pageUser = state.entities.users[ownProps.match.params.userId];
    const pageAlbums = Object.values(state.entities.albums);
    const pageSingles = Object.values(state.entities.tracks);

    return ({
        currentUser: state.entities.users[state.session.id],
        pageUserId,
        pageUser,
        pageAlbums,
        pageSingles,
    });
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        fetchUser: () => dispatch(fetchUser(ownProps.match.params.userId)),
        fetchArtistAlbums: userId => dispatch(fetchArtistAlbums(userId)),
        fetchArtistSingles: userId => dispatch(fetchArtistSingles(userId)),
        clearAlbums: () => dispatch(clearAlbums()),
        clearTracks: () => dispatch(clearTracks()),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow));