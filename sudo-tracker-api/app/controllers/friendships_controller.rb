class FriendshipsController < ApplicationController
  def create
    user = User.find_or_create_by(email_address: params[:email])
    friendship_1 = Friendship.create(user_1_id: user.id, user_2_id: params[:id])
    friendship_2 = Friendship.create(user_1_id: params[:id], user_2_id: user.id)
    render json: user
  end
end
