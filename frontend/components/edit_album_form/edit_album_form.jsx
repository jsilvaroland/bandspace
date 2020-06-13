import React from 'react';

import EditAlbumTrackIndex from './edit_album_track_index';

class EditAlbumForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: 0,
            albumId: props.albumId,
            album: undefined,
            tracks: [],
            //errors                // will have to do some setState({ errors })
        };
        this.anyChanges = false;
        this.handlePanelChange = this.handlePanelChange.bind(this);
        this.handleAudioUpload = this.handleAudioUpload.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.change = this.change.bind(this);
    }

    componentDidMount() {
        const { albumId, fetchAlbum, fetchAlbumTracks } = this.props;
        fetchAlbum(albumId).then(fetchAlbumTracks(albumId));
    }

    componentDidUpdate() {
        const { album, tracks } = this.props;
        
        if (album && tracks.length === album.trackIds.length && !this.state.album) {
            this.setState({ album });
        } else if ( this.state.album && this.state.tracks.length !== this.state.album.trackIds.length) {
            this.setState({ tracks });
        }
    }

    componentWillUnmount() {
        this.props.clearAlbums();
        this.props.clearTracks();
    }

    handlePanelChange(panel) {
        this.setState({ activePanel: panel });
    }

    change(field, subfield, i) {
        return e => {
            let fieldCopy;
            
            (field === 'album') ?
                fieldCopy = this.state[field]:
                fieldCopy = this.state[field][i];

            fieldCopy[subfield] = e.target.value;
            this.setState({ fieldCopy: e.target.value });
            this.anyChanges = true;
        };
    }

    handleAudioUpload() {
        console.log('inside audio upload');
        // don't forget to add trackId to album's trackIds array after upload
    }

    handleUpdate() {
        const { album, tracks } = this.state;
        this.props.updateAlbum(album);
        tracks.forEach(track => this.props.updateTrack(track));
    }

    render() {
        const { currentUser } = this.props;
        const { album, tracks, activePanel } = this.state;

        if (album && tracks.length === album.trackIds.length && currentUser) {
            let updateBtn, titleText, aboutLabel, aboutField, lyricsLabel, 
            lyricsField, creditsLabel, creditsField; 

            this.anyChanges ?
                updateBtn = (<button className='update' onClick={this.handleUpdate}>
                                Update
                            </button>) :
                updateBtn = (<button className='update-disabled'>
                                Update
                            </button>) 

            if (activePanel === 0) {
                titleText = (<input
                            type="text"
                            value={this.state.album.title}
                            onChange={this.change('album', 'title')}
                            />);

                aboutLabel = (<label className="album-about-label">about this album:</label>)
                aboutField = (<input className="about-album-input"
                    type="textarea"
                    value={this.state.album.description}
                    placeholder="(optional)"
                    onChange={this.change('album', 'description')}
                />)

                creditsLabel = (<label className="album-credits-label">album credits:</label>)
                creditsField = (<input className="credits-album-input"
                    type="textarea"
                    value={this.state.album.credits}
                    placeholder="(optional)"
                    onChange={this.change('album', 'credits')}
                />)
            } else {
                titleText = (<input
                            type="text"
                            value={this.state.tracks[activePanel - 1].title} 
                            onChange={this.change('tracks', 'title', activePanel - 1)}
                            />);

                aboutLabel = (<label className="track-about-label">about this track:</label>)
                aboutField = (<input className="about-track-input"
                    type="textarea"
                    value={this.state.tracks[activePanel - 1].description}
                    placeholder="(optional)"
                    onChange={this.change('tracks', 'description', activePanel - 1)}
                />)

                lyricsLabel = (<label className="track-lyrics-label">lyrics:</label>)
                lyricsField = (<input className="lyrics-track-input"
                    type="textarea"
                    value={this.state.tracks[activePanel - 1].lyrics}
                    placeholder="(optional)"
                    onChange={this.change('tracks', 'lyrics', activePanel - 1)}
                />)

                creditsLabel = (<label className="track-credits-label">track credits:</label>)
                creditsField = (<input className="credits-track-input"
                    type="textarea"
                    value={this.state.tracks[activePanel - 1].credits}
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
                                        <img className="release-art-72" src={album.albumArt} />
                                    </span>
                                    <span className="album-title-artist">
                                        <p>{album.title}</p>
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
                                {updateBtn}
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
                        </div>
                    </form>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default EditAlbumForm;