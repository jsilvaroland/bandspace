import React from 'react';
import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import LoginFormContainer from '../session_form/login_form_container';
import SignupFormContainer from '../session_form/signup_form_container';
import DeleteReleaseContainer from '../delete/delete_release_container';
import DeleteAlbumTrackContainer from '../delete/delete_album_track_container';
import DeleteArtContainer from '../delete/delete_art_container';
import UploadErrorContainer from '../upload_error/upload_error_container';

const Modal = props => {
    const { modal, closeModal } = props;
    if (!modal) return null;

    let component;
    switch (Object.keys(modal)[0]) {
        case 'login':
            component = <LoginFormContainer />;
            break;
        case 'signup':
            component = <SignupFormContainer />;
            break;
        case 'delete-release':
            component = <DeleteReleaseContainer />;
            break;
        case 'delete-album-track':
            component = <DeleteAlbumTrackContainer trackId={Object.values(modal)[0]} album={modal.album} handlePanelChange={modal.handlePanelChange} />;
            break;
        case 'delete-custom-header':
            component = <DeleteArtContainer artType="Custom Header" />;
            break;
        case 'delete-custom-pic':
            component = <DeleteArtContainer artType="Profile Pic" />;
            break;
        case 'custom-header-size-error':
            component = <UploadErrorContainer artType="Custom Header" maxSize="2MB" />;
            break;
        case 'image-size-error':
            component = <UploadErrorContainer artType="Image" maxSize="10MB" />;
            break;
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
