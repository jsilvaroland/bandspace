import React from 'react';
import { Link } from 'react-router-dom';

import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TrackIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        if (props.id !== 0) {
            this.audio = new Audio(props.track.trackSong);
        }
    }

    componentDidMount() {
        this.audio.addEventListener('loadeddata', () => {
            this.setState({ audioDuration: this.audio.duration });
        });
    }

    render() {
        const { track, clickPlay, activeTrack, playing, n } = this.props;
        const activeIcon = playing && activeTrack === track ? faPause : faPlay;
        const trackItemClass = activeTrack === track ? "track-item-bold" : "track-item";
        const minutes = Math.floor(this.state.audioDuration / 60);
        const seconds = Math.floor(this.state.audioDuration % 60);
        const playButton = (
            <span className="mini-play-button" onClick={() => clickPlay(track, this.audio)}>
                <FontAwesomeIcon icon={activeIcon} />
            </span>
            )

        console.log(this.state.audioDuration)

        return (
            <li className={trackItemClass}>
                {playButton}
                <span className="track-item-info">
                    <span className="track-no">{`${n}.`}</span>
                    <Link className="track-link"
                        to={`/artists/${track.artistId}/tracks/${track.id}`}>
                        <span className="track-item-title">{track.title}</span>
                    </Link>
                    <span className="track-item-duration">{`${minutes}:${seconds}`}</span>
                </span>
            </li>
        )
    }
}

export default TrackIndexItem;