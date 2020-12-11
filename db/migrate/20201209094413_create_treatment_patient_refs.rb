class CreateTreatmentPatientRefs < ActiveRecord::Migration[6.0]
  def change
    create_table :treatment_patient_refs do |t|
      t.references :patient, null: false, foreign_key: true
      t.references :treatment, null: false, foreign_key: true

      t.timestamps
    end
  end
end
