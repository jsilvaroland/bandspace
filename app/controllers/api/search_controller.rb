class Api::SearchController < ApplicationController

  def index
    @users = User.all
    @tracks = Track.all
    @albums = Album.all
    render :index
  end
end
