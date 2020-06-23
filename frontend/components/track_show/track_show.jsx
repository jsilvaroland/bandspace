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
    }

    componentDidMount() {
        const { fetchUser, fetchTrack, pageTrackId } = this.props;

        fetchUser()
            .then(fetchTrack(pageTrackId));
    }

    componentDidUpdate() {
        const { fetchUser, pageTrack, fetchAlbum, pageAlbum, pageTrackId } = this.props;
        
        // what if pageAlbum does exist but it's wrong one, gotta refetch album

        if (pageTrack) {
            this.audio = new Audio(pageTrack.trackSong);
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

        clearTracks();
        clearAlbums();
    }

    clickPlay(track, audio) {
        // if music is currently playing, first stop that music.
        // if different song is playing, stop that

        const isPlaying = this.state.playing;
        let activeTrack;

        if (!this.state.activeTrack) {
            activeTrack = track;
        } else {
            activeTrack = this.state.activeTrack;
        }
        // if no music playing...
        if (!isPlaying && track.trackSong !== activeTrack.trackSong) {
            this.audio.currentTime = 0;
            this.audio = audio;
            this.audio.play();
            this.setState({ playing: true, activeTrack: track });
        } else if (!isPlaying && track.trackSong === activeTrack.trackSong) {
            this.audio = audio;
            this.audio.play();
            this.setState({ playing: true, activeTrack: track });
        } else if (track.trackSong !== activeTrack.trackSong) { // music is playing, but now we want to switch up the music
            // music is playing, play different song
            this.audio.pause();
            this.audio.currentTime = 0;
            this.audio = audio;
            this.audio.play();
            this.setState({ playing: true, activeTrack: track });
        } else {
            // music playing, pause that song
            this.audio.pause();
            this.setState({ playing: false });
        }
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

            console.log(this.audio);

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
                                activeTrack={pageTrack}
                                activeAudio={this.audio}
                                clickPlay={this.clickPlay}
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