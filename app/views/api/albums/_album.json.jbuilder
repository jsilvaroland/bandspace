json.extract! album, :id, :title, :description, :credits, :artist_id
if album.photo.attached?
    json.albumArt url_for(album.photo)
end
track_ids = album.tracks.map { |track| track.id }
json.trackIds track_ids