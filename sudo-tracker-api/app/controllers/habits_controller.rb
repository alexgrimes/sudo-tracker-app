class HabitsController < ApplicationController
  def create
    habit = Habit.create(name: params[:name])
    userHabit = UserHabit.create(habit_id: habit.id, user_id: params[:id], straight_days: 0)
    render json: habit
  end 

  def destroy
    habit = Habit.find(params[:id])
    userHabit = UserHabit.find_by(habit_id: params[:id])
    habit.destroy
    userHabit.destroy
    render json: {message: 'Habit destroyed!'}
  end 
end
