import React from 'react';
import TrackIndexItem from './track_index_item';

class TrackIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: props.playing
        };
    }

    render() {
        const { pageTracks, clickPlay } = this.props;
        return (
            <div> 
            {/* maybe a different class name for this? */}
                <ol className="tracks-list">
                    {
                        pageTracks.map(track => (
                            <TrackIndexItem
                                clickPlay={clickPlay}
                                playing={this.state.playing}
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