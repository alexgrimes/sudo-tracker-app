class HabitSerializer < ActiveModel::Serializer
  attributes :id, :name, :user_habit_id, :straight_days

  def user_habit_id 
    user_habit = UserHabit.find_by(habit_id: @object.id)
    user_habit.id
  end

  def straight_days
    user_habit = UserHabit.find_by(habit_id: @object.id)
    user_habit.straight_days
  end
end
