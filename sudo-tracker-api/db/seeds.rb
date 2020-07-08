require 'faker'

User.destroy_all
Habit.destroy_all
UserHabit.destroy_all
Friendship.destroy_all

# USER DATA 
emilio = User.create(name: 'Emilio', email_address: 'emilioquintana90@gmail.com', age: 22, img_url: 'www.nicepicture.com/1')
alex = User.create(name: 'Alex', email_address: 'alex@gmail.com', age: 34, img_url: 'www.nicepicture.com/1')
# steven = User.create(name: 'Steven', email_address: 'steven@gmail.com', age: 21, img_url: 'https://image.cnbcfm.com/api/v1/image/106413549-1582813344882ss.jpg?v=1582813359')
# daniela = User.create(name: 'Daniela', email_address: 'daniela@gmail.com', age: 32, img_url: 'www.nicepicture.com/1')

# HABIT DATA
Habit.create(name: 'Meditation', description: 'A nice habit!')
UserHabit.create(user_id: User.first.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Fasting', description: 'A nice habit!')
UserHabit.create(user_id: User.first.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Workout', description: 'A nice habit!')
UserHabit.create(user_id: alex.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Mandarin', description: 'A nice habit!')
UserHabit.create(user_id: alex.id, habit_id: Habit.last.id, straight_days: 0)

Habit.create(name: 'Cooking', description: 'A nice habit!')
UserHabit.create(user_id: User.first.id, habit_id: Habit.last.id, straight_days: 0)

# FRIENDSHIP DATA
Friendship.create(user_1_id: alex.id, user_2_id: emilio.id)

