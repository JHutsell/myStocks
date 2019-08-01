class StockCardsController < ApplicationController
	def index
        @stock_cards = StockCard.all 
        render json: @stock_cards
    end

    def show
        @stock_card = StockCard.find(params[:id])
        render json: @stock_card
    end

    def create
        @stock_card = StockCard.create(stock_card_params)
        if @stock_card.valid?
            render json: @stock_card
        else
            render json: { errors: @stock_card.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        @stock_card = StockCard.find(params[:id])
        @stock_card.update(stock_card_params)
    end

    def destroy 
        @stock_card = StockCard.find(params[:id])
        @stock_card.destroy
    end


    private 

    def stock_card_params
        params.require(:stock_card).permit(:symbol, :watch_list_id)
    end
end
