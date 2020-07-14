import React from 'react';

class UploadError extends React.Component {
    render() {
        const { artType, maxSize, closeModal } = this.props;
        return (
            <div className="upload-error">
                <div className="upload-error-title">{artType} Upload Error</div>
                <div className="upload-error-body">
                    Maximum allowed file size is {maxSize}.
                </div>
                <div>
                    <button className="OK" onClick={closeModal}>OK</button>
                </div>
            </div>
        )
    }
}

export default UploadError;