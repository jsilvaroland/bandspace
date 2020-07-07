import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { updateUser } from '../../actions/users_actions';
import { closeModal } from '../../actions/modal_actions';
import DeleteArt from './delete_art';

const mapStateToProps = (state, ownProps) => {
    return ({
        artType: ownProps.artType,
        currentUser: state.entities.users[state.session.id],
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        updateUser: user => dispatch(updateUser(user)),
        closeModal: () => dispatch(closeModal()),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteArt));