import React from 'react';
import ReleaseIndexItem from './release_index_item';

class ReleaseIndex extends React.Component {

    render() {
        const { pageAlbums, pageSingles } = this.props;
        const pageUser = this.props.pageUser ? 
        this.props.pageUser.username.concat(" has") : 
        "You have"; 

        const releases = pageAlbums.concat(pageSingles).length === 0 ?
            <div>{pageUser} not uploaded any music.</div> :
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

        return (
            <div className="music-column">
                {releases}
            </div>
        )
    }
}

export default ReleaseIndex;