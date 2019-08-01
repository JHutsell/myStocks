class CreateStockCards < ActiveRecord::Migration[5.2]
  def change
    create_table :stock_cards do |t|
    	t.belongs_to :watch_list, foreign_key: true
    end
  end
end
