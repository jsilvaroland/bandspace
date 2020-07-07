import React from 'react';
import { Link } from 'react-router-dom';

import ReleaseIndex from './release_index';

class UserShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pageId: parseInt(props.match.params.userId),
        };
        this.handleBannerUpload = this.handleBannerUpload.bind(this);
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

        if (pageUserId !== this.state.pageId) {
            const { clearAlbums, clearTracks, fetchUser, fetchArtistAlbums, fetchArtistSingles } = this.props;
            clearAlbums();
            clearTracks();

            fetchUser()
                .then(fetchArtistAlbums(pageUserId))
                .then(fetchArtistSingles(pageUserId));
            this.setState({ pageId: parseInt(this.props.match.params.userId) });
        }
    }

    forwardToHiddenInput(inputType) {
        document.getElementById(`${inputType}-file`).click();
    }

    handleBannerUpload(e) {
        const { updateUser } = this.props;
        const uploadFile = e.currentTarget.files[0];
        if (uploadFile && (uploadFile.type === "image/png" ||
            uploadFile.type === "image/jpeg" || uploadFile.type === "image/gif")) {
            const userFormData = new FormData();
            userFormData.append('user[banner]', uploadFile);
            updateUser(userFormData);

            // does this mean that props will change? or do I have to manually change state here.
        } else {
            console.log("Banner must be png/jpg/gif format");
            //setState errors or something
        }
    }

    render() {  // will first write if you are nOT owner of this page
        const { currentUserId, pageUser, albums, singles } = this.props;
        let bannerArt;
        if (pageUser) {
            if (currentUserId === this.state.pageId) {
                // page is logged-in-user's page
                pageUser.userBanner ? 
                bannerArt = <div className="header-placeholder">
                                <img className="banner-art" src={pageUser.userBanner} />
                                <button className="remove" 
                                    onClick={() => this.props.openModal('delete-custom-header')}>
                                    &times;
                                </button> 
                            </div> :
                bannerArt = <div className="header-upload">
                                <input id="banner-file" type="file" onChange={this.handleBannerUpload} />
                                <span className="add-banner" onClick={() => this.forwardToHiddenInput('banner')}>
                                    Upload Custom Header 
                                </span>
                            </div>
    
                return (
                    <div className="user-show">
                        <div className="header-wrapper">
                            {bannerArt}
                            <div className="artist-navbar-wrapper">
                                <ol className="artist-navbar">
                                    <li>
                                        <Link id="artist-navbar-active" to={`/artists/${this.state.pageId}`}>music</Link>
                                    </li>
                                </ol>
                            </div>
                        </div>
                        <ReleaseIndex
                            pageAlbums={albums}
                            pageSingles={singles}
                        />
                        <div className="artist-info-column">
                            <span className="artist-username-bio">{pageUser.username}</span>
                        </div>
    
                    </div>
                )
            } else {
                // if not your page
                pageUser.userBanner ?
                    bannerArt = <div className="header-placeholder">
                        <img className="banner-art" src={pageUser.userBanner} />
                    </div> :
                    bannerArt = null
                    
                return (
                    <div className="user-show">
                        <div className="header-wrapper">
                            {bannerArt}
                            <div className="artist-navbar-wrapper">
                                <ol className="artist-navbar">
                                    <li>
                                        <Link id="artist-navbar-active" to={`/artists/${this.state.pageId}`}>music</Link>
                                    </li> 
                                    {/* add a classname to this when it is active, will have active styling */}
                                </ol>
                            </div>
                        </div>
                        <ReleaseIndex 
                            pageAlbums={albums}
                            pageSingles={singles}
                        />
                        <div className="artist-info-column">
                            <span className="artist-username-bio">{pageUser.username}</span>
                        </div>
                    </div>
                )
            }
        } else {
            return <div></div>
        }
        
        // make classname conditional based on if user is an artist or fan
        // make it also conditional based on if current user is equal to the wildcard userId
    }
}

export default UserShow;