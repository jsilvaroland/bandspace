json.extract! user, :id, :username, :is_artist
if user.photo.attached?
    json.userArt url_for(user.photo)
end
if user.banner.attached?
    json.userBanner url_for(user.banner)
end
albums_ids = user.albums.map { |album| album.id }
json.createdAlbumIds albums_ids

singles = user.tracks.reject { |track| track.album_id }
singles_ids = singles.map { |single| single.id }
json.createdSinglesIds singles_ids