class WatchList < ApplicationRecord
    has_many :stock_cards
    belongs_to :user
end
