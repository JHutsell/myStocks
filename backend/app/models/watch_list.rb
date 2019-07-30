class WatchList < ApplicationRecord
    belongs_to :user
    has_many :stock_cards
    has_many :stocks, through: :stock_cards
end
