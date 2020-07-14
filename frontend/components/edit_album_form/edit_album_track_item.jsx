import React from 'react';

class EditAlbumTrackItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track: props.track,
        };
    }

    render() {
        const { n, handlePanelChange, activePanel, deleteTrack } = this.props;
        const { track } = this.state;
        const trackTitleText = track.title === "" ? "Untitled Track" : track.title;
        const trackItemStyle = { display: 'flex' };
        const fileSize = (track.trackSong.size / 1000000).toFixed(1);
        let trackItemClass;

        if (activePanel === n) {
            trackItemClass = "edit-album-track-item-active";
        } else if (activePanel === n - 1 && activePanel !== 0) {
            trackItemClass = "edit-album-track-item-next";
        } else {
            trackItemClass = "edit-album-track-item";
        }

        return (
            <div className="edit-album-track-item-wrapper">
                <div className="delete-track" onClick={() => deleteTrack(n - 1)}>&times;</div>
                <div style={trackItemStyle} className={trackItemClass} onClick={() => handlePanelChange(n)}>
                    <span className="track-num">{n}</span>
                    <div>
                        <div className="left-panel-track-title">{trackTitleText}</div>
                        <span className="filename">{track.trackSong.name}</span>
                        <span className="filesize">{fileSize}MB</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditAlbumTrackItem;