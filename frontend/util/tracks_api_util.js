// get all singles from an artist
// get all tracks from a 

export const fetchArtistSingles = artistId => (
    $.ajax({
        method: 'GET',
        url: `api/tracks?artist_id=${artistId}`,
    })
);

export const fetchAlbumTracks = albumId => (
    $.ajax({
        method: 'GET',
        url: `api/tracks?album_id=${albumId}`,
    })
);

export const fetchTrack = trackId => (
    $.ajax({
        method: 'GET',
        url: `api/tracks/${trackId}`,
    })
);

// 2 diff ajax calls for creating a single vs creating an album track?
// how to differential creating a single vs creating a track for an album? if it has an album ID or not.

export const createTrack = track => (
    $.ajax({
        method: 'POST',
        url: 'api/tracks',
        data: track,
        contentType: false,
        processData: false,
    })
);

// same for updating.

export const updateTrack = track => (
    $.ajax({
        method: 'PATCH',
        url: `api/tracks/${track.id}`,
        data: { track }
    })
);

export const deleteTrack = trackId => (
    $.ajax({
        method: 'DELETE',
        url: `api/tracks/${trackId}`,
    })
);