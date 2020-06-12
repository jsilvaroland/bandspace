import React from 'react';
import { Link } from 'react-router-dom';

import TrackIndex from './track_index';

class AlbumShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageId: parseInt(this.props.match.params.albumId),
        };
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
        clearAlbums();
        clearTracks();
    }

    componentDidUpdate() {
        const { pageAlbumId } = this.props;
        if (pageAlbumId && pageAlbumId !== this.state.pageId) {
            const { clearAlbums, clearTracks, fetchUser, fetchAlbum, fetchAlbumTracks } = this.props;
            clearAlbums();
            clearTracks();

            fetchUser()
                .then(fetchAlbum(pageAlbumId))
                .then(fetchAlbumTracks(pageAlbumId));
            this.setState({ pageId: parseInt(this.props.match.params.albumId) });
        }
    }

    render() {
        const { pageUser, pageTracks, pageAlbum, currentUserId } = this.props;

        if (pageUser && pageTracks && pageAlbum) {
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
                            <div className="inline-player">Player goes here</div>
                            <TrackIndex pageTracks={pageTracks} />
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