class StocksController < ApplicationController

    def index
        @stocks = Stock.all 
        render json: @stocks
    end

    def show
        @stock = Stock.find(params[:id])
        render json: @stock
    end

    def create
        @stock = Stock.create(stock_params)
        if @stock.valid?
            render json: @stock
        else
            render json: { errors: @stock.errors.full_messages }, status: :unprocessable_entity
        end
    end


    private 

    def stock_params
        params.require(:stock).permit(:name, :sector, :company_name, :exchange, :industry, :website, :image_url)
    end

end
