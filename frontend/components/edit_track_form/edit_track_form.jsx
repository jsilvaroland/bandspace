import React from 'react';
import { Redirect } from 'react-router-dom';

class EditTrackForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trackTitleError: false,
      trackArtError: false,
      trackArtPreview: null,
      track: undefined,
      updated: false,
    };
    this.anyChanges = false;
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.forwardToHiddenInput = this.forwardToHiddenInput.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.deleteTrackArt = this.deleteTrackArt.bind(this);
  }

  componentDidMount() {
    this.props.fetchTrack(this.props.trackId)
      .then((res) => this.setState({ trackArtPreview: res.track.trackArt }));
  }

  componentDidUpdate() {
    const { track } = this.props;
    const { trackArtError, trackArtPreview, trackTitleError } = this.state;

    if (track && !this.state.track) {
      this.setState({ track: track });
    }

    if (trackTitleError && this.state.track.title !== "") {
        this.setState({ trackTitleError: false });
    }

    if (trackArtError && trackArtPreview) {
      this.setState({ trackArtError: false });
    }
  }

  componentWillUnmount() {
    this.props.clearTracks();
    this.props.stopLoading();
  }

  change(subfield) {
    return e => {
      let trackCopy = this.state.track;

      trackCopy[subfield] = e.target.value;
      this.setState({ track: trackCopy });
      this.anyChanges = true;
    };
  }

  handleImageUpload(e) {
    const uploadFile = e.currentTarget.files[0];
    if (uploadFile && uploadFile.size < 10000000) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        let trackCopy = this.state.track;
        trackCopy.trackArt = uploadFile;
        this.setState({ track: trackCopy, trackArtPreview: fileReader.result });
      };
      fileReader.readAsDataURL(uploadFile);
    } else {
      this.props.openModal({ "image-size-error": "image-size-error" });
      document.getElementById("image-file").value = "";
    }
  }

  forwardToHiddenInput() {
    document.getElementById("image-file").click();
  }

  handleUpdate() {
    const { track } = this.state;
    const { updateTrack, displayLoading, trackId } = this.props;

    if (track.trackArt && track.title !== "") {
        displayLoading(true);
        const trackFormData = new FormData();
        trackFormData.append("track[id]", trackId);
        trackFormData.append("track[title]", track.title);
        trackFormData.append("track[description]", track.description);
        trackFormData.append("track[credits]", track.credits);
        trackFormData.append("track[lyrics]", track.lyrics);
        if (track.trackArt.size) {
          trackFormData.append("track[photo]", track.trackArt);
        }
        updateTrack(trackFormData)
            .then(this.setState({ updated: true }));
    } else if (track.title === "") {
        this.setState({ trackTitleError: true });
    } else if (!track.trackArt) {
        this.setState({ trackArtError: true });
    }
  }

  deleteTrackArt() {
    let trackCopy = this.state.track;
    trackCopy.trackArt = null;
    this.setState({ track: trackCopy, trackArtPreview: null });
    this.anyChanges = true;
  }

  render() {
    const { currentUser } = this.props;
    const { track } = this.state;
        
        if (this.state.updated) {
            return (<Redirect to={`/artists/${currentUser.id}`} />)
        } else if (track && currentUser) {
            const { track, trackArtPreview, trackArtError, 
                trackTitleError } = this.state;
            let updateBtn, trackTitleText, titleInput, aboutLabel, aboutField, 
                lyricsLabel, lyricsField, creditsLabel, creditsField, 
                trackArtClassName, trackTitleClassName, trackArtAlert,
                trackTitleAlert, fileName, fileSize;
    
            this.anyChanges ?
                updateBtn = (<button className='update' onClick={this.handleUpdate}>
                    Update
                </button>) :
                updateBtn = (<button className='update-disabled'>
                    Update
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

            for (let i = track.trackSong.length - 1; i >= 0; i--) {
                if (track.trackSong[i] === "/") {
                    fileName = track.trackSong.slice(i + 1);
                    break;
                }
            }
            fileSize = (track.trackSize / 1000000).toFixed(1);

            const audioUpload = (
              <div className="left-panel-audio-upload">
                <div className="audio">AUDIO</div>
                <span className="filename">{fileName}</span>
                <span className="filesize">
                    {fileSize}MB
                </span>
                {/* add replace functionality later */}
              </div>
            )

            // const audioUpload = audioUploaded ? (
            //   <div className="left-panel-audio-upload">
            //     <div className="audio">AUDIO</div>
            //     <span className="filename">{track.trackSong.name}</span>
            //     <span className="filesize">
            //         {(track.trackSong.size / 1000000).toFixed(1)}MB
            //     </span>
            //     {/* add replace functionality later */}
            //   </div>
            // ) : (
            //   <div className="left-panel-audio-upload">
            //     <input
            //       id="audio-file"
            //       accept="audio/mp3, audio/wav"
            //       type="file"
            //       onChange={this.handleAudioUpload}
            //     />
            //     <span
            //       className="add-track"
            //       onClick={() => this.forwardToHiddenInput("audio")}
            //     >
            //       add audio
            //     </span>
            //   </div>
            // );

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
                                {updateBtn}
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

export default EditTrackForm;