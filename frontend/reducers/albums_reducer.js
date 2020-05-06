import { 
    RECEIVE_ALBUMS, 
    RECEIVE_ALBUM, 
    REMOVE_ALBUM 
} from '../actions/albums_actions';

const albumsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    const newState = Object.assign({}, oldState);
    switch (action.type) {
        case RECEIVE_ALBUMS:
            return Object.assign(newState, action.albums);
        case RECEIVE_ALBUM:
            return Object.assign(newState, { [action.album.id]: action.album });
        case REMOVE_ALBUM:
            delete newState[action.albumId];
            return newState;
        default:
            return oldState;
    }
};

export default albumsReducer;