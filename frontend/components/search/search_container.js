import { connect } from 'react-redux';

import { fetchSearchedTracks } from '../../actions/tracks_actions';
import { fetchSearchedUsers } from '../../actions/users_actions';
import { fetchSearchedAlbums } from '../../actions/albums_actions';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import Search from './search';

const mapStateToProps = state => {
  return {
    currentUser: state.entities.users[state.session.id],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSearchedTracks: query => dispatch(fetchSearchedTracks(query)),
    fetchSearchedAlbums: query => dispatch(fetchSearchedAlbums(query)),
    fetchSearchedUsers: query => dispatch(fetchSearchedUsers(query)),
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
