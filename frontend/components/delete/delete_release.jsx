import React from 'react';
import { withRouter } from 'react-router-dom';

class DeleteRelease extends React.Component {
    constructor(props) {
        super(props);
        this.deleteRelease = this.deleteRelease.bind(this);
    }

    componentDidUpdate() {
        if (!this.props.album) {
            this.props.closeModal();
        } 
    }

    deleteRelease() {
        switch (this.props.releaseType) {
            case 'Album':
                this.props.tracks.forEach(track => {
                    this.props.deleteTrack(track.id);
                });
                this.props.deleteAlbum(this.props.album.id);
                break;
            case 'Track':
                const track = this.props.tracks[0];
                
                this.props.deleteTrack(track.id);
                break;
        }
    }

    render() {
        const { releaseType } = this.props;

        return (
            <div className="delete">
                <div className="delete-title">Delete {releaseType}</div>
                <div className="delete-body">
                    Are you user you want to permanently delete this {releaseType.toLowerCase()}?
                </div>
                <div>
                    <button className="OK" onClick={this.deleteRelease}>Yes, delete it</button>
                    <button className="cancel" onClick={this.props.closeModal}>No, keep it</button>
                </div>
            </div>
        )
    }
}

export default withRouter(DeleteRelease);