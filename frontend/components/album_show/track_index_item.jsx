import React from 'react';
import { Link } from 'react-router-dom';

import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TrackIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        if (this.props.id !== 0) {
            this.audio = new Audio(props.track.trackSong);
        }
    }

    componentDidMount() {
        this.audio.addEventListener('loadeddata', () => {
            this.setState({ audioDuration: this.audio.duration });
        });
    }

    render() {
        const { track, clickPlay, activeTrack, playing } = this.props;
        let playButton, minutes, seconds;
        
        (playing && activeTrack === track) ?
            playButton = (<div className="play-button" onClick={() => clickPlay(track, this.audio)}>
                <FontAwesomeIcon icon={faPause} />
            </div>) :
            playButton = (<div className="play-button" onClick={() => clickPlay(track, this.audio)}>
                <FontAwesomeIcon icon={faPlay} />
            </div>)

        // might come back to make sure this works if a track is like X:0Y in duration
        minutes = Math.floor(this.state.audioDuration / 60);
        seconds = Math.floor(this.state.audioDuration % 60);

        return (
            <li>
                {playButton}
                <Link
                    className="track-link"
                    to={`/artists/${track.artistId}/tracks/${track.id}`}
                >
                    <span className="track-item-title">{track.title}</span>
                </Link>
                <span className="track-item-duration">{`${minutes}:${seconds}`}</span>
            </li>
        )
    }
}

export default TrackIndexItem;