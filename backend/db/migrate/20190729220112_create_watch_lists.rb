class CreateWatchLists < ActiveRecord::Migration[5.2]
  def change
    create_table :watch_lists do |t|
      t.string :name
      # t.belongs_to :user, foreign_key: true

      t.timestamps
    end
  end
end
