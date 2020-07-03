import { connect } from 'react-redux';

import ArtistIndex from './artist_index';
import { fetchAllUsers, clearAllUsers, fetchUser } from '../../actions/users_actions';

const mapStateToProps = state => ({
    allArtists: Object.values(state.entities.users),
    currentUserId: state.session.id,
});

const mapDispatchToProps = dispatch => ({
    fetchUser: userId => dispatch(fetchUser(userId)),
    fetchAllUsers: () => dispatch(fetchAllUsers()),
    clearAllUsers: () => dispatch(clearAllUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArtistIndex);