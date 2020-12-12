class TreatmentsController < ApplicationController
  protect_from_forgery with: :null_session
  def fullindex
    treatments = Treatment.all
    render json: TreatmentSerializer.new(treatments).serialized_json
  end
  def show
    treatment = Treatment.find(params[:id])
    render json: TreatmentSerializer.new(treatment).serialized_json
  end
  def index
    category = Category.find(params[:category_id])
    treatments = category.treatments
    render json: TreatmentSerializer.new(treatments).serialized_json
  end

  def create
    category = Category.find(params[:category_id])
    treatment = category.treatments.new(treatment_params)
    if treatment.save
      render json: TreatmentSerializer.new(treatment).serialized_json
    else
      render json: {error: treatment.errors.messages},status: 422 
    end
  end

  def update
    treatment = Treatment.find(params[:id])
    if treatment.update(treatment_params)
        render json: TreatmentSerializer.new(treatment).serialized_json
    else
        render json: {error: treatment.errors.messages},status: 422 
    end
  end

  def destroy
    treatment = Treatment.find(params[:id])
    unless treatment.nil?   
      if treatment.destroy
        head :no_content
      else
        render json: {error: treatment.errors.messages},status: 422 
      end
    end
  end
  private
  def treatment_params
    params.permit(:name,:name_fr,:name_mg)
  end
end
