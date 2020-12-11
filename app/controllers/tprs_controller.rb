class TprsController < ApplicationController
  protect_from_forgery with: :null_session
  def create
    array = []
    patient = Patient.find_by(name: params[:patient])
    if patient.nil?
      patient = Patient.create(name: params[:patient])
    end
    if params[:treatment_id].length > 1 
      params[:treatment_id].each do |item|
        array  << Treatment.find_by(id: item)
      end
    else
      array << Treatment.find_by(id: params[:treatment_id])
    end
    patient.treatments = array
  end
end
