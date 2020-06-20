import React from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeAudio: props.activeAudio
        };
        this.loadAudioData = this.loadAudioData.bind(this);
    }

    componentDidMount() { //maybe component did update?
        this.setAudioDuration(this.props.activeAudio);
    }

    componentDidUpdate() {
        if (this.props.activeAudio !== this.state.activeAudio) {
            this.setState({ activeAudio: this.props.activeAudio });
            this.setAudioDuration(this.state.activeAudio);
        }

        if (this.state.audioDuration !== this.props.activeAudio.duration) {
            this.setState({ audioDuration: this.props.activeAudio.duration });
        }
    }

    setAudioDuration(audio) {
        audio.addEventListener('loadeddata', e => this.loadAudioData(e));
    }

    loadAudioData(e) {
        this.setState({ audioDuration: e.target.duration });
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

        if (this.props.activeAudio.duration) {
            return (
                <div className="inline-player">
                    <button className="play-button" onClick={() => clickPlay(activeTrack, activeAudio)}>
                        {playButton}
                    </button>
                    <div>
                        {activeTrack.title}
                        {this.state.activeAudio.duration}
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default MusicPlayer;