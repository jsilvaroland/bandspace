import React from 'react';
import { Redirect } from 'react-router-dom';

import EditAlbumTrackIndex from '../edit_album_form/edit_album_track_index';

class NewAlbumForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: 0,
            albumTitleError: false,
            albumArtError: false,
            albumArtPreview: null,
            tracks: [],
            album: {
                title: "",
                credits: "",
                description: "",
                albumArt: null,
                trackIds: [],
            },
            published: false,
        };
        this.anyChanges = false;
        this.forwardToHiddenInput = this.forwardToHiddenInput.bind(this);
        this.handlePanelChange = this.handlePanelChange.bind(this);
        this.handleAudioUpload = this.handleAudioUpload.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.deleteAlbumArt = this.deleteAlbumArt.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.change = this.change.bind(this);
        this.deleteTrack = this.deleteTrack.bind(this);
    }
    
    componentDidMount() {
        this.props.clearAlbums();
        this.props.clearTracks();
    }

    componentWillUnmount() {
        this.props.stopLoading();
    }

    componentDidUpdate() {
        const { album, tracks, albumTitleError, activePanel, albumArtError, 
            albumArtPreview } = this.state;

        if (album.id && tracks.length === album.trackIds.length) {
            const albumFormData = new FormData();
            albumFormData.append('album[description]', album.description);
            albumFormData.append('album[title]', album.title);
            albumFormData.append('album[credits]', album.credits);
            albumFormData.append('album[photo]', album.albumArt);
            albumFormData.append('album[track_ids]', album.trackIds);

            this.props.updateAlbum(albumFormData)
                .then(this.props.clearAlbums())
                .then(this.props.clearTracks())
                .then(this.setState({ published: true }));
        }

        if (album.title !== "" && albumTitleError) {
            this.setState({ albumTitleError: false });
        }

        if (activePanel > 0 && tracks[activePanel - 1].title !== "" && 
        tracks[activePanel - 1].trackTitleError) {
            let tracksCopy = tracks;
            tracksCopy[activePanel - 1].trackTitleError = false;
            this.setState({ tracks: tracksCopy });
        }

        if (albumArtError && albumArtPreview) {
            this.setState({ albumArtError: false });
        }
    }

    handlePanelChange(panel) {
        this.setState({ activePanel: panel });
    }

    deleteTrack(i) {
        let tracksCopy = this.state.tracks;
        tracksCopy.splice(i, 1);
        this.setState({ activePanel: 0, tracks: tracksCopy });
    }

    change(field, subfield, i) {
        return e => {
            let fieldCopy;

            (field === 'album') ?
                fieldCopy = this.state[field] :
                fieldCopy = this.state[field][i];

            fieldCopy[subfield] = e.target.value;
            this.setState({ fieldCopy: e.target.value });
            this.anyChanges = true;
        };
    }

    handleAudioUpload(e) {
        const uploadFile = e.currentTarget.files[0];
        if (uploadFile) {
            let tracksCopy = this.state.tracks;
            tracksCopy.push({
                title: "",
                credits: "",
                description: "",
                lyrics: "",
                trackSong: uploadFile,
            });
            this.setState({ tracks: tracksCopy, activePanel: tracksCopy.length });
        }
    }

    handleImageUpload(e) {
        const uploadFile = e.currentTarget.files[0];
        if (uploadFile && uploadFile.size < 10000000) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                let albumCopy = this.state.album;
                albumCopy.albumArt = uploadFile; // might not be able to just do this
                this.setState({ album: albumCopy, albumArtPreview: fileReader.result });
            };
            fileReader.readAsDataURL(uploadFile);
        } else {
            this.props.openModal("image-size-error");
            document.getElementById('image-file').value = "";
        }
    }

    deleteAlbumArt() {
        let albumCopy = this.state.album;
        albumCopy.albumArt = null; // might not be able to just do this
        this.setState({ album: albumCopy, albumArtPreview: null });
    }

    forwardToHiddenInput() {
        document.getElementById('image-file').click();
    }

    handleCreate() {
        const { createAlbum, createTrack } = this.props;
        const { album, tracks } = this.state;
        const hasTitle = track => track.title !== "";

        // create the album
        if (album.albumArt && album.title !== "" && tracks.every(hasTitle)) { // also make sure trackIds are equal to the Ids for each track
            // maybe leave the albumArt validation for backend
            
            const albumFormData = new FormData();
            albumFormData.append('album[description]', album.description);
            albumFormData.append('album[title]', album.title);
            albumFormData.append('album[credits]', album.credits);
            albumFormData.append('album[photo]', album.albumArt);

            const tracksFormData = []; let trackFormData;
            tracks.forEach(track => {
                trackFormData = new FormData();
                trackFormData.append('track[title]', track.title);
                trackFormData.append('track[description]', track.description);
                trackFormData.append('track[credits]', track.credits);
                trackFormData.append('track[lyrics]', track.lyrics);
                trackFormData.append('track[song]', track.trackSong);
                tracksFormData.push(trackFormData);
            });

            createAlbum(albumFormData)
                .then(res => 
                    tracksFormData.forEach(trackFormData => {
                        album.id = res.album.id;
                        trackFormData.append('track[album_id]', res.album.id);
                        createTrack(trackFormData)
                            .then(res => {
                                album.trackIds.push(res.track.id);
                                this.setState({ album: album });
                            })
                            .then(this.props.displayLoading(true));
                    }));
        } else if (album.title === "") {
            this.setState({ activePanel: 0, albumTitleError: true });
        } else if (!tracks.every(hasTitle)) {
            let tracksCopy = tracks, firstTrackWithoutTitle;
            tracksCopy.forEach((track, i) => {
                if (track.title === "") {
                    tracksCopy[i].trackTitleError = true;
                    if (!firstTrackWithoutTitle) firstTrackWithoutTitle = i + 1;
                }
            });
            this.setState({ tracks: tracksCopy, activePanel: firstTrackWithoutTitle });
        } else if (!album.albumArt) {
            this.setState({ activePanel: 0, albumArtError: true });
        }
    }

    render() {
        const { currentUser } = this.props;
        
        if (this.state.published) {
            return <Redirect to={`/artists/${currentUser.id}`} />
        } else if (currentUser) {
            const { album, tracks, activePanel, albumArtPreview,
                 albumTitleError, albumArtError } = this.state;
            let publishBtn, titleText, aboutLabel, aboutField, lyricsLabel,
                lyricsField, creditsLabel, creditsField, albumTitleText, 
                albumArt, leftPanelAlbumClass, albumTitleClassName, titleError,
                trackTitleClassName, albumTitleAlert, trackTitleAlert, 
                albumArtAlert, albumArtClassName;

            const releaseArt72 = albumArtPreview ?
                <span>
                    <img className="release-art-72" src={albumArtPreview} />
                </span> : 
                <span className="release-art-72-absent" />;

            this.anyChanges && tracks.length !== 0 ?
                publishBtn = (<button className='publish' onClick={this.handleCreate}>
                    Publish
                </button>) :
                publishBtn = (<button className='publish-disabled'>
                    Publish
                </button>)

            album.title === "" ?
                albumTitleText = "Untitled Album" :
                albumTitleText = album.title;

            if (activePanel === 0) {
                leftPanelAlbumClass = "left-panel-album-active";

                if (albumArtError) {
                    albumArtClassName = "release-art-212-absent-error"
                    albumArtAlert = (<div className="album-art-alert">
                        Please add cover art for this album.
                    </div>)
                } else {
                    albumArtClassName = "release-art-212-absent"
                }

                if (albumTitleError) {
                    albumTitleClassName = "album-title-text-error";
                    albumTitleAlert = (<div className="album-title-alert">
                        Please enter an album name.
                    </div>)
                } else {
                    albumTitleClassName = "album-title-text"
                }

                titleText = (<input
                    className={albumTitleClassName}
                    type="text"
                    value={album.title}
                    placeholder="album name"
                    onChange={this.change('album', 'title')}
                />);

                titleError = albumTitleAlert;

                aboutLabel = (<label className="album-about-label">about this album:</label>)
                aboutField = (<textarea className="about-album-input"
                    value={album.description}
                    placeholder="(optional)"
                    onChange={this.change('album', 'description')}
                />)

                creditsLabel = (<label className="album-credits-label">album credits:</label>)
                creditsField = (<textarea className="credits-album-input"
                    value={album.credits}
                    placeholder="(optional)"
                    onChange={this.change('album', 'credits')}
                />)



                albumArtPreview ?
                    albumArt = (
                        <div className="album-art-wrapper">
                            <div className="release-art-wrapper">
                                <img className="release-art-212" src={albumArtPreview} />
                                <button className="remove"
                                    onClick={this.deleteAlbumArt}>
                                    &times;
                                </button>
                            </div>
                        </div>) :
                    albumArt = (
                        <div className="album-art-wrapper">
                            <div className={albumArtClassName}>
                                <div className="add-album-art" onClick={this.forwardToHiddenInput}>
                                    Upload Album Art
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
                        </div>)
            } else {
                leftPanelAlbumClass = "left-panel-album";

                if (tracks[activePanel - 1].trackTitleError) {
                    trackTitleClassName = "title-text-error";
                    trackTitleAlert = (<div className="track-title-alert">
                        Please enter a track name.
                    </div>)
                } else {
                    trackTitleClassName = "title-text"
                }

                titleText = (<input
                    className={trackTitleClassName}
                    type="text"
                    placeholder="track name"
                    value={tracks[activePanel - 1].title}
                    onChange={this.change('tracks', 'title', activePanel - 1)}
                />);

                titleError = trackTitleAlert;

                aboutLabel = (<label className="track-about-label">about this track:</label>)
                aboutField = (<textarea className="about-track-input"
                    value={tracks[activePanel - 1].description}
                    placeholder="(optional)"
                    onChange={this.change('tracks', 'description', activePanel - 1)}
                />)

                lyricsLabel = (<label className="track-lyrics-label">lyrics:</label>)
                lyricsField = (<textarea className="lyrics-track-input"
                    value={tracks[activePanel - 1].lyrics}
                    placeholder="(optional)"
                    onChange={this.change('tracks', 'lyrics', activePanel - 1)}
                />)

                creditsLabel = (<label className="track-credits-label">track credits:</label>)
                creditsField = (<textarea className="credits-track-input"
                    value={tracks[activePanel - 1].credits}
                    placeholder="(optional)"
                    onChange={this.change('tracks', 'credits', activePanel - 1)}
                />)
            }

            return (
                <div className="album-edit">
                    <form className="edit-album-form">
                        <div className="left-panel">
                            <div className="left-panel-album-wrapper">
                                <div className={leftPanelAlbumClass} onClick={() => this.handlePanelChange(0)}>
                                    {releaseArt72}
                                        {/* <img className={releaseArt72} src={albumArtPreview} /> */}
                                    <span className="album-title-artist">
                                        <p>{albumTitleText}</p>
                                        <p>by <span>{currentUser.username}</span></p>
                                    </span>
                                </div>
                            </div>
                            <EditAlbumTrackIndex
                                handlePanelChange={this.handlePanelChange}
                                handleAudioUpload={this.handleAudioUpload}
                                activePanel={activePanel}
                                tracks={tracks}
                                deleteTrack={this.deleteTrack}
                            />
                            <div className="save">
                                {publishBtn}
                            </div>
                        </div>
                        <div className="right-panel">
                            {titleText}
                            {titleError}
                            {albumArt}
                            {albumArtAlert}
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
            return <div>New Album Page Loading</div>
        }
    }
}

export default NewAlbumForm;