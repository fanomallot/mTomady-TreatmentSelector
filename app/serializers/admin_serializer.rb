class AdminSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :email, :password
end
