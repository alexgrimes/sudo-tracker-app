class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :email_address, :habits, :user_habits
end
