class UsersController < ApplicationController

    def index
        @users = User.all 
        render json: @users
    end

    def show
        @user = User.find(params[:id])
        render json: @user
    end

    def create
        @user = User.create(user_params)
        if @user.valid?
            render json: @user
        else
            render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
        end
    end


    private 

    def user_params
        params.require(:user).permit(:name)
    end

end
