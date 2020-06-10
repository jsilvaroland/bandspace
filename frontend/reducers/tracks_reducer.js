import { 
    RECEIVE_TRACKS,
    RECEIVE_TRACK,
    REMOVE_TRACK, 
    CLEAR_TRACKS,
} from '../actions/tracks_actions';

const tracksReducer = (oldState = {}, action) => {
    Object.freeze(oldState);

    switch (action.type) {
        case RECEIVE_TRACKS:
            return Object.assign({}, oldState, action.tracks);
        case RECEIVE_TRACK:
            return Object.assign({}, oldState, { [action.track.id]: action.track });
        case REMOVE_TRACK:
            const newState = Object.assign({}, oldState);
            delete newState[action.trackId];
            return newState;
        case CLEAR_TRACKS:
            return [];
        default:
            return oldState;
    }  
};

export default tracksReducer;