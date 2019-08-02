class WatchListsController < ApplicationController

    def index
        @watch_lists = WatchList.all 
        render json: @watch_lists
    end

    def show
        @watch_list = WatchList.find(params[:id])
        render json: @watch_list
    end

    def create
        @watch_list = WatchList.create(watchlist_params)
        if @watch_list.valid?
            render json: @watch_list
        else
            render json: { errors: @watch_list.errors.full_messages }#, status: :unprocessable_entity
        end
    end

    def update
        @watch_list = WatchList.find(params[:id])
        @watch_list.update(watchlist_params)
    end

    def destroy 
        @watch_list = WatchList.find(params[:id])
        @watch_list.destroy
    end


    private 

    def watchlist_params
        params.require(:watch_list).permit(:name, :user_id)
    end
end
