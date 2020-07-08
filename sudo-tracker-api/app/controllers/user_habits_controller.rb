class UserHabitsController < ApplicationController
  def update
    userHabit = UserHabit.find(params[:id])
    userHabit.update(straight_days: params[:straight_days])
    userHabit.save
    render json: userHabit
  end
end
