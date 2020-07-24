import React from 'react';
import { withRouter } from 'react-router-dom';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Search extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			query: '',
            results: {},
            loading: false,
            message: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        console.log('in handleChange');
    }
    
    render() {
        const { currentUser } = this.props;
        const { pathname } = this.props.location;
        let wrapperClassName, searchClassName;

        if (!currentUser && pathname === '/') {
            wrapperClassName = "search-bar-wrapper";
            searchClassName = "search-bar";
        } else {
            wrapperClassName = "search-bar-wrapper-logged-in";
            searchClassName = "search-bar-logged-in";
        }

		return (
            <div className={wrapperClassName}>
                <input className={searchClassName}
                    type="text"
                    value={this.state.query}
                    placeholder="Search and discover music"
                    onChange={this.handleChange}
                />
                <FontAwesomeIcon icon={faSearch} className="search-bar-icon" />
            </div>
        );
	}
}

export default withRouter(Search);