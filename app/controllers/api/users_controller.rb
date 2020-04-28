class Api::UsersController < ApplicationController
    before_action :require_logged_in, only: [:update]

    def index
        @artists = User.where(is_artist: true) # or logic could go in the show -- next if is_artist is false. Depends on if this action is needed elsewhere
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
            # redirect_to 'static_pages#root'              # how to i redirect to splash page upon signup
        else
            render json: @user.errors.full_messages, status: 422
        end
    end

    def update
        @user = current_user
        @user.update(user_params)
        if @user.save #Profile Updated / changes saved message or something?
            render :show
        else
            render json: @user.errors.full_messages, status: 422 # correct status msg?
        end
    end

    private
    def user_params
        params.require(:user).permit(:username, :email, :password, :is_artist)
    end
end
