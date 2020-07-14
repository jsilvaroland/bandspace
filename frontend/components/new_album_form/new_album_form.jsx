import React from 'react';
import { Redirect } from 'react-router-dom';

import EditAlbumTrackIndex from '../edit_album_form/edit_album_track_index';

class NewAlbumForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: 0,
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
            //errors                // will have to do some setState({ errors })
        };
        this.anyChanges = false;
        this.forwardToHiddenInput = this.forwardToHiddenInput.bind(this);
        this.handlePanelChange = this.handlePanelChange.bind(this);
        this.handleAudioUpload = this.handleAudioUpload.bind(this);
        this.handleImageUpload = this.handleImageUpload.bind(this);
        this.deleteAlbumArt = this.deleteAlbumArt.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.change = this.change.bind(this);
    }
    
    componentDidMount() {
        this.props.clearAlbums();
        this.props.clearTracks();
    }

    componentDidUpdate() {
        const { album, tracks } = this.state;

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
    }

    handlePanelChange(panel) {
        this.setState({ activePanel: panel });
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
            this.setState({ tracks: tracksCopy });
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
                            });
                    }));
        } else if (album.title === "") {
            this.setState({ activePanel: 0 });
            // make input box red
            console.log('album title required');
        } else if (!tracks.every(hasTitle)) {
            // switch active panel to first track without a title
            console.log('every track needs a title');
        } else if (!album.albumArt) {
            this.setState({ activePanel: 0 });
            console.log('album art required');
        }
    }

    render() {
        const { currentUser } = this.props;
        
        if (this.state.published) {
            return <Redirect to={`/artists/${currentUser.id}`} />
        } else if (currentUser) {
            const { album, tracks, activePanel, albumArtPreview } = this.state;
            let publishBtn, titleText, aboutLabel, aboutField, lyricsLabel,
                lyricsField, creditsLabel, creditsField, albumTitleText, 
                albumArt, leftPanelAlbumClass;

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

                titleText = (<input
                    className="title-text"
                    type="text"
                    value={album.title}
                    placeholder="album name"
                    onChange={this.change('album', 'title')}
                />);

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
                            <div className="release-art-212-absent">
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

                titleText = (<input
                    className="title-text"
                    type="text"
                    placeholder="track name"
                    value={tracks[activePanel - 1].title}
                    onChange={this.change('tracks', 'title', activePanel - 1)}
                />);

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
                            />
                            <div className="save">
                                {publishBtn}
                            </div>
                        </div>
                        <div className="right-panel">
                            {titleText}
                            {albumArt}
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