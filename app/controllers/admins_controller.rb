class AdminsController < ApplicationController
  protect_from_forgery with: :null_session
  def index
    admins = Admin.all
    render json: AdminSerializer.new(admins).serialized_json
  end
  def sign
    puts  params[:name]
    puts  params[:password]
    adminshow = Admin.find_by(name: params[:name],password: params[:password])
    render json: AdminSerializer.new(adminshow).serialized_json
  end
  def show
    adminshow = Admin.find(params[:id])
    render json: AdminSerializer.new(adminshow).serialized_json
  end


  def update
    admin = Admin.find(params[:id])
    if admin.update(admin_params)
        render json: AdminSerializer.new(patient).serialized_json
    else
        render json: {error: admin.errors.messages},status: 422 
    end
  end
  private
  def admin_params
    params.permit(:name,:email,:password)
  end
end
