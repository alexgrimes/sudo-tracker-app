class HabitsController < ApplicationController
  def create
    habit = Habit.create(name: params[:name], description: params[:description])
    userHabit = UserHabit.create(habit_id: habit.id, user_id: params[:id], straight_days: 0)
    render json: habit
  end 
end
