class Track < ApplicationRecord
    validates :title, :artist_id, presence: true

    belongs_to :album, optional: true
    belongs_to :artist,
        class_name: :User
end
