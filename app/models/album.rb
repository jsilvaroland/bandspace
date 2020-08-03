class Album < ApplicationRecord
    validates :title, :artist_id, presence: true
    # validate :ensure_photo

    has_many :tracks
    belongs_to :artist,
        class_name: :User

    has_one_attached :photo

    # def ensure_photo
    #     unless self.photo.attached?
    #         errors[:photo] <<  "must be attached"
    #     end
    # end
end
