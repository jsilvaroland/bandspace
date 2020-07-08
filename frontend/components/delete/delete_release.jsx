import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';

class DeleteRelease extends React.Component {
    constructor(props) {
        super(props);
        this.deleteRelease = this.deleteRelease.bind(this);
    }

    // different cases
        // if it's an album, delete the album, along with every track in album.trackIds
        // if it's a track from an album, delete track, then updateAlbum with deleted trackId removed
        // if it's a single, just delete track

    componentDidUpdate() {
        if (!this.props.album) { // this will be different for other release types
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
                // if track has an albumId vs if no albumId
                const track = this.props.tracks[0];
                track.albumId ?
                    // for if track is part of an album
                    console.log('track is part of an album') :
                    // if track is a single
                    this.props.deleteTrack(track.id);
                    break;
        }
    }

    render() {
        const { releaseType } = this.props;

        // if (this.state.deleted) {
        //     return <Redirect to={`/artists/${currentUser.id}`} />
        // } else {
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
        // }
    }
}

export default withRouter(DeleteRelease);