import React from 'react';
import TrackIndexItem from './track_index_item';

class TrackIndex extends React.Component {

    render() {
        const { pageTracks } = this.props;
        return (
            <div> 
            {/* maybe a different class name for this? */}
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