class CategoriesController < ApplicationController
  protect_from_forgery with: :null_session
  def index
    categories = Category.order("created_at DESC")
    render json: CategorySerializer.new(categories).serialized_json
  end

  def create
    category = Category.new(category_params)
    if category.save
      render json: CategorySerializer.new(category).serialized_json
    else
      render json: {error: category.errors.messages},status: 422 
    end
  end
  
  def update
    category = Category.find(params[:id])
    if category.update(category_params)
        render json: CategorySerializer.new(category).serialized_json
    else
        render json: {error: category.errors.messages},status: 422 
    end
  end

  def destroy
    category = Category.find(params[:id])
    unless category.nil?   
      if category.destroy
        head :no_content
      else
        render json: {error: category.errors.messages},status: 422 
      end
    end
  end
  private
  def category_params
    params.permit(:name,:name_fr,:name_mg)
  end
end
