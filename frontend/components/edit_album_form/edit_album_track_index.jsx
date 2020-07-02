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
        const { tracks, handlePanelChange, handleAudioUpload } = this.props;

        return (
            <div className="tracks-edit">
                <h3 className="tracks">TRACKS</h3>
                {
                    tracks.map((track, i) => (
                        <EditAlbumTrackItem 
                        i={i} 
                        key={track.id || parseInt(`${i.toString()}${new Date().getTime()}`)} 
                        track={track} 
                        handlePanelChange={handlePanelChange}
                        />
                    ))
                }
                <div className="left-panel-audio-upload">
                    <span className="add-track" onClick={this.forwardToHiddenInput}>
                        add track
                    </span>
                    <input id="audio-file" type="file" onChange={handleAudioUpload}/>
                </div>
            </div>
        );
    }
}

export default EditAlbumTrackIndex;