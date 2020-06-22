import React from 'react';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeAudio: props.activeAudio,
            currentTime: 0,
        };
        this.loadAudioData = this.loadAudioData.bind(this);
    }

    componentDidMount() { //maybe component did update?
        this.setAudioDuration(this.props.activeAudio);
    }

    componentDidUpdate() {
        // if audio switches, setState currentTime: 0



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

    getPlaybackTime(audio) {
        audio.addEventListener('timeupdate', () => {
            this.setState({ currentTime: this.state.currentTime++ });
        });
    }

    loadAudioData(e) {
        this.setState({ audioDuration: e.target.duration });
    }

    formatSeconds(seconds) {
        return ("0" + seconds).slice(-2);
    }
    
    render() {

        const { clickPlay, playing, activeTrack, activeAudio } = this.props;
        let playButton, totalMinutes, totalSeconds, currentMinutes, 
        currentSeconds, formattedTotalTime, formattedCurrentTime;

        (playing) ?
            playButton = (<div className="play-button">
                            <FontAwesomeIcon icon={faPause} />
                        </div>) :
            playButton = (<div className="play-button">
                            <FontAwesomeIcon icon={faPlay} />
                        </div>)

        if (activeAudio.duration) {
            totalMinutes = Math.floor(this.state.activeAudio.duration / 60);
            totalSeconds = Math.floor(this.state.activeAudio.duration % 60);
            currentMinutes = Math.floor(this.state.currentTime / 60);
            currentSeconds = Math.floor(this.state.currentTime % 60);

            return (
                <div className="inline-player">
                    <button className="play-button" onClick={() => clickPlay(activeTrack, activeAudio)}>
                        {playButton}
                    </button>
                    <div>
                        {activeTrack.title}
                        {`${currentMinutes}:${this.formatSeconds(currentSeconds)} / ${totalMinutes}:${this.formatSeconds(totalSeconds)}`}
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default MusicPlayer;