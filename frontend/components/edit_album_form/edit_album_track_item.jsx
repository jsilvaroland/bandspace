import React from 'react';

class EditAlbumTrackItem extends React.Component {
    render() {
        const { track, i, handlePanelChange } = this.props;

        return (
            <div className="edit-album-track-item" onClick={() => handlePanelChange(i + 1)}>
                <span>{i + 1}</span>
                <span>{track.title}</span>
            </div>
        )
    }
}

export default EditAlbumTrackItem;