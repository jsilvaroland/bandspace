Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :users, only: [:index, :show, :create, :update]
    resource :session, only: [:create, :destroy]
    resources :albums, except: [:new, :edit]
    resources :tracks, except: [:new, :edit]
    resources :search, only: [:index]
  end

  root 'static_pages#root'
end