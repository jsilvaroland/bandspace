import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { createTrack, clearTracks } from '../../actions/tracks_actions';
import NewTrackForm from './new_track_form';

const mapStateToProps = state => {
    return ({
        currentUser: state.entities.users[state.session.id],
        // errors: state.entities.albums[0],
    });
};

const mapDispatchToProps = dispatch => {
    // pass update album AND update track? or just update album?
    return ({
        createTrack: track => dispatch(createTrack(track)),
        clearTracks: () => dispatch(clearTracks()),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTrackForm));