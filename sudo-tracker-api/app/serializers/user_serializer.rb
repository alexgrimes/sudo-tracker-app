class UserSerializer < ActiveModel::Serializer
attributes :id, :name,:img_url, :user_habits, :accepted_relationships, :straight_days

  def accepted_relationships 
    @object.accepted_relationships.map { |relationship| 
      max_value = relationship.user_1.user_habits.max_by {|user_habit| user_habit.straight_days}
      { 
        id: relationship.user_1.id,
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
        user_habit_id: userHabit.id,
        habit_id: userHabit.habit_id.to_i
      }
    }
  end

  def straight_days
    user_habit = @object.user_habits.max_by {|user_habit| user_habit.straight_days}
    user_habit.straight_days
  end

end
