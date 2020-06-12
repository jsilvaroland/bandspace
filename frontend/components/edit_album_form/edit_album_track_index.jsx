import React from 'react';

import EditAlbumTrackItem from './edit_album_track_item';

class EditAlbumTrackIndex extends React.Component {
    render() {
        return (
            <div className="tracks-edit">
                <h3 className="tracks">TRACKS</h3>
                {
                    this.props.tracks.map((track, i) => (
                        <EditAlbumTrackItem 
                        i={i} 
                        key={track.id} 
                        track={track} 
                        handlePanelChange={this.props.handlePanelChange}
                        />
                    ))
                }
            </div>
        );
    }
}

export default EditAlbumTrackIndex;