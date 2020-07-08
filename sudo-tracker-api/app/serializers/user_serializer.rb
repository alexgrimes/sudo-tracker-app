class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_habits, :accepted_relationships

  def accepted_relationships 
    @object.accepted_relationships.map { |relationship| 
      max_value = relationship.user_1.user_habits.max_by {|user_habit| user_habit.straight_days}
      { 
        name: relationship.user_1.name,
        straight_days: max_value.straight_days
      } 
    }
  end

  def user_habits 
    @object.user_habits.map { |userHabit|
      {
        name: userHabit.habit.name,
        straight_days: userHabit.straight_days,
        user_habit_id: userHabit.id
      }
    }
  end

end
