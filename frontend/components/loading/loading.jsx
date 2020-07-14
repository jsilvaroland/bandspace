import React from 'react';
import { connect } from "react-redux";
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Loading = ({ loading }) => {
    if (!loading) return null;

    return (
        <div className="loading">
            <FontAwesomeIcon icon={faSpinner} spin size="10x" />
        </div>
    );
};

const mapStateToProps = state => {
    return {
        loading: state.ui.loading
    };
};

export default connect(mapStateToProps)(Loading);