json.extract! album, :id, :title, :description, :credits, :artist_id

track_ids = album.tracks.map { |track| track.id }
json.trackIds track_ids