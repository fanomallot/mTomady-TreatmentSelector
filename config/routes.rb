Rails.application.routes.draw do
  get 'admins/index'
  get 'admins/show'
  get 'admins/update'
  root 'page#index'
  resources :categories ,path: 'api/mtomady/category',controller: 'categories' do
    resources :treatments,controller: 'treatments'
  end
  resources :admins,path: 'api/mtomady/admin',controller: 'admins'
  get 'api/mtomady/treatments',to: 'treatments#fullindex'
  get 'api/mtomady/admin/log/:name/:password',to: 'admins#sign'
  resources :patients,path: 'api/mtomady/patient',controller: 'patients'
  resources :treatment_patient_refs,only: [:create],controller: 'tprs'

  get '*path', to: 'page#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
