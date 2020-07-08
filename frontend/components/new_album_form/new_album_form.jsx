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

    // componentWillUnmount() {
    //     this.props.clearAlbums();
    //     this.props.clearTracks();
    // }

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
        if (uploadFile) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                let albumCopy = this.state.album;
                albumCopy.albumArt = uploadFile; // might not be able to just do this
                this.setState({ album: albumCopy, albumArtPreview: fileReader.result });
            };
            fileReader.readAsDataURL(uploadFile);
        }
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
        } 
        
        if (!album.albumArt) {
            console.log('album art required');
        }
        
        if (album.title === "") {
            console.log('album title required');
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
                albumArt;

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
                titleText = (<input
                    type="text"
                    value={album.title}
                    placeholder="album name"
                    onChange={this.change('album', 'title')}
                />);

                aboutLabel = (<label className="album-about-label">about this album:</label>)
                aboutField = (<input className="about-album-input"
                    type="textarea"
                    value={album.description}
                    placeholder="(optional)"
                    onChange={this.change('album', 'description')}
                />)

                creditsLabel = (<label className="album-credits-label">album credits:</label>)
                creditsField = (<input className="credits-album-input"
                    type="textarea"
                    value={album.credits}
                    placeholder="(optional)"
                    onChange={this.change('album', 'credits')}
                />)
                albumArtPreview ?
                    albumArt = (<div>
                        <img className="release-art-212" src={albumArtPreview} />
                                </div>) :
                    albumArt = (<div className="release-art-212">
                                    <span className="add-album-art" onClick={this.forwardToHiddenInput}>
                                        Upload Album Art
                                    </span>
                                    <input 
                                    id="image-file" 
                                    accept="image/png, image/jpeg, image/gif"
                                    type="file" 
                                    onChange={this.handleImageUpload} 
                                    />
                                </div>)
            } else {
                titleText = (<input
                    type="text"
                    value={tracks[activePanel - 1].title}
                    onChange={this.change('tracks', 'title', activePanel - 1)}
                />);

                aboutLabel = (<label className="track-about-label">about this track:</label>)
                aboutField = (<input className="about-track-input"
                    type="textarea"
                    value={tracks[activePanel - 1].description}
                    placeholder="(optional)"
                    onChange={this.change('tracks', 'description', activePanel - 1)}
                />)

                lyricsLabel = (<label className="track-lyrics-label">lyrics:</label>)
                lyricsField = (<input className="lyrics-track-input"
                    type="textarea"
                    value={tracks[activePanel - 1].lyrics}
                    placeholder="(optional)"
                    onChange={this.change('tracks', 'lyrics', activePanel - 1)}
                />)

                creditsLabel = (<label className="track-credits-label">track credits:</label>)
                creditsField = (<input className="credits-track-input"
                    type="textarea"
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
                                <div className="left-panel-album" onClick={() => this.handlePanelChange(0)}>
                                    <span>
                                        <img className="release-art-72" src={albumArtPreview} />
                                    </span>
                                    <span className="album-title-artist">
                                        <p>{albumTitleText}</p>
                                        <p>by <span>{currentUser.username}</span></p>
                                    </span>
                                </div>
                            </div>
                            <EditAlbumTrackIndex
                                handlePanelChange={this.handlePanelChange}
                                handleAudioUpload={this.handleAudioUpload}
                                tracks={tracks}
                            />
                            <div className="save">
                                {publishBtn}
                            </div>
                        </div>
                        <div className="right-panel">
                            {titleText}
                            {aboutLabel}
                            {aboutField}
                            {lyricsLabel}
                            {lyricsField}
                            {creditsLabel}
                            {creditsField}
                            {albumArt}
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