import React from 'react';
import TrackIndexItem from './track_index_item';

class TrackIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { pageTracks, clickPlay, activeTrack, playing } = this.props;
        return (
            <div> 
            {/* maybe a different class name for this? */}
                <ol className="tracks-list">
                    {
                        pageTracks.map((track, i) => (
                            <TrackIndexItem
                                clickPlay={clickPlay}
                                activeTrack={activeTrack}
                                playing={playing}
                                key={track.id}
                                track={track}
                                n={i + 1}
                            />
                        ))
                    }
                </ol>
            </div>
        )

    }
}

export default TrackIndex;