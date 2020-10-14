import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import {
  faPlay,
  faFastBackward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import TrackIndex from './track_index';
import MusicPlayer from '../music_player/music_player';

class AlbumShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playing: false,
      pageId: parseInt(props.match.params.albumId),
      deleted: false,
    };
    this.clickPlay = this.clickPlay.bind(this);
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.handleBannerUpload = this.handleBannerUpload.bind(this);
    this.handleBioPicUpload = this.handleBioPicUpload.bind(this);
    this.deleteBioPic = this.deleteBioPic.bind(this);
  }

  componentDidMount() {
    const that = this;
    this.props.clearAlbums();
    this.props.clearTracks();
    this.props.fetchUser();
    this.props.fetchAlbum(this.props.pageAlbumId);
    this.props.fetchAlbumTracks(this.props.pageAlbumId).then((res) =>
      that.setState({
        activeAudio: new Audio(Object.values(res.tracks)[0].trackSong),
        activeTrack: Object.values(res.tracks)[0],
      })
    );
  }

  componentWillUnmount() {
    const { clearTracks, clearAlbums } = this.props;
    if (this.state.playing) {
      this.clickPlay(this.state.activeTrack, this.state.activeAudio);
    }
    clearAlbums();
    clearTracks();
  }

  componentDidUpdate() {
    const { pageAlbumId, pageAlbum, pageTracks } = this.props;

    if (this.state.activeAudio && !this.state.activeAudio.duration) {
        const that = this;
        this.state.activeAudio.onloadedmetadata = function () {
            that.audioDuration = this.duration;
            that.setState({ audioDuration: this.duration });
        };
    }

    if (this.state.activeAudio && !this.state.featuredAudio) {
      this.setState({ featuredAudio: this.state.activeAudio });
    }

    if (pageAlbumId && pageAlbumId !== this.state.pageId) {
      const {
        clearAlbums,
        clearTracks,
        fetchUser,
        fetchAlbum,
        fetchAlbumTracks,
      } = this.props;
      clearAlbums();
      clearTracks();

      fetchUser();
      fetchAlbum(pageAlbumId);
      fetchAlbumTracks(pageAlbumId);
      this.setState({ pageId: parseInt(this.props.match.params.albumId) });

      if (
        pageAlbum &&
        pageAlbum.trackIds.length === pageTracks.length &&
        !this.state.activeTrack
      ) {
        this.setState({ activeTrack: pageTracks[0] });
      }
    } else if (!pageAlbum && this.state.featuredAudio) {
      this.setState({ deleted: true });
      // test deletion redirection
    }
  }

  clickPlay(track, audio, playing) {
    const isPlaying = playing !== undefined ? playing : this.state.playing;
    const { activeTrack, activeAudio } = this.state;

    if (!isPlaying && track.trackSong !== activeTrack.trackSong) {
      // if no music playing...
      activeAudio.currentTime = 0;
      this.setState({ playing: true, activeTrack: track, activeAudio: audio });
      audio.play();
    } else if (!isPlaying && track.trackSong === activeTrack.trackSong) {
      this.setState({ playing: true, activeTrack: track, activeAudio: audio });
      activeAudio.play();
    } else if (track.trackSong !== activeTrack.trackSong) {
      // music is playing, but now we want to switch up the music
      activeAudio.pause();
      //   activeAudio.currentTime = 0;
      this.setState({ activeTrack: track, activeAudio: audio });
      this.clickPlay(track, audio, false);
    } else {
      // music playing, pause that song
      activeAudio.pause();
      this.setState({ playing: false });
    }
  }

  prev() {
    let currentTrackId =
      this.props.pageTracks.indexOf(this.state.activeTrack) + 1;
    const prevPlay = document.getElementsByClassName("mini-play-button")[
      currentTrackId - 2
    ];
    prevPlay.click();
  }

  next() {
    let currentTrackId;
    if (this.state.activeTrack) {
      currentTrackId =
        this.props.pageTracks.indexOf(this.state.activeTrack) + 1;
    } else {
      currentTrackId = 1;
    }

    const nextPlay = document.getElementsByClassName("mini-play-button")[
      currentTrackId
    ];

    if (nextPlay) {
      nextPlay.click();
    } else {
      this.state.activeAudio.pause();
      this.setState({ playing: false, activeTrack: this.props.pageTracks[0] });
      this.state.activeAudio = this.state.featuredAudio;
    }
  }

  hasNextTrack() {
    const { pageTracks } = this.props;
    return pageTracks.length !== pageTracks.indexOf(this.state.activeTrack) + 1;
  }

  hasPrevTrack() {
    if (!this.state.activeTrack) return false;
    return this.props.pageTracks.indexOf(this.state.activeTrack) !== 0;
  }

  forwardToHiddenInput(inputType) {
    document.getElementById(`${inputType}-file`).click();
  }

  deleteBioPic() {
    const { updateUser } = this.props;

    const nullFormData = new FormData();
    nullFormData.append("user[photo]", null);
    updateUser(nullFormData);
  }

  handleBannerUpload(e) {
    const { updateUser, openModal } = this.props;
    const uploadFile = e.currentTarget.files[0];

    if (uploadFile && uploadFile.size < 2000000) {
      const userFormData = new FormData();
      userFormData.append("user[banner]", uploadFile);
      updateUser(userFormData);
    } else {
      openModal({ "custom-header-size-error": "custom-header-size-error" });
      document.getElementById("banner-file").value = "";
    }
  }

  handleBioPicUpload(e) {
    const { updateUser } = this.props;
    const uploadFile = e.currentTarget.files[0];

    if (uploadFile) {
      const userFormData = new FormData();
      userFormData.append("user[photo]", uploadFile);
      updateUser(userFormData);
    }
  }

  render() {
    const {
      pageUser,
      pageTracks,
      pageAlbum,
      currentUserId,
      openModal,
    } = this.props;

    if (this.state.deleted) {
      return <Redirect to={`/artists/${currentUserId}`} />;
    } else if (
      pageUser &&
      pageAlbum &&
      pageAlbum.trackIds.length === pageTracks.length
    ) {
      if (!pageUser.createdAlbumIds.includes(pageAlbum.id)) {
        return <div>Page does not exist</div>;
      }

      // pageUser.userBanner
      //     ? (bannerArt = (
      //         <div className="header-placeholder">
      //           <Link to={`/artists/${pageUser.id}`}>
      //             <img className="banner-art" src={pageUser.userBanner} />
      //           </Link>
      //           <button
      //             className="remove"
      //             onClick={() =>
      //               openModal({
      //                 "delete-custom-pic": "delete-custom-pic",
      //               })
      //             }
      //           >
      //             &times;
      //           </button>
      //         </div>
      //       ))

      let editDeleteButtons, bioPic, bannerArt;
      if (pageUser.id === currentUserId) {
        pageUser.userArt
          ? (bioPic = (
              <div className="bio-pic">
                <Link to={`/artists/${pageUser.id}`}>
                  <img className="bio-pic-art" src={pageUser.userArt} />
                </Link>
                <button
                  className="remove"
                  onClick={() =>
                    openModal({
                      "delete-custom-pic": "delete-custom-pic",
                    })
                  }
                >
                  &times;
                </button>
              </div>
            ))
          : (bioPic = (
              <div className="bio-pic-upload">
                <input
                  id="bio-pic-file"
                  accept="image/png, image/jpeg, image/gif"
                  type="file"
                  onChange={this.handleBioPicUpload}
                />
                <div
                  className="add-bio-pic"
                  onClick={() => this.forwardToHiddenInput("bio-pic")}
                >
                  add artist photo
                </div>
              </div>
            ));

        pageUser.userBanner
          ? (bannerArt = (
              <div className="header-placeholder">
                <Link to={`/artists/${pageUser.id}`}>
                  <img className="banner-art" src={pageUser.userBanner} />
                </Link>
                <button
                  className="remove"
                  onClick={() =>
                    openModal({
                      "delete-custom-header": "delete-custom-header",
                    })
                  }
                >
                  &times;
                </button>
              </div>
            ))
          : (bannerArt = (
              <div className="header-upload">
                <input
                  id="banner-file"
                  accept="image/png, image/jpeg, image/gif"
                  type="file"
                  onChange={this.handleBannerUpload}
                />
                <div
                  className="add-banner"
                  onClick={() => this.forwardToHiddenInput("banner")}
                >
                  Upload Custom Header
                </div>
                <div className="add-banner-hint">
                  975 pixels wide, 40-180 pixels tall, .jpg, .gif or .png, 2mb
                  max
                </div>
              </div>
            ));

        editDeleteButtons = (
          <ul className="edit-delete">
            <li>
              <Link
                className="edit-delete-buttons"
                to={`/artists/${pageUser.id}/albums/${pageAlbum.id}/edit`}
              >
                Edit
              </Link>
            </li>
            <li>
              <span
                className="edit-delete-buttons"
                onClick={() =>
                  this.props.openModal({ "delete-release": "delete-release" })
                }
              >
                Delete
              </span>
            </li>
          </ul>
        );
      } else {
        pageUser.userArt
          ? (bioPic = (
              <div className="bio-pic">
                <img className="bio-pic-art" src={pageUser.userArt} />
              </div>
            ))
          : (bioPic = null);
        pageUser.userBanner
          ? (bannerArt = (
              <div className="header-placeholder">
                <Link to={`/artists/${pageUser.id}`}>
                  <img className="banner-art" src={pageUser.userBanner} />
                </Link>
              </div>
            ))
          : (bannerArt = null);
      }

      let activeTrack;
      if (!this.state.activeTrack) {
        activeTrack = pageTracks[0];
      } else {
        activeTrack = this.state.activeTrack;
      }

      const musicPlayer =
        this.state.activeAudio && this.state.activeAudio.duration ? (
          <MusicPlayer
            playing={this.state.playing}
            clickPlay={this.clickPlay}
            next={this.next}
            prev={this.prev}
            activeAudio={this.state.activeAudio}
            activeTrack={activeTrack}
            hasNextTrack={this.hasNextTrack()}
            hasPrevTrack={this.hasPrevTrack()}
          />
        ) : (
          <div className="inline-player">
            <span className="play-button-wrapper">
              <span className="play-button-disabled">
                <FontAwesomeIcon icon={faPlay} />
              </span>
            </span>
            <span>
              <div className="track-info">
                <span className="player-track-title"></span>
                <span className="time-elapsed-total">{`0:00 / 0:00`}</span>
              </div>
              <div>
                <span>
                  <input className="slider"></input>
                </span>
                <span className="prev-button-disabled">
                  <FontAwesomeIcon icon={faFastBackward} />
                </span>
                <span className="next-button-disabled">
                  <FontAwesomeIcon icon={faFastForward} />
                </span>
              </div>
            </span>
          </div>
        );

      return (
        <div className="user-show">
          <div className="header-wrapper">
            {bannerArt}
            <div className="artist-navbar-wrapper">
              <ol className="artist-navbar">
                <li>
                  <Link
                    id="artist-navbar-active"
                    to={`/artists/${pageUser.id}`}
                  >
                    music
                  </Link>
                </li>
                {/* add a classname to this when it is active, will have active styling */}
              </ol>
            </div>
          </div>
          <div className="music-column-alb-or-track">
            <span>
              <div className="album-title">{pageAlbum.title}</div>
              <div className="release-by">
                by&nbsp;
                <Link to={`/artists/${pageUser.id}`}>{pageUser.username}</Link>
              </div>
              {editDeleteButtons}
              {musicPlayer}
              <TrackIndex
                playing={this.state.playing}
                clickPlay={this.clickPlay}
                pageTracks={pageTracks}
                activeTrack={activeTrack}
              />
            </span>
            <span>
              <img className="release-art-350" src={pageAlbum.albumArt} />
            </span>
          </div>
          <div className="artist-info-column">
            {bioPic}
            {/* <span className="artist-username-bio">{pageUser.username}</span> */}
            <Link to={`/artists/${pageUser.id}`} id="bio" className="artist-username-bio">{pageUser.username}</Link>
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default AlbumShow;