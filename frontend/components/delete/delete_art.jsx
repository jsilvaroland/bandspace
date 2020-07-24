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
        }
    }

    render() {
        const { artType } = this.props;
        return (
            <div className="delete">
                <div className="delete-title">Delete {artType}</div>
                <div className="delete-body">
                    Are you sure you want to delete your {artType.toLowerCase()}?
                </div>
                <div>
                    <button className="OK" onClick={this.deleteArt}>OK</button>
                    <button className="cancel" onClick={this.props.closeModal}>
                        Cancel
                    </button>
                </div>
            </div>
        )
    }
}

export default DeleteArt;