import { connect } from 'react-redux';
import UserShow from './user_show';
import { fetchUser } from '../../actions/users_actions';

const mapStateToProps = (state, ownProps) => {
    // pageOwningUser = fetchUser( user that owns the page )
    return ({
        // currentUser: state.entities.users[state.session.id],
        pageOwningUser: state.entities.users[ownProps.match.params.userId],
        // may need more later
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        fetchUser: userId => dispatch(fetchUser(userId))
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);