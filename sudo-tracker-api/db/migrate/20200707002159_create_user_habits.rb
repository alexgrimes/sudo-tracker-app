class CreateUserHabits < ActiveRecord::Migration[6.0]
  def change
    create_table :user_habits do |t|
      t.string :user_id
      t.string :habit_id
      t.string :straight_days

      t.timestamps
    end
  end
end
