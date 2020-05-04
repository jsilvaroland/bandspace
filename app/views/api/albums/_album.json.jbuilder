json.extract! album, :id, :title, :description, :credits, :artist_id
json.trackIds album.tracks do |track|
    track.id
end