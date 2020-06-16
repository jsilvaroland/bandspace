import React from 'react';
import { Link } from 'react-router-dom';

import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class TrackIndexItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: props.playing
        };
        if (this.props.id !== 0) {
            this.audio = new Audio(props.track.trackSong);
        }
    }

    render() {
        const { track, clickPlay } = this.props;
        let playButton;
        
        // on click, have the play button call a function on album show that changes the music player

        (this.state.playing) ?
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
            </li>
        )
    }
}

export default TrackIndexItem;