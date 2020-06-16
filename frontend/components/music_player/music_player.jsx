import React from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        // this.audio = new Audio(props.activeTrack.trackSong);
    }
    
    render() {
        const { clickPlay, playing, activeTrack, activeAudio } = this.props;
        let playButton; 

        (playing) ?
            playButton = (<div className="play-button">
                            <FontAwesomeIcon icon={faPause} />
                        </div>) :
            playButton = (<div className="play-button">
                            <FontAwesomeIcon icon={faPlay} />
                        </div>)



        return (
            <div className="inline-player">
                <button className="play-button" onClick={() => clickPlay(activeTrack, activeAudio)}>
                    {playButton}
                </button>
                <div>
                    {activeTrack.title}
                </div>
            </div>
        )
    }
}

export default MusicPlayer;