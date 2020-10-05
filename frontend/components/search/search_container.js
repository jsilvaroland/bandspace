import { connect } from 'react-redux';

import { fetchSearch } from "../../actions/search_actions";
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import Search from './search';

const mapStateToProps = (state, ownProps) => {
  return {
    results: Object.values(state.entities.search),
    currentUser: state.entities.users[state.session.id],
    activeDropDown: ownProps.activeDropDown,
    onClick: ownProps.onClick,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchSearch: () => dispatch(fetchSearch()),
    logout: () => dispatch(logout()),
    openModal: (modal) => dispatch(openModal(modal)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
