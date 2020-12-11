class CreateCategories < ActiveRecord::Migration[6.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :name_fr
      t.string :name_mg

      t.timestamps
    end
  end
end
