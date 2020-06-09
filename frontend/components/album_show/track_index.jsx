import React from 'react';
import TrackIndexItem from './track_index_item';

class TrackIndex extends React.Component {

    render() {
        const { pageAlbumTitle, pageTracks } = this.props;
        return (
            <div className="music-column"> 
            {/* maybe a different class name for this? */}

                <p className="album-title">{pageAlbumTitle}</p>

                <ol className="tracks-list">
                    {
                        pageTracks.map(track => (
                            <TrackIndexItem
                                key={track.id}
                                track={track}
                            />
                        ))
                    }
                </ol>
            </div>
        )

    }
}

export default TrackIndex;