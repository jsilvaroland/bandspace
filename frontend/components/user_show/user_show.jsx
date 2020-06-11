import React from 'react';
import { Link } from 'react-router-dom';

import ReleaseIndex from './release_index';

class UserShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageId: parseInt(this.props.match.params.userId),
        };
    }

    componentDidMount() {
        const { fetchUser, fetchArtistAlbums, fetchArtistSingles, pageUserId } = this.props;
        
        fetchUser()
            .then(fetchArtistAlbums(pageUserId))
            .then(fetchArtistSingles(pageUserId));
    }

    componentWillUnmount() {
        const { clearAlbums, clearTracks } = this.props;
        clearAlbums();
        clearTracks();
    }

    componentDidUpdate() {
        const { pageUserId } = this.props;

        if (pageUserId && pageUserId !== this.state.pageId) {
            const { clearAlbums, clearTracks, fetchUser, fetchArtistAlbums, fetchArtistSingles } = this.props;
            clearAlbums();
            clearTracks();

            fetchUser()
                .then(fetchArtistAlbums(pageUserId))
                .then(fetchArtistSingles(pageUserId));
            this.setState({ pageId: parseInt(this.props.match.params.userId) });
        }
    }

    render() {  // will first write if you are nOT owner of this page
        const { pageUser, pageUserId, pageAlbums, pageSingles } = this.props;

        // if ( this.props.currentUser && this.props.currentUser.id === this.props.pageUserId) {
        //     return(
        //         <div className="my-user-show">
        //             <h1>My Show Page</h1>
        //         </div>
        //     )
        // } else {
            if (pageUser && pageUserId) {
                return (
                    <div className="user-show">
                        <div className="header-wrapper">
                            <div className="header-placeholder">
                                <img className="banner-art" src={pageUser.userBanner} />
                            </div>
                            <div className="artist-navbar-wrapper">
                                <ol className="artist-navbar">
                                    <li>
                                        <Link id="artist-navbar-active" to={`/artists/${pageUserId}`}>music</Link>
                                    </li> 
                                    {/* add a classname to this when it is active, will have active styling */}
                                </ol>
                            </div>
                        </div>
                        <ReleaseIndex 
                            pageAlbums={pageAlbums}
                            pageSingles={pageSingles}
                        />
                        <div className="artist-info-column">
                            <span className="artist-username-bio">{pageUser.username}</span>
                        </div>
                        
                    </div>
                )
            } else {
                return <div></div>
            }
        // }
        
        // make classname conditional based on if user is an artist or fan
        // make it also conditional based on if current user is equal to the wildcard userId
    }
}

export default UserShow;