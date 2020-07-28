import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import albumsReducer from './albums_reducer';
import tracksReducer from './tracks_reducer';
import searchReducer from './search_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    search: searchReducer,
});

export default entitiesReducer;