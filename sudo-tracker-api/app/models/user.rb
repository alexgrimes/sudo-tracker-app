class User < ApplicationRecord
  has_many :user_habits
  has_many :habits, through: :user_habits
  has_many :initiated_relationships, class_name: "Friendship", foreign_key: :user_1_id
  has_many :user_2s, through: :initiated_relationships, source: :user_2
  has_many :accepted_relationships, class_name: "Friendship", foreign_key: :user_2_id
  has_many :user_1s, through: :accepted_relationships, source: :user_1
end
