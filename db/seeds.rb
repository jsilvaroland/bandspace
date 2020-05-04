# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Album.destroy_all
Track.destroy_all

demo_user = User.create!({
    username: 'demo',
    email: 'demo@demo.com',
    password: 'demo',
    is_artist: true
})

eugene = User.create!({
    username: 'hamneugene',
    email: "hamncheese@gmail.com",
    password: 'password',
    is_artist: true
})

andrew = User.create!({
    username: 'mamamia2000',
    email: "coolhandluke7@gmail.com",
    password: 'password',
    is_artist: true
})

riley = User.create!({
    username: 'formVfunction',
    email: "efficient.systern@gmail.com",
    password: 'password',
    is_artist: true
})

#############

planets = Album.create!({
    title: 'Planets',
    artist_id: demo_user.id
})

itbo = Album.create!({
    title: 'Into the Black Hole',
    artist_id: demo_user.id
})

decis = Album.create!({
    title: 'Decision',
    artist_id: riley.id
})

uc = Album.create!({
    title: 'Understanding Creation',
    artist_id: eugene.id
})

mtfs = Album.create!({
    title: 'More Than Five Senses',
    artist_id: andrew.id
})

gt = Album.create!({
    title: 'growing tenderness',
    artist_id: riley.id
})

###########

Track.create!({
    title: 'Mercury',
    artist_id: demo_user.id,
    album_id: planets.id
})

Track.create!({
    title: 'Venus',
    artist_id: demo_user.id,
    album_id: planets.id
})

Track.create!({
    title: 'Earth',
    artist_id: demo_user.id,
    album_id: planets.id
})

Track.create!({
    title: 'Mars',
    artist_id: demo_user.id,
    album_id: planets.id
})

Track.create!({
    title: 'Jupiter',
    artist_id: demo_user.id,
    album_id: planets.id
})

Track.create!({
    title: 'Saturn',
    artist_id: demo_user.id,
    album_id: planets.id
})

Track.create!({
    title: 'Uranus',
    artist_id: demo_user.id,
    album_id: planets.id
})

Track.create!({
    title: 'Neptune',
    artist_id: demo_user.id,
    album_id: planets.id
})

Track.create!({
    title: 'Adrift',
    artist_id: demo_user.id,
    album_id: itbo.id
})

Track.create!({
    title: 'Gravity',
    artist_id: demo_user.id,
    album_id: itbo.id
})

Track.create!({
    title: 'Inevitability',
    artist_id: demo_user.id,
    album_id: itbo.id
})

Track.create!({
    title: 'Event Horizon',
    artist_id: demo_user.id,
    album_id: itbo.id
})

Track.create!({
    title: 'Spaghettification',
    artist_id: demo_user.id,
    album_id: itbo.id
})

Track.create!({
    title: 'Singularity',
    artist_id: demo_user.id,
    album_id: itbo.id
})

demo_single_1 = Track.create!({
    title: 'Andromeda',
    artist_id: demo_user.id,
})

demo_single_2 = Track.create!({
    title: 'Nebula',
    artist_id: demo_user.id,
})

Track.create!({
    title: 'Detection',
    artist_id: decis.artist.id,
    album_id: decis.id
})

Track.create!({
    title: 'Act Quick',
    artist_id: decis.artist.id,
    album_id: decis.id
})

Track.create!({
    title: 'Need2Lead',
    artist_id: decis.artist.id,
    album_id: decis.id
})

Track.create!({
    title: 'Budding Warmth',
    artist_id: decis.artist.id,
    album_id: decis.id
})

Track.create!({
    title: 'Possibility',
    artist_id: uc.artist.id,
    album_id: uc.id
})

Track.create!({
    title: 'Discover the Universe',
    artist_id: uc.artist.id,
    album_id: uc.id
})

Track.create!({
    title: 'Ever Present',
    artist_id: mtfs.artist.id,
    album_id: mtfs.id
})

Track.create!({
    title: 'Bump This Tune',
    artist_id: mtfs.artist.id,
    album_id: mtfs.id
})

Track.create!({
    title: 'Stable',
    artist_id: mtfs.artist.id,
    album_id: mtfs.id
})

Track.create!({
    title: 'art express',
    artist_id: gt.artist.id,
    album_id: gt.id
})

Track.create!({
    title: 'open up!',
    artist_id: gt.artist.id,
    album_id: gt.id
})

Track.create!({
    title: 'Independent',
    artist_id: eugene.id,
})
