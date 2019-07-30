class WatchListsController < ApplicationController

    def index
        @watchlists = WatchList.all 
        render json: @watchlists
    end

    def show
        @watchlist= WatchList.find(params[:id])
        render json: @watchlist
    end

    def create
        @watchlist = WatchList.create(watchlist_params)
        if @watchlist.valid?
            render json: @watchlist
        else
            render json: { errors: @watchlist.errors.full_messages }, status: :unprocessable_entity
        end
    end


    private 

    def watchlist_params
        params.require(:watchlist).permit(:name)
    end
end
