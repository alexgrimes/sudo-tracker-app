Rails.application.routes.draw do
  resources :friendships
  resources :user_habits
  resources :habits
  resources :users
  post '/users/login', do: 'users#login'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
