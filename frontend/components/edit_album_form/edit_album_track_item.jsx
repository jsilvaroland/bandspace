import React from 'react';

class EditAlbumTrackItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track: props.track,
        };
    }

    render() {
        const { n, handlePanelChange, activePanel, discardTrack, 
            openModal, album } = this.props;
        const { track } = this.state;
        const trackTitleText = track.title === "" ? "Untitled Track" : track.title;
        const trackItemStyle = { display: 'flex' };
        let fileName, fileSize, trackItemClass, onClickX;

        if (track.trackSong.size) {
            fileName = track.trackSong.name;
            fileSize = (track.trackSong.size / 1000000).toFixed(1);
        } else {
            for (let i = track.trackSong.length - 1; i >= 0; i--) {
                if (track.trackSong[i] === '/') {
                    fileName = track.trackSong.slice(i + 1);
                    break;
                }
            }
            fileSize = (track.trackSize / 1000000).toFixed(1);
        }

        if (activePanel === n) {
            trackItemClass = "edit-album-track-item-active";
        } else if (activePanel === n - 1 && activePanel !== 0) {
            trackItemClass = "edit-album-track-item-next";
        } else {
            trackItemClass = "edit-album-track-item";
        }

        if (track.id) {
            onClickX = () => openModal({ "delete-album-track": track.id, album });
        } else {
            onClickX = () => discardTrack(n - 1);
        }

        return (
            <div className="edit-album-track-item-wrapper">
                <div className="delete-track" onClick={onClickX}>&times;</div>
                <div style={trackItemStyle} className={trackItemClass} onClick={() => handlePanelChange(n)}>
                    <span className="track-num">{n}</span>
                    <div>
                        <div className="left-panel-track-title">{trackTitleText}</div>
                        <span className="filename">{fileName}</span>
                        <span className="filesize">{fileSize}MB</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditAlbumTrackItem;