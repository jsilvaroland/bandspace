import React from 'react';
import ArtistIndexItem from './artist_index_item';

class ArtistIndex extends React.Component {
    componentDidMount() {
        this.props.fetchAllUsers();
    }

    componentWillUnmount() {
        const { clearAllUsers, currentUserId, fetchUser } = this.props;
        
        clearAllUsers();
        fetchUser(currentUserId);
    }

    render() {
        const { allArtists } = this.props;

        return(
            <div className="artist-index-wrapper">
                <div className="artist-index-title">
                    <h1>artist index</h1>
                </div>
                <div className="artist-index-body">
                    <div className="sort-controls"></div>
                    <div className="artist-index-results">
                        <ul className="artists-list">
                            {
                                allArtists.map(artist => (
                                    <ArtistIndexItem 
                                        key={artist.id}
                                        artist={artist}
                                    />
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default ArtistIndex;