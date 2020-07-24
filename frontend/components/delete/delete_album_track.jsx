import React from 'react';

class DeleteAlbumTrack extends React.Component {
    constructor(props) {
        super(props);
        this.deleteRelease = this.deleteRelease.bind(this);
    }

    deleteRelease() {
        let trackIds = this.props.album.trackIds;
        let idx = trackIds.indexOf(this.props.trackId);
        trackIds.splice(idx, 1);

        this.props.deleteTrack(this.props.trackId)
            .then(this.props.closeModal())
            .then(this.props.handlePanelChange(0));
            // need to switch activePanel to 0
                // pass it in through props?
    }


    render() {
        return (
          <div>
            <div className="delete">
              <div className="delete-title">Delete Track</div>
              <div className="delete-body">
                Are you user you want to permanently delete this track?
              </div>
              <div>
                <button className="OK" onClick={this.deleteRelease}>
                  Yes, delete it
                </button>
                <button className="cancel" onClick={this.props.closeModal}>
                  No, keep it
                </button>
              </div>
            </div>
          </div>
        );
    }
}

export default DeleteAlbumTrack;