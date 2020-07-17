import React from 'react';
import { Redirect } from "react-router-dom";

import EditAlbumTrackIndex from './edit_album_track_index';

class EditAlbumForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activePanel: 0,
            albumTitleError: false,
            albumArtError: false,
            albumArtPreview: null,
            tracks: [],
            newTracks: [],
            album: undefined,
            albumId: props.albumId,
            partiallyUpdated: false,
            updated: false,
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

        if (this.state.partiallyUpdated) {
            this.setState({ updated: true });
        }
    }

    componentWillUnmount() {
        this.props.clearAlbums();
        this.props.clearTracks();
        this.props.stopLoading();
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

    handleAudioUpload(e) {
        const { tracks, newTracks } = this.state;

        const uploadFile = e.currentTarget.files[0];
        if (uploadFile) {
          let newTracksCopy = newTracks;
          newTracksCopy.push({
            title: "",
            credits: "",
            description: "",
            lyrics: "",
            trackSong: uploadFile,
          });
          this.setState({ newTracks: newTracksCopy, activePanel: tracks.length + newTracksCopy.length });
        }
    }

    handleUpdate() {
        const { album, tracks, newTracks, albumId } = this.state;
        const { updateAlbum, updateTrack, createTrack, displayLoading } = this.props;
        const hasTitle = track => track.title !== "";

        if (album.albumArt && album.title !== "" && tracks.every(hasTitle)) {
            // also make sure trackIds are equal to the Ids for each track

            const tracksFormData = [], newTracksFormData = [];
            let trackFormData, newTrackFormData;
            
            tracks.forEach(track => {
                trackFormData = new FormData();
                trackFormData.append("track[id]", track.id);
                trackFormData.append("track[title]", track.title);
                trackFormData.append("track[description]", track.description);
                trackFormData.append("track[credits]", track.credits);
                trackFormData.append("track[lyrics]", track.lyrics);
                tracksFormData.push(trackFormData);
            });

            newTracks.forEach(track => {
                newTrackFormData = new FormData();
                newTrackFormData.append("track[title]", track.title);
                newTrackFormData.append("track[description]", track.description);
                newTrackFormData.append("track[credits]", track.credits);
                newTrackFormData.append("track[lyrics]", track.lyrics);
                newTrackFormData.append("track[song]", track.trackSong);
                newTrackFormData.append("track[album_id]", albumId);
                newTracksFormData.push(newTrackFormData);
            });

            tracksFormData.forEach(trackFormData => updateTrack(trackFormData));
            newTracksFormData.forEach(newTrackFormData => {
                createTrack(newTrackFormData)
                    .then(res => {
                        album.trackIds.push(res.track.id);
                        this.setState({ album: album });
                    })
                    .then(displayLoading(true));
                });
                
            const albumFormData = new FormData();
            albumFormData.append("album[id]", albumId);
            albumFormData.append("album[description]", album.description);
            albumFormData.append("album[title]", album.title);
            albumFormData.append("album[credits]", album.credits);
            // albumFormData.append("album[photo]", album.albumArt);
            updateAlbum(albumFormData)
                .then(this.setState({ partiallyUpdated: true }));

        } else if (album.title === "") {
            this.setState({ activePanel: 0, albumTitleError: true });
        } else if (!tracks.every(hasTitle)) {
          let tracksCopy = tracks,
            firstTrackWithoutTitle;
          tracksCopy.forEach((track, i) => {
            if (track.title === "") {
              tracksCopy[i].trackTitleError = true;
              if (!firstTrackWithoutTitle) firstTrackWithoutTitle = i + 1;
            }
          });
          this.setState({
            tracks: tracksCopy,
            activePanel: firstTrackWithoutTitle,
          });
        } else if (!album.albumArt) {
            this.setState({ activePanel: 0, albumArtError: true });
        }
    }

    render() {
        const { currentUser } = this.props;
        const { album, tracks, activePanel, newTracks } = this.state;

        if (this.state.updated) {
            return <Redirect to={`/artists/${currentUser.id}`} />
        } else if (album && tracks.length === album.trackIds.length && currentUser) {
            let updateBtn, titleText, albumTitleText, aboutLabel, aboutField, lyricsLabel, 
            lyricsField, creditsLabel, creditsField, titleError, albumArt, 
            albumArtAlert, activeTrack, field, i;

            album.title === "" ? 
                albumTitleText = "Untitled Album" :
                albumTitleText = album.title;

            this.anyChanges ?
                updateBtn = (<button className='update' onClick={this.handleUpdate}>
                                Update
                            </button>) :
                updateBtn = (<button className='update-disabled'>
                                Update
                            </button>) 

            if (activePanel === 0) {
                titleText = (<input className="album-title-text"
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
            } else {
                if (activePanel > tracks.length) {
                    i = activePanel - 1 - tracks.length;
                    activeTrack = newTracks[i];
                    field = 'newTracks';
                } else {
                    i = activePanel - 1;
                    activeTrack = tracks[i];
                    field = 'tracks';
                }

                titleText = (<input className="title-text"
                            type="text"
                            placeholder="track name"
                            value={activeTrack.title} 
                            onChange={this.change(field, 'title', i)}
                            />);

                aboutLabel = (<label className="track-about-label">about this track:</label>)
                aboutField = (<textarea className="about-track-input"
                    value={activeTrack.description}
                    placeholder="(optional)"
                    onChange={this.change(field, 'description', i)}
                />)

                lyricsLabel = (<label className="track-lyrics-label">lyrics:</label>)
                lyricsField = (<textarea className="lyrics-track-input"
                    value={activeTrack.lyrics}
                    placeholder="(optional)"
                    onChange={this.change(field, 'lyrics', i)}
                />)

                creditsLabel = (<label className="track-credits-label">track credits:</label>)
                creditsField = (<textarea className="credits-track-input"
                    value={activeTrack.credits}
                    placeholder="(optional)"
                    onChange={this.change(field, 'credits', i)}
                />)
            }

            return (
              <div className="album-edit">
                <form className="edit-album-form">
                  <div className="left-panel">
                    <div className="left-panel-album-wrapper">
                      <div
                        className="left-panel-album"
                        onClick={() => this.handlePanelChange(0)}
                      >
                        <span>
                          <img
                            className="release-art-72"
                            src={album.albumArt}
                          />
                        </span>
                        <span className="album-title-artist">
                          <p>{albumTitleText}</p>
                          <p>
                            by <span>{currentUser.username}</span>
                          </p>
                        </span>
                      </div>
                    </div>
                    <EditAlbumTrackIndex
                      handlePanelChange={this.handlePanelChange}
                      handleAudioUpload={this.handleAudioUpload}
                      tracks={tracks.concat(newTracks)}
                    />
                    <div className="save">{updateBtn}</div>
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
            return <div></div>
        }
    }
}

export default EditAlbumForm;