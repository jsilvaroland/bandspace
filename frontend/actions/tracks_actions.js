import * as TracksApiUtil from '../util/tracks_api_util';

export const RECEIVE_TRACKS = 'RECEIVE_TRACKS';
export const RECEIVE_TRACK = 'RECEIVE_TRACK';
export const REMOVE_TRACK = 'REMOVE_TRACK';
export const CLEAR_TRACKS = 'CLEAR_TRACKS';

const receiveTracks = tracks => ({
    type: RECEIVE_TRACKS,
    tracks
});

const receiveTrack = track => ({
    type: RECEIVE_TRACK,
    track
});

const removeTrack = trackId => ({
    type: REMOVE_TRACK,
    trackId
});

export const clearTracks = () => ({
    type: CLEAR_TRACKS,
    tracks: []
});

export const fetchArtistSingles = artistId => dispatch => (
    TracksApiUtil.fetchArtistSingles(artistId)
        .then(tracks => dispatch(receiveTracks(tracks)))
);

export const fetchAlbumTracks = albumId => dispatch => (
    TracksApiUtil.fetchAlbumTracks(albumId)
        .then(tracks => dispatch(receiveTracks(tracks)))
);

export const fetchSearchedTracks = query => dispatch => (
    TracksApiUtil.fetchSearchedTracks(query)
        .then(tracks => dispatch(receiveTracks(tracks)))
);

export const fetchTrack = trackId => dispatch => (
    TracksApiUtil.fetchTrack(trackId)
        .then(track => dispatch(receiveTrack(track)))
);

export const createTrack = track => dispatch => (
    TracksApiUtil.createTrack(track)
        .then(track => dispatch(receiveTrack(track)))
);

export const updateTrack = track => dispatch => (
    TracksApiUtil.updateTrack(track)
        .then(track => dispatch(receiveTrack(track)))
);

export const deleteTrack = trackId => dispatch => (
    TracksApiUtil.deleteTrack(trackId)
        .then(() => dispatch(removeTrack(trackId)))
);