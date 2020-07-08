import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserShow from './user_show';
import { fetchUser, updateUser } from '../../actions/users_actions';
import { fetchArtistAlbums, clearAlbums } from '../../actions/albums_actions';
import { clearTracks } from '../../actions/tracks_actions';
import { openModal } from '../../actions/modal_actions';

const mapStateToProps = (state, ownProps) => {
    const pageUserId = parseInt(ownProps.match.params.userId);
    const pageUser = state.entities.users[ownProps.match.params.userId];
    const albums = Object.values(state.entities.albums);
    const singles = Object.values(state.entities.tracks);
    return ({
        currentUserId: state.session.id,
        pageUserId,
        pageUser,
        albums,
        singles,
        modal: state.ui.modal
    });
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        fetchUser: () => dispatch(fetchUser(ownProps.match.params.userId)),
        fetchArtistAlbums: userId => dispatch(fetchArtistAlbums(userId)),
        fetchArtistSingles: userId => dispatch(fetchArtistSingles(userId)),
        updateUser: user => dispatch(updateUser(user)),
        clearAlbums: () => dispatch(clearAlbums()),
        clearTracks: () => dispatch(clearTracks()),
        openModal: modal => dispatch(openModal(modal)),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow));