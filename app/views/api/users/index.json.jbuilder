
json.array! @artists do |artist|
    artist, :id, :username   # return an array of artist objects, may change state shape later
end