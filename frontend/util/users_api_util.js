export const fetchAllArtists = allArtists => (
    $.ajax({
        method: 'GET',
        url: 'api/users',
        data: { allArtists }
    })
);