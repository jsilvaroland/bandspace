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

demo_user_banner = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/demo.jpeg')
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

mercury = Track.create!({
    title: 'Mercury',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

mercury_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Mercury.mp3')
mercury.song.attach(io: mercury_song, filename: 'Mercury.mp3')

venus = Track.create!({
    title: 'Venus',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

venus_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Venus.mp3')
venus.song.attach(io: venus_song, filename: 'Venus.mp3')

earth = Track.create!({
    title: 'Earth',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

earth_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Earth.mp3')
earth.song.attach(io: earth_song, filename: 'Earth.mp3')

mars = Track.create!({
    title: 'Mars',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

mars_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Mars.mp3')
mars.song.attach(io: mars_song, filename: 'Mars.mp3')

jupiter = Track.create!({
    title: 'Jupiter',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

jupiter_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Jupiter.mp3')
jupiter.song.attach(io: jupiter_song, filename: 'Jupiter.mp3')

saturn = Track.create!({
    title: 'Saturn',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

saturn_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Saturn.mp3')
saturn.song.attach(io: saturn_song, filename: 'Saturn.mp3')

uranus = Track.create!({
    title: 'Uranus',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

uranus_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Uranus.mp3')
uranus.song.attach(io: uranus_song, filename: 'Uranus.mp3')

neptune = Track.create!({
    title: 'Neptune',
    artist_id: demo_user.id,
    album_id: planets.id,
    lyrics: '',
    description: '',
    credits: ''
})

neptune_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Neptune.mp3')
neptune.song.attach(io: neptune_song, filename: 'Neptune.mp3')

adrift = Track.create!({
    title: 'Adrift',
    artist_id: demo_user.id,
    album_id: itbo.id,
    lyrics: '',
    description: '',
    credits: ''
})

adrift_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Adrift.mp3')
adrift.song.attach(io: adrift_song, filename: 'Adrift.mp3')

gravity = Track.create!({
    title: 'Gravity',
    artist_id: demo_user.id,
    album_id: itbo.id,
    lyrics: '',
    description: '',
    credits: ''
})

gravity_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Gravity.mp3')
gravity.song.attach(io: gravity_song, filename: 'Gravity.mp3')

inevitability = Track.create!({
    title: 'Inevitability',
    artist_id: demo_user.id,
    album_id: itbo.id,
    lyrics: '',
    description: '',
    credits: ''
})

inevitability_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Inevitability.mp3')
inevitability.song.attach(io: inevitability_song, filename: 'Inevitability.mp3')

event_horizon = Track.create!({
    title: 'Event Horizon',
    artist_id: demo_user.id,
    album_id: itbo.id,
    lyrics: '',
    description: '',
    credits: ''
})

event_horizon_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/EventHorizon.mp3')
event_horizon.song.attach(io: event_horizon_song, filename: 'EventHorizon.mp3')

spaghettification = Track.create!({
    title: 'Spaghettification',
    artist_id: demo_user.id,
    album_id: itbo.id,
    lyrics: '',
    description: '',
    credits: ''
})

spaghettification_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Spaghettification.mp3')
spaghettification.song.attach(io: spaghettification_song, filename: 'Spaghettification.mp3')

singularity = Track.create!({
    title: 'Singularity',
    artist_id: demo_user.id,
    album_id: itbo.id,
    lyrics: '',
    description: '',
    credits: ''
})

singularity_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Singularity.mp3')
singularity.song.attach(io: singularity_song, filename: 'Singularity.mp3')

demo_single_1 = Track.create!({
    title: 'Andromeda',
    artist_id: demo_user.id,
    lyrics: '',
    description: '',
    credits: ''
})

demo_single_1_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-85.jpg')
demo_single_1.photo.attach(io: demo_single_1_art, filename: 'image-85.jpg')

demo_single_1_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Andromeda.mp3')
demo_single_1.song.attach(io: demo_single_1_song, filename: 'Andromeda.mp3')

demo_single_2 = Track.create!({
    title: 'Nebula',
    artist_id: demo_user.id,
    lyrics: '',
    description: '',
    credits: ''
})

demo_single_2_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-86.png')
demo_single_2.photo.attach(io: demo_single_2_art, filename: 'image-86.png')

demo_single_2_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Nebula.mp3')
demo_single_2.song.attach(io: demo_single_2_song, filename: 'Nebula.mp3')

detection = Track.create!({
    title: 'Detection',
    artist_id: decis.artist.id,
    album_id: decis.id,
    lyrics: '',
    description: '',
    credits: ''
})

detection_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Detection.mp3')
detection.song.attach(io: detection_song, filename: 'Detection.mp3')

act_quick = Track.create!({
    title: 'Act Quick',
    artist_id: decis.artist.id,
    album_id: decis.id,
    lyrics: '',
    description: '',
    credits: ''
})

act_quick_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/ActQuick.mp3')
act_quick.song.attach(io: act_quick_song, filename: 'ActQuick.mp3')

need_2_lead = Track.create!({
    title: 'Need2Lead',
    artist_id: decis.artist.id,
    album_id: decis.id,
    lyrics: '',
    description: '',
    credits: ''
})

need_2_lead_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Need2Lead.mp3')
need_2_lead.song.attach(io: need_2_lead_song, filename: 'Need2Lead.mp3')

budding_warmth = Track.create!({
    title: 'Budding Warmth',
    artist_id: decis.artist.id,
    album_id: decis.id,
    lyrics: '',
    description: '',
    credits: ''
})

budding_warmth_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/BuddingWarmth.mp3')
budding_warmth.song.attach(io: budding_warmth_song, filename: 'BuddingWarmth.mp3')

possibility = Track.create!({
    title: 'Possibility',
    artist_id: uc.artist.id,
    album_id: uc.id,
    lyrics: '',
    description: '',
    credits: ''
})

possibility_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Possibility.mp3')
possibility.song.attach(io: possibility_song, filename: 'Possibility.mp3')

discover_the_universe = Track.create!({
    title: 'Discover the Universe',
    artist_id: uc.artist.id,
    album_id: uc.id,
    lyrics: '',
    description: '',
    credits: ''
})

discover_the_universe_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/DiscoverTheUniverse.mp3')
discover_the_universe.song.attach(io: discover_the_universe_song, filename: 'DiscoverTheUniverse.mp3')

ever_present = Track.create!({
    title: 'Ever Present',
    artist_id: mtfs.artist.id,
    album_id: mtfs.id,
    lyrics: '',
    description: '',
    credits: ''
})

ever_present_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/EverPresent.mp3')
ever_present.song.attach(io: ever_present_song, filename: 'EverPresent.mp3')

bump_this_tune = Track.create!({
    title: 'Bump This Tune',
    artist_id: mtfs.artist.id,
    album_id: mtfs.id,
    lyrics: '',
    description: '',
    credits: ''
})

bump_this_tune_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/BumpThisTune.mp3')
bump_this_tune.song.attach(io: bump_this_tune_song, filename: 'BumpThisTune.mp3')

stable = Track.create!({
    title: 'Stable',
    artist_id: mtfs.artist.id,
    album_id: mtfs.id,
    lyrics: '',
    description: '',
    credits: ''
})

stable_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Stable.mp3')
stable.song.attach(io: stable_song, filename: 'Stable.mp3')

art_express = Track.create!({
    title: 'art express',
    artist_id: gt.artist.id,
    album_id: gt.id,
    lyrics: '',
    description: '',
    credits: ''
})

art_express_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/ArtExpress.mp3')
art_express.song.attach(io: art_express_song, filename: 'ArtExpress.mp3')

open_up = Track.create!({
    title: 'open up!',
    artist_id: gt.artist.id,
    album_id: gt.id,
    lyrics: '',
    description: '',
    credits: ''
})

open_up_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/OpenUp.mp3')
open_up.song.attach(io: open_up_song, filename: 'OpenUp.mp3')

indep = Track.create!({
    title: 'Independent',
    artist_id: eugene.id,
    lyrics: '',
    description: '',
    credits: ''
})

indep_art = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/image-98.png')
indep.photo.attach(io: indep_art, filename: 'image-98.png')

indep_song = open('https://bandspace-seeds.s3-us-west-1.amazonaws.com/Independent.mp3')
indep.song.attach(io: indep_song, filename: 'Independent.mp3')