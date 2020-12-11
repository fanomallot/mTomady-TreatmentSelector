class Treatment < ApplicationRecord
  belongs_to :category
  has_many :treatment_patient_refs
  has_many :patients, through: :treatment_patient_refs
end
