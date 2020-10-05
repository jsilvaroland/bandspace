import React from 'react';
import { withRouter } from 'react-router-dom';

import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SearchIndex from './search_index';

class Search extends React.Component {
    constructor(props) {
		super(props);
		this.state = {
      query: "",
      results: [],
    };
        props
          .fetchSearch()
          .then((res) =>
            this.setState({ results: Object.values(res.payload) })
          );
        this.change = this.change.bind(this);
        this.onReset = this.onReset.bind(this);
    }

    componentDidUpdate(prevProps) {
        if ((this.props.location !== prevProps.location) || 
        (this.state.query === '' && this.state.results.length !== 0)) {
            this.onReset();
        }
    }

    change(e) {
      const { results, onClick, activeDropDown } = this.props;

      if (activeDropDown !== "search") onClick("search");
      const query = e.target.value;
      const callback = (result) => {
        const filterBy = result.username ? "username" : "title";
        return result[filterBy].toLowerCase().includes(query.toLowerCase());
      };

      const filtered = results.filter((result) => callback(result));
      this.setState({ query, results: filtered });
    }

    onReset() {
        this.setState({ query: '', results: [] });
    }
    
    render() {
        const { currentUser, activeDropDown } = this.props;
        const { pathname } = this.props.location;
        const { query, results } = this.state;
        let wrapperClassName, searchClassName, searchResults;

        if (!currentUser && pathname === '/') {
            wrapperClassName = "search-bar-wrapper";
            searchClassName = "search-bar";
        } else {
            wrapperClassName = "search-bar-wrapper-logged-in";
            searchClassName = "search-bar-logged-in";
        }

        if (results.length > 0) {
            searchResults = <SearchIndex 
                                activeDropDown={activeDropDown}
                                results={results.slice(0, 5)}
                                onReset={this.onReset} 
                            /> 
        } else if (query !== '' && results.length === 0) {
            searchResults = <div className="no-results"
                            id={activeDropDown === 'search' ? "show" : null}>
                                No Results Found
                            </div>
        }

		return (
      <div className={wrapperClassName}>
        <input
          className={searchClassName}
          type="text"
          value={this.state.query}
          placeholder="Search and discover music"
          onChange={this.change}
        />
        <FontAwesomeIcon icon={faSearch} className="search-bar-icon" />
        {searchResults}
      </div>
    );
	}
}

export default withRouter(Search);