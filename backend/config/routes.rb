Rails.application.routes.draw do
  resources :stock_cards
  resources :users
  resources :watch_lists
  resources :stocks
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
