import React from 'react';
import { Redirect } from 'react-router-dom';

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
    this.forwardToHiddenInput = this.forwardToHiddenInput.bind(this);
    this.handlePanelChange = this.handlePanelChange.bind(this);
    this.handleAudioUpload = this.handleAudioUpload.bind(this);
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.change = this.change.bind(this);
    this.discardTrack = this.discardTrack.bind(this);
    this.deleteAlbumArt = this.deleteAlbumArt.bind(this);
  }

  componentDidMount() {
    const { albumId, fetchAlbum, fetchAlbumTracks } = this.props;
    fetchAlbum(albumId)
      .then((res) => this.setState({ albumArtPreview: res.album.albumArt }))
      .then(fetchAlbumTracks(albumId));
  }

  componentDidUpdate() {
    const { album, tracks } = this.props;
    const { albumTitleError, albumArtError, albumArtPreview } = this.state;

    if (album && tracks.length === album.trackIds.length && !this.state.album) {
      this.setState({ album });
    } else if (this.state.album && this.state.tracks.length !== tracks.length) {
      this.setState({ tracks });
    }

    if (this.state.albumUpdated && this.state.trackUpdated) {
      this.setState({ updated: true });
    }

    if (album && album.title !== "" && albumTitleError) {
      this.setState({ albumTitleError: false });
    }

    if (albumArtError && albumArtPreview) {
      this.setState({ albumArtError: false });
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
    return (e) => {
      let fieldCopy;

      field === "album"
        ? (fieldCopy = this.state[field])
        : (fieldCopy = this.state[field][i]);

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
      this.setState({
        newTracks: newTracksCopy,
        activePanel: tracks.length + newTracksCopy.length,
      });
    }
  }

  handleImageUpload(e) {
    const uploadFile = e.currentTarget.files[0];
    if (uploadFile && uploadFile.size < 10000000) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        let albumCopy = this.state.album;
        albumCopy.albumArt = uploadFile;
        this.setState({ album: albumCopy, albumArtPreview: fileReader.result });
      };
      fileReader.readAsDataURL(uploadFile);
    } else {
      this.props.openModal({ "image-size-error": "image-size-error" });
      document.getElementById("image-file").value = "";
    }
  }

  handleUpdate() {
    const { album, tracks, newTracks, albumId } = this.state;
    const {
      updateAlbum,
      updateTrack,
      createTrack,
      displayLoading,
    } = this.props;
    const hasTitle = (track) => track.title !== "";

    if (album.albumArt && album.title !== "" && tracks.every(hasTitle) && newTracks.every(hasTitle)) {
      displayLoading(true);
      const tracksFormData = [], newTracksFormData = [];
      let trackFormData, newTrackFormData;

      tracks.forEach((track) => {
        trackFormData = new FormData();
        trackFormData.append("track[id]", track.id);
        trackFormData.append("track[title]", track.title);
        trackFormData.append("track[description]", track.description);
        trackFormData.append("track[credits]", track.credits);
        trackFormData.append("track[lyrics]", track.lyrics);
        tracksFormData.push(trackFormData);
      });

      newTracks.forEach((track) => {
        newTrackFormData = new FormData();
        newTrackFormData.append("track[title]", track.title);
        newTrackFormData.append("track[description]", track.description);
        newTrackFormData.append("track[credits]", track.credits);
        newTrackFormData.append("track[lyrics]", track.lyrics);
        newTrackFormData.append("track[song]", track.trackSong);
        newTrackFormData.append("track[album_id]", albumId);
        newTracksFormData.push(newTrackFormData);
      });

      tracksFormData.forEach((trackFormData) => updateTrack(trackFormData));
      newTracksFormData.forEach((newTrackFormData) => {
        createTrack(newTrackFormData)
          .then((res) => {
            album.trackIds.push(res.track.id);
            this.setState({ album: album });
          })
          .then(this.setState({ trackUpdated: true }));
      });

      const albumFormData = new FormData();
      albumFormData.append("album[id]", albumId);
      albumFormData.append("album[description]", album.description);
      albumFormData.append("album[title]", album.title);
      albumFormData.append("album[credits]", album.credits);
      if (album.albumArt.size) {
          albumFormData.append("album[photo]", album.albumArt);
      }
      updateAlbum(albumFormData).then(
        this.setState({ albumUpdated: true })
      );
    } else if (album.title === "") {
      this.setState({ activePanel: 0, albumTitleError: true });
    } else if (!(tracks.every(hasTitle) && newTracks.every(hasTitle))) {
      let tracksCopy = tracks, newTracksCopy = newTracks, 
      firstTrackWithoutTitle;

      tracksCopy.forEach((track, i) => {
        if (track.title === "") {
          tracksCopy[i].trackTitleError = true;
          if (!firstTrackWithoutTitle) firstTrackWithoutTitle = i + 1;
        }
      });

      newTracksCopy.forEach((track, i) => {
        if (track.title === "") {
          newTracksCopy[i].trackTitleError = true;
          if (!firstTrackWithoutTitle) firstTrackWithoutTitle = tracks.length + i + 1;
        }
      });

      this.setState({
        tracks: tracksCopy,
        newTracks: newTracksCopy,
        activePanel: firstTrackWithoutTitle,
      });
    } else if (!album.albumArt) {
      this.setState({ activePanel: 0, albumArtError: true });
    }
  }

  discardTrack(i) {
    const { tracks, newTracks, album } = this.state;

    let newTracksCopy = newTracks,
      albumCopy = album,
      idx = i - tracks.length;
    newTracksCopy.splice(idx, 1);
    this.setState({
      activePanel: 0,
      newTracks: newTracksCopy,
      album: albumCopy,
    });
  }

  deleteAlbumArt() {
    let albumCopy = this.state.album;
    albumCopy.albumArt = null;
    this.setState({ album: albumCopy, albumArtPreview: null });
    this.anyChanges = true;
  }

  forwardToHiddenInput() {
    document.getElementById("image-file").click();
  }

  render() {
    const { currentUser } = this.props;
    const {
      album,
      tracks,
      activePanel,
      newTracks,
      albumArtPreview,
      albumTitleError,
      albumArtError,
    } = this.state;

    if (this.state.updated) {
      return <Redirect to={`/artists/${currentUser.id}`} />;
    } else if (
      album &&
      tracks.length === album.trackIds.length &&
      currentUser
    ) {
      let leftPanelAlbumClass,
        updateBtn,
        titleText,
        trackTitleClassName,
        trackTitleAlert,
        albumTitleText,
        albumTitleAlert,
        albumTitleClassName,
        albumArtClassName,
        aboutLabel,
        aboutField,
        lyricsLabel,
        lyricsField,
        creditsLabel,
        creditsField,
        titleError,
        albumArt,
        albumArtAlert,
        activeTrack,
        field,
        i;

      const releaseArt72 = albumArtPreview ? (
        <span>
          <img className="release-art-72" src={albumArtPreview} />
        </span>
      ) : (
        <span className="release-art-72-absent" />
      );

      album.title === ""
        ? (albumTitleText = "Untitled Album")
        : (albumTitleText = album.title);


      this.anyChanges
        ? (updateBtn = (
            <button className="update" onClick={this.handleUpdate}>
              Update
            </button>
          ))
        : (updateBtn = <button className="update-disabled">Update</button>);

      if (activePanel === 0) {
        leftPanelAlbumClass = "left-panel-album-active";

        if (albumTitleError) {
          albumTitleClassName = "album-title-text-error";
          albumTitleAlert = (
            <div className="album-title-alert">Please enter an album name.</div>
          );
        } else {
          albumTitleClassName = "album-title-text";
        }

        titleText = (
          <input
            className={albumTitleClassName}
            type="text"
            value={album.title}
            placeholder="album name"
            onChange={this.change("album", "title")}
          />
        );

        titleError = albumTitleAlert;

        aboutLabel = (
          <label className="album-about-label">about this album:</label>
        );
        aboutField = (
          <textarea
            className="about-album-input"
            value={album.description}
            placeholder="(optional)"
            onChange={this.change("album", "description")}
          />
        );

        creditsLabel = (
          <label className="album-credits-label">album credits:</label>
        );
        creditsField = (
          <textarea
            className="credits-album-input"
            value={album.credits}
            placeholder="(optional)"
            onChange={this.change("album", "credits")}
          />
        );

        if (albumArtError) {
          albumArtClassName = "release-art-212-absent-error";
          albumArtAlert = (
            <div className="album-art-alert">
              Please add cover art for this album.
            </div>
          );
        } else {
          albumArtClassName = "release-art-212-absent";
        }

        albumArtPreview
          ? (albumArt = (
              <div className="album-art-wrapper">
                <div className="release-art-wrapper">
                  <img className="release-art-212" src={albumArtPreview} />
                  <button className="remove" onClick={this.deleteAlbumArt}>
                    &times;
                  </button>
                </div>
              </div>
            ))
          : (albumArt = (
              <div className="album-art-wrapper">
                <div className={albumArtClassName}>
                  <div
                    className="add-album-art"
                    onClick={this.forwardToHiddenInput}
                  >
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
              </div>
            ));
      } else {
        leftPanelAlbumClass = "left-panel-album";

        if (activePanel > tracks.length) {
          i = activePanel - 1 - tracks.length;
          activeTrack = newTracks[i];
          field = "newTracks";
        } else {
          i = activePanel - 1;
          activeTrack = tracks[i];
          field = "tracks";
        }

        if (activeTrack.trackTitleError) {
          trackTitleClassName = "title-text-error";
          trackTitleAlert = (
            <div className="track-title-alert">Please enter a track name.</div>
          );
        } else {
          trackTitleClassName = "title-text";
        }

        titleText = (
          <input
            className={trackTitleClassName}
            type="text"
            placeholder="track name"
            value={activeTrack.title}
            onChange={this.change(field, "title", i)}
          />
        );

        titleError = trackTitleAlert;

        aboutLabel = (
          <label className="track-about-label">about this track:</label>
        );
        aboutField = (
          <textarea
            className="about-track-input"
            value={activeTrack.description}
            placeholder="(optional)"
            onChange={this.change(field, "description", i)}
          />
        );

        lyricsLabel = <label className="track-lyrics-label">lyrics:</label>;
        lyricsField = (
          <textarea
            className="lyrics-track-input"
            value={activeTrack.lyrics}
            placeholder="(optional)"
            onChange={this.change(field, "lyrics", i)}
          />
        );

        creditsLabel = (
          <label className="track-credits-label">track credits:</label>
        );
        creditsField = (
          <textarea
            className="credits-track-input"
            value={activeTrack.credits}
            placeholder="(optional)"
            onChange={this.change(field, "credits", i)}
          />
        );
      }

      return (
        <div className="album-edit">
          <form className="edit-album-form">
            <div className="left-panel">
              <div className="left-panel-album-wrapper">
                <div
                  className={leftPanelAlbumClass}
                  onClick={() => this.handlePanelChange(0)}
                >
                  {releaseArt72}
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
                activePanel={activePanel}
                tracks={tracks.concat(newTracks)}
                album={album}
                discardTrack={this.discardTrack}
                deleteTrack={this.props.deleteTrack}
                openModal={this.props.openModal}
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
      return <div></div>;
    }
  }
}

export default EditAlbumForm;