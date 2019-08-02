class StockCard < ApplicationRecord
    belongs_to :watch_list

    validate :unique_stock
    
    def unique_stock
        watch_list = WatchList.find(self.watch_list_id)
        watch_list.stock_cards.each do |stock_card|
            if stock_card.symbol == self.symbol
                errors.add(:symbol, "This stock is already in this list")
                return 
            end
        end
    end

end
