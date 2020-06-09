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
        const { fetchUser, pageAlbumId, fetchAlbum, fetchAlbumTracks } = this.props;
        fetchUser()
            .then(fetchAlbum(pageAlbumId))
            .then(fetchAlbumTracks(pageAlbumId));
    }

    componentWillUnmount() {
        // gonna get a similar error where if i go directly from one album page to another, the component won't unmount and the track list won't clear
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
        const { pageUser, pageTracks, pageAlbum } = this.props;

        if (pageUser && pageTracks && pageAlbum) {
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
                    <TrackIndex
                        pageTracks={pageTracks}
                        pageAlbumTitle={pageAlbum.title}
                    />
                    <div className="artist-info-column">
                        Artist info here
                    </div>
    
                </div>
            );
        } else {
            return <div></div>
        }
    }
}

export default AlbumShow;