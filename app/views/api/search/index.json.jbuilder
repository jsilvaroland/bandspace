@users.each do |user|
  json.set! user.id do
    json.partial! 'api/users/user', user: user
  end
end

@albums.each do |album|
    json.set! album.id do
        json.partial! 'api/albums/album', album: album
    end
end

@tracks.each do |track|
  json.set! track.id do
    json.partial! 'api/tracks/track', track: track
  end
end