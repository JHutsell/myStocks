class Stock < ApplicationRecord
    has_many :stock_cards
    has_many :watch_lists, through: :stock_cards
end
