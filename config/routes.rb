Rails.application.routes.draw do
  
  resources :admins, only:[:show,:create,:update,]
  post "/login", to: "admins#login"
  get "/auto_login", to: "admins#auto_login"
  
  root 'page#index'
  resources :categories ,path: 'api/mtomady/category',controller: 'categories' do
    resources :treatments,controller: 'treatments',except: %i[show,new,edit]
  end
  resources :admins,path: 'api/mtomady/admin',controller: 'admins'
  get 'api/mtomady/treatments',to: 'treatments#fullindex'
  get 'api/mtomady/treatments/:id',to: 'treatments#show'
  get 'api/mtomady/admin/log/:name/:password',to: 'admins#sign'
  resources :patients,path: 'api/mtomady/patient',controller: 'patients' do
    resources :treatment_patient_refs,only: [:index],controller: 'tprs'
  end

  resources :treatment_patient_refs,only: [:create],controller: 'tprs'

  get '*path', to: 'page#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
