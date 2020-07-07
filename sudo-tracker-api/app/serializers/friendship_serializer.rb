class FriendshipSerializer < ActiveModel::Serializer
  attributes :id, :user_1_id, :user_2_id
end
