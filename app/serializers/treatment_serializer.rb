class TreatmentSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :name_fr, :name_mg

  has_many :treatment_patient_refs
  has_many :patients, through: :treatment_patient_refs
end
