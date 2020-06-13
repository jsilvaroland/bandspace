import React from 'react';

import EditAlbumTrackItem from './edit_album_track_item';

class EditAlbumTrackIndex extends React.Component {
    render() {
        const { tracks, handlePanelChange, handleAudioUpload } = this.props;

        return (
            <div className="tracks-edit">
                <h3 className="tracks">TRACKS</h3>
                {
                    tracks.map((track, i) => (
                        <EditAlbumTrackItem 
                        i={i} 
                        key={track.id} 
                        track={track} 
                        handlePanelChange={handlePanelChange}
                        />
                    ))
                }
                <div className="left-panel-audio-upload">
                    <span className="add-track" onClick={handleAudioUpload}>
                        add track
                    </span>
                </div>
            </div>
        );
    }
}

export default EditAlbumTrackIndex;