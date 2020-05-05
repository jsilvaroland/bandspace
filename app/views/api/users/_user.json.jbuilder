json.extract! user, :id, :username, :is_artist

albums_ids = user.albums.map { |album| album.id }
json.createdAlbumIds albums_ids

singles = user.tracks.reject { |track| track.album_id }
singles_ids = singles.map { |single| single.id }
json.createdSinglesIds singles_ids