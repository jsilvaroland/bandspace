import React from 'react';

class EditAlbumTrackItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            track: props.track,
        };
    }

    render() {
        const { i, handlePanelChange } = this.props;
        const { track } = this.state;
        let trackTitleText;

        track.title === "" ?
            trackTitleText = "Untitled Track" :
            trackTitleText = track.title;

        return (
            <div className="edit-album-track-item" onClick={() => handlePanelChange(i + 1)}>
                <span>{i + 1}</span>
                <span>{trackTitleText}</span>
                <div>{track.trackSong.name}</div>
            </div>
        )
    }
}

export default EditAlbumTrackItem;