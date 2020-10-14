import React from 'react';
import SearchIndexItem from './search_index_item';

class SearchIndex extends React.Component {
    render() {
        const { results, onReset, activeDropDown, clickLink } = this.props;
        return (
            <ol className="search-results-list" id={activeDropDown === 'search' ? "show" : null} >
                {
                    results.map((result, i) => {
                        return(
                            <SearchIndexItem 
                                key={i}
                                result={result}
                                onReset={onReset}
                                clickLink={clickLink}
                            />
                        )
                    })
                }
            </ol>
        )
    }
}

export default SearchIndex;