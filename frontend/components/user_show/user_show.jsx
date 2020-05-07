import React from 'react';
import { Link } from 'react-router-dom';

// maybe have current user page be in state?

class UserShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };

        // this.listReleases = this.listReleases.bind(this);
    }

    // listReleases() {
    //     const { pageAlbums, pageSingles } = this.props;
    // }

    componentDidMount() {
        const { fetchUser, fetchArtistAlbums, fetchArtistSingles, pageUserId } = this.props;
        fetchUser()
            .then(fetchArtistAlbums(pageUserId))
            .then(fetchArtistSingles(pageUserId));
    }

    render() {  // will first write if you are nOT owner of this page
        const { pageUserId } = this.props;
        // if (this.props.pageAlbum) {
        // debugger;
        if ( this.props.currentUser && this.props.currentUser.id === this.props.pageUserId) {
            return(
                <div className="my-user-show">
                    <h1>My Show Page</h1>
                </div>
            )
        } else {
            return (
                <div className="user-show">
                    <div className="header-wrapper">
                        <div className="header-placeholder"></div>
                        <div className="artist-navbar-wrapper">
                            <ol className="artist-navbar">
                                <li>
                                    <Link id="artist-navbar-active" to={`/artists/${pageUserId}`}>music</Link>
                                </li> 
                                {/* add a classname to this when it is active, will have active styling */}
                            </ol>
                        </div>
                    </div>
                    <div className="music-column">
                        {/* {listReleases()} */}
                    </div>
                    <div className="artist-info-column">

                    </div>
                    
                </div>
            )
        }
        // }
        
        // make classname conditional based on if user is an artist or fan
        // make it also conditional based on if current user is equal to the wildcard userId
    }
}

export default UserShow;