import React from 'react';
import { Link } from 'react-router-dom';

const TrackIndexItem = props => {
    const { track } = props;

    return (
        <li>
            <Link
                className="track-link"
                to={`/artists/${track.artistId}/tracks/${track.id}`}
            >
                <p className="track-title">{track.title}</p>
            </Link>
        </li>
    )
}

export default TrackIndexItem;