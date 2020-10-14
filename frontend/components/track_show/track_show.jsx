import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import MusicPlayer from '../music_player/music_player';

class TrackShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            pageId: parseInt(this.props.match.params.trackId),
            deleted: false,
        };
        this.clickPlay = this.clickPlay.bind(this);
        this.next = this.next.bind(this);
        this.handleBannerUpload = this.handleBannerUpload.bind(this);
        this.handleBioPicUpload = this.handleBioPicUpload.bind(this);
        this.deleteBioPic = this.deleteBioPic.bind(this);
    }

    componentDidMount() {
        const { fetchUser, fetchTrack, pageTrackId } = this.props;
        const that = this;
        fetchUser();
        fetchTrack(pageTrackId).then(res => 
            that.setState({ 
                activeAudio: new Audio(res.track.trackSong)
            })
        );
        // fetchUser()
        //     .then(fetchTrack(pageTrackId));
    }

    componentDidUpdate() {
        const { fetchUser, pageTrack, fetchAlbum, pageAlbum, pageTrackId } = this.props;
        
        if (this.state.activeAudio && !this.state.activeAudio.duration) {
            const that = this;
            this.state.activeAudio.onloadedmetadata = function () {
                that.audioDuration = this.duration;
                that.setState({ audioDuration: this.duration });
            };
        }

        if (pageTrack && !this.activeAudio) {
            if (pageTrack !== this.state.activeTrack) {
                this.setState({ 
                    activeTrack: pageTrack,
                    activeAudio: new Audio(pageTrack.trackSong)
                });
                this.audio = new Audio(pageTrack.trackSong);
            }
        }

        if (!pageAlbum && pageTrack && pageTrack.albumId) {
            fetchUser()
                .then(fetchAlbum(pageTrack.albumId));
        }

        if (pageTrackId && pageTrackId !== this.state.pageId) {
            const { clearAlbums, clearTracks, fetchTrack } = this.props;
            clearAlbums();
            clearTracks();

            fetchUser()
                .then(fetchTrack(pageTrackId));
            this.setState({ pageId: parseInt(this.props.match.params.trackId) });
        }

        if (!pageTrack && this.audio) {
            this.setState({ deleted: true });
        }
    }

    componentWillUnmount() {
        const { clearTracks, clearAlbums } = this.props;
        const { activeTrack, activeAudio } = this.state;

        if (this.state.playing) {
            this.clickPlay(activeTrack, activeAudio);
        }

        clearTracks();
        clearAlbums();
    }

    clickPlay(track, audio) {
        const { activeAudio } = this.state;
        const isPlaying = this.state.playing;
        let activeTrack;

        if (!this.state.activeTrack) {
            activeTrack = track;
        } else {
            activeTrack = this.state.activeTrack;
        }

        if (!isPlaying) {
            activeAudio.play();
            this.setState({ playing: true, activeTrack: track });
        } else {
            activeAudio.pause();
            this.setState({ playing: false });
        }
    }

    next() {
        this.state.activeAudio.pause();
        this.setState({ playing: false });
    }

    forwardToHiddenInput(inputType) {
        document.getElementById(`${inputType}-file`).click();
    }

    deleteBioPic() {
        const { updateUser } = this.props;

        const nullFormData = new FormData();
        nullFormData.append('user[photo]', null);
        updateUser(nullFormData);
    }

    handleBannerUpload(e) {
        const { updateUser, openModal } = this.props;
        const uploadFile = e.currentTarget.files[0];

        if (uploadFile && uploadFile.size < 2000000) {
            const userFormData = new FormData();
            userFormData.append('user[banner]', uploadFile);
            updateUser(userFormData);
        } else {
            openModal({ "custom-header-size-error": "custom-header-size-error" });
            document.getElementById('banner-file').value = "";
        }
    }

    handleBioPicUpload(e) {
        const { updateUser } = this.props;
        const uploadFile = e.currentTarget.files[0];

        if (uploadFile) {
            const userFormData = new FormData();
            userFormData.append('user[photo]', uploadFile);
            updateUser(userFormData);
        }
    }

    render() {
        const { pageUser, pageTrack, pageAlbum, currentUserId, openModal } = this.props;

        if (this.state.deleted) {
            return (<Redirect to={`/artists/${currentUserId}`} />)
        } else if (((pageUser && pageTrack && !pageTrack.albumId) || (pageUser && pageTrack && pageAlbum)) && this.state.activeAudio) {
            let fromAlbum, trackArt, deleteTrack;

            if (pageTrack.albumId) {
                fromAlbum = (<span>from&nbsp;
                    <Link to={`/artists/${pageUser.id}/albums/${pageAlbum.id}`}>
                        {pageAlbum.title}
                    </Link>
                </span>)

                trackArt = pageAlbum.albumArt;
                deleteTrack = () => openModal({ "delete-album-track": pageTrack.id, pageAlbum })
            } else {
                trackArt = pageTrack.trackArt
                deleteTrack = () => openModal({'delete-release': 'delete-release'})
            }

            let editDeleteButtons, bioPic, bannerArt;
            if (pageUser.id === currentUserId) {
                pageUser.userArt ?
                    bioPic = <div className="bio-pic">
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
                    </div> :
                    bioPic = <div className="bio-pic-upload">
                        <input
                            id="bio-pic-file"
                            accept="image/png, image/jpeg, image/gif"
                            type="file"
                            onChange={this.handleBioPicUpload} />
                        <div className="add-bio-pic" 
                            onClick={() => this.forwardToHiddenInput('bio-pic')}>
                            add artist photo
                        </div>
                    </div>

                pageUser.userBanner ?
                    bannerArt = <div className="header-placeholder">
                        <Link to={`/artists/${pageUser.id}`}>
                            <img className="banner-art" src={pageUser.userBanner} />
                        </Link>
                        <button className="remove"
                            onClick={() => openModal({ 'delete-custom-header': 'delete-custom-header' })}>
                            &times;
                        </button>
                    </div> :
                    bannerArt = <div className="header-upload">
                        <input
                            id="banner-file"
                            accept="image/png, image/jpeg, image/gif"
                            type="file"
                            onChange={this.handleBannerUpload} />
                        <div className="add-banner" 
                            onClick={() => this.forwardToHiddenInput('banner')}>
                            Upload Custom Header
                                </div>
                        <div className="add-banner-hint">
                            975 pixels wide, 40-180 pixels tall, .jpg, .gif or .png, 2mb max
                        </div>
                    </div>

                editDeleteButtons = (<ul className="edit-delete">
                    <li>
                        <Link className="edit-delete-buttons" to={`/artists/${pageUser.id}/tracks/${pageTrack.id}/edit`}>Edit</Link>
                    </li>
                    <li>
                        <span className="edit-delete-buttons"
                            onClick={deleteTrack}>
                            Delete
                        </span>
                    </li>
                </ul>)
            } else {
                pageUser.userArt ?
                    bioPic = <div className="bio-pic">
                        <img className="bio-pic-art" src={pageUser.userArt} />
                    </div> :
                    bioPic = null;
                pageUser.userBanner ?
                    bannerArt = <div className="header-placeholder">
                                    <Link to={`/artists/${pageUser.id}`}>
                                        <img className="banner-art" src={pageUser.userBanner} />
                                    </Link>
                                </div> :
                    bannerArt = null;
            }

            const musicPlayer = this.state.activeTrack && this.state.activeAudio.duration ?
                (
                    <MusicPlayer 
                        playing={this.state.playing}
                        clickPlay={this.clickPlay}
                        activeTrack={this.state.activeTrack}
                        activeAudio={this.state.activeAudio}
                        next={this.next}
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
                            <span className="time-elapsed-total">0:00 / 0:00</span>
                        </div>
                        <div>
                            <span><input className="slider"></input></span>
                        </div>
                        </span>
                    </div>
                )

            return (
                <div className="user-show">
                    <div className="header-wrapper">
                        {bannerArt}
                        <div className="artist-navbar-wrapper">
                            <ol className="artist-navbar">
                                <li>
                                    <Link id="artist-navbar-active" to={`/artists/${pageUser.id}`}>music</Link>
                                </li>
                                {/* add a classname to this when it is active, will have active styling */}
                            </ol>
                        </div>
                    </div>
                    <div className="music-column-alb-or-track">
                        <span>
                            <div className="track-title">{pageTrack.title}</div>
                            <div className="release-by">{fromAlbum} by&nbsp;
                                <Link to={`/artists/${pageUser.id}`}>{pageUser.username}</Link>
                            </div>
                            {editDeleteButtons}
                            {musicPlayer}
                        </span>
                        <span>
                            <img className="release-art-350" src={trackArt} />
                        </span>
                    </div>
                    <div className="artist-info-column">
                        {bioPic}
                        <Link to={`/artists/${pageUser.id}`} id="bio" className="artist-username-bio">{pageUser.username}</Link>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default TrackShow;