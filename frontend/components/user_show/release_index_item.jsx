import React from 'react';
import { Link } from 'react-router-dom';

const ReleaseIndexItem = props => {
    const { single, album } = props;

    if (single) {
        return (
            <li>
                <Link
                    className="release-link" 
                    to={`/artists/${single.artistId}/tracks/${single.id}`}
                >
                    <div className="release-art">
                        <img className="release-art" src={single.trackArt} />
                    </div>
                    <p className="release-title">{single.title}</p>
                </Link>
            </li>
        )
    } else if (album) {
        return (
            <li>
                <Link 
                    className="release-link"
                    to={`/artists/${album.artistId}/albums/${album.id}`}
                >
                    <div className="release-art">
                        <img className="release-art" src={album.albumArt} />

                    </div>
                    <p className="release-title">{album.title}</p>
                </Link>
            </li>
        )
    }
}

export default ReleaseIndexItem;