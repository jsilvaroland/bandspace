import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { deleteTrack } from "../../actions/tracks_actions";
import { closeModal } from "../../actions/modal_actions";
import DeleteAlbumTrack from "./delete_album_track";

const mapStateToProps = (state, ownProps) => {
  const album = Object.values(state.entities.albums)[0];
  const tracks = Object.values(state.entities.tracks);

  return {
    album,
    tracks,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    deleteTrack: trackId => dispatch(deleteTrack(trackId)),
    closeModal: () => dispatch(closeModal()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DeleteAlbumTrack)
);
