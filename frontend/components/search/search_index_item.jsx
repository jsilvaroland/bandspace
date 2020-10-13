import React from 'react';
import { Link } from 'react-router-dom';

const SearchIndexItem = props => {
    const { result, onReset, onClick } = props;
    let link, title, type, src;
    if (result.trackIds) {
        link = `/artists/${result.artistId}/albums/${result.id}`;
        src = result.albumArt;
        title = result.title;
        type = "ALBUM";
    } else if (result.username) {
        link = `/artists/${result.id}`;
        src = result.userArt;
        title = result.username;
        type = "ARTIST";
    } else {
        link = `/artists/${result.artistId}/tracks/${result.id}`;
        src = result.albumId ? null : result.trackArt;
        title = result.title;
        type = "TRACK";
    }

    return (
        <li>
            <Link className="search-link" onClick={onClick} to={link}>
                <img className="search-art" src={src} />
                <div className="search-link-text">
                    <div className="search-link-title">{title}</div>
                    <div>{type}</div>
                </div>
            </Link>
        </li>
    )
}

export default SearchIndexItem;