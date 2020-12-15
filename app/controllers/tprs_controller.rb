class TprsController < ApplicationController
  protect_from_forgery with: :null_session
  before_action :authorized, only: [:auto_login]
  
  def index
    patient = Patient.find(params[:patient_id])
    treatment = patient.treatments
    render json: TreatmentSerializer.new(treatment).serialized_json
  end
  def create
    array = []
    puts "*"*99
    puts params[:patient]
    puts "*"*99
    puts params[:treatment_id]
    puts "*"*99
    patient = Patient.find_by(name: params[:patient])
    if patient.nil?
      patient = Patient.create(name: params[:patient])
    end
    # if params[:treatment_id].length >= 1 
    #   params[:treatment_id].each do |item|
    #     array  << Treatment.find_by(id: item)
    #   end
    # else
    #   array << Treatment.find_by(id: params[:treatment_id])
    # end
    array << Treatment.find(params[:treatment_id])
    patient.treatments = array
  end
end
