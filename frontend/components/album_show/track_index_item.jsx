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
        let playButton;
        
        (playing && activeTrack === track) ?
            playButton = (<div className="play-button" onClick={() => clickPlay(track, this.audio)}>
                <FontAwesomeIcon icon={faPause} />
            </div>) :
            playButton = (<div className="play-button" onClick={() => clickPlay(track, this.audio)}>
                <FontAwesomeIcon icon={faPlay} />
            </div>)


        return (
            <li>
                {playButton}
                <Link
                    className="track-link"
                    to={`/artists/${track.artistId}/tracks/${track.id}`}
                >
                    <span className="track-item-title">{track.title}</span>
                </Link>
                <span className="track-item-duration">{this.state.audioDuration}</span>
            </li>
        )
    }
}

export default TrackIndexItem;