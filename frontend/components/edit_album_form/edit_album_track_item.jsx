import React from 'react';

class EditAlbumTrackItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track: props.track,
        };
    }

    render() {
        const { n, handlePanelChange, activePanel } = this.props;
        const { track } = this.state;
        const trackTitleText = track.title === "" ? "Untitled Track" : track.title;
        let trackItemClass;

        if (activePanel === n) {
            trackItemClass = "edit-album-track-item-active";
        } else if (activePanel === n - 1 && activePanel !== 0) {
            trackItemClass = "edit-album-track-item-next";
        } else {
            trackItemClass = "edit-album-track-item";
        }

        return (
            <div className={trackItemClass} onClick={() => handlePanelChange(n)}>
                <span className="track-num">{n}</span>
                <span className="left-panel-track-title">{trackTitleText}</span>
                <div>{track.trackSong.name}</div>
            </div>
        )
    }
}

export default EditAlbumTrackItem;