json.extract! user, :id, :username, :is_artist
json.createdAlbumsIds user.albums do |album|
    album.id
end
json.createdSinglesIds user.tracks do |track|
    track.id
end