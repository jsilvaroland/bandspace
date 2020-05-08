import React from 'react';
import ReleaseIndexItem from './release_index_item';

class ReleaseIndex extends React.Component {

    render() {
        const { pageAlbums, pageSingles } = this.props;
        return (
            <div className="music-column">
                <ol className="releases-list">
                    {
                        pageAlbums.map(album => (
                            <ReleaseIndexItem
                                key={album.id}
                                album={album}
                            />
                        ))
                    }
                    {
                        pageSingles.map(single => (
                            <ReleaseIndexItem
                                key={single.id}
                                single={single}
                            />
                        ))
                    }
                </ol>
            </div>
        )

    }
}

export default ReleaseIndex;