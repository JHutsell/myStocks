class User < ApplicationRecord
    has_many :watch_lists

    validates_uniqueness_of :name
end
