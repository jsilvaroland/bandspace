# [Bandspace](https://bandspace-app.herokuapp.com/#/)

## Demo
![demo](demo.gif) 

Bandspace is an online music platform with branding and styling influenced by Bandcamp. On Bandspace artists can upload their music for users to listen to and purchase.

## Technologies
* Ruby on Rails
* React
* React Router Dom
* Redux
* Redux Thunk
* AWS S3
* Webpack
* Babel
* PostgreSQL
* Font Awesome

## Features
* User accounts and profiles
* Music upload and playback
* Album and single artwork
* Music description and track lyrics display


## Technical Implementation
I created a modal to render the login/signup forms, track deletion confirmation messages, and error messages. For the modal, I used a hash slice of state in order to pass props down to it.

```
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
```