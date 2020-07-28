export const fetchAllAlbums = () => (
    $.ajax({
        method: 'GET',
        url: 'api/albums',
    })
);

export const fetchArtistAlbums = artistId => (
    $.ajax({
        method: 'GET',
        url: `api/albums?artist_id=${artistId}`,
    })
);

export const fetchSearchedAlbums = query => (
    $.ajax({
        method: 'GET',
        url: `api/albums?search=${query}`,
    })
);

export const fetchAlbum = albumId => (
    $.ajax({
        method: 'GET',
        url: `api/albums/${albumId}`,
    })
);

export const createAlbum = album => (
    $.ajax({
        method: 'POST',
        url: 'api/albums',          // once an album is created, will i have to add it's id under user slice of state later?
        data: album,
        contentType: false,
        processData: false,
    })
);

export const updateAlbum = album => (
    $.ajax({
        method: 'PATCH',
        url: `api/albums/${album.id}`,
        data: album,
        contentType: false,
        processData: false,
    })
);

export const deleteAlbum = albumId => (
    $.ajax({
        method: 'DELETE',
        url: `api/albums/${albumId}`   // may need to return later? probably not
    })
);