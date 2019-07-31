class UserSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :watch_lists
end
