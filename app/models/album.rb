class Album < ApplicationRecord
    validates :title, :artist_id, presence: true

    has_many :tracks
    belongs_to :artist,
        class_name: :User

    has_one_attached :photo

end
