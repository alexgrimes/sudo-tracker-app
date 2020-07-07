class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :email_address, :habits
end
