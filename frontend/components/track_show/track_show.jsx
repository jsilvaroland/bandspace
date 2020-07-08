import React from 'react';
import { Link, Redirect } from 'react-router-dom';
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

        fetchUser()
            .then(fetchTrack(pageTrackId));
    }

    componentDidUpdate() {
        const { fetchUser, pageTrack, fetchAlbum, pageAlbum, pageTrackId } = this.props;
        
        // what if pageAlbum does exist but it's wrong one, gotta refetch album

        if (pageTrack && !this.audio) {
            if (pageTrack !== this.state.activeTrack) {
                this.setState({ activeTrack: pageTrack });
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

        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }

        clearTracks();
        clearAlbums();
    }

    clickPlay(track, audio) {
        const isPlaying = this.state.playing;
        let activeTrack;

        if (!this.state.activeTrack) {
            activeTrack = track;
        } else {
            activeTrack = this.state.activeTrack;
        }

        if (!isPlaying) {
            this.audio = audio;
            this.audio.play();
            this.setState({ playing: true, activeTrack: track });
        } else {
            this.audio = audio;
            this.audio.pause();
            this.setState({ playing: false });
        }
    }

    next() {
        this.audio.pause();
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
            openModal("custom-header-size-error");
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
        } else if (((pageUser && pageTrack && !pageTrack.albumId) || (pageUser && pageTrack && pageAlbum)) && this.audio) {
            let fromAlbum, trackArt;

            if (pageTrack.albumId) {
                fromAlbum = (<span>from&nbsp;
                    <Link to={`/artists/${pageUser.id}/albums/${pageAlbum.id}`}>
                        {pageAlbum.title}
                    </Link>
                </span>)

                trackArt = pageAlbum.albumArt;
            } else {
                trackArt = pageTrack.trackArt
            }

            let editDeleteButtons, bioPic, bannerArt;
            if (pageUser.id === currentUserId) {
                pageUser.userArt ?
                    bioPic = <div className="bio-pic">
                        <img className="bio-pic-art" src={pageUser.userArt} />
                        <button className="remove"
                            onClick={this.deleteBioPic}>
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
                            onClick={() => openModal('delete-custom-header')}>
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
                            onClick={() => this.props.openModal('delete-release')}>
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
                            <MusicPlayer 
                                playing={this.state.playing}
                                clickPlay={this.clickPlay}
                                activeTrack={this.state.activeTrack}
                                activeAudio={this.audio}
                                next={this.next}
                            />
                        </span>
                        <span>
                            <img className="release-art-350" src={trackArt} />
                        </span>
                    </div>
                    <div className="artist-info-column">
                        {bioPic}
                        <span className="artist-username-bio">{pageUser.username}</span>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default TrackShow;