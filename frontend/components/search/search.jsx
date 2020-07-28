import React from 'react';
import { withRouter } from 'react-router-dom';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Search extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
			query: '',
            results: [],
            loading: false,
            message: '',
        };
        this.change = this.change.bind(this);
    }

    componentDidUpdate() {
        if (this.state.query === "" && this.state.results.length !== 0) {
            this.setState({ results: [] });
        } 
    }

    change(e) {
        const { fetchSearchedTracks, fetchSearchedUsers, fetchSearchedAlbums } = this.props;
        const query = e.target.value;

        this.setState({ query, results: [] });
        fetchSearchedUsers(query)
            .then(res => this.setState({ results: this.state.results.concat(Object.values(res.users)) }));
        fetchSearchedTracks(query)
            .then(res => this.setState({ results: this.state.results.concat(Object.values(res.tracks)) }));
        fetchSearchedAlbums(query)
            .then(res => this.setState({ results: this.state.results.concat(Object.values(res.albums)) }));
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

        console.log(this.state.results);

		return (
            <div className={wrapperClassName}>
                <input className={searchClassName}
                    type="text"
                    value={this.state.query}
                    placeholder="Search and discover music"
                    onChange={this.change}
                />
                <FontAwesomeIcon icon={faSearch} className="search-bar-icon" />
            </div>
        );
	}
}

export default withRouter(Search);