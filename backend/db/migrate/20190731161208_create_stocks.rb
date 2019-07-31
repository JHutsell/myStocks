class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
    	t.string "symbol"
    	t.string "sector"
    	t.string "company_name"
    	t.string "exchange"
    	t.string "industry"
    	t.string "website"
    	t.string "image_url"
    end
  end
end
