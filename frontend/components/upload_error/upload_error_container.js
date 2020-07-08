import { connect } from 'react-redux';

import { closeModal } from '../../actions/modal_actions';
import UploadError from './upload_error';

const mapStateToProps = (state, ownProps) => {
    return ({
        artType: ownProps.artType,
    });
};

const mapDispatchToProps = dispatch => {
    return ({
        closeModal: () => dispatch(closeModal()),
    });
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadError);