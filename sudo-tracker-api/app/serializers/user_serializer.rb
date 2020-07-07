class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :age, :email_address, :habits, :user_habits, :initiated_relationships, :accepted_relationships
end
