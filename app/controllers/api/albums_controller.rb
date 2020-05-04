class Api::AlbumsController < ApplicationController
    before_action :require_logged_in, only: [ :create, :update, :destroy]

    def index       # do i want this to get the albums for a particular user? i think i'll do this in frontend logic
        # @albums = Album.where            # change this to be filtered by data/params later
        @albums = Album.all
        render :index
    end

    # maybe have a non-RESTful route to show all albums vs all albums for a particular artist

    def show
        @album = Album.find_by(id: params[:id])
        render :show
    end

    def create
        @album = Album.new(album_params)
        @album.artist_id = current_user.id

        if @album.save
            render :show  # can also possibly render :index to show all releases after creation
        else
            render json: @album.errors.full_messages, status: 422
        end
    end

    def update
        @album = Album.find_by(id: params[:id]) # not sure how to find the album. also shoudl require album's artist_id == currentuser.id

        if @album.artist_id == current_user.id
            if @album.update(album_params)
                render :show
            else
                render json: @album.errors.full_messages, status: 422
            end
        else
            render json: ['You are not the owner of this album'], status: 422 
        end
    end

    def destroy
        @album = Album.find_by(id: params[:id])
        
        if @album.artist_id == current_user.id
            @album.destroy
            render :index # maybe change this render to something else
        else
            render json: ['You are not the owner of this album'], status: 422
        end
    end

    private
    def album_params
        params.require(:album).permit(:title, :description, :credits)
    end
end
