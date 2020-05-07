import React from 'react';

// maybe have current user page be in state?

class UserShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    componentDidMount() {
        const { fetchUser, fetchArtistAlbums, pageUserId } = this.props;
        fetchUser().then(fetchArtistAlbums(pageUserId));
    }

    render() {  // will first write if you are nOT owner of this page
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
                                    <a id="artist-navbar-active">music</a>
                                </li> 
                                {/* add a classname to this when it is active, will have active styling */}
                            </ol>
                        </div>
                        User Show Page
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