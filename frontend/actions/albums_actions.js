import * as AlbumsApiUtil from '../util/albums_api_util';

export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
export const REMOVE_ALBUM = 'REMOVE_ALBUM';
export const CLEAR_ALBUMS = 'CLEAR_ALBUMS';
export const RECEIVE_ALBUM_ERRORS = 'RECEIVE_ALBUM_ERRORS';
export const CLEAR_ALBUM_ERRORS = 'CLEAR_ALBUM_ERRORS';

const receiveAlbums = albums => ({
    type: RECEIVE_ALBUMS,
    albums
});

const receiveAlbum = album => ({
    type: RECEIVE_ALBUM,
    album
});

const removeAlbum = albumId => ({
    type: REMOVE_ALBUM,
    albumId
});

const receiveAlbumErrors = errors => ({
    type: RECEIVE_ALBUM_ERRORS,
    errors
});

export const clearAlbumErrors = () => ({ // not being used yet
    type: CLEAR_ALBUM_ERRORS,
});

export const clearAlbums = () => ({
    type: CLEAR_ALBUMS,
});

export const fetchAllAlbums = () => dispatch => (
    AlbumsApiUtil.fetchAllAlbums()
        .then(albums => dispatch(receiveAlbums(albums)))
);

export const fetchArtistAlbums = artistId => dispatch => (
    AlbumsApiUtil.fetchArtistAlbums(artistId)
        .then(albums => dispatch(receiveAlbums(albums)))
);

export const fetchAlbum = albumId => dispatch => (
    AlbumsApiUtil.fetchAlbum(albumId)
        .then(album => dispatch(receiveAlbum(album)))
);

export const createAlbum = album => dispatch => (
    AlbumsApiUtil.createAlbum(album)
        .then(album => dispatch(receiveAlbum(album)))
        .fail(errors => dispatch(receiveAlbumErrors(errors.responseJSON)))
);

export const updateAlbum = album => dispatch => (
    AlbumsApiUtil.updateAlbum(album)
        .then(album => dispatch(receiveAlbum(album)))
        .fail(errors => dispatch(receiveAlbumErrors(errors.responseJSON)))
);

export const deleteAlbum = albumId => dispatch => (
    AlbumsApiUtil.deleteAlbum(albumId)
        .then(() => dispatch(removeAlbum(albumId)))
);