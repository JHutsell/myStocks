class AddSymbolToStockCars < ActiveRecord::Migration[5.2]
  def change
  	add_column :stock_cards, :symbol, :string
  end
end
