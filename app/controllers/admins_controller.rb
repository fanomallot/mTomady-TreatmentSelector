class AdminsController < ApplicationController
  def index
    admin = Admin.all
    render json: AdminSerializer.new(admin).serialized_json
  end

  def show
    admin = Admin.find(params[:id])
    render json: AdminSerializer.new(admin).serialized_json
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
