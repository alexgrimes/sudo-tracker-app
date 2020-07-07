class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_habits, :accepted_relationships

  def accepted_relationships 
    @object.accepted_relationships.map { |relationship| { name: relationship.user_1.name } }
  end

  def user_habits 
    @object.user_habits.map { |userHabit|
      {
        name: userHabit.habit.name,
        straight_days: userHabit.straight_days
      }
    }
  end

end
