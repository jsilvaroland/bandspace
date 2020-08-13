import { connect } from "react-redux";
import MusicPlayer from "./music_player";

const mapSTP = (state, ownProps) => {
  debugger
  return ({
    playing: ownProps.playing,
    clickPlay: ownProps.clickPlay,
    next: ownProps.next,
    prev: ownProps.prev,
    activeAudio: ownProps.activeAudio,
    activeTrack: ownProps.activeTrack,
    hasNextTrack: ownProps.hasNextTrack,
    hasPrevTrack: ownProps.hasPrevTrack,
  });
};


export default connect(mapSTP)(MusicPlayer);