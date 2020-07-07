import React from 'react';

class DeleteArt extends React.Component {
    constructor(props) {
        super(props);
        this.deleteArt = this.deleteArt.bind(this);
    }

    deleteArt() {
        const { artType, updateUser, closeModal } = this.props;

        switch (artType) {
            case 'Custom Header':
                const nullFormData = new FormData();
                nullFormData.append('user[banner]', null);
                updateUser(nullFormData)
                    .then(closeModal());
                break;
            case 'User Pic':
                // if track has an albumId vs if no albumId
                debugger
        }
    }

    render() {
        const { artType } = this.props;
        return (
            <div>
                <div>Delete {artType}</div>
                <div>Are you user you want to delete your {artType.toLowerCase()}?</div>
                <button onClick={this.deleteArt}>OK</button>
                <button onClick={this.props.closeModal}>Cancel</button>
            </div>
        )
    }
}

export default DeleteArt;