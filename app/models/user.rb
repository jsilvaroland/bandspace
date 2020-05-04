class User < ApplicationRecord
    validates :username, :email, :session_token, :password_digest, presence: true
    validates :is_artist, inclusion: [true, false]
    validates :username, :email, :session_token, uniqueness: true
    validates :password, length: { minimum: 3, allow_nil: true }
    before_validation :ensure_session_token!

    has_many :albums,
        foreign_key: :artist_id
    has_many :tracks,
        foreign_key: :artist_id

    attr_reader :password

    def self.find_by_credentials(username, password)
        user ||= User.find_by(username: username)
        return nil unless user
        user.is_password?(password) ? user : nil
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def reset_session_token!
        self.session_token = SecureRandom.urlsafe_base64
        self.save!
        self.session_token
    end

    def ensure_session_token!
        self.session_token ||= SecureRandom.urlsafe_base64
    end
end
