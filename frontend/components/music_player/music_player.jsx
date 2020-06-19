import React from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { //maybe component did update?
        this.setAudioDuration(this.props.activeAudio);
        console.log(this.state);
    }

    setAudioDuration(audio) {
        audio.addEventListener('loadeddata', () => {
            console.log('data loaded');
            this.setState({ audioDuration: audio.duration });
        });
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

        console.log(activeAudio);

        if (!this.state.audioDuration) {
            return <div></div>;
        } else {
            return (
                <div className="inline-player">
                    <button className="play-button" onClick={() => clickPlay(activeTrack, activeAudio)}>
                        {playButton}
                    </button>
                    <div>
                        {activeTrack.title}
                        {this.state.audioDuration}
                    </div>
                </div>
            )
        }
    }
}

export default MusicPlayer;