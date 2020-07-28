import * as UsersApiUtil from '../util/users_api_util';
import * as TracksApiUtil from '../util/tracks_api_util';
import * as AlbumsApiUtil from '../util/albums_api_util';

export const RECEIVE_SEARCHED_USERS = 'RECEIVE_SEARCHED_USERS';
export const RECEIVE_SEARCHED_ALBUMS = 'RECEIVE_SEARCHED_ALBUMS';
export const RECEIVE_SEARCHED_TRACKS = 'RECEIVE_SEARCHED_TRACKS';
export const CLEAR_SEARCH = 'CLEAR_SEARCH';

const receiveSearchedUsers = users => ({
    type: RECEIVE_SEARCHED_USERS,
    users
});

const receiveSearchedAlbums = albums => ({
    type: RECEIVE_SEARCHED_ALBUMS,
    albums
});

const receiveSearchedTracks = tracks => ({
    type: RECEIVE_SEARCHED_TRACKS,
    tracks
});

export const clearSearch = () => ({
    type: CLEAR_SEARCH,
});

export const fetchSearchedUsers = query => dispatch => (
    UsersApiUtil.fetchSearchedUsers(query)
        .then(users => dispatch(receiveSearchedUsers(users))) // different thunk
);

export const fetchSearchedAlbums = query => dispatch => (
    AlbumsApiUtil.fetchSearchedAlbums(query)
        .then(albums => dispatch(receiveSearchedAlbums(albums)))
);

export const fetchSearchedTracks = query => dispatch => (
    TracksApiUtil.fetchSearchedTracks(query)
        .then(tracks => dispatch(receiveSearchedTracks(tracks)))
);