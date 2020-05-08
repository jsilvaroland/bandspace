import React from 'react';
import { Link } from 'react-router-dom';

const ArtistIndexItem = props => {
    const { username, id } = props.artist;

    return (
        <li>
            <Link className="artist-link" to={`/artists/${id}`}>
                <div className="artist-art">
                    <img className="artist-art" src={eval(`window.image${id}`)} />
                </div>
                <div className="artist-username">{username}</div>
            </Link>
        </li>
    )
}

export default ArtistIndexItem;