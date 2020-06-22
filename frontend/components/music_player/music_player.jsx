import React from 'react';
import { 
    faPlay, 
    faPause, 
    faFastBackward, 
    faFastForward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class MusicPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeAudio: props.activeAudio,
            currentTime: props.activeAudio.currentTime,
        };
        this.loadAudioData = this.loadAudioData.bind(this);
        this.changeTime = this.changeTime.bind(this);
    }

    componentDidMount() {
        const { activeAudio } = this.state;
        this.setAudioDuration(activeAudio);

        activeAudio.onplay = () => {
            this.currentTimeInterval = setInterval(() => {
                this.setState({ currentTime: activeAudio.currentTime });
            }, 500);
        };
    }

    componentWillUnmount() {
        clearInterval(this.currentTimeInterval);
    }

    componentDidUpdate() {
        if (this.state.activeAudio.currentTime === this.state.activeAudio.duration) {
            this.songFinish();
        }

        if (this.state.activeAudio.currentTime !== this.state.currentTime) {
            this.updatePlaybackTime();
        }

        if (this.props.activeAudio !== this.state.activeAudio) {
            this.setState({ activeAudio: this.props.activeAudio });

            this.props.activeAudio.onplay = () => {
                clearInterval(this.currentTimeInterval);
                this.currentTimeInterval = setInterval(() => {
                    this.setState({ currentTime: this.props.activeAudio.currentTime });
                }, 500);
            };
        }
    }

    songFinish() {
        clearInterval(this.currentTimeInterval);
        this.props.activeAudio.currentTime = 0;
        this.props.next();
    }

    setAudioDuration(audio) {
        audio.addEventListener('loadeddata', e => this.loadAudioData(e));
    }

    updatePlaybackTime() {
        this.setState({ currentTime: this.state.activeAudio.currentTime });
    }

    loadAudioData(e) {
        this.setState({ audioDuration: e.target.duration });
    }

    changeTime(e) {
        this.state.activeAudio.currentTime = e.target.value;
    }

    formatSeconds(seconds) {
        return ("0" + seconds).slice(-2);
    }
    
    render() {
        const { clickPlay, playing, activeTrack, activeAudio, next, prev } = this.props;
        this.slider = (<input className="slider"
                            type="range" 
                            min="0" 
                            max={this.state.activeAudio.duration}
                            value={this.state.activeAudio.currentTime}
                            onChange={this.changeTime}
                        />)
        
        let playButton, totalMinutes, totalSeconds, currentMinutes, 
        currentSeconds, prevBtn, nextBtn;

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
            currentMinutes = Math.floor(this.state.activeAudio.currentTime / 60);
            currentSeconds = Math.floor(this.state.activeAudio.currentTime % 60);

            this.props.hasNextTrack ?
                nextBtn = (<span className='next-button' onClick={() => next()}>
                    <FontAwesomeIcon icon={faFastForward} />
                </span>) :
                nextBtn = (<span className='next-button-disabled'>
                    <FontAwesomeIcon icon={faFastForward} />
                </span>)

            this.props.hasPrevTrack ?
                prevBtn = (<span className='prev-button' onClick={() => prev()}>
                    <FontAwesomeIcon icon={faFastBackward} />
                </span>) :
                prevBtn = (<span className='prev-button-disabled'>
                    <FontAwesomeIcon icon={faFastBackward} />
                </span>)

            return (
                <div className="inline-player">
                    <button className="play-button" onClick={() => clickPlay(activeTrack, activeAudio)}>
                        {playButton}
                    </button>
                    <div>
                        {activeTrack.title}
                        {`${currentMinutes}:${this.formatSeconds(currentSeconds)} / ${totalMinutes}:${this.formatSeconds(totalSeconds)}`}
                    </div>
                    <div>
                        <span>{this.slider}</span>
                        {prevBtn}
                        {nextBtn}
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default MusicPlayer;