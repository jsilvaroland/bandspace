import React from 'react';
import { Link } from 'react-router-dom';

const ArtistIndexItem = props => {
    const { artist } = props;

    return (
        <li>
            <Link className="artist-link" to={`/artists/${artist.id}`}>
                <div className="artist-art">
                    <img className="artist-art" src={artist.userArt} />
                </div>
                <div className="artist-username">{artist.username}</div>
            </Link>
        </li>
    )
}

export default ArtistIndexItem;