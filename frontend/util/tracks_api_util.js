
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

export const createTrack = track => (
    $.ajax({
        method: 'POST',
        url: 'api/tracks',
        data: track,
        contentType: false,
        processData: false,
    })
);

export const updateTrack = track => (
    $.ajax({
        method: 'PATCH',
        url: `api/tracks/${track.id}`,
        data: track,
        contentType: false,
        processData: false,
    })
);

export const deleteTrack = trackId => (
    $.ajax({
        method: 'DELETE',
        url: `api/tracks/${trackId}`,
    })
);