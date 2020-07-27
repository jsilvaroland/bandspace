class Api::UsersController < ApplicationController
    before_action :require_logged_in, only: [:update]

    def index
        if params[:search]
            @users = User.where("lower(username) LIKE :search", { :search => "%#{params[:search].downcase}%" })
        else 
            @users = User.all
        end
        render :index
    end

    def show
        @user = User.find_by(id: params[:id])
        render :show
    end

    def create
        @user = User.new(user_params)
        if @user.save
            login!(@user)
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = current_user
    
        if user_params[:banner] == "null" 
            @user.banner.purge
        elsif user_params[:photo] == "null"
            @user.photo.purge
        else
            @user.update(user_params)
        end

        if @user.save # Profile Updated / changes saved message or something?
            render :show
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password, :is_artist, :photo, :banner)
    end
end
