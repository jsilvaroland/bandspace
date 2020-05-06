import * as AlbumsApiUtil from '../util/albums_api_util';

export const RECEIVE_ALBUMS = 'RECEIVE_ALBUMS';
export const RECEIVE_ALBUM = 'RECEIVE_ALBUM';
export const REMOVE_ALBUM = 'REMOVE_ALBUM';

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
);

export const updateAlbum = album => dispatch => (
    AlbumsApiUtil.updateAlbum(album)
        .then(album => dispatch(receiveAlbum(album)))
);

export const deleteAlbum = albumId => dispatch => (
    AlbumsApiUtil.deleteAlbum(albumId)
        .then(() => dispatch(removeAlbum(albumId)))
);