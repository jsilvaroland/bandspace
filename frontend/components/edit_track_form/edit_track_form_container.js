import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { fetchTrack, updateTrack, clearTracks } from "../../actions/tracks_actions";
import { displayLoading, stopLoading } from "../../actions/loading_actions";
import EditTrackForm from "./edit_track_form";

const mapStateToProps = (state, ownProps) => {
    const trackId = parseInt(ownProps.match.params.trackId);
    const track = state.entities.tracks[trackId];
    const currentUser = state.entities.users[state.session.id];

    return ({
        trackId,
        track,
        currentUser,
    });
};


const mapDispatchToProps = dispatch => {
    return ({
        fetchTrack: trackId => dispatch(fetchTrack(trackId)),
        updateTrack: track => dispatch(updateTrack(track)),
        clearTracks: () => dispatch(clearTracks()),
        displayLoading: loading => dispatch(displayLoading(loading)),
        stopLoading: () => dispatch(stopLoading()),
    });
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(EditTrackForm));