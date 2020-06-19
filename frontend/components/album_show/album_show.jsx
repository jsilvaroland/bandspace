import React from 'react';
import { Link } from 'react-router-dom';

import TrackIndex from './track_index';
import MusicPlayer from '../music_player/music_player';

class AlbumShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            pageId: parseInt(this.props.match.params.albumId),
        };
        this.clickPlay = this.clickPlay.bind(this);
    }

    componentDidMount() {
        const { clearTracks, clearAlbums, fetchUser, pageAlbumId, fetchAlbum, fetchAlbumTracks } = this.props;

        clearAlbums();
        clearTracks();

        fetchUser()
            .then(fetchAlbum(pageAlbumId))
            .then(fetchAlbumTracks(pageAlbumId));
    }

    componentWillUnmount() {
        const { clearTracks, clearAlbums } = this.props;
        if (this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }
        clearAlbums();
        clearTracks();
    }

    componentDidUpdate() {
        const { pageAlbumId, pageAlbum, pageTracks } = this.props;
        if (pageAlbumId && pageAlbumId !== this.state.pageId) {
            const { clearAlbums, clearTracks, fetchUser, fetchAlbum, fetchAlbumTracks } = this.props;
            clearAlbums();
            clearTracks();

            fetchUser()
                .then(fetchAlbum(pageAlbumId))
                .then(fetchAlbumTracks(pageAlbumId));
            this.setState({ pageId: parseInt(this.props.match.params.albumId) });
            if (pageAlbum && pageAlbum.trackIds.length === pageTracks.length && !this.state.activeTrack) {
                this.setState({ 
                    activeTrack: pageTracks[0],
                });
            }
        }
    }

    setFeaturedAudio() {
        this.featuredAudio = new Audio(this.props.pageTracks[0].trackSong);
        this.audio = this.featuredAudio;
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
            this.audio.play();
            this.setState({ playing: true, activeTrack: track });
        } else if (track.trackSong !== activeTrack.trackSong)  { // music is playing, but now we want to switch up the music
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
        const { pageUser, pageTracks, pageAlbum, currentUserId } = this.props;

        ///

        // if (pageUser && pageAlbum && pageAlbum.trackIds.length === pageTracks.length && !this.featuredAudio) { 
        //     console.log('here');
        //     this.setFeaturedAudio();
        //     return (<div></div>)
        // }

        ///

        if (pageUser && pageAlbum && pageAlbum.trackIds.length === pageTracks.length) {
            if (!pageUser.createdAlbumIds.includes(pageAlbum.id)) {
                return <div>Page does not exist</div>
            }

            let editDeleteButtons;
            if (pageUser.id === currentUserId) {
                editDeleteButtons = (<ul className="edit-delete">
                    <li>
                        <Link className="edit-delete-buttons" to={`/artists/${pageUser.id}/albums/${pageAlbum.id}/edit`}>Edit</Link>
                    </li>
                    <li>
                        <button className="edit-delete-buttons">Delete</button>
                        {/* add this functionality in a bit */}
                    </li>
                </ul>)
            }

            if (!this.featuredAudio) {
                this.setFeaturedAudio();
            }

            let activeTrack;
            if (!this.state.activeTrack) {
                activeTrack = pageTracks[0]; 
            } else {
                activeTrack = this.state.activeTrack;
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
                            <div className="album-title">{pageAlbum.title}</div>
                            <div className="release-by">by&nbsp;
                                <Link to={`/artists/${pageUser.id}`}>{pageUser.username}</Link>
                            </div>
                            {editDeleteButtons}
                            <MusicPlayer
                                playing={this.state.playing} 
                                clickPlay={this.clickPlay} 
                                activeAudio={this.audio} 
                                activeTrack={activeTrack} 
                            />
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
                        <span className="artist-username-bio">{pageUser.username}</span>
                    </div>
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default AlbumShow;