class PatientSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name

  has_many :treatment_patient_refs
  has_many :treatments, through: :treatment_patient_refs
end
