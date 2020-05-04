json.extract! track, :id, :title, :description, :credits, :lyrics, :artist_id, :album_id
json.trackIds album.tracks do |track|
    track.id
end