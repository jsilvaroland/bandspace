import React from 'react';
import { Link } from 'react-router-dom';
import MusicPlayer from '../music_player/music_player';

class TrackShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            pageId: parseInt(this.props.match.params.trackId),
        };
        this.clickPlay = this.clickPlay.bind(this);
        this.next = this.next.bind(this);
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

    render() {
        const { pageUser, pageTrack, pageAlbum } = this.props;

        if (((pageUser && pageTrack && !pageTrack.albumId) || (pageUser && pageTrack && pageAlbum)) && this.audio) {
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

            return (
                <div className="user-show">
                    <div className="header-wrapper">
                        <div className="header-placeholder">
                            <img className="banner-art" src={pageUser.userBanner} />
                        </div>
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