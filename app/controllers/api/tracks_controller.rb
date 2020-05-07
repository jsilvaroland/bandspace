class Api::TracksController < ApplicationController
    before_action :require_logged_in, only: [:create, :update, :destroy]

    def index
        if params[:album_id]
            @tracks = Track.where(album_id: params[:album_id])
        elsif params[:artist_id]
            @tracks = Track.where(album_id: nil).where(artist_id: params[:artist_id])
        end
        render :index
    end

    def show
        @track = Track.find_by(id: params[:id])
        render :show
    end

    def create
        @track = Track.new(track_params)
        @track.artist_id = current_user.id
        
        if @track.save
            render :show
        else
            render json: @track.errors.full_messages, status: 422
        end
    end

    def update
        @track = Track.find_by(id: params[:id])

        if @track.artist_id == current_user.id
            if @track.update(track_params)
                render :show
            else
                render json: @track.errors.full_messages, status: 422
            end
        else
            render json: ['You are not the owner of this track'], status: 422
        end
    end

    def destroy
        @track = Track.find_by(id: params[:id])
        
        if track.artist_id == current_user.id
            @track.destroy
            render 'api/albums/index'
        else
            render json: ['You are not the owner of this track'], status: 422
        end
    end

    private
    def track_params
        params.require(:track).permit(:title, :description, :credits, :lyrics)
    end
end
