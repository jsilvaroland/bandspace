json.extract! track, :id, :title, :description, :credits, :lyrics, :artist_id, :album_id
if track.photo.attached?
    json.trackArt url_for(track.photo)
end
if track.song.attached?
    json.trackSong url_for(track.song)
end