class CreateStockCards < ActiveRecord::Migration[5.2]
  def change
    create_table :stock_cards do |t|
    	t.belongs_to :stock, foreign_key: true
    	t.belongs_to :watch_list, foreign_key: true
    end
  end
end
