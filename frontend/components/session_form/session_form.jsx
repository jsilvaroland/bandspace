import React from 'react';
import { withRouter } from 'react-router-dom';

class SessionForm extends React.Component {
    render() {
        return(
            <div>
                {this.props.formType}
            </div>
        )
    }
}

export default withRouter(SessionForm);
