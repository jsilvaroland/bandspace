import {
    RECEIVE_SEARCHED_TRACKS,
    RECEIVE_SEARCHED_ALBUMS,
    RECEIVE_SEARCHED_USERS,
    CLEAR_SEARCH
} from '../actions/search_actions';

const searchReducer = (oldState = {}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
        case RECEIVE_SEARCHED_TRACKS:
            return Object.assign({}, oldState, action.tracks);
        case RECEIVE_SEARCHED_ALBUMS:
            return Object.assign({}, oldState, action.albums);
        case RECEIVE_SEARCHED_USERS:
            return Object.assign({}, oldState, action.users);
        case CLEAR_SEARCH:
            return {};
        default:
            return oldState;
    }
};

export default searchReducer;