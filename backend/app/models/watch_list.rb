class WatchList < ApplicationRecord
    has_many :stock_cards
    has_many :stocks, through: :stock_cards
    belongs_to :user
end
