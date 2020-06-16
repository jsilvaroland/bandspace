class Track < ApplicationRecord
    validates :title, :artist_id, presence: true

    belongs_to :album, optional: true
    belongs_to :artist,
        class_name: :User

    has_one_attached :photo
    has_one_attached :song
end
