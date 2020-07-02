class Track < ApplicationRecord
    validates :title, :artist_id, presence: true
    validate :ensure_song

    belongs_to :album, optional: true
    belongs_to :artist,
        class_name: :User

    has_one_attached :photo
    has_one_attached :song

    def ensure_song
        unless self.song.attached?
            errors[:song] <<  "must be attached"
        end
    end
end
