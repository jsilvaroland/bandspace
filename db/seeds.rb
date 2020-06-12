require 'open-uri'

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

demo_user_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-31.png')
demo_user.photo.attach(io: demo_user_art, filename: 'image-31.png')

demo_user_banner = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/banner-48.png')
demo_user.banner.attach(io: demo_user_banner, filename: 'banner-48.png')

eugene = User.create!({
    username: 'hamneugene',
    email: "hamncheese@gmail.com",
    password: 'password',
    is_artist: true
})

eugene_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-34.png')
eugene.photo.attach(io: eugene_art, filename: 'image-34.png')

eugene_banner = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/banner-49.png')
eugene.banner.attach(io: eugene_banner, filename: 'banner-49.png')

andrew = User.create!({
    username: 'mamamia2000',
    email: "coolhandluke7@gmail.com",
    password: 'password',
    is_artist: true
})

andrew_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-35.jpg')
andrew.photo.attach(io: andrew_art, filename: 'image-35.jpg')

andrew_banner = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/banner-50.png')
andrew.banner.attach(io: andrew_banner, filename: 'banner-50.png')

riley = User.create!({
    username: 'formVfunction',
    email: "efficient.systern@gmail.com",
    password: 'password',
    is_artist: true
})

riley_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-33.jpg')
riley.photo.attach(io: riley_art, filename: 'image-33.jpg')

riley_banner = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/banner-51.png')
riley.banner.attach(io: riley_banner, filename: 'banner-51.png')

#############

### ALBUMS

#############

planets = Album.create!({
    title: 'Planets',
    artist_id: demo_user.id,
    description: '',
    credits: ''
})

planets_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-31.png')
planets.photo.attach(io: planets_art, filename: 'image-31.png')

itbo = Album.create!({
    title: 'Into the Black Hole',
    artist_id: demo_user.id,
    description: '',
    credits: ''
})

itbo_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-32.png')
itbo.photo.attach(io: itbo_art, filename: 'image-32.png')

decis = Album.create!({
    title: 'Decision',
    artist_id: riley.id,
    description: '',
    credits: ''
})

decis_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-33.jpg')
decis.photo.attach(io: decis_art, filename: 'image-33.jpg')

uc = Album.create!({
    title: 'Understanding Creation',
    artist_id: eugene.id,
    description: '',
    credits: ''
})

uc_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-34.png')
uc.photo.attach(io: uc_art, filename: 'image-34.png')


mtfs = Album.create!({
    title: 'More Than Five Senses',
    artist_id: andrew.id,
    description: '',
    credits: ''
})

mtfs_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-35.jpg')
mtfs.photo.attach(io: mtfs_art, filename: 'image-35.jpg')

gt = Album.create!({
    title: 'growing tenderness',
    artist_id: riley.id,
    description: '',
    credits: ''
})

gt_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-36.png')
gt.photo.attach(io: gt_art, filename: 'image-36.png')

###########

### TRACKS

###########

Track.create!({
    title: 'Mercury',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Venus',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Earth',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Mars',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Jupiter',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Saturn',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Uranus',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Neptune',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Adrift',
    artist_id: demo_user.id,
    album_id: itbo.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Gravity',
    artist_id: demo_user.id,
    album_id: itbo.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Inevitability',
    artist_id: demo_user.id,
    album_id: itbo.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Event Horizon',
    artist_id: demo_user.id,
    album_id: itbo.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Spaghettification',
    artist_id: demo_user.id,
    album_id: itbo.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Singularity',
    artist_id: demo_user.id,
    album_id: itbo.id,
    lyrics: '',
    description: '',
    credits: ''
})

demo_single_1 = Track.create!({
    title: 'Andromeda',
    artist_id: demo_user.id,
    lyrics: '',
    description: '',
    credits: ''
})

demo_single_1_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-85.jpg')
demo_single_1.photo.attach(io: demo_single_1_art, filename: 'image-85.jpg')

demo_single_2 = Track.create!({
    title: 'Nebula',
    artist_id: demo_user.id,
    lyrics: '',
    description: '',
    credits: ''
})

demo_single_2_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-86.png')
demo_single_2.photo.attach(io: demo_single_2_art, filename: 'image-86.png')

Track.create!({
    title: 'Detection',
    artist_id: decis.artist.id,
    album_id: decis.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Act Quick',
    artist_id: decis.artist.id,
    album_id: decis.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Need2Lead',
    artist_id: decis.artist.id,
    album_id: decis.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Budding Warmth',
    artist_id: decis.artist.id,
    album_id: decis.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Possibility',
    artist_id: uc.artist.id,
    album_id: uc.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Discover the Universe',
    artist_id: uc.artist.id,
    album_id: uc.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Ever Present',
    artist_id: mtfs.artist.id,
    album_id: mtfs.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Bump This Tune',
    artist_id: mtfs.artist.id,
    album_id: mtfs.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'Stable',
    artist_id: mtfs.artist.id,
    album_id: mtfs.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'art express',
    artist_id: gt.artist.id,
    album_id: gt.id,
    lyrics: '',
    description: '',
    credits: ''
})

Track.create!({
    title: 'open up!',
    artist_id: gt.artist.id,
    album_id: gt.id,
    lyrics: '',
    description: '',
    credits: ''
})

indep = Track.create!({
    title: 'Independent',
    artist_id: eugene.id,
    lyrics: '',
    description: '',
    credits: ''
})

indep_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-98.png')
indep.photo.attach(io: indep_art, filename: 'image-98.png')