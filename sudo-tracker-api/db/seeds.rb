require 'faker'

User.destroy_all
Habit.destroy_all
UserHabit.destroy_all
Friendship.destroy_all

# USER DATA 
User.create(name: 'Emilio', email_address: 'emilioquintana90@gmail.com', age: 22, img_url: 'www.nicepicture.com/1')
User.create(name: 'Alex', email_address: 'alex@gmail.com', age: 22, img_url: 'www.nicepicture.com/1')

# HABIT DATA
Habit.create(name: 'Meditation', description: 'A nice habit!')
UserHabit.create(user_id: User.first.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Fasting', description: 'A nice habit!')
UserHabit.create(user_id: User.first.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Workout', description: 'A nice habit!')
UserHabit.create(user_id: User.first.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Mandarin', description: 'A nice habit!')
UserHabit.create(user_id: User.first.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Cooking', description: 'A nice habit!')
UserHabit.create(user_id: User.first.id, habit_id: Habit.last.id, straight_days: 0)

# FRIENDSHIP DATA


