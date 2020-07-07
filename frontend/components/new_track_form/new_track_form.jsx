import React from 'react';
import { Redirect } from 'react-router-dom';

class NewTrackForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trackArtPreview: null,
            track: {
                title: "",
                credits: "",
                description: "",
                lyrics: "",
                trackArt: null,
                trackSong: null
            },
            audioUploaded: false,
            published: false,
            //errors                // will have to do some setState({ errors })
        };
        this.handleAudioUpload = this.handleAudioUpload.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.forwardToHiddenInput = this.forwardToHiddenInput.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
    }

    change(subfield) {
        return e => {
            let trackCopy = this.state.track;

            trackCopy[subfield] = e.target.value;
            this.setState({ track: trackCopy });
        };
    }

    forwardToHiddenInput(inputType) {
        document.getElementById(`${inputType}-file`).click();
    }

    handleAudioUpload(e) {
        const uploadFile = e.currentTarget.files[0];
        if (uploadFile && (uploadFile.type === "audio/wav" || uploadFile.type === "audio/mpeg")) {
            let trackCopy = this.state.track;
            trackCopy.trackSong = uploadFile;
            this.setState({ track: trackCopy, audioUploaded: true });
        } else {
            console.log('Audio file must be mp3/wav format');
            //setState errors or something
        }
    }

    handleImageUpload(e) {
        const uploadFile = e.currentTarget.files[0];
        if (uploadFile && (uploadFile.type === "image/png" ||
            uploadFile.type === "image/jpeg" || uploadFile.type === "image/gif")) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                let trackCopy = this.state.track;
                trackCopy.trackArt = uploadFile; // might not be able to just do this
                this.setState({ track: trackCopy, trackArtPreview: fileReader.result });
            };
            fileReader.readAsDataURL(uploadFile);
        } else {
            console.log("Track art must be png/jpg/gif format");
            // setState to render errors here
        }
    }

    handleCreate() {
        const { track } = this.state;

        if (track.trackArt && track.title !== "") {
            const trackFormData = new FormData();
            trackFormData.append('track[description]', track.description);
            trackFormData.append('track[title]', track.title);
            trackFormData.append('track[credits]', track.credits);
            trackFormData.append('track[lyrics]', track.lyrics);
            trackFormData.append('track[photo]', track.trackArt);
            trackFormData.append('track[song]', track.trackSong);
            this.props.createTrack(trackFormData)
            .then(this.setState({ published: true }));
        }

        if (!track.trackArt) {
            console.log('track art required');
        } 
        if (track.title === "") {
            console.log('track title required');
        }
    }

    render() {
        const { currentUser } = this.props;
        
        if (this.state.published) {
            return (<Redirect to={`/artists/${currentUser.id}`} />)
        } else if (currentUser) {
            const { track, trackArtPreview, audioUploaded } = this.state;
            let publishBtn, trackTitleText, titleInput, aboutLabel, aboutField, 
                lyricsLabel, lyricsField, creditsLabel, creditsField;
    
            audioUploaded ?
                publishBtn = (<button className='publish' onClick={this.handleCreate}>
                    Publish
                </button>) :
                publishBtn = (<button className='publish-disabled'>
                    Publish
                </button>)
    
            track.title === "" ?
                trackTitleText = "Untitled Track" :
                trackTitleText = track.title;
    
            titleInput = (<input
                type="text"
                value={track.title}
                placeholder="track name"
                onChange={this.change('title')}
            />);
    
            aboutLabel = (<label className="track-about-label">about this track:</label>)
            aboutField = (<input className="about-track-input"
                type="textarea"
                value={track.description}
                placeholder="(optional)"
                onChange={this.change('description')}
            />)
    
            lyricsLabel = (<label className="track-lyrics-label">lyrics:</label>)
            lyricsField = (<input className="lyrics-track-input"
                type="textarea"
                value={track.lyrics}
                placeholder="(optional)"
                onChange={this.change('lyrics')}
            />)
    
            creditsLabel = (<label className="track-credits-label">track credits:</label>)
            creditsField = (<input className="credits-track-input"
                type="textarea"
                value={track.credits}
                placeholder="(optional)"
                onChange={this.change('credits')}
            />)

            const audioUpload = audioUploaded ? 
                <div className="left-panel-audio-upload">
                    <div>AUDIO</div>
                    <div>{track.trackSong.name}</div>
                    {/* add replace functionality later */}
                </div> :
                <div className="left-panel-audio-upload">
                    <input id="audio-file" type="file" onChange={this.handleAudioUpload} />
                    <span className="add-track" onClick={() => this.forwardToHiddenInput('audio')}>
                        add audio
                    </span>
                </div>

            const trackArt = trackArtPreview ?
                (<div>
                    <img className="release-art-212" src={trackArtPreview} />
                </div>) :
                (<div className="release-art-212">
                    <input id="image-file" type="file" onChange={this.handleImageUpload}></input>
                    <span className="add-album-art" onClick={() => this.forwardToHiddenInput('image')}>
                        Upload Track Art
                    </span>
                </div>)
    
            return (
                <div className="album-edit">
                    <form className="edit-album-form">
                        <div className="left-panel">
                            <div className="left-panel-album-wrapper">
                                <div className="left-panel-album">
                                    <span>
                                        <img className="release-art-72" src={trackArtPreview} />
                                    </span>
                                    <span className="album-title-artist">
                                        <p>{trackTitleText}</p>
                                        <p>by <span>{currentUser.username}</span></p>
                                    </span>
                                </div>
                            </div>
                            {audioUpload}
                            <div className="save">
                                {publishBtn}
                            </div>
                        </div>
                        <div className="right-panel">
                            {titleInput}
                            {aboutLabel}
                            {aboutField}
                            {lyricsLabel}
                            {lyricsField}
                            {creditsLabel}
                            {creditsField}
                            {trackArt}
                        </div>
                    </form>
                </div>
            );
        } else {
            return (<div>New Track Form Loading</div>)
        }
    }
}

export default NewTrackForm;