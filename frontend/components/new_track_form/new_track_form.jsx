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
        this.deleteTrackArt = this.deleteTrackArt.bind(this);
    }

    componentDidUpdate() {
        const { track, trackTitleError, trackArtError } = this.state;

        if (track.title !== "" && trackTitleError) {
          this.setState({ trackTitleError: false });
        }

        if (track.trackArt && trackArtError) {
            this.setState({ trackArtError: false });
        }
    }

    change(subfield) {
        return e => {
            let trackCopy = this.state.track;

            trackCopy[subfield] = e.target.value;
            this.setState({ track: trackCopy });
        };
    }

    deleteTrackArt() {
        let trackCopy = this.state.track;
        trackCopy.trackArt = null;
        this.setState({ track: trackCopy, trackArtPreview: null });
    }

    forwardToHiddenInput(inputType) {
        document.getElementById(`${inputType}-file`).click();
    }

    handleAudioUpload(e) {
        const uploadFile = e.currentTarget.files[0];
        if (uploadFile) {
            let trackCopy = this.state.track;
            trackCopy.trackSong = uploadFile;
            this.setState({ track: trackCopy, audioUploaded: true });
        }
    }

    handleImageUpload(e) {
        const uploadFile = e.currentTarget.files[0];
        if (uploadFile && uploadFile.size < 10000000) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                let trackCopy = this.state.track;
                trackCopy.trackArt = uploadFile; // might not be able to just do this
                this.setState({ track: trackCopy, trackArtPreview: fileReader.result });
            };
            fileReader.readAsDataURL(uploadFile);
        } else {
            this.props.openModal("image-size-error");
            document.getElementById('image-file').value = "";
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
        } else if (track.title === "") {
            this.setState({ trackTitleError: true });
        } else if (!track.trackArt) {
            this.setState({ trackArtError: true });
        }
    }

    render() {
        const { currentUser } = this.props;
        
        if (this.state.published) {
            return (<Redirect to={`/artists/${currentUser.id}`} />)
        } else if (currentUser) {
            const { track, trackArtPreview, audioUploaded, trackArtError, 
                trackTitleError } = this.state;
            let publishBtn, trackTitleText, titleInput, aboutLabel, aboutField, 
                lyricsLabel, lyricsField, creditsLabel, creditsField, 
                trackArtClassName, trackTitleClassName, trackArtAlert,
                trackTitleAlert;
    
            audioUploaded ?
                publishBtn = (<button className='publish' onClick={this.handleCreate}>
                    Publish
                </button>) :
                publishBtn = (<button className='publish-disabled'>
                    Publish
                </button>)
    
            if (trackTitleError) {
                trackTitleClassName = "title-text-error";
                trackTitleAlert = (
                <div className="track-title-alert">
                    Please enter a track name.
                </div>
                );
            } else {
                trackTitleClassName = "title-text";
            }

            track.title === "" ?
                trackTitleText = "Untitled Track" :
                trackTitleText = track.title;
    
            titleInput = (
              <input
                className={trackTitleClassName}
                type="text"
                value={track.title}
                placeholder="track name"
                onChange={this.change("title")}
              />
            );
    
            aboutLabel = (<label className="track-about-label">about this track:</label>)
            aboutField = (<textarea className="about-track-input"
                value={track.description}
                placeholder="(optional)"
                onChange={this.change('description')}
            />)
    
            lyricsLabel = (<label className="track-lyrics-label">lyrics:</label>)
            lyricsField = (<textarea className="lyrics-track-input"
                value={track.lyrics}
                placeholder="(optional)"
                onChange={this.change('lyrics')}
            />)
    
            creditsLabel = (<label className="track-credits-label">track credits:</label>)
            creditsField = (<textarea className="credits-track-input"
                value={track.credits}
                placeholder="(optional)"
                onChange={this.change('credits')}
            />)

            const audioUpload = audioUploaded ? (
              <div className="left-panel-audio-upload">
                <div className="audio">AUDIO</div>
                <span className="filename">{track.trackSong.name}</span>
                <span className="filesize">
                    {(track.trackSong.size / 1000000).toFixed(1)}MB
                </span>
                {/* add replace functionality later */}
              </div>
            ) : (
              <div className="left-panel-audio-upload">
                <input
                  id="audio-file"
                  accept="audio/mp3, audio/wav"
                  type="file"
                  onChange={this.handleAudioUpload}
                />
                <span
                  className="add-track"
                  onClick={() => this.forwardToHiddenInput("audio")}
                >
                  add audio
                </span>
              </div>
            );

            if (trackArtError) {
                trackArtClassName = "release-art-212-absent-error";
                trackArtAlert = (
                <div className="album-art-alert">
                    Please add cover art for this track.
                </div>
                );
            } else {
                trackArtClassName = "release-art-212-absent";
            }


            const trackArt = trackArtPreview ?
            (
                <div className="album-art-wrapper">
                    <div className="release-art-wrapper">
                        <img className="release-art-212" src={trackArtPreview} />
                        <button className="remove" onClick={this.deleteTrackArt}>
                        &times;
                        </button>
                    </div>
                </div>
            ) : (
                <div className="album-art-wrapper">
                    <div className={trackArtClassName}>
                        <div
                            className="add-album-art"
                            onClick={() => this.forwardToHiddenInput('image')}
                        >
                            Upload Track Art
                        </div>
                        <div className="album-art-hint">
                            <div>350 x 350 pixels minimum</div>
                            <div>(bigger is better)</div>
                            <br />
                            .jpg, .gif or .png, 10MB max
                        </div>
                        <input
                            id="image-file"
                            accept="image/png, image/jpeg, image/gif"
                            type="file"
                            onChange={this.handleImageUpload}
                        />
                    </div>
                </div>
            );

            const releaseArt72 = trackArtPreview ? 
                (<span>
                    <img className="release-art-72" src={trackArtPreview} />
                </span>) : 
                (<span className="release-art-72-absent" />);
    
            return (
                <div className="album-edit">
                    <form className="edit-album-form">
                        <div className="left-panel">
                            <div className="left-panel-album-wrapper">
                                <div className="left-panel-album-active">
                                    {releaseArt72}
                                    <span className="album-title-artist">
                                        <p>{trackTitleText}</p>
                                        <p>by <span>{currentUser.username}</span></p>
                                    </span>
                                </div>
                            </div>
                            <div className="track-edit">
                                {audioUpload}
                            </div>
                            <div className="save">
                                {publishBtn}
                            </div>
                        </div>
                        <div className="right-panel">
                            {titleInput}
                            {trackTitleAlert}
                            {trackArt}
                            {trackArtAlert}
                            {aboutLabel}
                            {aboutField}
                            {lyricsLabel}
                            {lyricsField}
                            {creditsLabel}
                            {creditsField}
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