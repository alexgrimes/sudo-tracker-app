class UsersController < ApplicationController
  
  def show
    user = User.find(params[:id])
    render json: user
  end

  def login
    user = User.find_by(email_address: params[:email])
    render json: user
  end

  
end
