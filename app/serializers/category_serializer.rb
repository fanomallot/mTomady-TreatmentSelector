class CategorySerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :name_fr, :name_mg
  
  has_many :treatments
end
