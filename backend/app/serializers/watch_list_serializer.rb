class WatchListSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_id
  has_many :stock_cards
end
