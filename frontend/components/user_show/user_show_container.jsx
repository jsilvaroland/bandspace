import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserShow from './user_show';
import { fetchUser } from '../../actions/users_actions';
import { fetchArtistAlbums } from '../../actions/albums_actions';


const mapStateToProps = (state, ownProps) => {
    const pageUserId = parseInt(ownProps.match.params.userId);
    const pageUser = state.entities.users[ownProps.match.params.userId];
    const pageAlbums = Object.values(state.entities.albums);

    return ({
        currentUser: state.entities.users[state.session.id],
        pageUserId,
        pageUser,
        pageAlbums,
    });
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return ({
        fetchUser: () => dispatch(fetchUser(ownProps.match.params.userId)),
        fetchArtistAlbums: userId => dispatch(fetchArtistAlbums(userId))
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserShow));