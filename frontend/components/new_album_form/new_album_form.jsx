import React from 'react';

import EditAlbumTrackIndex from '../edit_album_form/edit_album_track_index';

class NewAlbumForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: 0,
            albumArtPreview: null,
            album: {
                title: "",
                credits: "",
                descripton: "",
                trackIds: [],
                albumArt: null,
            },
            tracks: [],
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

    componentDidUpdate() {
        const { album, tracks } = this.props;

        if (album && tracks) {
            debugger
            if (album && tracks.length === album.trackIds.length && !this.state.album) {
                this.setState({ album });
            } else if (this.state.album && this.state.tracks.length !== this.state.album.trackIds.length) {
                this.setState({ tracks });
            }
        }

        if (tracks && tracks.length !== 0) {
            debugger
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
        // don't forget to add trackId to album's trackIds array after upload
        // basically what you do is add a track to this.state.tracks
        const uploadedTrackSong = e.currentTarget.files[0];
        if (uploadedTrackSong && (uploadedTrackSong.type === "audio/wav" || uploadedTrackSong.type === "audio/mpeg")) {
            let tracksCopy = this.state.tracks;
            tracksCopy.push({
                title: "",
                credits: "",
                description: "",
                lyrics: "",
                trackSong: uploadedTrackSong,
            });
            this.setState({ tracks: tracksCopy });
        } else {
            console.log('Audio file must be mp3/wav format');
            //setState errors or something
        }
    }

    handleImageUpload(e) {
        const uploadedAlbumArt = e.currentTarget.files[0];
        if (uploadedAlbumArt && (uploadedAlbumArt.type === "image/png" || 
        uploadedAlbumArt.type === "image/jpeg" || uploadedAlbumArt.type === "image/gif")) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                let albumCopy = this.state.album;
                albumCopy.albumArt = uploadedAlbumArt; // might not be able to just do this
                this.setState({ album: albumCopy, albumArtPreview: fileReader.result });
            };

            fileReader.readAsDataURL(uploadedAlbumArt);
        } else {
            console.log("Album art must be png/jpg/gif format");
            // setState to render errors here
        }
    }

    forwardToHiddenInput() {
        document.getElementById('image-file').click();
    }

    handleCreate() {
        const { album, tracks } = this.state;
        const hasTitle = track => track.title !== "";

        // create the album
        if (album.albumArt && album.title !== "" && tracks.every(hasTitle)) { // also make sure trackIds are equal to the Ids for each track
            const albumFormData = new FormData();
            albumFormData.append('album[title]', this.state.album.title);
            albumFormData.append('album[description]', this.state.album.description);
            albumFormData.append('album[credits]', this.state.album.credits);
            albumFormData.append('album[photo]', this.state.album.albumArt);
            this.props.createAlbum(albumFormData)
                .then(
                    response => console.log(response.message),
                    response => console.log(response.responseJSON)
                ); 

            // this.setState({ albumId: album.id });
            // tracks.forEach((track, i) => {
            //     this.state.tracks[i].albumId = albumId;
            //     this.props.createTrack(track);
            // }); // create the individual tracks, making sure that each track has this album's albumId
        } else if (!album.albumArt) {
            console.log('album art required');
        } else if (album.title) {

        }

        // create the tracks

        // somehow give album the track IDs
        debugger
    }

    render() {
        const { currentUser } = this.props;
        const { album, tracks, activePanel, albumArtPreview } = this.state;

        if (currentUser) {
            console.log(this.state);

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
                                    <input id="image-file" type="file" onChange={this.handleImageUpload}></input>
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

            console.log(album.albumArt);

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