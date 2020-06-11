import React from 'react';
import { Link } from 'react-router-dom';

class TrackShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageId: parseInt(this.props.match.params.trackId),
        };
    }

    componentDidMount() {
        const { fetchUser, fetchTrack, pageTrackId } = this.props;

        fetchUser()
            .then(fetchTrack(pageTrackId));
    }

    componentDidUpdate() {
        const { fetchUser, pageTrack, fetchAlbum, pageAlbum, pageTrackId } = this.props;
        
        // what if pageAlbum does exist but it's wrong one, gotta refetch album

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

    render() {
        const { pageUser, pageTrack, pageAlbum } = this.props;

        if ((pageUser && pageTrack && !pageTrack.albumId) || (pageUser && pageTrack && pageAlbum)) {
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
                            <div className="inline-player">Player goes here</div>
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