class FriendshipsController < ApplicationController
  def create
    user = User.find_or_create_by(email_address: params[:email])
    friendship = Friendship.create(user_1_id: user.id, user_2_id: params[:id])
    render json: user
  end
end
