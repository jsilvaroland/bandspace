import React from 'react';

import EditAlbumTrackItem from './edit_album_track_item';

class EditAlbumTrackIndex extends React.Component {
    constructor() {
        super();
        this.forwardToHiddenInput = this.forwardToHiddenInput.bind(this);
    }

    forwardToHiddenInput() {
        document.getElementById('audio-file').click();
    }

    render() {
        const { tracks, handlePanelChange, handleAudioUpload, activePanel } = this.props;

        return (
            <div className="tracks-edit">
                <h3 className="tracks">TRACKS</h3>
                {
                    tracks.map((track, i) => (
                        <EditAlbumTrackItem 
                        n={i + 1} 
                        key={track.id || parseInt(`${i.toString()}${new Date().getTime()}`)} 
                        track={track} 
                        handlePanelChange={handlePanelChange}
                        activePanel= {activePanel}
                        />
                    ))
                }
                <div className="left-panel-audio-upload">
                    <span className="add-track" onClick={this.forwardToHiddenInput}>
                        add track
                    </span>
                    <input 
                    id="audio-file" 
                    accept="audio/mp3, audio/wav"
                    type="file" 
                    onChange={handleAudioUpload} />
                </div>
            </div>
        );
    }
}

export default EditAlbumTrackIndex;