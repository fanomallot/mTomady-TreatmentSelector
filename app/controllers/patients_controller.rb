class PatientsController < ApplicationController
  protect_from_forgery with: :null_session
  def index
    patients = Patient.order("created_at DESC")
    render json: PatientSerializer.new(patients).serialized_json
  end
  def show
    patients = Patient.find_by(params[:id])
    render json: PatientSerializer.new(patients).serialized_json
  end
  def create
    patient = Patient.new(patient_params)
    if patient.save
      render json: PatientSerializer.new(patient).serialized_json
    else
      render json: {error: patients.errors.messages},status: 422
    end
  end
  def update
    patient = Patient.find(params[:id])
    if patient.update(patient_params)
        render json: PatientSerializer.new(patient).serialized_json
    else
        render json: {error: patient.errors.messages},status: 422 
    end
  end
  def destroy
    patient = Patient.find(params[:id])
    unless patient.nil?   
      if patient.destroy
        head :no_content
      else
        render json: {error: patient.errors.messages},status: 422 
      end
    end
  end
  private
  def patient_params
    params.permit(:name)
  end
end
