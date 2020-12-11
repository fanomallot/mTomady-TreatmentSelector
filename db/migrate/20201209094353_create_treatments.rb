class CreateTreatments < ActiveRecord::Migration[6.0]
  def change
    create_table :treatments do |t|
      t.string :name
      t.string :name_fr
      t.string :name_mg
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
