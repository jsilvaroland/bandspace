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
                <span className="track-item-title">{track.title}</span>
            </Link>
        </li>
    )
}

export default TrackIndexItem;