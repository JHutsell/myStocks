class WatchList < ApplicationRecord
    has_many :stock_cards, dependent: :destroy
    belongs_to :user

    validates_uniqueness_of :name
end
