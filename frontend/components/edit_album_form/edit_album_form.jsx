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
        };
        // this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePanelChange = this.handlePanelChange.bind(this);
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

    handlePanelChange(panel) {
        this.setState({ activePanel: panel });
    }

    change(field, subfield, i) {
        return e => {
            let fieldCopy;
            
            (field === 'album') ?
                fieldCopy = this.state[field]:
                fieldCopy = this.state[field][i];

            fieldCopy[subfield] = e.target.value; // sets album[title] to targ val
            this.setState({ fieldCopy: e.target.value });
        };
    }

    render() {
        const { currentUser } = this.props;
        const { album, tracks, activePanel } = this.state;

        if (album && tracks.length === album.trackIds.length && currentUser) {
            let titleText, aboutLabel, aboutField; 
            
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
                    onChange={this.change('album', 'description')}
                />)
                
            } else {
                titleText = (<input
                            type="text"
                            value={this.state.tracks[activePanel - 1].title} 
                            onChange={this.change('tracks', 'title', activePanel - 1)}
                            />);
                aboutLabel = (<label className="album-about-label">about this track:</label>)
                aboutField = (<input className="about-album-input"
                    type="textarea"
                    value={this.state.tracks[activePanel - 1].description}
                    onChange={this.change('tracks', 'description', activePanel - 1)}
                />)
                debugger
            }

            // active panel should change, so should the text area
                            
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
                            <EditAlbumTrackIndex handlePanelChange={this.handlePanelChange} tracks={tracks} />
                        </div>
                        <div className="right-panel">
                            {titleText}
                            {aboutLabel}
                            {aboutField}
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