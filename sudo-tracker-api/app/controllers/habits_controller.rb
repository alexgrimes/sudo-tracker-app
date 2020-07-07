class HabitsController < ApplicationController
  def create
    habit = Habit.create(name: params[:name], description: params[:description])
    userHabit = UserHabit.create(habit_id: habit.id, user_id: 4, straight_days: 0)
    render json: userHabit
  end 
end
